import { useState, useEffect } from 'react'
import { getReviews } from '../api/reviewsApi'

export default function Dashboard() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    getReviews().then(setReviews)
  }, [])

  const avg = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '—'

  const replied = reviews.filter(r => r.replied).length
  const replyRate = reviews.length ? Math.round((replied / reviews.length) * 100) : 0

  const ratingCounts = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length
      ? Math.round((reviews.filter(r => r.rating === star).length / reviews.length) * 100)
      : 0
  }))

  const barColor = { 5: '#16a34a', 4: '#1d4ed8', 3: '#ca8a04', 2: '#ea580c', 1: '#dc2626' }

  return (
    <div style={{ padding: '24px', flex: 1 }}>
      <h1 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {[
          { label: 'Avg rating', value: `${avg} ★` },
          { label: 'Total reviews', value: reviews.length },
          { label: 'Reply rate', value: `${replyRate}%` },
        ].map(card => (
          <div key={card.label} style={{
            background: '#fff', border: '1px solid #e5e5e5',
            borderRadius: '10px', padding: '16px'
          }}>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 6px' }}>{card.label}</p>
            <p style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>{card.value}</p>
          </div>
        ))}
      </div>

      <div style={{
        background: '#fff', border: '1px solid #e5e5e5',
        borderRadius: '10px', padding: '20px'
      }}>
        <p style={{ fontSize: '13px', fontWeight: '500', marginBottom: '14px', color: '#555' }}>
          RATING BREAKDOWN
        </p>
        {ratingCounts.map(({ star, count, pct }) => (
          <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ width: '28px', fontSize: '12px', color: '#888', textAlign: 'right' }}>
              {star}★
            </span>
            <div style={{ flex: 1, background: '#f3f4f6', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
              <div style={{
                width: `${pct}%`, minWidth: count > 0 ? '30px' : '0',
                background: barColor[star], height: '100%', borderRadius: '4px',
                display: 'flex', alignItems: 'center', paddingLeft: '8px',
                transition: 'width 0.4s'
              }}>
                {count > 0 && <span style={{ fontSize: '11px', color: '#fff', fontWeight: '500' }}>{count}</span>}
              </div>
            </div>
            <span style={{ width: '32px', fontSize: '12px', color: '#888' }}>{pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}