import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productService } from '../services/productService'

export const useProductStore = defineStore('product', () => {
  // --- STATE (Durumlar) ---
  const products = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // --- GETTERS (Hesaplanmış Değerler) ---
  const totalProductsCount = computed(() => products.value.length)
  const lowStockProducts = computed(() => products.value.filter((p) => p.stock < 10))

  // --- ACTIONS (Eylemler / API İstekleri) ---
  const fetchProducts = async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await productService.getProducts()
      // Backend'in döndüğü yapıya göre burayı ayarlayabilirsin (örn: response.data.data)
      products.value = response.data
    } catch (err) {
      error.value = 'Ürünler yüklenirken bir hata oluştu.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addProduct = async (productData) => {
    try {
      const response = await productService.createProduct(productData)
      products.value.push(response.data) // Yeni ürünü listeye ekle
      return true // Başarılı olursa component'e true dön
    } catch (error) {
      error.value = 'Ürün eklenemedi.'
      return false
    }
  }

  const updateProduct = async (id, productData) => {
    try {
      const response = await productService.updateProduct(id, productData)
      const index = products.value.findIndex((p) => p.id === id)
      if (index !== -1) {
        products.value[index] = response.data // Listeyi güncel veriyle yenile
      }
      return true
    } catch (error) {
      error.value = 'Ürün güncellenemedi.'
      return false
    }
  }

  const removeProduct = async (id) => {
    try {
      await productService.deleteProduct(id)
      products.value = products.value.filter((p) => p.id !== id) // Silineni listeden çıkar
      return true
    } catch (error) {
      error.value = 'Ürün silinemedi.'
      return false
    }
  }

  return {
    products,
    isLoading,
    error,
    totalProductsCount,
    lowStockProducts,
    fetchProducts,
    addProduct,
    updateProduct,
    removeProduct,
  }
})
