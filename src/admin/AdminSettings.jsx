import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function AdminSettings() {
  const { settings, updateSettings } = useData()
  const [form, setForm] = useState({ ...settings })
  const [saved, setSaved] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    updateSettings(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1>Site Settings</h1>
        <p>Update company information and social media links</p>
      </div>

      {saved && <div className="admin-toast">Changes saved successfully!</div>}

      <form className="admin-settings-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Company Information</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Company Name</label>
              <input type="text" value={form.companyName} onChange={(e) => handleChange('companyName', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Tagline</label>
              <input type="text" value={form.tagline} onChange={(e) => handleChange('tagline', e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" value={form.phone} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
          </div>
        </fieldset>

        <fieldset>
          <legend>Social Media Links</legend>
          <div className="form-row">
            <div className="form-group">
              <label>Facebook</label>
              <input type="url" value={form.facebook} onChange={(e) => handleChange('facebook', e.target.value)} placeholder="https://facebook.com/..." />
            </div>
            <div className="form-group">
              <label>Twitter / X</label>
              <input type="url" value={form.twitter} onChange={(e) => handleChange('twitter', e.target.value)} placeholder="https://twitter.com/..." />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>LinkedIn</label>
              <input type="url" value={form.linkedin} onChange={(e) => handleChange('linkedin', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Instagram</label>
              <input type="url" value={form.instagram} onChange={(e) => handleChange('instagram', e.target.value)} placeholder="https://instagram.com/..." />
            </div>
          </div>
          <div className="form-group">
            <label>YouTube</label>
            <input type="url" value={form.youtube} onChange={(e) => handleChange('youtube', e.target.value)} placeholder="https://youtube.com/..." />
          </div>
        </fieldset>

        <fieldset>
          <legend>Admin Password</legend>
          <div className="form-group">
            <label>New Admin Password</label>
            <input type="password" value={form.adminPassword} onChange={(e) => handleChange('adminPassword', e.target.value)} />
          </div>
        </fieldset>

        <button type="submit" className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  )
}
