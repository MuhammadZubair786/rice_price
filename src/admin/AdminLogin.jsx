import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function AdminLogin() {
  const { login, isAdmin } = useData()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  function handleSubmit(e) {
    e.preventDefault()
    if (login(password)) {
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/logo.png" alt="AR Expo Global" className="logo-img logo-img--admin" height={64} />
          <p>Admin Panel</p>
        </div>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="form-error">Invalid password. Default: admin123</p>}
          <button type="submit" className="btn btn-primary btn-full">Sign In</button>
        </form>
        <a href="/" className="back-link">&larr; Back to Website</a>
      </div>
    </div>
  )
}
