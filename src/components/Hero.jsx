import { useLanguage } from '../context/LanguageContext'
import { useContent } from '../context/ContentContext'

export default function Hero() {
  const { t } = useLanguage()
  const { content } = useContent()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <div className="hero__bg">
        <div className="hero__pattern"></div>
        <div className="hero__overlay"></div>
      </div>
      <div className="container hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot"></span>
          Pakistan&apos;s Leading Rice Exporter
        </div>
        <h1 className="hero__title">{content.heroTitle}</h1>
        <p className="hero__subtitle">{content.heroSubtitle}</p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={() => scrollTo('#products')}>
            {t.hero.cta}
            <svg viewBox="0 0 20 20" fill="currentColor" width="18" height="18">
              <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
            </svg>
          </button>
          <button type="button" className="btn btn--outline" onClick={() => scrollTo('#contact')}>
            {t.hero.contact}
          </button>
        </div>
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">15+</span>
            <span className="hero__stat-label">Rice Varieties</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-num">50+</span>
            <span className="hero__stat-label">Countries Served</span>
          </div>
          <div className="hero__stat-divider"></div>
          <div className="hero__stat">
            <span className="hero__stat-num">100%</span>
            <span className="hero__stat-label">Quality Assured</span>
          </div>
        </div>
      </div>
    </section>
  )
}
