import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'

const ADMIN_SESSION = 'ar-expo-admin-session'
const DEFAULT_PASSWORD = 'admin123'

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const stored = localStorage.getItem('ar-expo-admin-password') || DEFAULT_PASSWORD
    if (password === stored) {
      sessionStorage.setItem(ADMIN_SESSION, 'true')
      onLogin()
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <div className="admin-login__logo">
          <svg viewBox="0 0 40 40" fill="none" width="48" height="48">
            <circle cx="20" cy="20" r="18" fill="#01411C" />
            <path d="M12 28c0-6 3.5-14 8-14s8 8 8 14" stroke="#fff" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <h1>AR Expo Global</h1>
        <p>Admin Panel</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="admin-login__error">{error}</div>}
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          <button type="submit" className="btn btn--primary btn--full">Login</button>
        </form>
        <Link to="/" className="admin-login__back">&larr; Back to Website</Link>
        <p className="admin-login__hint">Default password: admin123</p>
      </div>
    </div>
  )
}

function DashboardTab({ content, products, messages }) {
  const unread = messages.filter((m) => !m.read).length
  return (
    <div className="admin-dashboard">
      <div className="admin-stats">
        <div className="admin-stat-card">
          <span className="admin-stat-num">{products.length}</span>
          <span className="admin-stat-label">Products</span>
        </div>
        <div className="admin-stat-card">
          <span className="admin-stat-num">{messages.length}</span>
          <span className="admin-stat-label">Messages</span>
        </div>
        <div className="admin-stat-card admin-stat-card--highlight">
          <span className="admin-stat-num">{unread}</span>
          <span className="admin-stat-label">Unread</span>
        </div>
      </div>
      <div className="admin-info-card">
        <h3>Company Overview</h3>
        <p><strong>Name:</strong> {content.companyName}</p>
        <p><strong>Email:</strong> {content.contact.email}</p>
        <p><strong>Phone:</strong> {content.contact.phone}</p>
        <p><strong>Address:</strong> {content.contact.address}</p>
      </div>
    </div>
  )
}

function ContentTab({ content, updateContent, updateContact, updateSocial }) {
  const [form, setForm] = useState({
    companyName: content.companyName,
    tagline: content.tagline,
    heroTitle: content.heroTitle,
    heroSubtitle: content.heroSubtitle,
    aboutTitle: content.aboutTitle,
    aboutParagraphs: content.aboutParagraphs.join('\n\n'),
    email: content.contact.email,
    phone: content.contact.phone,
    address: content.contact.address,
    facebook: content.social.facebook,
    twitter: content.social.twitter,
    linkedin: content.social.linkedin,
    instagram: content.social.instagram,
    youtube: content.social.youtube,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateContent({
      companyName: form.companyName,
      tagline: form.tagline,
      heroTitle: form.heroTitle,
      heroSubtitle: form.heroSubtitle,
      aboutTitle: form.aboutTitle,
      aboutParagraphs: form.aboutParagraphs.split('\n\n').filter(Boolean),
    })
    updateContact({ email: form.email, phone: form.phone, address: form.address })
    updateSocial({
      facebook: form.facebook,
      twitter: form.twitter,
      linkedin: form.linkedin,
      instagram: form.instagram,
      youtube: form.youtube,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form className="admin-form" onSubmit={handleSave}>
      {saved && <div className="admin-success">Content saved successfully!</div>}
      <fieldset>
        <legend>General</legend>
        <div className="form-group">
          <label>Company Name</label>
          <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Hero Title</label>
          <input value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
        </div>
        <div className="form-group">
          <label>Hero Subtitle</label>
          <textarea rows="3" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
        </div>
      </fieldset>
      <fieldset>
        <legend>About Us</legend>
        <div className="form-group">
          <label>About Title</label>
          <input value={form.aboutTitle} onChange={(e) => setForm({ ...form, aboutTitle: e.target.value })} />
        </div>
        <div className="form-group">
          <label>About Paragraphs (separate with blank line)</label>
          <textarea rows="8" value={form.aboutParagraphs} onChange={(e) => setForm({ ...form, aboutParagraphs: e.target.value })} />
        </div>
      </fieldset>
      <fieldset>
        <legend>Contact & Social</legend>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label>Address</label>
          <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Facebook URL</label>
            <input value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Twitter URL</label>
            <input value={form.twitter} onChange={(e) => setForm({ ...form, twitter: e.target.value })} />
          </div>
        </div>
        <div className="admin-form__row">
          <div className="form-group">
            <label>LinkedIn URL</label>
            <input value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Instagram URL</label>
            <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
          </div>
        </div>
        <div className="form-group">
          <label>YouTube URL</label>
          <input value={form.youtube} onChange={(e) => setForm({ ...form, youtube: e.target.value })} />
        </div>
      </fieldset>
      <button type="submit" className="btn btn--primary">Save Changes</button>
    </form>
  )
}

function ProductsTab({ products, addProduct, updateProduct, deleteProduct }) {
  const empty = { name: '', category: 'Basmati', description: '', grade: '', origin: 'Pakistan' }
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      updateProduct(editing, form)
      setEditing(null)
    } else {
      addProduct(form)
    }
    setForm(empty)
  }

  const startEdit = (product) => {
    setEditing(product.id)
    setForm({ name: product.name, category: product.category, description: product.description, grade: product.grade, origin: product.origin })
  }

  return (
    <div>
      <form className="admin-form admin-form--inline" onSubmit={handleSubmit}>
        <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              <option value="Basmati">Basmati</option>
              <option value="Non-Basmati">Non-Basmati</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea rows="2" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <div className="admin-form__row">
          <div className="form-group">
            <label>Grade</label>
            <input required value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Origin</label>
            <input required value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} />
          </div>
        </div>
        <div className="admin-form__actions">
          <button type="submit" className="btn btn--primary">{editing ? 'Update' : 'Add Product'}</button>
          {editing && (
            <button type="button" className="btn btn--outline" onClick={() => { setEditing(null); setForm(empty) }}>Cancel</button>
          )}
        </div>
      </form>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Grade</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td><span className="admin-badge">{p.category}</span></td>
                <td>{p.grade}</td>
                <td>{p.origin}</td>
                <td className="admin-table__actions">
                  <button type="button" className="btn btn--sm btn--outline" onClick={() => startEdit(p)}>Edit</button>
                  <button type="button" className="btn btn--sm btn--danger" onClick={() => deleteProduct(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MessagesTab({ messages, markMessageRead, deleteMessage }) {
  if (messages.length === 0) {
    return <p className="admin-empty">No messages yet.</p>
  }

  return (
    <div className="admin-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`admin-message ${msg.read ? '' : 'admin-message--unread'}`}>
          <div className="admin-message__header">
            <div>
              <strong>{msg.name}</strong>
              <span>{msg.email}</span>
            </div>
            <span className="admin-message__date">{new Date(msg.date).toLocaleString()}</span>
          </div>
          <p className="admin-message__subject"><strong>Subject:</strong> {msg.subject}</p>
          <p className="admin-message__body">{msg.message}</p>
          <div className="admin-message__actions">
            {!msg.read && (
              <button type="button" className="btn btn--sm btn--outline" onClick={() => markMessageRead(msg.id)}>Mark Read</button>
            )}
            <button type="button" className="btn btn--sm btn--danger" onClick={() => deleteMessage(msg.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsTab({ resetContent }) {
  const [newPassword, setNewPassword] = useState('')
  const [saved, setSaved] = useState(false)

  const changePassword = (e) => {
    e.preventDefault()
    if (newPassword.length >= 6) {
      localStorage.setItem('ar-expo-admin-password', newPassword)
      setNewPassword('')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  return (
    <div className="admin-settings">
      <div className="admin-settings__section">
        <h3>Change Password</h3>
        {saved && <div className="admin-success">Password updated!</div>}
        <form onSubmit={changePassword} className="admin-form">
          <div className="form-group">
            <label>New Password (min 6 characters)</label>
            <input type="password" minLength="6" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn--primary">Update Password</button>
        </form>
      </div>
      <div className="admin-settings__section admin-settings__danger">
        <h3>Reset Website Content</h3>
        <p>This will reset all content and products to default values.</p>
        <button type="button" className="btn btn--danger" onClick={() => {
          if (window.confirm('Are you sure you want to reset all content to defaults?')) resetContent()
        }}>Reset to Defaults</button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem(ADMIN_SESSION) === 'true')
  const [tab, setTab] = useState('dashboard')
  const contentCtx = useContent()

  useEffect(() => {
    document.title = 'Admin - AR Expo Global'
  }, [])

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION)
    setLoggedIn(false)
  }

  if (!loggedIn) {
    return <AdminLogin onLogin={() => setLoggedIn(true)} />
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'content', label: 'Content' },
    { id: 'products', label: 'Products' },
    { id: 'messages', label: `Messages (${contentCtx.messages.filter((m) => !m.read).length})` },
    { id: 'settings', label: 'Settings' },
  ]

  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <svg viewBox="0 0 40 40" fill="none" width="32" height="32">
            <circle cx="20" cy="20" r="18" fill="#C9A227" />
            <path d="M12 28c0-6 3.5-14 8-14s8 8 8 14" stroke="#01411C" strokeWidth="2" fill="none" />
          </svg>
          <span>AR Expo Admin</span>
        </div>
        <nav className="admin-sidebar__nav">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`admin-sidebar__link ${tab === t.id ? 'admin-sidebar__link--active' : ''}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar__footer">
          <Link to="/" className="admin-sidebar__link">View Website</Link>
          <button type="button" className="admin-sidebar__link admin-sidebar__logout" onClick={logout}>Logout</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{tabs.find((t) => t.id === tab)?.label}</h1>
        </header>
        <div className="admin-content">
          {tab === 'dashboard' && <DashboardTab content={contentCtx.content} products={contentCtx.products} messages={contentCtx.messages} />}
          {tab === 'content' && <ContentTab content={contentCtx.content} updateContent={contentCtx.updateContent} updateContact={contentCtx.updateContact} updateSocial={contentCtx.updateSocial} />}
          {tab === 'products' && <ProductsTab products={contentCtx.products} addProduct={contentCtx.addProduct} updateProduct={contentCtx.updateProduct} deleteProduct={contentCtx.deleteProduct} />}
          {tab === 'messages' && <MessagesTab messages={contentCtx.messages} markMessageRead={contentCtx.markMessageRead} deleteMessage={contentCtx.deleteMessage} />}
          {tab === 'settings' && <SettingsTab resetContent={contentCtx.resetContent} />}
        </div>
      </main>
    </div>
  )
}
