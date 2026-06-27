import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useData } from '../context/DataContext'
import Logo from '../components/Logo'

export default function AdminLayout() {
  const { isAdmin, logout } = useData()
  const location = useLocation()

  if (!isAdmin && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" replace />
  }

  if (location.pathname === '/admin/login') {
    return <Outlet />
  }

  const navItems = [
    { to: '/admin', label: 'Dashboard', exact: true },
    { to: '/admin/products', label: 'Products' },
    { to: '/admin/settings', label: 'Settings' },
    { to: '/admin/messages', label: 'Messages' },
  ]

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Logo variant="admin" />
          <span>Admin Panel</span>
        </div>
        <nav className="admin-nav">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={
                item.exact
                  ? location.pathname === item.to ? 'active' : ''
                  : location.pathname.startsWith(item.to) ? 'active' : ''
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="admin-sidebar-footer">
          <a href="/" target="_blank" rel="noopener noreferrer">View Website</a>
          <button type="button" onClick={logout}>Logout</button>
        </div>
      </aside>
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  )
}
