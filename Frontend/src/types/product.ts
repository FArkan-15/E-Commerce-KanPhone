/**
 * Representasi warna dan stok per varian produk.
 * Digunakan di ProductDetailView untuk pilihan warna & info stok.
 */
export interface ColorStock {
  color: string          // Kode warna hex, e.g. "#000000"
  color_name?: string    // Nama warna, e.g. "Midnight Black"
  name?: string          // Alias nama warna (fallback)
  stock: number          // Jumlah stok tersedia untuk warna ini
}

/**
 * Data produk utama yang dikembalikan dari API /products.
 * Mencakup semua field dari berbagai kategori
 * (Handphone, Smartwatch, Audio, Camera, Console, Accessories).
 */
export interface Product {
  // === Identitas Produk ===
  id: number
  name: string
  slug: string
  description?: string
  image?: string          // URL gambar produk utama
  brand?: string
  model?: string
  category?: string       // Nama kategori, e.g. "Handphone"
  category_slug?: string  // Slug kategori, e.g. "handphone"
  category_id?: number

  // === Harga & Diskon ===
  price: number
  final_price?: number
  discounted_price?: number
  discount?: number       // Persentase diskon, e.g. 20 = 20%

  // === Varian Warna & Stok ===
  colors_and_stocks?: ColorStock[]

  // === Spesifikasi Handphone ===
  ram?: number            // Dalam GB, e.g. 8
  storage?: number        // Dalam GB, e.g. 256
  network?: string        // e.g. "4G", "5G"
  os?: string             // e.g. "Android 15"
  processor?: string      // e.g. "Snapdragon 8 Gen 2"
  screen_size?: string    // e.g. "6.7 inch"
  display_type?: string   // e.g. "AMOLED, 120HZ"
  resolution?: string     // e.g. "1080 x 2400"
  camera?: string         // Kamera belakang
  front_camera?: string   // Kamera depan
  audio?: string          // e.g. "Stereo Speakers"
  sensors?: string        // e.g. "Fingerprint, Gyroscope, Accelerometer"
  sensor?: string         // Alias (fallback singular)
  battery?: string        // e.g. "5000 mAh"
  charging?: string       // e.g. "33W Fast Charging"
  weight?: string         // e.g. "185g"

  // === Spesifikasi Smartwatch ===
  features?: string[]     // e.g. ["Heart Rate Monitor", "GPS"]
  waterproof?: boolean    // Tahan air
  compatibility?: string  // e.g. "android", "iphone", "universal"

  // === Spesifikasi Audio ===
  type?: string           // e.g. "tws", "headphone", "iem"
  wireless?: boolean      // Wireless atau tidak
  connectivity?: string   // e.g. "wireless", "wired"

  // === Spesifikasi Camera ===
  video?: string          // Resolusi video, e.g. "4K"
}

/**
 * Response standar dari API yang membungkus array produk.
 */
export interface ProductListResponse {
  data: Product[]
  total?: number
  per_page?: number
  current_page?: number
  last_page?: number
}

/**
 * Response API untuk single product.
 */
export interface ProductDetailResponse {
  data: Product
}
