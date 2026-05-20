<template>
  <div class="px-4 py-4 md:px-8 max-w-[1440px] mx-auto">
    <nav class="w-full rounded-[24px] shadow-sm border border-gray-100 overflow-hidden flex flex-col bg-white">
      <!-- Top Row -->
      <div class="bg-white py-5 px-6 md:px-10 flex items-center justify-between gap-6 w-full">
        <!-- Logo -->
        <router-link to="/" class="flex items-center text-2xl font-black tracking-widest text-black">
          <span>KANPH</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-[18px] h-[28px] text-blue-600 mx-[2px] mb-[2px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2ZM7 4H17V17H7V4ZM12 20C11.4477 20 11 19.5523 11 19C11 18.4477 11.4477 18 12 18C12.5523 18 13 18.4477 13 19C13 19.5523 12.5523 20 12 20Z" />
          </svg>
          <span>NE</span>
        </router-link>

        <!-- Search Bar -->
        <div class="hidden md:flex flex-1 max-w-3xl px-8">
          <input 
            type="text" 
            class="w-full border border-gray-200 rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
          />
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button class="text-gray-800 hover:text-black transition-colors mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm">
            Daftar
          </button>
          <button class="bg-white hover:bg-gray-50 text-black border border-gray-300 px-6 py-2.5 rounded-full text-[13px] font-semibold transition-colors shadow-sm">
            Masuk
          </button>
        </div>
      </div>

      <!-- Bottom Row (Navigation) -->
      <div class="bg-[#f3f4f6] py-3.5 px-6 md:px-10 flex items-center justify-start md:justify-center gap-8 md:gap-12 overflow-x-auto w-full">
        <router-link to="/" class="bg-black text-white px-6 py-2.5 rounded-[14px] text-[15px] font-semibold whitespace-nowrap shadow-sm">
          Beranda
        </router-link>
        <router-link to="/promo" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Promo
        </router-link>
        <router-link to="/handphone" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Handphone
        </router-link>
        <router-link to="/aksesoris" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Aksesoris
        </router-link>
        <router-link to="/smartwatch" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Smartwatch
        </router-link>
        <router-link to="/console" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Console
        </router-link>
        <router-link to="/audio" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Audio
        </router-link>
        <router-link to="/kamera" class="text-gray-800 hover:text-black text-[15px] font-semibold whitespace-nowrap transition-colors">
          Kamera
        </router-link>
      </div>
    </nav>
  </div>
</template>