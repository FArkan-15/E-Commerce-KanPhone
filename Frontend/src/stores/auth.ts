import { defineStore } from 'pinia'

/**
 * Store untuk mengelola status autentikasi pengguna.
 * Menangani token JWT, data profil pengguna, serta proses login dan logout.
 * Data disimpan secara persisten menggunakan localStorage.
 */
export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Mengambil token dari localStorage jika ada, jika tidak set null
    token: localStorage.getItem('user_token') || null,
    // Mengambil data user dari localStorage dan mengubahnya kembali menjadi objek JSON
    user: JSON.parse(localStorage.getItem('user_data') || 'null')
  }),
  getters: {
    // Mengecek apakah pengguna sudah login berdasarkan keberadaan token
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    /**
     * Menyimpan data login ke dalam state dan localStorage.
     * @param data Objek yang berisi token dan informasi user
     */
    login(data: any) {
      this.token = data?.token || 'dummy_token_123'
      this.user = data?.user || { name: 'User', email: data?.email || 'user@example.com' }
      localStorage.setItem('user_token', this.token as string)
      localStorage.setItem('user_data', JSON.stringify(this.user))
    },
    /**
     * Menghapus semua data autentikasi dari state dan localStorage (logout).
     */
    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_data')
    }
  }
})

