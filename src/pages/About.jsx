import { useLanguage } from '../context/LanguageContext'
import { featureIcons } from '../components/FeatureIcons'
import { images } from '../data/images'
import SectionHead from '../components/SectionHead'
import PageCta from '../components/PageCta'

export default function About() {
  const { t } = useLanguage()

  const features = [
    { Icon: featureIcons[0], title: t.about.features.quality, desc: t.about.features.qualityDesc },
    { Icon: featureIcons[1], title: t.about.features.logistics, desc: t.about.features.logisticsDesc },
    { Icon: featureIcons[2], title: t.about.features.trust, desc: t.about.features.trustDesc },
    { Icon: featureIcons[3], title: t.about.features.export, desc: t.about.features.exportDesc },
  ]

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="section-tag banner-tag">{t.nav.about}</p>
          <h1>{t.about.title}</h1>
          <p>{t.about.p4 || t.about.subtitle}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="intro-block">
            <div className="intro-text">
              <h2>{t.about.subtitle}</h2>
              <p className="prose">{t.about.p1}</p>
              <p className="prose">{t.about.p2}</p>
              <p className="prose">{t.about.p3}</p>
              {t.about.p4 && <p className="prose">{t.about.p4}</p>}
              <blockquote className="quote">{t.about.tagline}</blockquote>
            </div>
            <div className="intro-image">
              <img src={images.aboutField} alt="Pakistani Rice Fields" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="mission-grid">
            <article className="info-card">
              <p className="section-tag">{t.about.mission.title}</p>
              <p className="info-card-text">{t.about.mission.text}</p>
            </article>
            <article className="info-card">
              <p className="section-tag">{t.about.vision.title}</p>
              <p className="info-card-text">{t.about.vision.text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead title={t.about.values.title} />
          <div className="values-row">
            {t.about.values.items.map((item) => (
              <article key={item.title} className="value-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHead
            title={t.about.quality.title}
            description={t.about.quality.subtitle}
          />
          <ul className="detail-list">
            {t.about.quality.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            title={t.about.markets.title}
            description={t.about.markets.subtitle}
          />
          <div className="markets-grid">
            {t.about.markets.regions.map((region) => (
              <article key={region.name} className="market-card">
                <h3>{region.name}</h3>
                <p>{region.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted section-compact">
        <div className="container">
          <SectionHead title={t.home.whyUs} />
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

      <PageCta />
    </>
  )
}
