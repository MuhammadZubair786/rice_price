import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'

export default function PageCta() {
  const { t } = useLanguage()
  const { settings } = useData()

  return (
    <section className="page-cta">
      <div className="container page-cta-inner">
        <div>
          <h2>{t.home.cta}</h2>
          <p>{t.home.ctaDesc}</p>
        </div>
        <div className="page-cta-actions">
          <a href={`tel:${settings.phone}`} className="page-cta-phone">{settings.phone}</a>
          <Link to="/contact" className="btn btn-primary">{t.contact.form.send}</Link>
        </div>
      </div>
    </section>
  )
}
