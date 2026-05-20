<script setup>
// SuccessView.vue
</script>

<template>
  <div class="min-h-[75vh] flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
    <div class="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 max-w-md w-full text-center">
      
      <!-- Success Icon -->
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 class="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
      <p class="text-gray-500 mb-8 text-[15px]">
        Thank you for your purchase. Your order is currently being processed and will be shipped soon.
      </p>

      <div class="space-y-3">
        <router-link 
          to="/" 
          class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Back to Home
        </router-link>
        
        <router-link 
          to="/promo" 
          class="block w-full bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 font-bold py-3.5 rounded-xl transition-colors shadow-sm"
        >
          Continue Shopping
        </router-link>
      </div>

    </div>
  </div>
</template>
