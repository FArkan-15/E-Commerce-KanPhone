<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    })
    
    // Store user session
    authStore.login({
      token: response.data?.token || 'mock_token_123',
      user: response.data?.user || { name: 'Demo User', email: email.value },
      email: email.value
    })
    
    // Redirect ke home page jika berhasil
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Invalid credentials. Please try again.'
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-[420px]">
      
      <!-- Logo -->
      <h1 class="text-center text-3xl font-black text-gray-900 tracking-tight mb-8">
        KanPhone
      </h1>
      
      <!-- Error Alert -->
      <div v-if="errorMessage" class="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-[13px] mb-8 border border-red-100 text-center mx-4 sm:mx-0">
        {{ errorMessage }}
      </div>

      <div class="bg-white px-4 sm:px-0">
        <form class="space-y-5" @submit.prevent="handleLogin">
          
          <!-- Email -->
          <div>
            <label for="email" class="block text-[13px] font-bold text-gray-600 mb-2">
              Email Address
            </label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="email"
                type="email" 
                placeholder="name@atelier.com" 
                required 
                class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-[13px] font-bold text-gray-600 mb-2">
              Password
            </label>
            <div class="mt-1">
              <input 
                id="password" 
                v-model="password"
                type="password" 
                placeholder="••••••••••••" 
                required 
                class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Forgot Password Info Box -->
          <div class="bg-[#f3f4f6] rounded-xl p-4 mt-6 mb-8 border border-gray-100">
            <div class="flex items-center gap-2 mb-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-[#004ada]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-[11px] font-bold text-[#004ada] tracking-widest uppercase">Forgot Password?</span>
            </div>
            <p class="text-[13px] text-gray-600 leading-relaxed pl-6 pr-2">
              Enter your email above and we'll send a secure verification link to restore access to your account.
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-[15px] font-bold text-white bg-[#004ada] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Signing in...</span>
              <span v-else>Sign In</span>
            </button>
          </div>
        </form>

        <!-- Footer link -->
        <div class="mt-10 pt-4 flex justify-center">
          <p class="text-[14px] text-gray-600">
            Don't have an account?
            <router-link to="/signup" class="font-bold text-[#004ada] hover:text-blue-800 transition-colors ml-1">
              Create an Account
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
