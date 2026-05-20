<script setup>
const brands = [
  { name: 'TECNO', image: '/src/assets/images/b-tecno.png' },
  { name: 'Xiaomi', image: '/src/assets/images/b-xiaomi.png' },
  { name: 'Oppo', image: '/src/assets/images/b-oppo.png' },
  { name: 'Vivo', image: '/src/assets/images/b-vivo.jpg' },
  { name: 'Asus', image: '/src/assets/images/b-asus.png' },
  { name: 'iPhone', image: '/src/assets/images/b-apple.png' }
]
</script>

<template>
  <div class="py-8 text-center flex flex-col items-center">
    <!-- Title -->
    <div class="mb-10 flex flex-col items-center">
      <h2 class="font-bold text-[17px] text-black pb-1.5 border-b-[2.5px] border-black px-4">
        Featured Brands
      </h2>
    </div>

    <!-- Logos -->
    <div class="flex justify-center gap-4 md:gap-6 flex-wrap max-w-[1200px] w-full px-4">
      <div 
        v-for="(brand, index) in brands" 
        :key="index"
        class="bg-white w-[110px] h-[85px] md:w-[160px] md:h-[150px] rounded-[24px] flex items-center justify-center p-2 hover:shadow-md transition-shadow cursor-pointer"
      >
        <img 
          :src="brand.image" 
          :alt="brand.name"
          class="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  </div>
</template>