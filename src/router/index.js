// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import ProductManagement from '../views/ProductManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/products', // Ana dizine geleni doğrudan ürünlere yönlendiriyoruz
    },
    {
      path: '/products',
      name: 'products',
      component: ProductManagement,
    },
    // İleride buraya login, dashboard vb. sayfalar eklenebilir
  ],
})

export default router
