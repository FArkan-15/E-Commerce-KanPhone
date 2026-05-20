<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'

const authStore = useAuthStore()
const router = useRouter()

const isEditing = ref(false)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const orders = ref([])
const loadingOrders = ref(true)

const fetchOrders = async () => {
  try {
    loadingOrders.value = true
    const response = await api.get('/checkout', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    orders.value = response.data?.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch orders:', error)
  } finally {
    loadingOrders.value = false
  }
}

onMounted(() => {
  fetchOrders()
})

// Format helpers
const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency', currency: 'IDR',
    minimumFractionDigits: 0, maximumFractionDigits: 0
  }).format(price)
}

// Form data for editing
const form = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone_number: authStore.user?.phone_number || ''
})

const startEditing = () => {
  form.name = authStore.user?.name || ''
  form.email = authStore.user?.email || ''
  form.phone_number = authStore.user?.phone_number || ''
  isEditing.value = true
  successMessage.value = ''
  errorMessage.value = ''
}

const cancelEditing = () => {
  isEditing.value = false
  errorMessage.value = ''
}

const saveProfile = async () => {
  saving.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const response = await api.put('/user/profile', {
      name: form.name,
      email: form.email,
      phone_number: form.phone_number
    }, {
      headers: {
        Authorization: `Bearer ${authStore.token}`
      }
    })

    // Update local auth store with new data
    const updatedUser = response.data?.user || {
      ...authStore.user,
      name: form.name,
      email: form.email,
      phone_number: form.phone_number
    }
    authStore.user = updatedUser
    localStorage.setItem('user_data', JSON.stringify(updatedUser))

    isEditing.value = false
    successMessage.value = 'Profile updated successfully!'
    setTimeout(() => { successMessage.value = '' }, 3000)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to update profile. Please try again.'
    console.error('Update profile error:', error)
  } finally {
    saving.value = false
  }
}

const handleLogout = () => {
  authStore.logout()
  router.push('/signin')
}
</script>

<template>
  <div class="min-h-[75vh] bg-white px-4 py-8 md:py-12">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-black text-gray-900 mb-8">My Profile</h1>

      <!-- Success Message -->
      <div v-if="successMessage" class="bg-green-50 text-green-700 px-5 py-3.5 rounded-xl text-[14px] mb-6 border border-green-100 font-semibold flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        {{ successMessage }}
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 text-red-600 px-5 py-3.5 rounded-xl text-[14px] mb-6 border border-red-100 font-semibold">
        {{ errorMessage }}
      </div>
      
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <!-- Profile Header -->
        <div class="bg-gray-50 px-8 py-8 flex items-center gap-6 border-b border-gray-100">
          <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {{ authStore.user?.name ? authStore.user.name.charAt(0).toUpperCase() : 'U' }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ authStore.user?.name || 'KanPhone User' }}</h2>
            <p class="text-gray-500 mt-1">{{ authStore.user?.email || 'user@example.com' }}</p>
          </div>
        </div>
        
        <!-- Profile Details (View Mode) -->
        <div class="p-8" v-if="!isEditing">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
              <div class="text-gray-900 font-medium pb-2 border-b border-gray-100">{{ authStore.user?.name || 'KanPhone User' }}</div>
            </div>
            <div>
              <label class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
              <div class="text-gray-900 font-medium pb-2 border-b border-gray-100">{{ authStore.user?.email || 'user@example.com' }}</div>
            </div>
            <div>
              <label class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
              <div class="text-gray-900 font-medium pb-2 border-b border-gray-100">{{ authStore.user?.phone_number || '-' }}</div>
            </div>
            <div>
              <label class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Member Since</label>
              <div class="text-gray-900 font-medium pb-2 border-b border-gray-100">2026</div>
            </div>
          </div>
          
          <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between">
            <button 
              @click="startEditing"
              class="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
            <button 
              @click="handleLogout"
              class="px-6 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <!-- Profile Edit Mode -->
        <div class="p-8" v-else>
          <form @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label for="edit-name" class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  id="edit-name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 bg-[#f8f9fa] border border-transparent rounded-xl text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label for="edit-email" class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  id="edit-email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 bg-[#f8f9fa] border border-transparent rounded-xl text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label for="edit-phone" class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  id="edit-phone"
                  v-model="form.phone_number"
                  type="tel"
                  class="w-full px-4 py-3 bg-[#f8f9fa] border border-transparent rounded-xl text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label class="block text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-2">Member Since</label>
                <div class="text-gray-900 font-medium py-3">2026</div>
              </div>
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between">
              <button 
                type="button"
                @click="cancelEditing"
                class="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit"
                :disabled="saving"
                class="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <svg v-if="!saving" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span v-if="saving">Saving...</span>
                <span v-else>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Order History Section -->
      <div class="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="bg-gray-50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 class="text-xl font-bold text-gray-900">Order History</h2>
          <button @click="fetchOrders" class="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
        
        <div class="p-8">
          <div v-if="loadingOrders" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          
          <div v-else-if="orders.length === 0" class="text-center py-12">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-1">No orders yet</h3>
            <p class="text-gray-500 text-[14px]">When you place orders, they will appear here.</p>
            <router-link to="/promo" class="mt-4 inline-block px-6 py-2.5 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100 transition-colors">
              Start Shopping
            </router-link>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="order in orders" :key="order.id" class="border border-gray-100 rounded-xl p-5 hover:border-blue-100 transition-colors">
              <div class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 pb-4 border-b border-gray-50">
                <div>
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Order ID</span>
                  <span class="font-mono font-medium text-gray-900 text-sm">{{ order.external_id || order.id }}</span>
                </div>
                <div>
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Date</span>
                  <span class="font-medium text-gray-900 text-sm">{{ formatDate(order.created_at) }}</span>
                </div>
                <div>
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Amount</span>
                  <span class="font-bold text-[#ff4242] text-[15px]">{{ formatPrice(order.total_price) }}</span>
                </div>
                <div>
                  <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Status</span>
                  <span 
                    class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide"
                    :class="{
                      'bg-yellow-50 text-yellow-600': order.status === 'pending',
                      'bg-green-50 text-green-600': order.status === 'paid' || order.status === 'completed',
                      'bg-red-50 text-red-600': order.status === 'failed' || order.status === 'cancelled',
                      'bg-gray-50 text-gray-600': !['pending', 'paid', 'completed', 'failed', 'cancelled'].includes(order.status)
                    }"
                  >
                    {{ order.status || 'Unknown' }}
                  </span>
                </div>
              </div>
              
              <!-- Order Items List -->
              <div v-if="order.order_items && order.order_items.length > 0" class="mb-3 space-y-2">
                <div v-for="item in order.order_items" :key="item.id" class="flex items-center gap-3 bg-gray-50 rounded-lg px-4 py-2.5">
                  <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="text-sm font-semibold text-gray-900 truncate block">{{ item.product_name }}</span>
                    <span v-if="item.color" class="text-xs text-gray-500">Color: {{ item.color }}</span>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <span class="text-xs text-gray-500 block">x{{ item.quantity }}</span>
                    <span class="text-sm font-bold text-gray-900">{{ formatPrice(item.price * item.quantity) }}</span>
                  </div>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">{{ order.order_items?.length || 0 }} item{{ (order.order_items?.length || 0) !== 1 ? 's' : '' }} included</span>
                <!-- <a 
                  v-if="order.invoice_url && order.status === 'pending'" 
                  :href="order.invoice_url" 
                  class="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1"
                >
                  Pay Now
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
