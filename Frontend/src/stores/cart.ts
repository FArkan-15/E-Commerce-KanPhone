// Fungsinya:

// menyimpan produk yang dimasukkan ke keranjang
// menghitung total item
// menghitung total harga
// update quantity
// hapus item
// menyimpan cart ke localStorage supaya tidak hilang saat refresh

// Jadi ini pusat logic keranjang belanja.


import { defineStore } from 'pinia'

/**
 * Store untuk mengelola keranjang belanja (shopping cart).
 * Menangani penambahan produk, penghapusan, pembaruan kuantitas,
 * serta penghitungan total item dan total harga.
 * Data keranjang disimpan secara otomatis di localStorage agar tidak hilang saat refresh.
 */
export const useCartStore = defineStore('cart', {
  state: () => ({
    // Inisialisasi daftar item dari localStorage jika tersedia
    items: JSON.parse(localStorage.getItem('cart_items') || '[]')
  }),
  getters: {
    // Menghitung total seluruh jumlah (quantity) produk di keranjang
    totalItems: (state) => state.items.reduce((total, item) => total + item.quantity, 0),
    // Menghitung total harga seluruh produk di keranjang
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },
  actions: {
    /**
     * Menambahkan produk ke dalam keranjang.
     * Jika produk sudah ada, kuantitasnya akan ditambah.
     * Jika produk baru, akan dimasukkan sebagai item baru.
     */
    addToCart(product: any, quantity: number, selectedColor: any = null) {
      const existingItem = this.items.find(
        (item: any) => item.product.id === product.id && 
        (selectedColor ? item.selectedColor?.color === selectedColor.color : true)
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        // Menentukan harga efektif berdasarkan diskon atau promo
        let price = product.price
        if (product.effective_price) {
          price = product.effective_price
        } else if (product.discounted_price) {
          price = product.discounted_price
        } else if (product.discount) {
          price = product.price - (product.price * (product.discount / 100))
        }
        
        this.items.push({
          id: Date.now().toString(),
          product,
          quantity,
          selectedColor,
          price
        })
      }
      this.saveCart()
    },
    /**
     * Menghapus item dari keranjang berdasarkan ID item.
     */
    removeFromCart(itemId: string) {
      this.items = this.items.filter((item: any) => item.id !== itemId)
      this.saveCart()
    },
    /**
     * Memperbarui jumlah (kuantitas) untuk item tertentu di keranjang.
     */
    updateQuantity(itemId: string, quantity: number) {
      const item = this.items.find((item: any) => item.id === itemId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
      this.saveCart()
    },
    /**
     * Menyimpan keadaan keranjang saat ini ke dalam localStorage.
     */
    saveCart() {
      localStorage.setItem('cart_items', JSON.stringify(this.items))
    }
  }
})

