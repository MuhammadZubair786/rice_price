import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function LanguageSelector() {
  const { lang, setLang, languages } = useLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = languages.find((l) => l.code === lang) || languages[0]

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="lang-selector" ref={ref}>
      <button
        type="button"
        className="lang-btn"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Select language"
      >
        <span className="lang-flag">{current.flag}</span>
        <span>{current.name}</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              className={`lang-option ${l.code === lang ? 'active' : ''}`}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
            >
              <span className="lang-flag">{l.flag}</span>
              <span>{l.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
