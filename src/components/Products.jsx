import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useContent } from '../context/ContentContext'

export default function Products() {
  const { t } = useLanguage()
  const { products } = useContent()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return ['All', ...cats]
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || p.category === category
      return matchSearch && matchCategory
    })
  }, [products, search, category])

  return (
    <section id="products" className="products section section--alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.products.title}</span>
          <h2 className="section-title">{t.products.subtitle}</h2>
        </div>

        <div className="products__toolbar">
          <div className="products__search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              placeholder={t.products.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t.products.search}
            />
          </div>
          <div className="products__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`products__filter ${category === cat ? 'products__filter--active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat === 'All' ? 'Rice' : cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="products__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>{t.products.noResults}</p>
          </div>
        ) : (
          <div className="products__grid">
            {filtered.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-card__header">
                  <span className={`product-card__category product-card__category--${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
                    {product.category}
                  </span>
                  <div className="product-card__icon">
                    <svg viewBox="0 0 48 48" fill="none" width="40" height="40">
                      <ellipse cx="24" cy="30" rx="16" ry="8" fill="#E8F5E9" />
                      <path d="M12 30 Q24 10 36 30" stroke="#2E7D32" strokeWidth="2" fill="none" />
                      <ellipse cx="24" cy="20" rx="8" ry="4" fill="#C9A227" opacity="0.6" />
                    </svg>
                  </div>
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__desc">{product.description}</p>
                <div className="product-card__meta">
                  <div className="product-card__meta-item">
                    <span className="product-card__meta-label">{t.products.grade}</span>
                    <span className="product-card__meta-value">{product.grade}</span>
                  </div>
                  <div className="product-card__meta-item">
                    <span className="product-card__meta-label">{t.products.origin}</span>
                    <span className="product-card__meta-value">{product.origin}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
