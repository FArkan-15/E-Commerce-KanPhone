<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/services/api'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const phoneNumber = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeTerms = ref(false)

const loading = ref(false)
const errorMessage = ref('')

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!"
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const response = await api.post('/register', {
      name: name.value,
      email: email.value,
      phone_number: phoneNumber.value,
      password: password.value,
      password_confirmation: confirmPassword.value
    })
    
    // Auto-login setelah register sukses
    authStore.login({
      token: response.data?.token || response.data?.access_token || 'mock_token_123',
      user: response.data?.user || { 
        name: name.value, 
        email: email.value, 
        phone_number: phoneNumber.value 
      },
      email: email.value
    })
    
    // Redirect ke home page
    router.push('/')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed. Please try again.'
    console.error('Register error:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Logo -->
      <h1 class="text-center text-3xl font-black text-gray-900 tracking-tight mb-12">
        KanPhone
      </h1>

      <!-- Title & Subtitle -->
      <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900 mb-2">
        Begin Your Journey
      </h2>
      <p class="text-center text-sm text-gray-500 mb-6 px-4">
        Experience precision-crafted technology curated for excellence.
      </p>
      
      <!-- Error Alert -->
      <div v-if="errorMessage" class="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-6 border border-red-100 text-center mx-4">
        {{ errorMessage }}
      </div>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[420px]">
      <div class="bg-white px-4 sm:px-0">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Full Name -->
          <div>
            <label for="name" class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Full Name
            </label>
            <div class="mt-1">
              <input 
                id="name" 
                v-model="name"
                type="text" 
                placeholder="Falih Arkan" 
                required 
                class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Email Address
            </label>
            <div class="mt-1">
              <input 
                id="email" 
                v-model="email"
                type="email" 
                placeholder="faliharkan@gmail.com" 
                required 
                class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Phone Number
            </label>
            <div class="mt-1">
              <input 
                id="phone" 
                v-model="phoneNumber"
                type="tel" 
                placeholder="081234567890" 
                required 
                class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Password Row -->
          <div class="flex flex-col sm:flex-row gap-5">
            <div class="w-full sm:w-1/2">
              <label for="password" class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <div class="mt-1">
                <input 
                  id="password" 
                  v-model="password"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div class="w-full sm:w-1/2">
              <label for="confirm_password" class="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <div class="mt-1">
                <input 
                  id="confirm_password" 
                  v-model="confirmPassword"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  class="appearance-none block w-full px-4 py-3.5 bg-[#f8f9fa] border border-transparent rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          <!-- Terms Checkbox -->
          <div class="flex items-start gap-3 mt-8 mb-8">
            <div class="flex items-center h-5">
              <input 
                id="terms" 
                v-model="agreeTerms"
                type="checkbox" 
                class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer mt-0.5" 
                required
              />
            </div>
            <div class="text-xs text-gray-500 leading-relaxed">
              <label for="terms" class="cursor-pointer">
                By signing up, you agree to our 
                <a href="#" class="text-blue-600 font-medium hover:underline">Terms</a>, 
                <a href="#" class="text-blue-600 font-medium hover:underline">Conditions</a>, and 
                <a href="#" class="text-blue-600 font-medium hover:underline">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <!-- Submit Button -->
          <div>
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#004ada] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Signing up...</span>
              <span v-else>Sign Up</span>
            </button>
          </div>
        </form>

        <!-- Footer link -->
        <div class="mt-10 border-t border-gray-100 pt-8">
          <p class="text-center text-sm text-gray-600">
            Already a member?
            <router-link to="/signin" class="font-bold text-[#004ada] hover:text-blue-800 transition-colors ml-1">
              Sign In
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
