import { useLanguage } from '../context/LanguageContext'
import { useContent } from '../context/ContentContext'

export default function About() {
  const { t } = useLanguage()
  const { content } = useContent()

  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.about.title}</span>
          <h2 className="section-title">{content.aboutTitle}</h2>
          <p className="section-subtitle">{t.about.subtitle}</p>
        </div>

        <div className="about__grid">
          <div className="about__visual">
            <div className="about__image-card">
              <div className="about__image-placeholder">
                <svg viewBox="0 0 120 120" fill="none" width="80" height="80">
                  <ellipse cx="60" cy="70" rx="40" ry="20" fill="#E8F5E9" />
                  <path d="M30 70 Q60 20 90 70" stroke="#2E7D32" strokeWidth="3" fill="none" />
                  <ellipse cx="60" cy="45" rx="15" ry="8" fill="#C9A227" opacity="0.7" />
                  <circle cx="45" cy="55" r="4" fill="#FFD54F" />
                  <circle cx="60" cy="50" r="4" fill="#FFD54F" />
                  <circle cx="75" cy="55" r="4" fill="#FFD54F" />
                </svg>
              </div>
              <div className="about__badge-card">
                <span className="about__badge-num">🇵🇰</span>
                <div>
                  <strong>Pakistan Origin</strong>
                  <span>Premium Agricultural Export</span>
                </div>
              </div>
            </div>
            <div className="about__features">
              <div className="about__feature">
                <div className="about__feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h4>Quality Assured</h4>
                  <p>Rigorous grading & food safety standards</p>
                </div>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <div>
                  <h4>Global Logistics</h4>
                  <p>Timely deliveries worldwide</p>
                </div>
              </div>
              <div className="about__feature">
                <div className="about__feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                  </svg>
                </div>
                <div>
                  <h4>Trusted Partner</h4>
                  <p>Integrity & reliability in every trade</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about__content">
            {content.aboutParagraphs.map((para, i) => (
              <p key={i} className="about__paragraph">{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
