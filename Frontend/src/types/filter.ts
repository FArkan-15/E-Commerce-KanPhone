/**
 * Filter umum yang dipakai di semua halaman kategori.
 * Setiap kategori meng-extend base filter ini.
 */
export interface BaseFilter {
  price_min?: number
  price_max?: number
  brand?: string[]
}

/**
 * Filter khusus halaman Smartphone.
 */
export interface SmartphoneFilter extends BaseFilter {
  ram?: string[]        // e.g. ["4", "8", "12"]
  storage?: string[]    // e.g. ["128", "256"]
  camera?: string[]     // e.g. ["50 MP", "108 MP"]
  battery?: string[]    // e.g. ["5000 mAh+"]
  network?: string[]    // e.g. ["4G", "5G"]
}

/**
 * Filter khusus halaman Smartwatch.
 */
export interface SmartwatchFilter extends BaseFilter {
  features?: string[]      // e.g. ["Heart Rate Monitor", "GPS"]
  waterproof?: number      // 1 = yes, 0 = no
  compatibility?: string[] // e.g. ["android", "iphone"]
}

/**
 * Filter khusus halaman Audio.
 */
export interface AudioFilter extends BaseFilter {
  type?: string[]          // e.g. ["tws", "headphone", "iem"]
  wireless?: number        // 1 = wireless, 0 = wired
}

/**
 * Filter khusus halaman Camera.
 */
export interface CameraFilter extends BaseFilter {
  type?: string[]          // e.g. ["dslr", "mirrorless"]
  video?: string[]         // e.g. ["4K", "8K"]
  wireless?: number        // 1 = wireless, 0 = wired
}

/**
 * Filter khusus halaman Console.
 */
export interface ConsoleFilter extends BaseFilter {
  type?: string[]          // e.g. ["controller", "console"]
}

/**
 * Union type untuk semua jenis filter.
 */
export type ProductFilter =
  | SmartphoneFilter
  | SmartwatchFilter
  | AudioFilter
  | CameraFilter
  | ConsoleFilter
  | BaseFilter
