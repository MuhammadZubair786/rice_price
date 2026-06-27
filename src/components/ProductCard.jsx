import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function ProductCard({ product, showInquiry = false }) {
  const { t } = useLanguage()

  return (
    <article className="product-card">
      <div className="product-card-img">
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        <span className="product-card-tag">{product.category}</span>
      </div>
      <div className="product-card-body">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {showInquiry && (
          <Link to="/contact" className="product-card-link">{t.contact.form.send} →</Link>
        )}
      </div>
    </article>
  )
}
