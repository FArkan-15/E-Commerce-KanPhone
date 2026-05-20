<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { checkout } from '@/services/checkout'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

// If cart is empty, redirect to cart or home
if (cartStore.items.length === 0) {
  router.push('/cart')
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const shippingDetails = ref({
  fullName: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: '',
  address: '',
  city: '',
  postalCode: ''
})

const isProcessing = ref(false)

const placeOrder = async () => {
  // Validate form quickly
  if (!shippingDetails.value.fullName || !shippingDetails.value.address || !shippingDetails.value.phone) {
    alert('Please complete your shipping details.')
    return
  }

  isProcessing.value = true
  
  try {
    const orderData = {
      full_name: shippingDetails.value.fullName,
      email: shippingDetails.value.email,
      phone: shippingDetails.value.phone,
      address: shippingDetails.value.address,
      city: shippingDetails.value.city,
      postal_code: shippingDetails.value.postalCode,
      total_price: cartStore.totalPrice,
      items: cartStore.items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.price,
        color: item.selectedColor?.color || null,
        ram: item.product.ram || null,
        storage: item.product.storage || null
      }))
    }

    const response = await checkout(orderData)
    
    // Clear cart
    cartStore.items = []
    cartStore.saveCart()

    // Xendit might return a payment URL in the response
    if (response && response.payment_url) {
      window.location.href = response.payment_url
    } else if (response && response.invoice_url) {
      window.location.href = response.invoice_url
    } else if (response && response.redirect_url) {
      window.location.href = response.redirect_url
    } else {
      alert('Order placed successfully!')
      router.push('/')
    }
  } catch (error) {
    console.error('Checkout error:', error)
    const backendMessage = error.response?.data?.message || error.response?.data?.error || error.message;
    alert(`Failed to place order. Error: ${backendMessage}`)
  } finally {
    isProcessing.value = false
  }
}
</script>

<template>
  <div class="min-h-[75vh] bg-gray-50 px-4 py-8 md:py-12">
    <div class="max-w-[1200px] mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Checkout</h1>
        <p class="text-gray-500 mt-2">Complete your order by filling out the details below.</p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Main Form Column -->
        <div class="flex-1 space-y-8">
          
          <!-- Shipping Information -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">1</span>
              Shipping Details
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Full Name</label>
                <input v-model="shippingDetails.fullName" type="text" placeholder="John Doe" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Email</label>
                <input v-model="shippingDetails.email" type="email" placeholder="john@example.com" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Phone Number</label>
                <input v-model="shippingDetails.phone" type="tel" placeholder="08123456789" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-semibold text-gray-700">Postal Code</label>
                <input v-model="shippingDetails.postalCode" type="text" placeholder="12345" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-sm font-semibold text-gray-700">City</label>
                <input v-model="shippingDetails.city" type="text" placeholder="Jakarta Selatan" class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" />
              </div>
              <div class="md:col-span-2 space-y-2">
                <label class="text-sm font-semibold text-gray-700">Full Address</label>
                <textarea v-model="shippingDetails.address" rows="3" placeholder="Street Name, Building, House No." class="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"></textarea>
              </div>
            </div>
          </div>

        </div>

        <!-- Order Summary Sidebar -->
        <div class="lg:w-[400px] flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
            <h3 class="font-bold text-gray-900 text-xl mb-6">Order Summary</h3>
            
            <!-- Items -->
            <div class="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                <div class="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                  <img :src="item.product.image || 'https://via.placeholder.com/150'" :alt="item.product.name" class="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-semibold text-gray-900 text-sm truncate">{{ item.product.name }}</h4>
                  <p class="text-xs text-gray-500 mt-1">Qty: {{ item.quantity }}</p>
                  <p class="font-bold text-gray-900 text-sm mt-1">{{ formatPrice(item.price * item.quantity) }}</p>
                </div>
              </div>
            </div>

            <hr class="border-gray-100 mb-6" />

            <!-- Price Breakdown -->
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Subtotal</span>
                <span class="font-semibold text-gray-900">{{ formatPrice(cartStore.totalPrice) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Shipping Fee</span>
                <span class="font-semibold text-gray-900">Free</span>
              </div>
            </div>

            <hr class="border-gray-100 mb-6" />

            <div class="flex justify-between items-center mb-8">
              <span class="font-bold text-gray-900 text-lg">Total</span>
              <span class="font-black text-[#ff4242] text-2xl">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>

            <button 
              @click="placeOrder" 
              :disabled="isProcessing"
              class="w-full bg-[#ff4242] hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-colors shadow-sm flex justify-center items-center gap-2"
            >
              <span v-if="isProcessing" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span v-else>Place Order</span>
            </button>
            
            <p class="text-xs text-center text-gray-400 mt-4">
              By placing an order, you agree to our Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8; 
}
</style>
