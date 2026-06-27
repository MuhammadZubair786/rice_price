import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import LanguageSelector from './LanguageSelector'
import Logo from './Logo'

export default function Header() {
  const { t } = useLanguage()
  const { settings } = useData()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const links = [
    { to: '/', label: t.nav.home },
    { to: '/about', label: t.nav.about },
    { to: '/products', label: t.nav.products },
    { to: '/contact', label: t.nav.contact },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-bar-badge">Export Company · Pakistan</span>
          </div>
          <div className="top-bar-right">
            <a href={`mailto:${settings.email}`} className="top-bar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              {settings.email}
            </a>
            <a href={`tel:${settings.phone}`} className="top-bar-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              {settings.phone}
            </a>
            <LanguageSelector />
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="logo" aria-label={settings.companyName}>
            <Logo variant="header" />
          </Link>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''} />
          </button>

          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={isActive(link.to) ? 'active' : ''}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
