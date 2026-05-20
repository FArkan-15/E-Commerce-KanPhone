<script setup>
import { useRoute } from 'vue-router'
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()
</script>

<template>
  <Navbar v-if="!['signup', 'signin'].includes(route.name)" />

  <router-view />

  <Footer v-if="!['signup', 'signin'].includes(route.name)" />
</template>