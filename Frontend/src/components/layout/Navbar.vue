<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProducts } from '@/services/productService'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const showDropdownDesktop = ref(false)
const showDropdownMobile = ref(false)

const allProducts = ref([])

onMounted(async () => {
  try {
    const res = await getProducts()
    allProducts.value = res.data || res || []
  } catch (error) {
    console.error('Failed to load products for search:', error)
  }
})

const categoriesMap = [
  { name: 'Smartphone', path: '/smartphone', keywords: ['hp', 'samsung', 'iphone', 'handphone', 'ponsel', 'smartphone'] },
  { name: 'Smartwatch', path: '/smartwatch', keywords: ['jam', 'watch', 'smartwatch', 'apple watch', 'galaxy watch', 'advan'] },
  { name: 'Console', path: '/console', keywords: ['ps', 'xbox', 'nintendo', 'console', 'playstation'] },
  { name: 'Audio', path: '/audio', keywords: ['speaker', 'tws', 'headphone', 'earphone', 'audio'] },
  { name: 'Camera', path: '/camera', keywords: ['kamera', 'lensa', 'camera', 'dslr', 'mirrorless'] },
  { name: 'Accessories', path: '/accessories', keywords: ['aksesori', 'charger', 'kabel', 'casing', 'powerbank', 'accessories'] },
  { name: 'Promo', path: '/promo', keywords: ['diskon', 'promo', 'murah', 'sale'] }
]

const searchResults = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return []
  
  // Base matching from hardcoded categories
  let results = categoriesMap.filter(cat => 
    cat.name.toLowerCase().includes(query) || 
    cat.keywords.some(k => k.includes(query))
  )
  
  // Dynamic matching from actual products
  allProducts.value.forEach(p => {
    const pName = p.name?.toLowerCase() || ''
    const pBrand = p.brand?.toLowerCase() || ''
    
    if (pName.includes(query) || pBrand.includes(query)) {
      // Find what category this product belongs to
      let catSlug = p.category_slug?.toLowerCase() || ''
      if (catSlug === 'handphone') catSlug = 'smartphone'
      if (catSlug === 'aksesoris') catSlug = 'accessories'
      
      const targetPath = `/${catSlug}`
      
      // Add to results if not already present
      if (catSlug && !results.find(r => r.path === targetPath)) {
        const existingCat = categoriesMap.find(c => c.path === targetPath)
        if (existingCat) {
          results.push(existingCat)
        } else {
          results.push({ name: p.category || catSlug, path: targetPath, keywords: [] })
        }
      }
    }
  })

  return results
})

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Promo', path: '/promo' },
  { name: 'Smartphone', path: '/smartphone' },
  { name: 'Accessories', path: '/accessories' },
  { name: 'Smartwatch', path: '/smartwatch' },
  { name: 'Console', path: '/console' },
  { name: 'Audio', path: '/audio' },
  { name: 'Camera', path: '/camera' }
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const goToCategory = (path) => {
  router.push(path)
  searchQuery.value = ''
  showDropdownDesktop.value = false
  showDropdownMobile.value = false
  isMobileMenuOpen.value = false
}

const handleSearch = () => {
  if (searchResults.value.length > 0) {
    goToCategory(searchResults.value[0].path)
  } else {
    const query = searchQuery.value.trim()
    if (query) {
      alert(`Mencari: ${query}`)
    }
  }
}
</script>

<template>
  <div class="w-full sticky top-0 z-50">
    <nav class="w-full shadow-sm flex flex-col bg-white">
      <!-- Top Row Background -->
      <div class="bg-white w-full relative z-20">
        <!-- Top Row Content Constraint -->
        <div class="max-w-[1440px] mx-auto py-5 px-6 md:px-12 lg:px-16 flex items-center justify-between gap-4 w-full">
          <!-- Logo -->
          <router-link to="/" class="flex items-center text-2xl font-black tracking-widest text-black">
            KANPH
            <svg xmlns="http://www.w3.org/2000/svg" class="h-[28px] w-[24px] text-blue-600 mx-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2ZM7 4H17V17H7V4ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z" />
            </svg>
            NE
          </router-link>

          <!-- Search Bar -->
          <div class="hidden md:flex flex-1 max-w-3xl px-8 relative">
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @focus="showDropdownDesktop = true"
              @blur="showDropdownDesktop = false"
              type="text" 
              placeholder="Search products or categories (e.g. smartphone)..."
              class="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            />
            
            <!-- Dropdown Suggestions Desktop -->
            <div 
              v-if="showDropdownDesktop && searchQuery" 
              class="absolute top-full left-8 right-8 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
            >
              <div v-if="searchResults.length > 0">
                <div class="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Saran Kategori</div>
                <ul>
                  <li v-for="result in searchResults" :key="result.path">
                    <button 
                      @mousedown.prevent="goToCategory(result.path)"
                      class="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {{ result.name }}
                    </button>
                  </li>
                </ul>
              </div>
              <div v-else class="px-4 py-4 text-sm text-center text-gray-500">
                Tidak ada hasil untuk "{{ searchQuery }}"
              </div>
            </div>
          </div>

          <!-- Actions & Hamburger -->
          <div class="flex items-center gap-3 md:gap-4">
            <!-- Cart Icon -->
            <router-link to="/cart" class="text-gray-800 hover:text-black transition-colors md:mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </router-link>
            
            <!-- Auth Buttons & Profile (Hidden on mobile) -->
            <div class="hidden sm:flex items-center gap-2 md:gap-4">
              <template v-if="!authStore.isLoggedIn">
                <router-link to="/signup" class="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm text-center">
                  Sign Up
                </router-link>
                <router-link to="/signin" class="bg-white hover:bg-gray-50 text-black border border-gray-300 px-4 md:px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm text-center">
                  Sign In
                </router-link>
              </template>
              <template v-else>
                <router-link to="/profile" class="text-gray-800 hover:text-blue-600 transition-colors flex items-center gap-2 font-semibold text-[14px]">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Profile</span>
                </router-link>
              </template>
            </div>

            <!-- Hamburger Button (Mobile only) -->
            <button @click="toggleMobileMenu" class="md:hidden p-1 text-gray-800 focus:outline-none ml-1">
              <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Row (Navigation) Background - Desktop Only -->
      <div class="hidden md:block bg-[#f3f4f6] w-full">
        <!-- Bottom Row Content Constraint -->
        <div class="max-w-[1440px] mx-auto py-3.5 px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-center md:gap-1 lg:gap-4 xl:gap-8 w-full">
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            :class="[
              'md:px-2 lg:px-4 xl:px-6 py-2.5 rounded-[14px] text-[13px] lg:text-[14px] xl:text-[15px] font-semibold whitespace-nowrap transition-colors flex-shrink-0',
              isActive(link.path) 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-gray-800 hover:text-black'
            ]"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div 
        v-show="isMobileMenuOpen" 
        class="md:hidden absolute top-[100%] left-0 w-full bg-white border-t border-gray-100 shadow-lg flex flex-col z-10"
      >
        <div class="px-6 py-5 flex flex-col gap-2">
          <!-- Mobile Search -->
          <div class="mb-4 relative">
            <input 
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              @focus="showDropdownMobile = true"
              @blur="showDropdownMobile = false"
              type="text" 
              placeholder="Search products or categories..."
              class="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            
            <!-- Dropdown Suggestions Mobile -->
            <div 
              v-if="showDropdownMobile && searchQuery" 
              class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
            >
              <div v-if="searchResults.length > 0">
                <div class="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">Saran Kategori</div>
                <ul>
                  <li v-for="result in searchResults" :key="result.path">
                    <button 
                      @mousedown.prevent="goToCategory(result.path)"
                      class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {{ result.name }}
                    </button>
                  </li>
                </ul>
              </div>
              <div v-else class="px-4 py-4 text-sm text-center text-gray-500">
                Tidak ada hasil untuk "{{ searchQuery }}"
              </div>
            </div>
          </div>

          <!-- Mobile Nav Links -->
          <router-link 
            v-for="link in navLinks" 
            :key="link.path"
            :to="link.path"
            @click="isMobileMenuOpen = false"
            :class="[
              'px-5 py-3 rounded-xl text-[15px] font-semibold transition-colors',
              isActive(link.path) 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-800 hover:bg-gray-50'
            ]"
          >
            {{ link.name }}
          </router-link>
          
          <!-- Mobile Auth Buttons (visible on very small screens) -->
          <div class="sm:hidden mt-4 pt-5 border-t border-gray-100 flex gap-3">
            <router-link to="/signup" class="flex-1 bg-blue-600 text-white py-3 rounded-full text-[13px] font-semibold text-center">Sign Up</router-link>
            <router-link to="/signin" class="flex-1 border border-gray-300 text-black py-3 rounded-full text-[13px] font-semibold text-center">Sign In</router-link>
          </div>
        </div>
      </div>

    </nav>
  </div>
</template>