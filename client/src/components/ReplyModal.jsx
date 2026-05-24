import { useState } from 'react'
import { generateReply, markReplied } from '../api/reviewsApi'

export default function ReplyModal({ review, businessName, onClose, onReplied }) {
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [posted, setPosted] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    const data = await generateReply(review.text, businessName, review.author, review.rating)
    setDraft(data.reply)
    setLoading(false)
  }

  async function handlePost() {
    await markReplied(review.id)
    setPosted(true)
    setTimeout(() => { onReplied(); onClose() }, 1200)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '24px',
        width: '480px', maxWidth: '90vw', display: 'flex', flexDirection: 'column', gap: '14px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontWeight: '600', fontSize: '15px', margin: 0 }}>
            Reply to {review.author}
          </p>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: '18px', color: '#aaa'
          }}>✕</button>
        </div>

        <div style={{
          background: '#f9f9f9', borderRadius: '8px', padding: '12px',
          fontSize: '13px', color: '#555', lineHeight: '1.5'
        }}>
          {review.text}
        </div>

        {!draft && !loading && (
          <button onClick={handleGenerate} style={{
            padding: '10px', background: '#eff6ff', color: '#1d4ed8',
            border: '1px solid #bfdbfe', borderRadius: '8px', fontWeight: '500', fontSize: '14px'
          }}>
            ✦ Generate AI reply
          </button>
        )}

        {loading && (
          <p style={{ textAlign: 'center', color: '#888', fontSize: '13px' }}>
            Generating reply...
          </p>
        )}

        {draft && (
          <>
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              rows={5}
              style={{
                width: '100%', padding: '10px 12px', fontSize: '13px', lineHeight: '1.6',
                border: '1px solid #e5e5e5', borderRadius: '8px', resize: 'vertical',
                fontFamily: 'inherit', background: '#fff', color: '#1a1a1a'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={handleGenerate} style={{
                padding: '8px 14px', fontSize: '13px', border: '1px solid #e5e5e5',
                borderRadius: '8px', background: '#fff', color: '#555'
              }}>
                ↺ Regenerate
              </button>
              <button onClick={handlePost} style={{
                padding: '8px 16px', fontSize: '13px', background: '#1d4ed8',
                color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '500'
              }}>
                {posted ? '✓ Posted!' : 'Post reply'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}