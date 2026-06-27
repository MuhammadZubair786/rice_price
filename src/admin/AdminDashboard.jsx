import { useData } from '../context/DataContext'

export default function AdminDashboard() {
  const { products, messages, settings } = useData()
  const featured = products.filter((p) => p.featured).length

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Welcome to AR Expo Global Admin Panel</p>
      </div>

      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-value">{products.length}</span>
          <span className="admin-stat-label">Total Products</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{featured}</span>
          <span className="admin-stat-label">Featured Products</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">{messages.length}</span>
          <span className="admin-stat-label">Messages</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-value">20</span>
          <span className="admin-stat-label">Languages</span>
        </div>
      </div>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Company Info</h3>
          <dl>
            <dt>Company</dt><dd>{settings.companyName}</dd>
            <dt>Email</dt><dd>{settings.email}</dd>
            <dt>Phone</dt><dd>{settings.phone}</dd>
            <dt>Address</dt><dd>{settings.address}</dd>
          </dl>
        </div>
        <div className="admin-card">
          <h3>Recent Messages</h3>
          {messages.length === 0 ? (
            <p className="admin-empty">No messages yet.</p>
          ) : (
            <ul className="admin-message-list">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id}>
                  <strong>{m.name}</strong> — {m.subject}
                  <span>{new Date(m.date).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
