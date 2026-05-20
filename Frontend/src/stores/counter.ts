import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * Store contoh sederhana untuk demonstrasi state management Pinia.
 * Menggunakan "Setup Store" syntax (menggunakan ref dan computed).
 */
export const useCounterStore = defineStore('counter', () => {
  // State: Variabel reaktif untuk menyimpan nilai hitungan
  const count = ref(0)
  
  // Getter: Nilai turunan yang dihitung secara otomatis (computed)
  const doubleCount = computed(() => count.value * 2)
  
  // Action: Fungsi untuk mengubah state
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

