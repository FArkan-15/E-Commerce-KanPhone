<script setup>
import HeroSection from './components/HeroSection.vue'
import BrandList from './components/BrandList.vue'
import FeatureSection from './components/FeatureSection.vue'
import ProductSection from './components/ProductSection.vue'
</script>

<template>
  <div class="w-full overflow-x-hidden">
    
    <!-- Hero Section -->
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pt-20 mb-20 lg:mb-24">
      <HeroSection />
    </div>

    <!-- Brand List -->
    <div class="bg-[#F3F4F5] w-full py-6 lg:py-30 mb-10 lg:mb-24">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <BrandList />
      </div>
    </div>

    <!-- Product Section -->
    <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 mb-20 lg:mb-24">
      <ProductSection />
    </div>

    <!-- Feature Section -->
    <div class="bg-[#F3F4F5] w-full py-12 lg:py-16">
      <div class="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
        <FeatureSection />
      </div>
    </div>
  </div>
</template>