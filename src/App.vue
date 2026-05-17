<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useToast } from '@/composables/useCopy'

const { toastMessage, toastVisible } = useToast()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface bg-grid">
    <Navbar />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />

    <!-- Global Toast -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toastVisible"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-2.5 bg-accent text-white font-heading font-semibold text-sm rounded-xl shadow-lg shadow-accent/20"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>
