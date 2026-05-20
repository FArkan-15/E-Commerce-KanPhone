<script setup>
import { ref } from 'vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductGrid from './components/ProductGrid.vue'

const activeFilters = ref({})

const handleFilterChange = (newFilters) => {
  activeFilters.value = newFilters
}
</script>

<template>
  <div class="min-h-screen pb-20 pt-8 w-full">
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
      
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <router-link to="/" class="hover:text-blue-600 transition-colors">Home</router-link>
        <span>/</span>
        <span class="text-gray-900 font-medium">Promo</span>
      </nav>

      <div class="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
        
        <!-- Sidebar Filter (Desktop: fixed width, Mobile: full width) -->
        <div class="w-full md:w-[260px] lg:w-[280px] flex-shrink-0">
          <FilterSidebar @filter-change="handleFilterChange" />
        </div>

        <!-- Product Grid -->
        <ProductGrid :filters="activeFilters" />
        
      </div>
    </div>
  </div>
</template>