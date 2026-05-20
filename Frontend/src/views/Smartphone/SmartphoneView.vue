<script setup>
import { ref } from 'vue'
import FilterSidebar from './components/FilterSidebar.vue'
import ProductGrid from './components/ProductGrid.vue'
import SmartphoneBanner from './components/SmartphoneBanner.vue'

const activeFilters = ref({})

const handleFilterApplied = (filters) => {
  activeFilters.value = filters
  console.log('Filters applied:', activeFilters.value)
}
</script>

<template>
  <div class="w-full min-h-screen pb-20">
    <!-- Banner Section Component -->
    <SmartphoneBanner />

    <!-- Main Content Area -->
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 py-8">
      
      <!-- Breadcrumb -->
      <nav class="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <router-link to="/" class="hover:text-blue-600 transition-colors">Home</router-link>
        <span>/</span>
        <span class="text-gray-900 font-medium">Smartphone</span>
      </nav>

      <div class="flex flex-col md:flex-row gap-6 lg:gap-8 items-start">
      
        <!-- Filters Sidebar Component -->
      <FilterSidebar @filter-applied="handleFilterApplied" />

      <!-- Product Listing Component -->
      <ProductGrid :filters="activeFilters" />

      </div>

    </div>
  </div>
</template>
