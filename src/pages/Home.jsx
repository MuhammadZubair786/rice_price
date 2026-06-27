import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import SectionHead from '../components/SectionHead'
import PageCta from '../components/PageCta'
import { featureIcons } from '../components/FeatureIcons'
import { images } from '../data/images'

const MARKETS = ['UAE', 'Saudi Arabia', 'UK', 'Germany', 'Kenya', 'South Africa', 'Malaysia', 'Afghanistan', 'USA', 'Canada']

export default function Home() {
  const { t } = useLanguage()
  const { products, settings } = useData()
  const featured = products.filter((p) => p.featured).slice(0, 4)

  const stats = [
    { value: '25+', label: t.home.stats.countries },
    { value: '10+', label: t.home.stats.years },
    { value: '100%', label: t.home.stats.quality },
    { value: '500+', label: t.home.stats.clients },
  ]

  const features = [
    { Icon: featureIcons[0], title: t.about.features.quality, desc: t.about.features.qualityDesc },
    { Icon: featureIcons[1], title: t.about.features.logistics, desc: t.about.features.logisticsDesc },
    { Icon: featureIcons[2], title: t.about.features.trust, desc: t.about.features.trustDesc },
    { Icon: featureIcons[3], title: t.about.features.export, desc: t.about.features.exportDesc },
  ]

  const grades = ['Basmati 1121', 'Super Kernel', 'Steam Rice', 'Sella Rice', 'IRRI-6', 'PK-386']

  return (
    <>
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url(${images.heroBg})` }} aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container hero-body">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{settings.tagline}</p>
              <h1>{t.hero.subtitle}</h1>
              <p className="hero-lead">{t.home.heroLead}</p>
              <div className="hero-btns">
                <Link to="/products" className="btn btn-primary">{t.hero.cta}</Link>
                <Link to="/contact" className="btn btn-outline-light">{t.hero.cta2}</Link>
              </div>
              <ul className="hero-trust">
                {t.home.trust.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="hero-photo">
              <img src={images.heroRice} alt="Premium Basmati Rice" fetchPriority="high" decoding="async" />
              <div className="hero-photo-badge">
                <strong>{settings.companyName}</strong>
                <span>Pakistan · Est. Export House</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-bar">
        <div className="container">
          <div className="stats-panel">
            <ul className="stats-list">
              {stats.map((stat, i) => (
                <li key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  {i < stats.length - 1 && <span className="stats-divider" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grades-bar">
        <div className="container grades-inner">
          <span className="grades-label">{t.home.gradesLabel}</span>
          <ul className="grades-list">
            {grades.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="intro-block">
            <div className="intro-text">
              <SectionHead
                tag={t.nav.about}
                title={t.about.subtitle}
                description={t.about.p1}
                align="left"
              />
              <p className="prose">{t.about.p2}</p>
              <ul className="bullet-list">
                {t.home.introBullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to="/about" className="btn btn-secondary">{t.nav.about}</Link>
            </div>
            <div className="intro-image">
              <img src={images.aboutField} alt="Rice fields in Pakistan" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-navy">
        <div className="container">
          <SectionHead
            tag="How We Work"
            title={t.home.process.title}
            description={t.home.process.subtitle}
          />
          <ol className="process-steps">
            {t.home.process.steps.map((step) => (
              <li key={step.num} className="process-step">
                <span className="process-num">{step.num}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <SectionHead title={t.home.certifications.title} />
          <ul className="cert-list">
            {t.home.certifications.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHead
            title={t.home.markets.title}
            description={t.home.markets.subtitle}
          />
          <ul className="markets-tags">
            {MARKETS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={t.home.whyUs} description={t.about.p3} />
          <div className="features-row">
            {features.map(({ Icon, title, desc }) => (
              <article key={title} className="feature-box">
                <div className="feature-box-icon"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-compact">
        <div className="container">
          <SectionHead
            tag={t.nav.products}
            title={t.products.featured}
            description={t.products.intro}
          />
          <div className="products-grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="section-foot">
            <Link to="/products" className="btn btn-primary">{t.products.viewAll}</Link>
          </div>
        </div>
      </section>

      <PageCta />
    </>
  )
}
