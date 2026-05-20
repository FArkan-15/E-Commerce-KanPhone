/**
 * Data untuk satu slide di HeroSection carousel.
 */
export interface HeroSlide {
  id: number | string
  badge: string
  title1: string
  title1Color: string    // Tailwind class, e.g. "text-[#1c1c1c]"
  title2: string
  title2Color: string
  subtitle: string
  subtitleColor: string
  image: string          // Path ke gambar, e.g. "/src/assets/images/tecno.png"
  imageClass?: string    // Tailwind class untuk object-position
}
