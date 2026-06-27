import { createContext, useContext, useState, useEffect } from 'react'
import { languages } from '../data/languages'
import { getTranslation } from '../data/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('ar-expo-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('ar-expo-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = ['ar', 'ur', 'fa'].includes(lang) ? 'rtl' : 'ltr'
  }, [lang])

  const t = getTranslation(lang)

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
