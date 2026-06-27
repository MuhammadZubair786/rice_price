import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { defaultSiteContent, defaultProducts } from '../data/defaultContent'

const STORAGE_KEY = 'ar-expo-content'
const PRODUCTS_KEY = 'ar-expo-products'
const MESSAGES_KEY = 'ar-expo-messages'

const ContentContext = createContext(null)

function loadContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...defaultSiteContent, ...JSON.parse(stored) } : defaultSiteContent
  } catch {
    return defaultSiteContent
  }
}

function loadProducts() {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    return stored ? JSON.parse(stored) : defaultProducts
  } catch {
    return defaultProducts
  }
}

function loadMessages() {
  try {
    const stored = localStorage.getItem(MESSAGES_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(loadContent)
  const [products, setProducts] = useState(loadProducts)
  const [messages, setMessages] = useState(loadMessages)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }, [content])

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

  const updateContent = useCallback((updates) => {
    setContent((prev) => ({ ...prev, ...updates }))
  }, [])

  const updateContact = useCallback((contact) => {
    setContent((prev) => ({ ...prev, contact: { ...prev.contact, ...contact } }))
  }, [])

  const updateSocial = useCallback((social) => {
    setContent((prev) => ({ ...prev, social: { ...prev.social, ...social } }))
  }, [])

  const addProduct = useCallback((product) => {
    setProducts((prev) => [...prev, { ...product, id: Date.now().toString() }])
  }, [])

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }, [])

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const addMessage = useCallback((message) => {
    const entry = { ...message, id: Date.now().toString(), date: new Date().toISOString(), read: false }
    setMessages((prev) => [entry, ...prev])
    return entry
  }, [])

  const markMessageRead = useCallback((id) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)))
  }, [])

  const deleteMessage = useCallback((id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }, [])

  const resetContent = useCallback(() => {
    setContent(defaultSiteContent)
    setProducts(defaultProducts)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(PRODUCTS_KEY)
  }, [])

  return (
    <ContentContext.Provider
      value={{
        content,
        products,
        messages,
        updateContent,
        updateContact,
        updateSocial,
        addProduct,
        updateProduct,
        deleteProduct,
        addMessage,
        markMessageRead,
        deleteMessage,
        resetContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
