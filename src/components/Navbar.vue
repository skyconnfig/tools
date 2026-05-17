<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { allToolRoutes } from '@/data/seoPages'

const router = useRouter()
const mobileOpen = ref(false)
const toolsDropdownOpen = ref(false)

const toolCategories = computed(() => [
  { label: 'Password Generators', icon: '🔐', tools: allToolRoutes.filter(t => t.type === 'password').slice(0, 6) },
  { label: 'IMEI Tools', icon: '📱', tools: allToolRoutes.filter(t => t.type === 'imei') },
  { label: 'Phone Generators', icon: '📞', tools: allToolRoutes.filter(t => t.type === 'phone').slice(0, 6) },
  { label: 'UUID Generators', icon: '🔑', tools: allToolRoutes.filter(t => t.type === 'uuid') },
])

function navigate(path: string) {
  mobileOpen.value = false
  toolsDropdownOpen.value = false
  router.push(path)
}

function toolShortTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .replace('Imei', 'IMEI')
    .replace('Pin', 'PIN')
    .replace('Us ', 'US ')
    .replace('Uk ', 'UK ')
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 group shrink-0">
          <div class="w-8 h-8 rounded-lg bg-accent flex items-center justify-center transition-transform group-hover:scale-105">
            <span class="text-surface font-heading font-bold text-sm">LX</span>
          </div>
          <span class="font-heading font-semibold text-heading text-lg">LXS Tools</span>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-1">
          <router-link to="/" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors" :class="$route.path === '/' ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">
            Home
          </router-link>

          <!-- Tools Dropdown -->
          <div class="relative" @mouseenter="toolsDropdownOpen = true" @mouseleave="toolsDropdownOpen = false">
            <button class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5" :class="$route.path.startsWith('/tools') ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">
              Tools
              <svg class="w-3.5 h-3.5 transition-transform" :class="{ 'rotate-180': toolsDropdownOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <transition
              enter-active-class="transition-all duration-150 ease-out"
              leave-active-class="transition-all duration-100 ease-in"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div v-if="toolsDropdownOpen" class="absolute top-full left-0 mt-1 w-[480px] bg-surface-raised border border-border rounded-xl shadow-xl shadow-black/5 overflow-hidden p-2">
                <!-- Browse All link -->
                <button
                  @click="navigate('/tools')"
                  class="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-accent hover:bg-surface-hover transition-colors flex items-center gap-2 mb-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  Browse All Tools
                </button>
                <div class="border-t border-border mb-1" />
                <div class="grid grid-cols-3 gap-1 p-1">
                <div v-for="cat in toolCategories" :key="cat.label" class="p-2">
                  <div class="text-xs font-heading font-semibold text-ink-400 mb-1.5 flex items-center gap-1.5">
                    <span>{{ cat.icon }}</span> {{ cat.label }}
                  </div>
                  <div class="space-y-0.5">
                    <button
                      v-for="t in cat.tools"
                      :key="t.slug"
                      @click="navigate('/tools/' + t.slug)"
                      class="w-full text-left px-2 py-1.5 rounded-md text-xs text-ink-400 hover:text-heading hover:bg-surface-hover transition-colors"
                    >
                      {{ toolShortTitle(t.slug) }}
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </transition>
          </div>

          <router-link to="/blog" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors" :class="$route.path.startsWith('/blog') ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">
            Blog
          </router-link>
          <router-link to="/about" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors" :class="$route.path === '/about' ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">
            About
          </router-link>
          <router-link to="/contact" class="px-3.5 py-2 rounded-lg text-sm font-medium transition-colors" :class="$route.path === '/contact' ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">
            Contact
          </router-link>
        </nav>

        <!-- Mobile hamburger -->
        <button class="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink-300 hover:text-heading hover:bg-surface-hover transition-colors" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
          <svg v-if="!mobileOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-150 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[32rem]"
      leave-from-class="opacity-100 max-h-[32rem]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="mobileOpen" class="md:hidden border-t border-border overflow-y-auto">
        <div class="px-4 py-3 space-y-1">
          <button @click="navigate('/')" class="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors" :class="$route.path === '/' ? 'text-accent bg-surface-hover' : 'text-ink-300 hover:text-heading hover:bg-surface-hover'">Home</button>
          <div class="text-xs font-heading font-semibold text-ink-500 px-3.5 pt-3 pb-1">Tools</div>
          <button @click="navigate('/tools')" class="w-full text-left px-3.5 py-2 rounded-lg text-xs text-accent hover:text-heading hover:bg-surface-hover transition-colors font-medium">
            🔲 Browse All Tools
          </button>
          <button v-for="t in allToolRoutes.slice(0, 10)" :key="t.slug" @click="navigate('/tools/' + t.slug)" class="w-full text-left px-3.5 py-2 rounded-lg text-xs text-ink-400 hover:text-heading hover:bg-surface-hover transition-colors">
            {{ toolShortTitle(t.slug) }}
          </button>
          <div class="border-t border-border my-1" />
          <button @click="navigate('/blog')" class="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-ink-300 hover:text-heading hover:bg-surface-hover">Blog</button>
          <button @click="navigate('/about')" class="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-ink-300 hover:text-heading hover:bg-surface-hover">About</button>
          <button @click="navigate('/contact')" class="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-ink-300 hover:text-heading hover:bg-surface-hover">Contact</button>
        </div>
      </div>
    </transition>
  </header>
</template>
