export default function Sidebar({ activePage, setActivePage }) {
  const items = [
    { id: 'reviews', label: 'Reviews', icon: '★' },
    { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  ]

  return (
    <div style={{
      width: '200px', background: '#fff', borderRight: '1px solid #e5e5e5',
      display: 'flex', flexDirection: 'column', padding: '0', minHeight: '100vh'
    }}>
      <div style={{ padding: '20px 16px', borderBottom: '1px solid #e5e5e5' }}>
        <p style={{ fontWeight: '600', fontSize: '15px', margin: 0 }}>ReviewAI</p>
        <p style={{ fontSize: '12px', color: '#888', margin: '2px 0 0' }}>Sharma Sweets</p>
      </div>

      <nav style={{ padding: '8px 0' }}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => setActivePage(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', fontSize: '14px', cursor: 'pointer',
              background: activePage === item.id ? '#eff6ff' : 'transparent',
              color: activePage === item.id ? '#1d4ed8' : '#555',
              fontWeight: activePage === item.id ? '500' : '400',
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  )
}