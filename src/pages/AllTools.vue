<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import PasswordGenerator from '@/tools/password/PasswordGenerator.vue'
import IMEIGenerator from '@/tools/imei/IMEIGenerator.vue'
import PhoneGenerator from '@/tools/phone/PhoneGenerator.vue'
import UUIDGenerator from '@/tools/uuid/UUIDGenerator.vue'
import AdUnit from '@/components/AdUnit.vue'

useHead({
  title: 'All Tools - LXS Tools',
  meta: [
    { name: 'description', content: 'All free online utility tools in one place: Password Generator, IMEI Generator, Phone Number Generator, and UUID Generator. Choose from 40+ tools.' },
  ],
})

type ToolTab = 'password' | 'imei' | 'phone' | 'uuid'

const activeTab = ref<ToolTab>('password')

const tabs = [
  { id: 'password' as ToolTab, icon: '🔐', label: 'Password', desc: 'Strong passwords & PIN codes', count: 6 },
  { id: 'imei' as ToolTab, icon: '📱', label: 'IMEI', desc: 'Valid IMEI numbers & validator', count: 8 },
  { id: 'phone' as ToolTab, icon: '📞', label: 'Phone', desc: 'Random phone numbers by country', count: 22 },
  { id: 'uuid' as ToolTab, icon: '🔑', label: 'UUID', desc: 'UUID v4/v7 generator & validator', count: 4 },
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-3">
        All Tools
      </h1>
      <p class="text-ink-300 max-w-2xl mx-auto text-base sm:text-lg">
        Choose from our collection of free online utility tools. Pick a category below and start using the tool instantly — no sign-up, no server uploads, just your browser.
      </p>
    </div>

    <!-- Tab Bar -->
    <div class="sticky top-16 z-40 -mx-4 px-4 sm:static sm:mx-0 sm:px-0 bg-surface/90 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none pb-3 sm:pb-0 sm:mb-0">
      <div class="flex gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-200 whitespace-nowrap shrink-0"
          :class="activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'bg-surface-raised border border-border text-ink-400 hover:text-heading hover:border-accent/30 hover:shadow-sm'"
        >
          <span class="text-lg leading-none">{{ tab.icon }}</span>
          <span>{{ tab.label }}</span>
          <span
            class="text-[11px] px-1.5 py-0.5 rounded-full font-medium"
            :class="activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-surface-hover text-ink-500'"
          >{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- Tool Content -->
    <div class="glass-card rounded-xl p-5 sm:p-8 mt-4 sm:mt-6">
      <!-- ===== PASSWORD ===== -->
      <div v-show="activeTab === 'password'">
        <div class="mb-6 pb-5 border-b border-border">
          <h2 class="font-heading text-xl font-semibold text-heading mb-1 flex items-center gap-2">
            <span>🔐</span> Password Generator
          </h2>
          <p class="text-sm text-ink-400">Generate strong, secure passwords with customizable character options. Switch to PIN or memorable mode for specific needs.</p>
        </div>
        <PasswordGenerator />
      </div>

      <!-- ===== IMEI ===== -->
      <div v-show="activeTab === 'imei'">
        <div class="mb-6 pb-5 border-b border-border">
          <h2 class="font-heading text-xl font-semibold text-heading mb-1 flex items-center gap-2">
            <span>📱</span> IMEI Generator &amp; Validator
          </h2>
          <p class="text-sm text-ink-400">Generate valid IMEI numbers with correct TAC codes for any brand, or validate existing IMEI numbers instantly.</p>
        </div>

        <h3 class="font-heading font-semibold text-heading text-sm mb-3 flex items-center gap-1.5">
          <span class="text-accent">▸</span> Validate an IMEI
        </h3>
        <IMEIGenerator feature="validator" />

        <hr class="border-border my-6" />

        <h3 class="font-heading font-semibold text-heading text-sm mb-3 flex items-center gap-1.5">
          <span class="text-accent">▸</span> Generate IMEI Numbers
        </h3>
        <IMEIGenerator />
      </div>

      <!-- ===== PHONE ===== -->
      <div v-show="activeTab === 'phone'">
        <div class="mb-6 pb-5 border-b border-border">
          <h2 class="font-heading text-xl font-semibold text-heading mb-1 flex items-center gap-2">
            <span>📞</span> Phone Number Generator
          </h2>
          <p class="text-sm text-ink-400">Generate random phone numbers for 12+ countries with real area codes. Supports international, national, dots, and hyphens format.</p>
        </div>
        <PhoneGenerator />
      </div>

      <!-- ===== UUID ===== -->
      <div v-show="activeTab === 'uuid'">
        <div class="mb-6 pb-5 border-b border-border">
          <h2 class="font-heading text-xl font-semibold text-heading mb-1 flex items-center gap-2">
            <span>🔑</span> UUID Generator &amp; Validator
          </h2>
          <p class="text-sm text-ink-400">Generate UUID v4 (random) and v7 (time-ordered) identifiers. Supports standard, no-hyphens, braced, and URN formats.</p>
        </div>
        <UUIDGenerator />
      </div>
    </div>

    <AdUnit />

    <!-- Bottom CTA -->
    <div class="text-center mt-8 text-sm text-ink-400">
      All tools run 100% client-side.
      <router-link to="/contact" class="text-accent hover:text-accent-hover transition-colors">Suggest a tool</router-link>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
