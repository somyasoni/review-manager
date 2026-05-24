import { useState, useEffect } from 'react'
import ReviewCard from '../components/ReviewCard'
import ReplyModal from '../components/ReplyModal'
import { getReviews, seedReviews } from '../api/reviewsApi'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [selectedReview, setSelectedReview] = useState(null)
  const [filter, setFilter] = useState('all')
  const [seeded, setSeeded] = useState(false)
  const [loading, setLoading] = useState(true)   // ← added

  async function loadReviews() {
    setLoading(true)                               // ← added
    const data = await getReviews()
    setReviews(data)
    setLoading(false)                              // ← added
  }

  async function handleSeed() {
    await seedReviews()
    setSeeded(true)
    loadReviews()
  }

  useEffect(() => { loadReviews() }, [])

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return r.replied === 0
    if (filter === 'negative') return r.rating <= 2
    if (filter === 'replied') return r.replied === 1
    return true
  })

  return (
    <div style={{ padding: '24px', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '600' }}>
          Reviews
          {reviews.filter(r => !r.replied).length > 0 && (
            <span style={{
              marginLeft: '8px', fontSize: '12px', background: '#fef2f2',
              color: '#dc2626', padding: '2px 8px', borderRadius: '20px'
            }}>
              {reviews.filter(r => !r.replied).length} need reply
            </span>
          )}
        </h1>
        <button onClick={handleSeed} style={{
          padding: '8px 14px', fontSize: '13px', border: '1px solid #e5e5e5',
          borderRadius: '8px', background: '#fff', color: '#555'
        }}>
          {seeded ? '✓ Seeded' : '+ Seed test reviews'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {['all', 'pending', 'negative', 'replied'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '5px 14px', fontSize: '12px', borderRadius: '20px', border: '1px solid',
            borderColor: filter === f ? '#1d4ed8' : '#e5e5e5',
            background: filter === f ? '#eff6ff' : '#fff',
            color: filter === f ? '#1d4ed8' : '#555',
            fontWeight: filter === f ? '500' : '400',
            textTransform: 'capitalize'
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* ↓ THIS is where the loading state goes — replaces your old empty check */}
      {loading ? (
        <p style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
          Loading reviews...
        </p>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
          <p style={{ fontSize: '15px' }}>No reviews yet</p>
          <p style={{ fontSize: '13px', marginTop: '8px' }}>
            Click "Seed test reviews" to add sample data
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(review => (
            <ReviewCard
              key={review.id}
              review={review}
              onGenerateReply={setSelectedReview}
            />
          ))}
        </div>
      )}

      {selectedReview && (
        <ReplyModal
          review={selectedReview}
          businessName="Sharma Sweets"
          onClose={() => setSelectedReview(null)}
          onReplied={loadReviews}
        />
      )}
    </div>
  )
}