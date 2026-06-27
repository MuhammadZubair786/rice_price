import { useState } from 'react'
import { useData } from '../context/DataContext'

const emptyProduct = {
  name: '',
  category: 'Basmati',
  description: '',
  image: '',
  featured: false,
}

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useData()
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyProduct)
  const [showForm, setShowForm] = useState(false)

  function openAdd() {
    setEditing(null)
    setForm(emptyProduct)
    setShowForm(true)
  }

  function openEdit(product) {
    setEditing(product.id)
    setForm({ ...product })
    setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (editing) {
      updateProduct(editing, form)
    } else {
      addProduct(form)
    }
    setShowForm(false)
    setForm(emptyProduct)
    setEditing(null)
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id)
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h1>Manage Products</h1>
          <p>Add, edit, or remove rice products</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      {showForm && (
        <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="Basmati">Basmati</option>
                  <option value="Non-Basmati">Non-Basmati</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="form-group form-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  />
                  Featured Product
                </label>
              </div>
              <div className="admin-modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td><img src={p.image} alt={p.name} className="admin-table-img" /></td>
                <td>{p.name}</td>
                <td><span className="badge">{p.category}</span></td>
                <td>{p.featured ? '✓' : '—'}</td>
                <td className="admin-actions">
                  <button type="button" className="btn-sm btn-edit" onClick={() => openEdit(p)}>Edit</button>
                  <button type="button" className="btn-sm btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
