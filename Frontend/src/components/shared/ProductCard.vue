<template>
  <div @click="goToDetail" class="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow cursor-pointer border border-gray-100 group">
    
    <!-- Image Container -->
    <div class="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-800 mb-5">
      <img 
        :src="product.image || '/src/assets/images/phantom.png'" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        alt="Product"
      />
      <!-- Discount Badge (only shown when discount exists) -->
      <div 
        v-if="product.discount" 
        class="absolute top-4 left-4 bg-[#8b3a17] text-white text-[9px] font-bold tracking-wider px-2 py-1 rounded-[4px] z-10"
      >
        {{ formatDiscount(product.discount) }}% OFF
      </div>
    </div>

    <!-- Content -->
    <div class="px-1">
      <p v-if="product.brand" class="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-1.5">
        {{ product.brand }}
      </p>
      
      <h3 class="text-[15px] font-bold text-gray-900 leading-tight mb-4">
        {{ product.name || 'Phantom X2 Pro' }}
      </h3>

      <div class="flex flex-col">
        <!-- Main price: show discounted_price if discount exists, otherwise show price -->
        <p class="text-[#8b3a17] text-[17px] font-black tracking-tight">
          Rp {{ formatPrice(product.discount ? product.discounted_price : product.price) }}
        </p>
        <!-- Original price with strikethrough (only shown when discount exists) -->
        <p v-if="product.discount" class="text-[11px] text-gray-400 line-through mt-0.5 font-medium">
          Rp {{ formatPrice(product.price) }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  product: {
    type: Object,
    default: () => ({})
  }
})

const router = useRouter()

const goToDetail = () => {
  const slug = props.product.slug || (props.product.name ? props.product.name.toLowerCase().replace(/\s+/g, '-') : 'tecno-camon-40')
  router.push(`/product/${slug}`)
}

const formatPrice = (value) => {
  if (!value) return "0"
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const formatDiscount = (value) => {
  if (!value) return "0"
  // Remove trailing zeros (e.g. 20.00 → 20, 12.50 → 12.5)
  return parseFloat(value)
}
</script>