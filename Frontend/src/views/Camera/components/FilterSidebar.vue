<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter-applied'])

const filters = ref({
  priceMin: null,
  priceMax: null,
  brand: [],
  type: [],
  connectivity: [],
  video: []
})

const brands = ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic', 'Lumix']
const types = [
  { label: 'DSLR', value: 'dslr' },
  { label: 'Mirrorless', value: 'mirrorless' }
]
const videoResolutions = [
  { label: 'HD', value: 'hd' },
  { label: 'Full HD', value: 'fhd' },
  { label: '4K', value: '4K' },
  { label: '8K', value: '8K' }
]

watch(filters, (newVal) => {
  const activeFilters = {}
  
  if (newVal.priceMin) activeFilters.price_min = newVal.priceMin
  if (newVal.priceMax) activeFilters.price_max = newVal.priceMax
  if (newVal.brand.length > 0) activeFilters.brand = newVal.brand
  if (newVal.type.length > 0) activeFilters.type = newVal.type
  if (newVal.video.length > 0) activeFilters.video = newVal.video
  
  if (newVal.connectivity.length === 1) {
    activeFilters.wireless = newVal.connectivity[0] === 'wireless' ? 1 : 0
  }

  emit('filter-applied', activeFilters)
}, { deep: true })

const resetFilters = () => {
  filters.value = {
    priceMin: null,
    priceMax: null,
    brand: [],
    type: [],
    connectivity: [],
    video: []
  }
}
</script>

<template>
  <div class="w-full md:w-[260px] lg:w-[280px] flex-shrink-0">
    <div class="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-bold text-gray-900">Filter</h2>
        <button 
          @click="resetFilters" 
          class="text-xs font-semibold text-blue-600 hover:text-blue-800"
        >
          Reset
        </button>
      </div>

      <!-- Price -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Price</h3>
        <div class="flex items-center gap-2">
          <div class="relative w-full">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rp</span>
            <input 
              v-model="filters.priceMin" 
              type="number" 
              placeholder="Min" 
              class="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
            />
          </div>
          <span class="text-gray-400 font-medium">-</span>
          <div class="relative w-full">
            <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rp</span>
            <input 
              v-model="filters.priceMax" 
              type="number" 
              placeholder="Max" 
              class="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" 
            />
          </div>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Brand -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Brand</h3>
        <div class="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label v-for="brand in brands" :key="brand" class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                :value="brand" 
                v-model="filters.brand" 
                class="peer appearance-none w-4 h-4 rounded border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer" 
              />
              <svg class="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ brand }}</span>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Type -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Type</h3>
        <div class="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label v-for="type in types" :key="type.value" class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                :value="type.value" 
                v-model="filters.type" 
                class="peer appearance-none w-4 h-4 rounded border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer" 
              />
              <svg class="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ type.label }}</span>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Video Resolution -->
      <div class="mb-2">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Video</h3>
        <div class="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label v-for="vid in videoResolutions" :key="vid.value" class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                :value="vid.value" 
                v-model="filters.video" 
                class="peer appearance-none w-4 h-4 rounded border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer" 
              />
              <svg class="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ vid.label }}</span>
          </label>
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
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}
</style>
