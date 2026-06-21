<template>
  <div class="page-container">
    <header class="header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h1>Ürün ve Stok Yönetimi</h1>
        </div>
        <div class="header-right">
          <button
            class="theme-toggle"
            @click="toggleTheme"
            :title="isDarkMode ? 'Aydınlık Tema' : 'Karanlık Tema'"
          >
            <svg
              v-if="isDarkMode"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </button>
          <button class="btn-primary" @click="openModal()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Yeni Ürün
          </button>
        </div>
      </div>
    </header>

    <main class="main-content">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon bg-gray">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          </div>
          <div class="stat-info">
            <p>Toplam Çeşit</p>
            <h3>{{ products.length }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-indigo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <p>Toplam Stok Adedi</p>
            <h3>{{ totalStockCount }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-emerald">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <p>Toplam Envanter Değeri</p>
            <h3>{{ formatCurrency(totalInventoryValue) }}</h3>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-rose">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="stat-info">
            <p>Kritik Stok (&lt;10)</p>
            <h3>{{ criticalStockCount }}</h3>
          </div>
        </div>
      </div>

      <div class="filters-card">
        <div class="search-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input v-model="searchQuery" type="text" placeholder="Ürün adı, marka veya SKU ara..." />
        </div>
        <select v-model="selectedCategory" class="type-select">
          <option value="">Tüm Kategoriler</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Ürün Bilgisi</th>
              <th>SKU / Marka</th>
              <th>Kategori</th>
              <th>Stok</th>
              <th>Birim Fiyat</th>
              <th style="text-align: right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredProducts" :key="product.id">
              <td>
                <div class="product-info-cell">
                  <img
                    v-if="product.image"
                    :src="product.image"
                    class="product-image-thumb"
                    :alt="product.name"
                  />
                  <div v-else class="avatar">{{ product.name.charAt(0).toUpperCase() }}</div>
                  <div>
                    <p class="font-bold">{{ product.name }}</p>
                    <p class="text-sm text-muted">Eklenme: {{ product.date }}</p>
                  </div>
                </div>
              </td>
              <td>
                <p class="font-bold">{{ product.sku }}</p>
                <p class="text-sm text-muted">{{ product.brand }}</p>
              </td>
              <td>
                <span class="badge badge-indigo">{{ product.category }}</span>
              </td>
              <td>
                <div class="balance-cell">
                  <span
                    :class="[
                      'font-bold',
                      product.stock < 10
                        ? 'text-rose'
                        : product.stock < 30
                          ? 'text-amber'
                          : 'text-emerald',
                    ]"
                  >
                    {{ product.stock }} Adet
                  </span>
                  <span v-if="product.stock < 10" class="limit-badge">Kritik Stok</span>
                </div>
              </td>
              <td>
                <p class="font-bold">{{ formatCurrency(product.price) }}</p>
              </td>
              <td style="text-align: right">
                <button class="action-btn text-indigo" @click="openModal(product)" title="Düzenle">
                  ✎
                </button>
                <button class="action-btn text-rose" @click="deleteProduct(product.id)" title="Sil">
                  ✖
                </button>
              </td>
            </tr>
            <tr v-if="filteredProducts.length === 0">
              <td colspan="6" class="empty-state">
                <div class="empty-icon">📦</div>
                <p>Ürün bulunamadı</p>
                <span class="text-sm text-muted">Arama kriterlerinizi değiştirmeyi deneyin</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <!-- Ürün Ekle / Düzenle Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
          <div class="modal-box">
            <div class="modal-header">
              <div class="modal-title-area">
                <div class="modal-icon bg-indigo">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path
                      v-if="isEditMode"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                    <path
                      v-else
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <div>
                  <h3>{{ isEditMode ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle' }}</h3>
                  <p class="text-sm text-muted">Ürün ve stok detaylarını girin</p>
                </div>
              </div>
              <button class="close-btn" @click="closeModal">✖</button>
            </div>

            <form @submit.prevent="handleSubmit" class="modal-body">
              <div class="form-group full-width">
                <label>Ürün Görseli</label>
                <div class="image-upload-area" @click="triggerFileInput" v-if="!form.image">
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    ref="fileInput"
                    class="hidden-input"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    class="upload-icon text-muted"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-sm text-muted mt-2">Görsel seçmek için tıklayın</p>
                </div>
                <div class="image-preview-area" v-else>
                  <img :src="form.image" class="preview-img" alt="Ürün Önizleme" />
                  <button type="button" class="remove-image-btn bg-rose" @click="form.image = null">
                    Kaldır
                  </button>
                </div>
              </div>

              <div class="form-group full-width">
                <label>Ürün Adı</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Örn: iPhone 15 Pro Max"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Kategori</label>
                  <input
                    v-model="form.category"
                    type="text"
                    required
                    list="category-list"
                    placeholder="Örn: Elektronik"
                  />
                  <datalist id="category-list">
                    <option v-for="cat in uniqueCategories" :key="cat" :value="cat"></option>
                  </datalist>
                </div>
                <div class="form-group">
                  <label>Marka</label>
                  <input v-model="form.brand" type="text" required placeholder="Örn: Apple" />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Stok Kodu (SKU)</label>
                  <input v-model="form.sku" type="text" required placeholder="Örn: APP-IP15PM" />
                </div>
                <div class="form-group">
                  <label>Stok Adedi</label>
                  <input v-model.number="form.stock" type="number" min="0" required />
                </div>
              </div>

              <div class="form-group">
                <label>Birim Fiyat (TL)</label>
                <input v-model.number="form.price" type="number" step="0.01" min="0" required />
              </div>

              <div class="modal-footer">
                <button type="button" class="btn-secondary" @click="closeModal">İptal</button>
                <button type="submit" class="btn-primary">
                  {{ isEditMode ? 'Güncelle' : 'Kaydet' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Silme Onay Dialogu -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isDeleteDialogOpen" class="modal-overlay" @click.self="cancelDelete">
          <div class="delete-dialog-box">
            <div class="delete-icon-area">
              <div class="delete-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              <button class="delete-close-btn" @click="cancelDelete">✖</button>
            </div>
            <div class="delete-dialog-body">
              <h3>Ürünü Sil</h3>
              <p class="text-muted">
                Bu ürünü silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
            </div>
            <div class="delete-dialog-footer">
              <button class="btn-secondary" @click="cancelDelete">Hayır, Vazgeç</button>
              <button class="btn-danger" @click="confirmDelete">Evet, Sil</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { productService } from '@/services/productService'

// Tema Yönetimi
const isDarkMode = ref(false)

const applyThemeToBody = () => {
  if (isDarkMode.value) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light')
  applyThemeToBody()
}

// Ürün Verileri
const products = ref([])
const isLoading = ref(false)
const error = ref(null)

const searchQuery = ref('')
const selectedCategory = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const isDeleteDialogOpen = ref(false)
let currentProductId = null
let pendingDeleteId = null
const fileInput = ref(null)

const form = reactive({
  name: '',
  category: '',
  brand: '',
  sku: '',
  stock: 0,
  price: 0,
  image: null,
})

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB',
    category: 'Elektronik',
    brand: 'Apple',
    sku: 'APP-15PM-256',
    stock: 24,
    price: 75000,
    date: '12 Eki 2023',
    image: null,
  },
  {
    id: 2,
    name: 'AirPods Pro (2. Nesil)',
    category: 'Aksesuar',
    brand: 'Apple',
    sku: 'APP-AP-P2',
    stock: 8,
    price: 8500,
    date: '05 Kas 2023',
    image: null,
  },
  {
    id: 3,
    name: 'Ergonomik Ofis Koltuğu',
    category: 'Mobilya',
    brand: 'IKEA',
    sku: 'IKE-OFS-01',
    stock: 45,
    price: 4200,
    date: '20 Ara 2023',
    image: null,
  },
  {
    id: 4,
    name: 'Mekanik Klavye MX Red',
    category: 'Çevre Birimleri',
    brand: 'Logitech',
    sku: 'LOG-MK-R1',
    stock: 3,
    price: 3100,
    date: '15 Oca 2024',
    image: null,
  },
]

// API Çağrıları
const fetchProducts = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await productService.getProducts()
    products.value = response.data
  } catch (err) {
    console.warn('API bağlantısı kurulamadı, örnek veriler yüklendi.', err)
    products.value = MOCK_PRODUCTS
  } finally {
    isLoading.value = false
  }
}

const handleSubmit = async () => {
  isLoading.value = true
  error.value = null
  try {
    if (isEditMode.value && currentProductId) {
      const response = await productService.updateProduct(currentProductId, { ...form })
      const index = products.value.findIndex((p) => p.id === currentProductId)
      if (index !== -1) products.value[index] = response.data
    } else {
      const response = await productService.createProduct({ ...form })
      products.value.push(response.data)
    }
    closeModal()
  } catch (err) {
    error.value = isEditMode.value
      ? 'Ürün güncellenirken hata oluştu.'
      : 'Ürün eklenirken hata oluştu.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const deleteProduct = (id) => {
  pendingDeleteId = id
  isDeleteDialogOpen.value = true
}

const cancelDelete = () => {
  isDeleteDialogOpen.value = false
  pendingDeleteId = null
}

const confirmDelete = async () => {
  if (!pendingDeleteId) return
  isLoading.value = true
  error.value = null
  try {
    await productService.deleteProduct(pendingDeleteId)
    products.value = products.value.filter((p) => p.id !== pendingDeleteId)
  } catch (err) {
    error.value = 'Ürün silinirken hata oluştu.'
    console.error(err)
  } finally {
    isLoading.value = false
    isDeleteDialogOpen.value = false
    pendingDeleteId = null
  }
}

// Resim Yükleme
const triggerFileInput = () => {
  if (fileInput.value) fileInput.value.click()
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Computed
const uniqueCategories = computed(() => Array.from(new Set(products.value.map((p) => p.category))))

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower)
    const matchesCategory = selectedCategory.value
      ? product.category === selectedCategory.value
      : true
    return matchesSearch && matchesCategory
  })
})

const totalStockCount = computed(() => products.value.reduce((acc, p) => acc + p.stock, 0))
const totalInventoryValue = computed(() =>
  products.value.reduce((acc, p) => acc + p.price * p.stock, 0),
)
const criticalStockCount = computed(() => products.value.filter((p) => p.stock < 10).length)

// Modal
const openModal = (product = null) => {
  if (product) {
    isEditMode.value = true
    currentProductId = product.id
    Object.assign(form, { ...product })
  } else {
    isEditMode.value = false
    currentProductId = null
    resetForm()
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  resetForm()
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    category: '',
    brand: '',
    sku: '',
    stock: 0,
    price: 0,
    image: null,
  })
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') isDarkMode.value = true
  applyThemeToBody()
  fetchProducts()
})
</script>

<style scoped>
:global(body) {
  --bg-body: #f8fafc;
  --bg-surface: #ffffff;
  --bg-header: rgba(255, 255, 255, 0.85);
  --bg-hover: #f1f5f9;
  --bg-input: #f8fafc;
  --text-main: #1e293b;
  --text-muted: #64748b;
  --border-color: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --color-indigo: #6366f1;
  --color-indigo-dark: #4f46e5;
  --color-indigo-light: #eef2ff;
  --modal-overlay: rgba(15, 23, 42, 0.5);
  background-color: var(--bg-body);
  color: var(--text-main);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  margin: 0;
  padding: 0;
  font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:global(body.dark-theme) {
  --bg-body: #0f172a;
  --bg-surface: #1e293b;
  --bg-header: rgba(30, 41, 59, 0.85);
  --bg-hover: #334155;
  --bg-input: #0f172a;
  --text-main: #f8fafc;
  --text-muted: #94a3b8;
  --border-color: #334155;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  --color-indigo-light: #312e81;
  --modal-overlay: rgba(0, 0, 0, 0.7);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-container {
  min-height: 100vh;
}

.header {
  background-color: var(--bg-header);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 40;
}

.header-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.header-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  width: 2.5rem;
  height: 2.5rem;
  background: linear-gradient(135deg, var(--color-indigo) 0%, var(--color-indigo-dark) 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}
.header-left h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.theme-toggle {
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  color: var(--text-muted);
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.theme-toggle:hover {
  color: var(--color-indigo);
  border-color: var(--color-indigo);
}
.theme-toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(to right, var(--color-indigo), #7c3aed);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(99, 102, 241, 0.4);
}
.btn-primary svg {
  width: 1.25rem;
  height: 1.25rem;
}

.btn-secondary {
  padding: 0.6rem 1.2rem;
  background: var(--bg-surface);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-secondary:hover {
  background: var(--bg-hover);
}

.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(to right, #f43f5e, #e11d48);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-danger:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(244, 63, 94, 0.4);
}

.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon svg {
  width: 1.75rem;
  height: 1.75rem;
  color: white;
}
.stat-info p {
  font-size: 0.875rem;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 0.25rem;
}
.stat-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-main);
}

.bg-gray {
  background: linear-gradient(135deg, #64748b, #475569);
}
.bg-indigo {
  background: linear-gradient(135deg, var(--color-indigo), var(--color-indigo-dark));
}
.bg-emerald {
  background: linear-gradient(135deg, #10b981, #059669);
}
.bg-rose {
  background: linear-gradient(135deg, #f43f5e, #e11d48);
}

.text-rose {
  color: #f43f5e;
}
.text-amber {
  color: #f59e0b;
}
.text-emerald {
  color: #10b981;
}
.text-indigo {
  color: var(--color-indigo);
}
.text-muted {
  color: var(--text-muted);
}
.font-bold {
  font-weight: 600;
}
.text-sm {
  font-size: 0.875rem;
}

.filters-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.search-box {
  position: relative;
  width: 100%;
}
.search-box svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.25rem;
  height: 1.25rem;
  color: var(--text-muted);
}

.search-box input,
.type-select {
  width: 100%;
  padding: 0.85rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  font-size: 1rem;
  color: var(--text-main);
  outline: none;
  transition: all 0.2s;
}
.search-box input {
  padding-left: 3rem;
}
.search-box input:focus,
.type-select:focus {
  border-color: var(--color-indigo);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.table-container {
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th {
  background: var(--bg-hover);
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  border-bottom: 1px solid var(--border-color);
}
td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.875rem;
  color: var(--text-main);
}
tr:last-child td {
  border-bottom: none;
}
tr:hover {
  background: var(--bg-hover);
}

.product-info-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.avatar {
  width: 2.75rem;
  height: 2.75rem;
  background: linear-gradient(135deg, var(--color-indigo-light), var(--border-color));
  color: var(--color-indigo);
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.product-image-thumb {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  object-fit: cover;
  border: 1px solid var(--border-color);
  flex-shrink: 0;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-block;
}
.badge-indigo {
  background: var(--color-indigo-light);
  color: var(--color-indigo);
  border: 1px solid var(--border-color);
}

.balance-cell {
  display: flex;
  flex-direction: column;
}
.limit-badge {
  font-size: 0.65rem;
  font-weight: bold;
  color: #f43f5e;
  text-transform: uppercase;
  margin-top: 0.25rem;
  letter-spacing: 0.5px;
}

.action-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.25rem;
  opacity: 0.6;
  transition: all 0.2s;
  margin-left: 0.5rem;
}
.action-btn:hover {
  opacity: 1;
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  padding: 4rem;
  color: var(--text-muted);
}
.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: var(--modal-overlay);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-box {
  background: var(--bg-surface);
  width: 100%;
  max-width: 550px;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  background: var(--bg-hover);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 10;
}
.modal-title-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.modal-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.modal-icon svg {
  width: 1.25rem;
  height: 1.25rem;
  color: white;
}
.modal-title-area h3 {
  color: var(--text-main);
  margin-bottom: 0.2rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
}
.close-btn:hover {
  color: var(--text-main);
}

.modal-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.full-width {
  grid-column: 1 / -1;
}

.image-upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--bg-input);
}
.image-upload-area:hover {
  border-color: var(--color-indigo);
  background: var(--bg-hover);
}
.upload-icon {
  width: 2rem;
  height: 2rem;
  margin: 0 auto;
}
.hidden-input {
  display: none;
}

.image-preview-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 0.75rem;
  padding: 1rem;
  background: var(--bg-input);
}
.preview-img {
  width: 100%;
  max-height: 200px;
  object-fit: contain;
  border-radius: 0.5rem;
}
.remove-image-btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}
.remove-image-btn:hover {
  opacity: 0.8;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-main);
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem 1rem;
  background: var(--bg-input);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;
}
.form-group input:focus {
  border-color: var(--color-indigo);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border-color);
  margin-top: 0.5rem;
  position: sticky;
  bottom: 0;
  background: var(--bg-surface);
  padding-bottom: 0.5rem;
}

/* Silme Dialogu */
.delete-dialog-box {
  background: var(--bg-surface);
  width: 100%;
  max-width: 400px;
  border-radius: 1rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.delete-icon-area {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1.5rem 1rem;
  position: relative;
}

.delete-icon-circle {
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #fff1f2, #ffe4e6);
  border: 2px solid #fecdd3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-icon-circle svg {
  width: 2.25rem;
  height: 2.25rem;
  color: #f43f5e;
}

.delete-close-btn {
  position: absolute;
  top: 1rem;
  right: 1.25rem;
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s;
}
.delete-close-btn:hover {
  color: var(--text-main);
}

.delete-dialog-body {
  text-align: center;
  padding: 0.5rem 2rem 1.5rem;
}
.delete-dialog-body h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-main);
  margin-bottom: 0.5rem;
}
.delete-dialog-body p {
  font-size: 0.875rem;
  line-height: 1.6;
}

.delete-dialog-footer {
  display: flex;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border-color);
  background: var(--bg-hover);
}
.delete-dialog-footer .btn-secondary,
.delete-dialog-footer .btn-danger {
  flex: 1;
  justify-content: center;
}

/* Animasyonlar */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-box,
.modal-enter-active .delete-dialog-box {
  animation: modal-pop 0.3s ease-out;
}

@keyframes modal-pop {
  0% {
    transform: scale(0.95) translateY(10px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}
</style>
