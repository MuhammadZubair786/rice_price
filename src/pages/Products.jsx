import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useData } from '../context/DataContext'
import ProductCard from '../components/ProductCard'
import SectionHead from '../components/SectionHead'
import PageCta from '../components/PageCta'

export default function Products() {
  const { t } = useLanguage()
  const { products } = useData()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
      const matchCategory =
        category === 'all' ||
        (category === 'basmati' && p.category === 'Basmati') ||
        (category === 'non-basmati' && p.category === 'Non-Basmati')
      return matchSearch && matchCategory
    })
  }, [products, search, category])

  return (
    <>
      <section className="page-banner">
        <div className="container">
          <p className="section-tag banner-tag">{t.nav.products}</p>
          <h1>{t.products.title}</h1>
          <p>{t.products.subtitle}</p>
        </div>
      </section>

      <section className="section section-compact">
        <div className="container">
          <p className="prose prose-center">{t.products.intro}</p>
          <div className="category-info-row">
            <article className="category-info-card">
              <h3>{t.products.basmatiInfo.title}</h3>
              <p>{t.products.basmatiInfo.text}</p>
            </article>
            <article className="category-info-card">
              <h3>{t.products.nonBasmatiInfo.title}</h3>
              <p>{t.products.nonBasmatiInfo.text}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="products-toolbar">
            <div className="search-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
            <div className="category-filters">
              <button
                type="button"
                className={category === 'all' ? 'active' : ''}
                onClick={() => setCategory('all')}
              >
                {t.products.all}
              </button>
              <button
                type="button"
                className={category === 'basmati' ? 'active' : ''}
                onClick={() => setCategory('basmati')}
              >
                {t.products.basmati}
              </button>
              <button
                type="button"
                className={category === 'non-basmati' ? 'active' : ''}
                onClick={() => setCategory('non-basmati')}
              >
                {t.products.nonBasmati}
              </button>
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} showInquiry />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>{t.products.noResults}</p>
            </div>
          )}
        </div>
      </section>

      <section className="section section-muted section-compact">
        <div className="container">
          <SectionHead
            title={t.products.packaging.title}
            description={t.products.packaging.text}
          />
          <ul className="packaging-list">
            {t.products.packaging.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <PageCta />
    </>
  )
}
