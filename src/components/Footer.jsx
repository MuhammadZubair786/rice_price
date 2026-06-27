import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { IconFacebook, IconLinkedIn, IconInstagram, IconTwitter, IconYoutube } from './SocialIcons'
import Logo from './Logo'

function SocialLink({ href, label, children }) {
  if (!href || href === '#') return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function Footer() {
  const { t } = useLanguage()
  const { settings } = useData()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-main">
        <div className="footer-col footer-brand">
          <Link to="/" className="footer-logo-wrap">
            <Logo variant="footer" />
          </Link>
          <p className="footer-desc">{t.footer.description}</p>
        </div>

        <div className="footer-col">
          <h4>{t.footer.quickLinks}</h4>
          <ul>
            <li><Link to="/">{t.nav.home}</Link></li>
            <li><Link to="/about">{t.nav.about}</Link></li>
            <li><Link to="/products">{t.nav.products}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t.footer.contactInfo}</h4>
          <ul className="footer-contact-list">
            <li>
              <span className="footer-contact-label">{t.contact.email}</span>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </li>
            <li>
              <span className="footer-contact-label">{t.contact.phone}</span>
              <a href={`tel:${settings.phone}`}>{settings.phone}</a>
            </li>
            <li>
              <span className="footer-contact-label">{t.contact.address}</span>
              <span>{settings.address}</span>
            </li>
          </ul>
          <div className="footer-social">
            <SocialLink href={settings.linkedin} label="LinkedIn"><IconLinkedIn /></SocialLink>
            <SocialLink href={settings.facebook} label="Facebook"><IconFacebook /></SocialLink>
            <SocialLink href={settings.twitter} label="Twitter"><IconTwitter /></SocialLink>
            <SocialLink href={settings.instagram} label="Instagram"><IconInstagram /></SocialLink>
            <SocialLink href={settings.youtube} label="YouTube"><IconYoutube /></SocialLink>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {year} {settings.companyName}. {t.footer.rights}</p>
          <p>Premium Pakistani Rice Export</p>
        </div>
      </div>
    </footer>
  )
}
