<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['filter-applied'])

const filters = ref({
  priceMin: null,
  priceMax: null,
  brand: [],
  ram: [],
  storage: [],
  camera: [],
  battery: [],
  network: []
})

const brands = ['Apple', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Realme', 'Asus', 'Infinix']
const rams = [
  { label: '4GB', value: '4' },
  { label: '6GB', value: '6' },
  { label: '8GB', value: '8' },
  { label: '12GB', value: '12' },
  { label: '16GB', value: '16' },
  { label: '32GB', value: '32' }
]
const storages = [
  { label: '64GB', value: '64' },
  { label: '128GB', value: '128' },
  { label: '256GB', value: '256' },
  { label: '512GB', value: '512' },
  { label: '1TB', value: '1024' }
]
const cameras = [
  { label: '12MP', value: '12 MP' },
  { label: '48MP', value: '48 MP' },
  { label: '50MP', value: '50 MP' },
  { label: '64MP', value: '64 MP' },
  { label: '108MP', value: '108 MP' },
  { label: '200MP', value: '200 MP' }
]
const batteries = [
  { label: '3000mAh', value: '3000 mAh+' },
  { label: '4000mAh', value: '4000 mAh+' },
  { label: '4500mAh', value: '4500 mAh+' },
  { label: '5000mAh', value: '5000 mAh+' },
  { label: '6000mAh', value: '6000 mAh+' }
]
const networks = [
  { label: '4G', value: '4G' },
  { label: '5G', value: '5G' }
]

watch(filters, (newVal) => {
  const activeFilters = {}
  
  if (newVal.priceMin) activeFilters.price_min = newVal.priceMin
  if (newVal.priceMax) activeFilters.price_max = newVal.priceMax
  if (newVal.brand.length > 0) activeFilters.brand = newVal.brand
  if (newVal.ram.length > 0) activeFilters.ram = newVal.ram
  if (newVal.storage.length > 0) activeFilters.storage = newVal.storage
  if (newVal.camera.length > 0) activeFilters.camera = newVal.camera
  if (newVal.battery.length > 0) activeFilters.battery = newVal.battery
  if (newVal.network.length > 0) activeFilters.network = newVal.network

  emit('filter-applied', activeFilters)
}, { deep: true })

const resetFilters = () => {
  filters.value = {
    priceMin: null,
    priceMax: null,
    brand: [],
    ram: [],
    storage: [],
    camera: [],
    battery: [],
    network: []
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

      <!-- RAM -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">RAM Capacity</h3>
        <div class="flex flex-wrap gap-2">
          <label v-for="ram in rams" :key="ram.value" class="cursor-pointer">
            <input type="checkbox" :value="ram.value" v-model="filters.ram" class="peer hidden" />
            <div class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:bg-gray-50 transition-all">
              {{ ram.label }}
            </div>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Storage -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Internal Storage</h3>
        <div class="flex flex-wrap gap-2">
          <label v-for="storage in storages" :key="storage.value" class="cursor-pointer">
            <input type="checkbox" :value="storage.value" v-model="filters.storage" class="peer hidden" />
            <div class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:bg-gray-50 transition-all">
              {{ storage.label }}
            </div>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Camera -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Main Camera</h3>
        <div class="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label v-for="camera in cameras" :key="camera.value" class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                :value="camera.value" 
                v-model="filters.camera" 
                class="peer appearance-none w-4 h-4 rounded border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer" 
              />
              <svg class="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ camera.label }}</span>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Battery -->
      <div class="mb-6">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Battery Capacity</h3>
        <div class="space-y-2.5 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
          <label v-for="battery in batteries" :key="battery.value" class="flex items-center gap-3 cursor-pointer group">
            <div class="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                :value="battery.value" 
                v-model="filters.battery" 
                class="peer appearance-none w-4 h-4 rounded border border-gray-300 checked:bg-blue-600 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer" 
              />
              <svg class="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <span class="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{{ battery.label }}</span>
          </label>
        </div>
      </div>

      <hr class="border-gray-100 my-5" />

      <!-- Network -->
      <div class="mb-2">
        <h3 class="font-semibold text-sm mb-3 text-gray-800">Network</h3>
        <div class="flex flex-wrap gap-2">
          <label v-for="network in networks" :key="network.value" class="cursor-pointer">
            <input type="checkbox" :value="network.value" v-model="filters.network" class="peer hidden" />
            <div class="px-3 py-1.5 border border-gray-200 rounded-md text-xs font-medium text-gray-600 peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 hover:bg-gray-50 transition-all">
              {{ network.label }}
            </div>
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
