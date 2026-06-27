import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import { IconFacebook, IconLinkedIn, IconInstagram, IconTwitter, IconYoutube } from '../components/SocialIcons'

function SocialLink({ href, label, children }) {
  if (!href || href === '#') return null
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const { settings, addMessage } = useData()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    addMessage(form)
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="section-tag banner-tag">{t.nav.contact}</p>
          <h1>{t.contact.title}</h1>
          <p>{t.contact.subtitle}</p>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <p className="prose prose-center">{t.contact.intro}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-cards">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h3>{t.contact.email}</h3>
                  <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                </div>
                <div>
                  <h3>{t.contact.phone}</h3>
                  <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3>{t.contact.address}</h3>
                  <p>{settings.address}</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-card-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3>Business Hours</h3>
                  <p>{t.contact.businessHours}</p>
                </div>
              </div>

              <div className="contact-inquiry-box">
                <h3>{t.contact.inquiryTitle}</h3>
                <ul className="inquiry-list">
                  {t.contact.inquiryItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="contact-social">
                <h3>{t.contact.follow}</h3>
                <div className="contact-social-links">
                  <SocialLink href={settings.linkedin} label="LinkedIn"><IconLinkedIn /></SocialLink>
                  <SocialLink href={settings.facebook} label="Facebook"><IconFacebook /></SocialLink>
                  <SocialLink href={settings.twitter} label="Twitter"><IconTwitter /></SocialLink>
                  <SocialLink href={settings.instagram} label="Instagram"><IconInstagram /></SocialLink>
                  <SocialLink href={settings.youtube} label="YouTube"><IconYoutube /></SocialLink>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2 className="contact-form-title">{t.contact.form.send}</h2>
              <p className="contact-form-note">{t.contact.intro}</p>
              {sent && <div className="form-success">{t.contact.form.success}</div>}
              <div className="form-group">
                <label htmlFor="name">{t.contact.form.name}</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t.contact.form.email}</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">{t.contact.form.subject}</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">{t.contact.form.message}</label>
                <textarea
                  id="message"
                  rows="6"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">{t.contact.form.send}</button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
