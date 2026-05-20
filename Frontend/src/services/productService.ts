import { api } from './api'

export const getProducts = async (params = {}) => {
  const res = await api.get('/products', { params })
  return res.data
}

export const getProductBySlug = async (slug: string) => {
  try {
    // Ambil semua produk karena endpoint spesifik /products/{slug} mungkin belum dibuat di backend
    const res = await api.get('/products')
    const products = res.data?.data || res.data || []
    
    // Cari produk yang slug-nya cocok
    const product = products.find((p: any) => p.slug === slug)
    
    if (!product) {
      throw new Error('Product not found')
    }
    
    return product
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    throw error
  }
}