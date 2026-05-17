<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import ToolCard from '@/components/ToolCard.vue'
import AdUnit from '@/components/AdUnit.vue'
import { allToolRoutes } from '@/data/seoPages'
import type { ToolRoute } from '@/types'

useHead({
  title: 'LXS Tools - Free Online Utility Tools For Everyone',
  meta: [
    { name: 'description', content: 'Free online utility tools: Password Generator, IMEI Generator, Phone Number Generator and more. Fast, private, no registration required.' },
    { name: 'keywords', content: 'online tools, uuid generator, password generator, imei generator, phone number generator, random phone number, strong password' },
  ],
})

const router = useRouter()
const searchQuery = ref('')

// Group tools by type
const passwordTools = computed(() => allToolRoutes.filter(t => t.type === 'password'))
const phoneTools = computed(() => allToolRoutes.filter(t => t.type === 'phone' && !t.feature))
const phoneStateTools = computed(() => allToolRoutes.filter(t => t.type === 'phone' && t.feature))
const imeiTools = computed(() => allToolRoutes.filter(t => t.type === 'imei'))
const uuidTools = computed(() => allToolRoutes.filter(t => t.type === 'uuid'))

// Featured / popular tools (top 8)
const popularTools: ToolRoute[] = [
  { slug: 'password-generator', type: 'password', seo: { title: 'Password Generator', description: 'Generate strong passwords with strength checker', keywords: '' } },
  { slug: 'uuid-generator', type: 'uuid', seo: { title: 'UUID Generator', description: 'Generate UUID v4 and v7 online', keywords: '' } },
  { slug: 'imei-generator', type: 'imei', seo: { title: 'IMEI Generator', description: 'Generate valid IMEI numbers with Luhn checksum', keywords: '' } },
  { slug: 'imei-validator', type: 'imei', seo: { title: 'IMEI Validator', description: 'Check any IMEI number validity online', keywords: '' } },
  { slug: 'us-phone-number-generator', type: 'phone', country: 'US', seo: { title: 'US Phone Generator', description: 'Random US phone numbers with real area codes', keywords: '' } },
  { slug: 'strong-password-generator', type: 'password', feature: 'strong', seo: { title: 'Strong Password Generator', description: 'Create hack-proof secure passwords', keywords: '' } },
  { slug: 'uuid-validator', type: 'uuid', feature: 'validator', seo: { title: 'UUID Validator', description: 'Validate any UUID online', keywords: '' } },
  { slug: 'pin-code-generator', type: 'password', feature: 'pin', seo: { title: 'PIN Code Generator', description: 'Generate random PIN numbers', keywords: '' } },
]

// Search functionality
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return null
  const q = searchQuery.value.toLowerCase()
  return allToolRoutes.filter(t =>
    t.seo.title.toLowerCase().includes(q) ||
    t.seo.description.toLowerCase().includes(q) ||
    t.seo.keywords.toLowerCase().includes(q)
  ).slice(0, 12)
})

function goToTool(slug: string) {
  searchQuery.value = ''
  router.push(`/tools/${slug}`)
}

function toolIcon(type: string, slug?: string): string {
  if (slug?.includes('validator')) return '✅'
  if (slug?.includes('pin')) return '🔢'
  if (slug?.includes('memorable')) return '🧠'
  switch (type) {
    case 'password': return '🔐'
    case 'imei': return '📱'
    case 'phone': return '📞'
    case 'uuid': return '🔑'
    default: return '🔧'
  }
}

function toolTitle(t: ToolRoute): string {
  return t.seo.title.replace(/ - .*$/, '').replace(/ - LXS Tools$/, '')
}

const statItems = [
  { value: '49+', label: 'SEO Pages', desc: 'Optimized for search' },
  { value: '15', label: 'Countries', desc: 'Phone number support' },
  { value: '6', label: 'Brands', desc: 'IMEI TAC support' },
  { value: '100%', label: 'Client-side', desc: 'Zero server load' },
]
</script>

<template>
  <div>
    <!-- ===== COMPACT HERO WITH SEARCH ===== -->
    <section class="border-b border-border bg-surface-raised/20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <!-- Left: Title -->
          <div class="text-center lg:text-left lg:max-w-xl">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-xs text-accent font-medium mb-4">
              <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              100% Free &amp; Private
            </div>
            <h1 class="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-heading leading-tight mb-3">
              Free Online<br class="sm:hidden" />
              <span class="text-accent">Utility Tools</span>
            </h1>
            <p class="text-ink-300 text-base sm:text-lg leading-relaxed">
              Password generator, IMEI generator, phone number generator — all in your browser, no sign-up needed.
            </p>
          </div>

          <!-- Right: Search -->
          <div class="w-full lg:w-96 relative">
            <div class="relative">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search tools... (e.g. password, imei, phone)"
                class="w-full pl-10 pr-4 py-3 bg-surface-hover border border-border rounded-xl text-heading placeholder:text-ink-500 text-sm focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>

            <!-- Search dropdown -->
            <div
              v-if="searchResults"
              class="absolute top-full mt-2 left-0 right-0 bg-surface-raised border border-border rounded-xl shadow-2xl shadow-black/30 overflow-hidden z-50"
            >
              <div class="p-2">
                <div v-if="searchResults.length === 0" class="px-3 py-4 text-center text-sm text-ink-500">
                  No tools found for "{{ searchQuery }}"
                </div>
                <button
                  v-for="r in searchResults"
                  :key="r.slug"
                  @click="goToTool(r.slug)"
                  class="w-full text-left px-3 py-2.5 rounded-lg text-sm text-ink-300 hover:text-heading hover:bg-surface-hover flex items-center gap-3 transition-colors"
                >
                  <span class="text-base">{{ toolIcon(r.type, r.slug) }}</span>
                  <span class="font-medium">{{ toolTitle(r) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== STATS BAR ===== -->
    <section class="border-b border-border bg-surface-raised/10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div v-for="s in statItems" :key="s.label" class="text-center sm:text-left">
            <div class="font-heading text-lg font-bold text-accent">{{ s.value }}</div>
            <div class="text-xs text-ink-500">{{ s.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== POPULAR TOOLS ===== -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">Popular Tools</h2>
          <p class="text-sm text-ink-400 mt-0.5">Most used tools on LXS Tools</p>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <router-link
          v-for="t in popularTools"
          :key="t.slug"
          :to="'/tools/' + t.slug"
          class="glass-card rounded-xl px-4 py-5 text-center hover:border-accent/30 hover:-translate-y-0.5 transition-all duration-200 group"
        >
          <div class="text-2xl mb-2 group-hover:scale-110 transition-transform inline-block">{{ toolIcon(t.type, t.slug) }}</div>
          <h3 class="text-xs font-heading font-semibold text-heading leading-tight">{{ toolTitle(t) }}</h3>
        </router-link>
      </div>
    </section>

    <AdUnit />

    <!-- ===== PASSWORD GENERATORS ===== -->
    <section class="border-t border-border bg-surface-raised/20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">🔐</div>
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">Password Generators</h2>
            <p class="text-sm text-ink-400">Create strong, secure passwords for any need</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolCard
            v-for="t in passwordTools"
            :key="t.slug"
            :title="toolTitle(t)"
            :description="t.seo.description"
            :path="'/tools/' + t.slug"
            :icon="toolIcon(t.type, t.slug)"
          />
        </div>
      </div>
    </section>

    <!-- ===== IMEI TOOLS ===== -->
    <section class="border-t border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">📱</div>
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">IMEI Generators &amp; Validator</h2>
            <p class="text-sm text-ink-400">Generate valid IMEI numbers for any brand</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <ToolCard
            v-for="t in imeiTools"
            :key="t.slug"
            :title="toolTitle(t)"
            :description="t.seo.description"
            :path="'/tools/' + t.slug"
            :icon="toolIcon(t.type, t.slug)"
          />
        </div>
      </div>
    </section>

    <!-- ===== UUID GENERATORS ===== -->
    <section class="border-t border-border bg-surface-raised/10">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">🔑</div>
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">UUID Generators &amp; Validator</h2>
            <p class="text-sm text-ink-400">Generate UUID v4 and v7 identifiers</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <ToolCard
            v-for="t in uuidTools"
            :key="t.slug"
            :title="toolTitle(t)"
            :description="t.seo.description"
            :path="'/tools/' + t.slug"
            :icon="toolIcon(t.type, t.slug)"
          />
        </div>
      </div>
    </section>

    <AdUnit />

    <!-- ===== PHONE GENERATORS BY COUNTRY ===== -->
    <section class="border-t border-border bg-surface-raised/20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">📞</div>
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">Phone Number Generators by Country</h2>
            <p class="text-sm text-ink-400">Generate random phone numbers for any country</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <ToolCard
            v-for="t in phoneTools"
            :key="t.slug"
            :title="toolTitle(t)"
            :description="t.seo.description"
            :path="'/tools/' + t.slug"
            :icon="t.country === 'US' ? '🇺🇸' : t.country === 'CA' ? '🇨🇦' : t.country === 'GB' ? '🇬🇧' : t.country === 'AU' ? '🇦🇺' : t.country === 'DE' ? '🇩🇪' : t.country === 'FR' ? '🇫🇷' : t.country === 'JP' ? '🇯🇵' : t.country === 'CN' ? '🇨🇳' : t.country === 'IN' ? '🇮🇳' : t.country === 'BR' ? '🇧🇷' : t.country === 'MX' ? '🇲🇽' : t.country === 'KR' ? '🇰🇷' : '📞'"
          />
        </div>
      </div>
    </section>

    <!-- ===== US STATE PHONE GENERATORS ===== -->
    <section class="border-t border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-base">🇺🇸</div>
          <div>
            <h2 class="font-heading text-xl sm:text-2xl font-bold text-heading">US Phone Numbers by State</h2>
            <p class="text-sm text-ink-400">Generate phone numbers with real local area codes</p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          <router-link
            v-for="t in phoneStateTools"
            :key="t.slug"
            :to="'/tools/' + t.slug"
            class="px-3 py-2.5 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover border border-border/50 hover:border-accent/20 transition-all text-center"
          >
            {{ t.feature }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- ===== CTA ===== -->
    <section class="border-t border-border bg-accent/5">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 class="font-heading text-2xl sm:text-3xl font-bold text-heading mb-3">
          More Tools Coming Soon
        </h2>
        <p class="text-ink-300 max-w-xl mx-auto mb-6">
          We're building UUID generators, QR code generators, fake name generators, and more. Stay tuned!
        </p>
        <router-link to="/contact" class="inline-flex px-5 py-2.5 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all">
          Suggest a Tool
        </router-link>
      </div>
    </section>
  </div>
</template>
