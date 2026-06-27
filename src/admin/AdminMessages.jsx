import { useData } from '../context/DataContext'

export default function AdminMessages() {
  const { messages } = useData()

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Contact Messages</h1>
        <p>Messages received from the contact form</p>
      </div>

      {messages.length === 0 ? (
        <div className="admin-empty-state">
          <p>No messages received yet.</p>
        </div>
      ) : (
        <div className="admin-messages">
          {messages.map((m) => (
            <div key={m.id} className="admin-message-card">
              <div className="admin-message-header">
                <div>
                  <strong>{m.name}</strong>
                  <span>{m.email}</span>
                </div>
                <time>{new Date(m.date).toLocaleString()}</time>
              </div>
              <h4>{m.subject}</h4>
              <p>{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
