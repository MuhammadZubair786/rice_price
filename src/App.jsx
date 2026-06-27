import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { DataProvider } from './context/DataContext'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import AdminProducts from './admin/AdminProducts'
import AdminSettings from './admin/AdminSettings'
import AdminMessages from './admin/AdminMessages'

export default function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<Products />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="login" element={<AdminLogin />} />
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="messages" element={<AdminMessages />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </DataProvider>
  )
}
