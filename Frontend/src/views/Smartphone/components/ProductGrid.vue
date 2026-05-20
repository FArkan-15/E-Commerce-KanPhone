<script setup>
import { ref, watch, onMounted } from 'vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import { getProducts } from '@/services/productService'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  }
})

const products = ref([])
const loading = ref(true)

const fetchProducts = async () => {
  loading.value = true
  try {
    // The backend category for smartphone is "handphone"
    const data = await getProducts({ ...props.filters, category: 'handphone' })
    const allProducts = data.data || []
    products.value = allProducts
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

watch(() => props.filters, () => {
  fetchProducts()
}, { deep: true })
</script>

<template>
  <div class="flex-1 w-full">
    
    <!-- Header/Sort -->
    <div class="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
      <h1 class="text-xl font-bold text-gray-900">Smartphones</h1>
      
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Sort by:</span>
        <select class="text-sm border-none bg-gray-50 rounded-lg px-3 py-2 focus:ring-0 cursor-pointer font-medium text-gray-700">
          <option>Most Relevant</option>
          <option>Newest</option>
          <option>Highest Price</option>
          <option>Lowest Price</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
        <div class="w-full aspect-square bg-gray-200 rounded-2xl mb-4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="products.length === 0" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center flex flex-col items-center justify-center">
      <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">Product not found</h3>
      <p class="text-sm text-gray-500 max-w-sm">Try changing the filter or search keywords to find the product you're looking for.</p>
    </div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard
        v-for="item in products"
        :key="item.id"
        :product="item"
      />
    </div>

  </div>
</template>
