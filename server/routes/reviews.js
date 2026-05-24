import express from 'express'
import db from '../db.js'
import { generateReply } from '../services/aiService.js'

const router = express.Router()

// GET all reviews
router.get('/', (req, res) => {
  try {
    const reviews = db.prepare('SELECT * FROM reviews ORDER BY date DESC').all()
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

// POST seed fake reviews for testing
router.post('/seed', (req, res) => {
  try {
    const fake = [
      {
        id: '1',
        author: 'Priya Rathore',
        rating: 1,
        text: 'Food was cold and wait was 40 mins. Very disappointing.',
        date: new Date().toISOString(),
        replied: 0,
      },
      {
        id: '2',
        author: 'Arjun Kulkarni',
        rating: 5,
        text: 'Amazing dal baati! The owner personally came to check on us. Highly recommend!',
        date: new Date().toISOString(),
        replied: 0,
      },
      {
        id: '3',
        author: 'Sneha Mehta',
        rating: 3,
        text: 'Good food but the seating area is cramped and noisy. The ghewar was excellent though.',
        date: new Date().toISOString(),
        replied: 0,
      },
      {
        id: '4',
        author: 'Rahul Sharma',
        rating: 4,
        text: 'Really enjoyed the food and the service was quick. Will definitely come back!',
        date: new Date().toISOString(),
        replied: 0,
      },
      {
        id: '5',
        author: 'Meera Patel',
        rating: 2,
        text: 'The food quality has gone down recently. Used to be much better before.',
        date: new Date().toISOString(),
        replied: 0,
      },
    ]

    const insert = db.prepare(
      'INSERT OR IGNORE INTO reviews (id, author, rating, text, date, replied) VALUES (?, ?, ?, ?, ?, ?)'
    )

    fake.forEach(r => insert.run(r.id, r.author, r.rating, r.text, r.date, r.replied))
    res.json({ message: 'Seeded 5 test reviews successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to seed reviews' })
  }
})

// POST generate AI reply for a review
router.post('/generate-reply', async (req, res) => {
  try {
    const { reviewText, businessName, author, rating } = req.body

    if (!reviewText) {
      return res.status(400).json({ error: 'reviewText is required' })
    }

    const reply = await generateReply(reviewText, businessName, author, rating)
    res.json({ reply })
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate reply' })
  }
})

// POST mark a review as replied
router.post('/mark-replied', (req, res) => {
  try {
    const { reviewId } = req.body

    if (!reviewId) {
      return res.status(400).json({ error: 'reviewId is required' })
    }

    db.prepare('UPDATE reviews SET replied = 1 WHERE id = ?').run(reviewId)
    res.json({ message: 'Review marked as replied' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review' })
  }
})

// DELETE all reviews (useful for resetting during testing)
router.delete('/reset', (req, res) => {
  try {
    db.prepare('DELETE FROM reviews').run()
    res.json({ message: 'All reviews deleted' })
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset reviews' })
  }
})

export default router