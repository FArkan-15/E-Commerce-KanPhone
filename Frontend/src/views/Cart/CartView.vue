<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
const cartItems = computed(() => cartStore.items)
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const getMaxStock = (item) => {
  if (item.selectedColor && typeof item.selectedColor.stock !== 'undefined') {
    return Number(item.selectedColor.stock)
  }
  if (item.product && typeof item.product.stock !== 'undefined') {
    return Number(item.product.stock)
  }
  return 99
}
</script>

<template>
  <div class="min-h-[75vh] bg-white px-4 py-8 md:py-12">
    <!-- Empty Cart State -->
    <div v-if="cartItems.length === 0" class="flex flex-col items-center justify-center text-center max-w-md w-full mx-auto">
      <!-- Illustration -->
      <div class="relative mb-8 w-72 h-64 flex items-center justify-center">
        <svg viewBox="0 0 200 150" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <!-- Background Blob -->
          <path d="M 40 90 C 20 40, 90 10, 150 40 C 190 60, 170 130, 110 130 C 70 130, 50 110, 40 90 Z" fill="#fef0c7" />
          
          <!-- Fly path (dashed line) -->
          <path d="M 100 55 Q 120 45, 140 30 Q 150 20, 160 30 T 135 60 T 90 65" fill="none" stroke="#1f2937" stroke-width="2" stroke-dasharray="4 4" stroke-linecap="round"/>
          
          <!-- Fly -->
          <circle cx="160" cy="30" r="4" fill="#1f2937"/>
          <!-- Fly wings -->
          <ellipse cx="164" cy="26" rx="2.5" ry="5" fill="#9ca3af" transform="rotate(45 164 26)"/>
          <ellipse cx="156" cy="26" rx="2.5" ry="5" fill="#9ca3af" transform="rotate(-45 156 26)"/>
          
          <!-- Back handle -->
          <path d="M 65 55 L 45 95" stroke="#1f2937" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M 135 55 L 155 95" stroke="#1f2937" stroke-width="5.5" stroke-linecap="round"/>
          
          <!-- Basket Body -->
          <rect x="45" y="80" width="110" height="55" rx="4" fill="#ef4444"/>
          <rect x="45" y="80" width="110" height="15" fill="#dc2626"/>
          
          <!-- Basket Lines (vertical slots) -->
          <rect x="65" y="95" width="5" height="30" rx="2.5" fill="#fca5a5"/>
          <rect x="85" y="95" width="5" height="30" rx="2.5" fill="#fca5a5"/>
          <rect x="105" y="95" width="5" height="30" rx="2.5" fill="#fca5a5"/>
          <rect x="125" y="95" width="5" height="30" rx="2.5" fill="#fca5a5"/>
          
          <!-- Front handle -->
          <path d="M 65 115 L 45 75" stroke="#1f2937" stroke-width="5.5" stroke-linecap="round"/>
          <path d="M 135 115 L 155 75" stroke="#1f2937" stroke-width="5.5" stroke-linecap="round"/>

          <!-- Zero Coin / Tag -->
          <circle cx="70" cy="100" r="14" fill="#fbbf24"/>
          <circle cx="70" cy="100" r="10" fill="none" stroke="#b45309" stroke-width="2.5"/>
          <text x="70" y="106" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="#b45309" text-anchor="middle">0</text>
          
          <!-- Ground Line -->
          <path d="M 30 140 L 170 140" stroke="#1f2937" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Text Content -->
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">
        Your Shopping Cart is Empty
      </h2>
      <p class="text-gray-500 mb-10 text-[15px] font-medium">
        Let's add some items you want to buy
      </p>

      <!-- Action Button -->
      <router-link 
        to="/promo" 
        class="bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-auto inline-block"
      >
        Start Shopping
      </router-link>
    </div>

    <!-- Filled Cart State -->
    <div v-else class="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8">
      
      <!-- Cart Items -->
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-sm font-semibold text-gray-500 border-b border-gray-100">
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Total</div>
          </div>
          
          <div class="divide-y divide-gray-100">
            <div v-for="item in cartItems" :key="item.id" class="p-6 flex flex-col md:grid md:grid-cols-12 md:items-center gap-4">
              <!-- Product Detail -->
              <div class="col-span-6 flex gap-4">
                <div class="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                  <img :src="item.product.image || 'https://via.placeholder.com/150'" :alt="item.product.name" class="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div class="flex flex-col justify-center">
                  <h3 class="font-bold text-gray-900 text-[15px] mb-1 line-clamp-2 leading-tight">{{ item.product.name }}</h3>
                  <div class="text-[13px] text-gray-500 flex flex-wrap gap-2 items-center mb-2">
                    <span v-if="item.selectedColor" class="flex items-center gap-1.5">
                      <span class="w-3 h-3 rounded-full border border-gray-200" :style="{ backgroundColor: item.selectedColor.color }"></span>
                      {{ item.selectedColor.color_name || item.selectedColor.name || item.selectedColor.color }}
                    </span>
                    <span v-if="item.product.ram">{{ item.product.ram }}</span>
                    <span v-if="item.product.storage">{{ item.product.storage }}</span>
                  </div>
                  <button @click="cartStore.removeFromCart(item.id)" class="text-red-500 text-[13px] font-semibold text-left hover:text-red-600 transition-colors w-fit">
                    Remove
                  </button>
                </div>
              </div>

              <!-- Mobile Price & Qty Row -->
              <div class="md:hidden flex items-center justify-between mt-2">
                <div class="text-[15px] font-bold text-gray-900">{{ formatPrice(item.price) }}</div>
                
                <!-- Qty Selector Mobile -->
                <div class="flex items-center border border-gray-300 rounded-[6px] overflow-hidden h-[36px]">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100" :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }">-</button>
                  <div class="w-10 h-full flex items-center justify-center text-[13px] font-semibold text-gray-900 border-x border-gray-200">{{ item.quantity }}</div>
                  <button 
                    @click="item.quantity < getMaxStock(item) ? cartStore.updateQuantity(item.id, item.quantity + 1) : null" 
                    class="w-8 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    :class="{ 'opacity-50 cursor-not-allowed': item.quantity >= getMaxStock(item) }"
                  >+</button>
                </div>
              </div>

              <!-- Desktop Price -->
              <div class="hidden md:block col-span-2 text-center font-semibold text-[15px] text-gray-900">
                {{ formatPrice(item.price) }}
              </div>

              <!-- Desktop Qty -->
              <div class="hidden md:flex col-span-2 justify-center">
                <div class="flex items-center border border-gray-300 rounded-[6px] overflow-hidden h-[38px]">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" class="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100" :class="{ 'opacity-50 cursor-not-allowed': item.quantity <= 1 }">-</button>
                  <div class="w-10 h-full flex items-center justify-center text-[13px] font-semibold text-gray-900 border-x border-gray-200">{{ item.quantity }}</div>
                  <button 
                    @click="item.quantity < getMaxStock(item) ? cartStore.updateQuantity(item.id, item.quantity + 1) : null" 
                    class="w-9 h-full flex items-center justify-center text-gray-600 hover:bg-gray-100"
                    :class="{ 'opacity-50 cursor-not-allowed': item.quantity >= getMaxStock(item) }"
                  >+</button>
                </div>
              </div>

              <!-- Desktop Total -->
              <div class="hidden md:block col-span-2 text-right font-bold text-[15px] text-[#ff4242]">
                {{ formatPrice(item.price * item.quantity) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-[380px] flex-shrink-0">
        <h2 class="text-xl font-bold text-gray-900 mb-6 lg:invisible">Summary</h2>
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
          <h3 class="font-bold text-gray-900 text-lg mb-4">Order Summary</h3>
          
          <div class="flex justify-between items-center mb-3">
            <span class="text-gray-500 text-[15px]">Subtotal ({{ cartStore.totalItems }} items)</span>
            <span class="font-semibold text-gray-900 text-[15px]">{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>
          
          <hr class="my-4 border-gray-100" />
          
          <div class="flex justify-between items-center mb-8">
            <span class="font-bold text-gray-900 text-[16px]">Total</span>
            <span class="font-black text-[#ff4242] text-[20px]">{{ formatPrice(cartStore.totalPrice) }}</span>
          </div>
          
          <router-link to="/checkout" class="w-full bg-[#ff4242] hover:bg-red-600 text-white text-center font-bold py-3.5 rounded-lg transition-colors shadow-sm mb-3 block">
            Proceed to Checkout
          </router-link>
          
          <router-link to="/promo" class="w-full block text-center text-blue-600 hover:text-blue-700 font-semibold text-[14px]">
            Continue Shopping
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Optional specific styling */
</style>
