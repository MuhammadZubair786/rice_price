import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { defaultSettings, defaultProducts } from '../data/defaultData'

const DataContext = createContext()
const STORAGE_KEY = 'ar-expo-data'
const AUTH_KEY = 'ar-expo-admin-auth'

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return {
        settings: { ...defaultSettings, ...parsed.settings },
        products: parsed.products?.length ? parsed.products : defaultProducts,
        messages: parsed.messages || [],
      }
    }
  } catch {
    /* use defaults */
  }
  return { settings: defaultSettings, products: defaultProducts, messages: [] }
}

export function DataProvider({ children }) {
  const [data, setData] = useState(loadData)
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem(AUTH_KEY) === 'true')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const updateSettings = useCallback((settings) => {
    setData((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } }))
  }, [])

  const addProduct = useCallback((product) => {
    setData((prev) => ({
      ...prev,
      products: [...prev.products, { ...product, id: Date.now().toString() }],
    }))
  }, [])

  const updateProduct = useCallback((id, updates) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }, [])

  const deleteProduct = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }))
  }, [])

  const addMessage = useCallback((message) => {
    setData((prev) => ({
      ...prev,
      messages: [{ ...message, id: Date.now().toString(), date: new Date().toISOString() }, ...prev.messages],
    }))
  }, [])

  const login = useCallback((password) => {
    if (password === data.settings.adminPassword) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      setIsAdmin(true)
      return true
    }
    return false
  }, [data.settings.adminPassword])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    setIsAdmin(false)
  }, [])

  return (
    <DataContext.Provider
      value={{
        settings: data.settings,
        products: data.products,
        messages: data.messages,
        updateSettings,
        addProduct,
        updateProduct,
        deleteProduct,
        addMessage,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
