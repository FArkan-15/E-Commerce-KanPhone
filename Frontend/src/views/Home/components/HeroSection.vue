<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const slides = [
  {
    id: 1,
    badge: 'NEW ARRIVAL',
    title1: 'Camon 40',
    title1Color: 'text-[#1c1c1c]',
    title2: 'Pro Ultra',
    title2Color: 'text-[#1044a6]',
    subtitle: 'Upgrade Your Style with the Latest Tech',
    subtitleColor: 'text-[#4b5563]',
    image: '/src/assets/images/tecno.png',
    imageClass: 'object-right md:object-center'
  },
  {
    id: 2,
    badge: 'NEW ARRIVAL',
    title1: 'iQOO',
    title1Color: 'text-[#1c1c1c]',
    title2: 'Neo Series',
    title2Color: 'text-[#ff0000]',
    subtitle: 'Power Meets Speed',
    subtitleColor: 'text-[#6b7280]',
    image: '/src/assets/images/iqoo.png',
    imageClass: 'object-right md:object-center'
  },
  {
    id: 3,
    badge: 'NEW ARRIVAL',
    title1: 'Infinix',
    title1Color: 'text-white',
    title2: 'Note 50 Pro',
    title2Color: 'text-[#d4ff00]',
    subtitle: 'Stylish. Powerful. Ready for You.',
    subtitleColor: 'text-gray-200',
    image: '/src/assets/images/infinix.png',
    imageClass: 'object-right md:object-[center_20%]'
  }
]

// Clone slide pertama di akhir untuk efek infinite loop
const displaySlides = computed(() => [...slides, { ...slides[0], id: 'clone' }])

const currentSlide = ref(0)
const isTransitioning = ref(true)
let intervalId = null

// Index indicator yang aktif (modulo supaya clone tetap highlight dot pertama)
const activeIndicator = computed(() => currentSlide.value % slides.length)

const nextSlide = () => {
  isTransitioning.value = true
  currentSlide.value++
}

// Setelah animasi selesai, kalau sudah di clone → snap ke slide asli tanpa animasi
const handleTransitionEnd = () => {
  if (currentSlide.value >= slides.length) {
    isTransitioning.value = false
    currentSlide.value = 0
  }
}

const setSlide = (index) => {
  isTransitioning.value = true
  currentSlide.value = index
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="relative w-full h-[380px] md:h-[450px] rounded-[24px] overflow-hidden group shadow-sm bg-gray-100">
    <!-- Slides Wrapper -->
    <div 
      class="flex h-full"
      :class="isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      @transitionend="handleTransitionEnd"
    >
      <div 
        v-for="(slide, index) in displaySlides" 
        :key="slide.id + '-' + index"
        class="relative w-full h-full flex-shrink-0 flex items-center p-10 md:p-16 lg:p-24"
      >
        <!-- Background Image -->
        <img 
          :src="slide.image" 
          class="absolute inset-0 w-full h-full object-cover z-0"
          :class="slide.imageClass || 'object-right md:object-center'"
          alt="Carousel Background"
        />

        <!-- Content -->
        <div class="z-10 relative max-w-xl">
          <div class="bg-[#0e4194] text-white text-[11px] font-bold tracking-widest px-3 py-1.5 rounded-full w-max uppercase mb-5 shadow-sm">
            {{ slide.badge }}
          </div>
          <h1 class="text-6xl md:text-[80px] font-black tracking-tight leading-[1.05] mb-1" :class="slide.title1Color">
            {{ slide.title1 }}
          </h1>
          <h2 class="text-6xl md:text-[80px] font-black tracking-tight leading-[1.05]" :class="slide.title2Color">
            {{ slide.title2 }}
          </h2>
          <p class="text-lg md:text-xl font-medium mt-6" :class="slide.subtitleColor">
            {{ slide.subtitle }}
          </p>
        </div>
      </div>
    </div>

    <!-- Indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      <button 
        v-for="(_, index) in slides" 
        :key="index"
        @click="setSlide(index)"
        class="h-1.5 rounded-full transition-all duration-300"
        :class="activeIndicator === index ? 'w-10 bg-blue-600 shadow-md' : 'w-2.5 bg-gray-300 hover:bg-gray-400'"
        aria-label="Change Slide"
      ></button>
    </div>
  </div>
</template>