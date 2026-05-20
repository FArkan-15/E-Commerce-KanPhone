import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home/HomeView.vue'
import Promo from '@/views/Promo/PromoView.vue'
import AccessoriesView from '@/views/Accessories/AccessoriesView.vue'
import SmartphoneView from '@/views/Smartphone/SmartphoneView.vue'
import SmartwatchView from '@/views/Smartwatch/SmartwatchView.vue'
import ConsoleView from '@/views/Console/ConsoleView.vue'
import AudioView from '@/views/Audio/AudioView.vue'
import CameraView from '@/views/Camera/CameraView.vue'
import SignUpView from '@/views/Auth/SignUpView.vue'
import SignInView from '@/views/Auth/SignInView.vue'
import ProductDetailView from '@/views/Product/ProductDetailView.vue'
import CartView from '@/views/Cart/CartView.vue'
import ProfileView from '@/views/Profile/ProfileView.vue'
import CheckoutView from '@/views/Checkout/CheckoutView.vue'
import SuccessView from '@/views/Checkout/SuccessView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView,
    },
    {
      path: '/checkout/success',
      name: 'success',
      component: SuccessView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/promo',
      name: 'promo',
      component: Promo,
    },
    {
      path: '/accessories',
      name: 'accessories',
      component: AccessoriesView,
    },
    {
      path: '/smartphone',
      name: 'smartphone',
      component: SmartphoneView,
    },
    {
      path: '/smartwatch',
      name: 'smartwatch',
      component: SmartwatchView,
    },
    {
      path: '/console',
      name: 'console',
      component: ConsoleView,
    },
    {
      path: '/audio',
      name: 'audio',
      component: AudioView,
    },
    {
      path: '/camera',
      name: 'camera',
      component: CameraView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/product/:slug',
      name: 'product-detail',
      component: ProductDetailView,
    },
  ],
})

export default router