import api from './api'

export const productService = {
  getProducts() {
    return api.get('/products')
  },
  createProduct(productData) {
    return api.post('/products', productData)
  },
  updateProduct(id, productData) {
    return api.put(`/products/${id}`, productData)
  },
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  },
}
