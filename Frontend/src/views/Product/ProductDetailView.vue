<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductBySlug } from '@/services/productService'
import ProductSpecifications from '@/components/ProductSpecifications.vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const loading = ref(true)
const product = ref(null)

const selectedColor = ref(null)
const currentImage = ref(0)
const images = ref([])
const quantity = ref(1)

const maxStock = computed(() => {
  if (selectedColor.value && typeof selectedColor.value.stock !== 'undefined') {
    return Number(selectedColor.value.stock)
  }
  if (product.value && typeof product.value.stock !== 'undefined') {
    return Number(product.value.stock)
  }
  return 99 // Default max if no stock defined
})

const fetchProduct = async () => {
  loading.value = true
  try {
    const data = await getProductBySlug(route.params.slug)
    const p = data.data || data
    product.value = p
    console.log('Product data:', JSON.parse(JSON.stringify(p)))
    
    // Set colors if available
    if (p.colors_and_stocks && p.colors_and_stocks.length > 0) {
      selectedColor.value = p.colors_and_stocks[0]
    }
    
    // Set images
    if (p.image) {
      images.value = [p.image]
    } else {
      images.value = ['https://via.placeholder.com/400x500.png?text=No+Image']
    }
    
  } catch (error) {
    console.error('Error fetching product detail:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getActivePrice = () => {
  return product.value?.discounted_price || product.value?.final_price || product.value?.price || 0
}

const handleAddToCart = () => {
  if (!product.value) return
  if (!authStore.isLoggedIn) {
    router.push('/signin')
    return
  }
  cartStore.addToCart(product.value, quantity.value, selectedColor.value)
  alert('Produk berhasil ditambahkan ke keranjang!')
}

const handleBuyNow = () => {
  if (!product.value) return
  if (!authStore.isLoggedIn) {
    router.push('/signin')
    return
  }
  cartStore.addToCart(product.value, quantity.value, selectedColor.value)
  router.push('/checkout')
}

const nextImage = () => {
  if(images.value.length) currentImage.value = (currentImage.value + 1) % images.value.length
}
const prevImage = () => {
  if(images.value.length) currentImage.value = (currentImage.value - 1 + images.value.length) % images.value.length
}
</script>

<template>
  <div class="min-h-screen bg-white">
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center h-[60vh]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
    </div>
    
    <!-- Not Found State -->
    <div v-else-if="!product" class="flex flex-col items-center justify-center h-[60vh]">
      <h2 class="text-2xl font-bold text-gray-800">Product Not Found</h2>
      <router-link to="/" class="mt-4 text-blue-600 hover:underline">Go back home</router-link>
    </div>

    <div v-else class="max-w-[960px] mx-auto px-4 md:px-8 py-8 md:py-12 mb-24">
      
      <!-- Top Section: Image and Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        <!-- Image Carousel -->
        <div class="md:col-span-5 relative w-full flex justify-center items-center p-4">
          <button v-if="images.length > 1" @click="prevImage" class="absolute left-4 w-10 h-10 bg-white border border-gray-200 rounded-full flex justify-center items-center shadow-sm hover:bg-gray-50 transition-colors z-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <img :src="images[currentImage]" :alt="product.name" class="max-h-full object-contain drop-shadow-lg rounded-xl" />
          
          <button v-if="images.length > 1" @click="nextImage" class="absolute right-4 w-10 h-10 bg-white border border-gray-200 rounded-full flex justify-center items-center shadow-sm hover:bg-gray-50 transition-colors z-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- Basic Info -->
        <div class="md:col-span-7 flex flex-col pt-4">
          <h1 class="text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
          
          <div class="flex items-center gap-3 mb-2" v-if="product.discount">
            <span class="bg-red-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
              {{ product.discount }}% OFF
            </span>
            <span class="text-gray-400 line-through text-sm font-medium">
              {{ formatPrice(product.price) }}
            </span>
          </div>
          
          <div class="text-[28px] font-bold text-black mb-8">
            {{ formatPrice(getActivePrice()) }}
          </div>

          <!-- Variants / RAM & Storage -->
          <div class="mb-6" v-if="product.ram || product.storage">
            <div class="flex flex-wrap gap-3">
              <button 
                class="px-8 py-2.5 rounded-[8px] border text-[13px] font-semibold transition-all border-red-200 text-red-500 bg-red-50/50"
              >
                <span v-if="product.ram">{{ product.ram }}</span>
                <span v-if="product.ram && product.storage"> / </span>
                <span v-if="product.storage">{{ product.storage }}</span>
              </button>
            </div>
          </div>

          <!-- Colors -->
          <div v-if="product.colors_and_stocks && product.colors_and_stocks.length > 0">
            <div class="flex gap-4">
              <button 
                v-for="colorItem in product.colors_and_stocks" 
                :key="colorItem.color"
                @click="selectedColor = colorItem"
                class="w-6 h-6 rounded-full transition-all border border-gray-200"
                :class="selectedColor?.color === colorItem.color ? 'ring-2 ring-gray-400 ring-offset-2' : ''"
                :style="{ backgroundColor: colorItem.color }"
              ></button>
            </div>
            <p v-if="selectedColor" class="text-[13px] text-gray-500 mt-3">
              Sisa stok: <span class="font-semibold" :class="selectedColor.stock > 5 ? 'text-green-600' : 'text-red-500'">{{ selectedColor.stock }}</span>
            </p>
          </div>
          
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-14 border-gray-300" />

      <!-- Specifications -->
      <div>
        <h2 class="text-[17px] font-bold text-gray-900 mb-6">Specifications</h2>
        
        <ProductSpecifications :product="product" :selectedColor="selectedColor" />
      </div>
    </div>

    <!-- Sticky Bottom Bar -->
    <div class="fixed bottom-0 left-0 w-full bg-[#f8f9fa] py-4 px-6 md:px-12 z-40" v-if="product && !loading">
      <div class="max-w-[960px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div class="flex flex-col text-center sm:text-left">
          <span class="text-[22px] font-bold text-gray-900">{{ formatPrice(getActivePrice() * quantity) }}</span>
        </div>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <!-- Quantity Selector -->
          <div class="flex items-center border border-gray-300 rounded-[6px] bg-white overflow-hidden h-[46px]">
            <button 
              @click="quantity > 1 ? quantity-- : null" 
              class="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors" 
              :class="{ 'opacity-50 cursor-not-allowed': quantity <= 1 }"
            >
              -
            </button>
            <div class="w-12 h-full flex items-center justify-center text-[14px] font-semibold text-gray-900 border-x border-gray-200">
              {{ quantity }}
            </div>
            <button 
              @click="quantity < maxStock ? quantity++ : null" 
              class="w-10 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors" 
              :class="{ 'opacity-50 cursor-not-allowed': quantity >= maxStock }"
            >
              +
            </button>
          </div>
          
          <button 
            @click="handleBuyNow"
            class="flex-1 sm:flex-none px-8 py-3 h-[46px] flex items-center justify-center bg-[#ff4242] hover:bg-red-600 text-white text-[13px] font-bold rounded-[6px] transition-colors"
          >
            Buy Now
          </button>
          <button 
            @click="handleAddToCart"
            class="flex-1 sm:flex-none px-6 py-3 h-[46px] flex items-center justify-center bg-white hover:bg-gray-50 text-[#ff4242] border border-[#ff4242] text-[13px] font-bold rounded-[6px] transition-colors"
          >
            + Cart
          </button>
        </div>
      </div>
    </div>

  </div>
</template>
