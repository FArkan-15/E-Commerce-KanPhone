<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '@/components/shared/ProductCard.vue'
import { getProducts } from '@/services/productService'

const products = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const data = await getProducts()
    // ambil produk yang ada diskon untuk "Hot Deal"
    const allProducts = data.data || []
    products.value = allProducts.filter((p) => p.discount && p.discount > 0).slice(0, 4)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-end mb-6">
      <div>
        <h2 class="font-bold text-xl text-black">Hot Deal KanPhone</h2>
        <p class="text-[13px] text-gray-500 mt-1">Limited Time</p>
      </div>
      <router-link to="/promo" class="text-blue-600 text-sm font-semibold flex items-center gap-1.5 hover:text-blue-700 transition-colors mb-1">
        View All Deals
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </router-link>
    </div>

    <!-- Loading -->
    <div v-if="loading">Loading...</div>

    <!-- Grid -->
    <div v-else class="grid grid-cols-4 gap-4">
      <ProductCard
        v-for="item in products"
        :key="item.id"
        :product="item"
      />
    </div>
  </div>
</template>