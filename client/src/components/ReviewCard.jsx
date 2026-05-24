export default function ReviewCard({ review, onGenerateReply }) {
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < review.rating ? '#f59e0b' : '#ddd' }}>★</span>
  ))

  const badgeColor = {
    1: { bg: '#fef2f2', color: '#dc2626' },
    2: { bg: '#fff7ed', color: '#ea580c' },
    3: { bg: '#fefce8', color: '#ca8a04' },
    4: { bg: '#f0fdf4', color: '#16a34a' },
    5: { bg: '#f0fdf4', color: '#16a34a' },
  }[review.rating] || { bg: '#f3f4f6', color: '#374151' }

  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e5e5', borderRadius: '10px',
      padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#eff6ff', color: '#1d4ed8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '600'
          }}>
            {review.author.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p style={{ fontWeight: '500', fontSize: '14px', margin: 0 }}>{review.author}</p>
            <p style={{ fontSize: '11px', color: '#aaa', margin: 0 }}>
              {new Date(review.date).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: '500', padding: '3px 8px',
          borderRadius: '20px', background: badgeColor.bg, color: badgeColor.color
        }}>
          {review.rating} star
        </span>
      </div>

      <div style={{ fontSize: '14px' }}>{stars}</div>
      <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.5', margin: 0 }}>{review.text}</p>

      {review.replied ? (
        <span style={{
          fontSize: '12px', color: '#16a34a', background: '#f0fdf4',
          padding: '4px 10px', borderRadius: '20px', alignSelf: 'flex-start'
        }}>
          ✓ Reply posted
        </span>
      ) : (
        <button
          onClick={() => onGenerateReply(review)}
          style={{
            alignSelf: 'flex-start', padding: '7px 14px', fontSize: '13px',
            background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
            borderRadius: '8px', fontWeight: '500'
          }}
        >
          ✦ Generate reply
        </button>
      )}
    </div>
  )
}