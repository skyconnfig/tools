<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { allToolRoutes, phoneStatePages } from '@/data/seoPages'
import { countries } from '@/data/countries'
import ToolLayout from '@/components/ToolLayout.vue'
import PhoneGenerator from '@/tools/phone/PhoneGenerator.vue'
import IMEIGenerator from '@/tools/imei/IMEIGenerator.vue'
import PasswordGenerator from '@/tools/password/PasswordGenerator.vue'
import UUIDGenerator from '@/tools/uuid/UUIDGenerator.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const toolData = computed(() => allToolRoutes.find(t => t.slug === slug.value))

const seo = computed(() => toolData.value?.seo || {
  title: 'Tool Not Found - LXS Tools',
  description: 'The requested tool page could not be found.',
  keywords: '',
})

useHead({
  title: computed(() => seo.value.title),
  meta: computed(() => [
    { name: 'description', content: seo.value.description },
    { name: 'keywords', content: seo.value.keywords },
    { property: 'og:title', content: seo.value.title },
    { property: 'og:description', content: seo.value.description },
  ]),
})

const toolComponent = computed(() => {
  if (!toolData.value) return null
  switch (toolData.value.type) {
    case 'phone': return PhoneGenerator
    case 'imei': return IMEIGenerator
    case 'password': return PasswordGenerator
    case 'uuid': return UUIDGenerator
    default: return null
  }
})

// Same-type tools (exclude current)
const sameTypeTools = computed(() =>
  allToolRoutes.filter(t => t.type === toolData.value?.type && t.slug !== slug.value)
)

// Country name lookup
const countryName = computed(() => {
  if (!toolData.value?.country) return ''
  const c = countries.find(c => c.code === toolData.value?.country)
  return c ? c.name : ''
})

// Related state pages (for US phone)
const relatedStatePages = computed(() => {
  if (toolData.value?.type !== 'phone' || toolData.value?.country !== 'US') return []
  if (toolData.value?.feature) {
    // Show other states
    return phoneStatePages.filter(p => p.feature !== toolData.value?.feature).slice(0, 20)
  }
  // Show all state pages
  return phoneStatePages.slice(0, 30)
})

function toolTitle(t: { slug: string; seo: { title: string } }): string {
  return t.seo.title.replace(/ - (LXS Tools|Random|Online).*$/, '').replace(/ - .*$/, '')
}

function toolIcon(type: string): string {
  switch (type) {
    case 'password': return '🔐'
    case 'imei': return '📱'
    case 'phone': return '📞'
    case 'uuid': return '🔑'
    default: return '🔧'
  }
}

// SEO content per type
const faqContent = computed(() => {
  const data = toolData.value
  if (!data) return null

  switch (data.type) {
    case 'phone': {
      const cn = countryName.value || 'phone'
      return {
        what: `A ${cn} phone number generator creates random but realistic phone numbers for ${cn}. These numbers follow the correct numbering plan and format used in ${cn}, making them ideal for testing and development.`,
        how: `Our ${cn} phone number generator uses real area codes and follows the telecommunications numbering plan of ${cn}. For US numbers, it generates valid 10-digit numbers with real area codes mapped to specific states like California, New York, and Texas.`,
        when: `${cn} phone number generators are useful for software testing, form validation, development environments, and any scenario where you need realistic phone numbers without using real personal data.`,
        faqs: [
          { q: `Are these ${cn} phone numbers real?`, a: `No, these are randomly generated numbers that follow ${cn} phone number format rules but are not assigned to any real person or device.` },
          { q: `Can I use these ${cn} numbers for SMS verification?`, a: `No, these numbers are for testing and development purposes only. They cannot receive calls or SMS messages.` },
          { q: 'Do you store generated numbers?', a: 'No. All generation happens locally in your browser. We do not store or track any generated numbers.' },
          { q: 'What formats are available?', a: 'You can choose from international format (+1 XXX-XXX-XXXX), national, dots, or hyphens format.' },
        ],
      }
    }
    case 'imei': {
      const brand = data.brand || 'mobile'
      const isValidator = data.feature === 'validator'
      if (isValidator) {
        return {
          what: 'An IMEI validator checks whether a given 15-digit IMEI number is structurally valid using the Luhn checksum algorithm. It can also identify the device brand from the TAC code.',
          how: 'Our IMEI validator takes a 15-digit IMEI number and validates it using the Luhn algorithm. The last digit of the IMEI is a checksum that must match the calculated value. It also looks up the TAC (first 8 digits) to identify the manufacturer.',
          when: 'Use the IMEI validator when you need to check if an IMEI number is valid, identify the brand of a device from its IMEI, or verify IMEI numbers in inventory systems.',
          faqs: [
            { q: 'What makes an IMEI valid?', a: 'A valid IMEI is 15 digits long with the last digit being a correct Luhn checksum of the first 14 digits.' },
            { q: 'Can you identify the phone model from IMEI?', a: 'We can identify the brand (manufacturer) from the TAC code, but not the specific model.' },
            { q: 'Is this IMEI checker accurate?', a: 'Yes, the Luhn algorithm validation is mathematically precise. However, a valid checksum does not mean the IMEI belongs to a real device.' },
          ],
        }
      }
      return {
        what: `A ${brand} IMEI generator creates valid 15-digit IMEI numbers with correct TAC (Type Allocation Code) prefixes for ${brand} devices. Each IMEI passes Luhn checksum validation.`,
        how: `Our ${brand} IMEI generator uses real TAC codes assigned to ${brand} and generates the remaining digits with a valid Luhn checksum. This ensures every generated IMEI is structurally valid.`,
        when: `${brand} IMEI generators are used for development testing, QA, inventory management systems, and educational purposes related to mobile telecommunications.`,
        faqs: [
          { q: `What is a valid ${brand} IMEI?`, a: `A valid ${brand} IMEI starts with ${brand}'s TAC codes and passes Luhn checksum validation. Our generator produces numbers meeting both criteria.` },
          { q: `Can I use generated ${brand} IMEIs for device registration?`, a: 'No, generated IMEIs are for testing only. Real devices have unique, manufacturer-assigned IMEIs.' },
          { q: 'What is a TAC code?', a: 'TAC (Type Allocation Code) is the first 8 digits of an IMEI that identify the device model and manufacturer.' },
        ],
      }
    }
    case 'password': {
      const isStrong = data.feature === 'strong'
      const isMemorable = data.feature === 'memorable'
      const isPIN = data.feature === 'pin'
      const isSecure = data.feature === 'secure'

      if (isPIN) {
        return {
          what: 'A PIN code generator creates random numeric PIN codes of any length. PINs are commonly used for ATM cards, SIM cards, door codes, and device lock screens.',
          how: 'Our PIN generator creates truly random numeric sequences using high-quality randomization. You can customize the length from 4 to 12 digits.',
          when: 'Use a PIN generator when you need secure numeric codes for testing, temporary access, or any application requiring numeric-only credentials.',
          faqs: [
            { q: 'What PIN length is most secure?', a: 'For most purposes, 6-digit PINs provide a good balance of security and usability. For higher security, use 8+ digits.' },
            { q: 'Are longer PINs always better?', a: 'Yes, each additional digit multiplies the number of possible combinations by 10, making brute-force attacks exponentially harder.' },
          ],
        }
      }
      if (isMemorable) {
        return {
          what: 'A memorable password generator creates passwords that are easy to remember but still secure, using word-based combinations.',
          how: 'Our generator selects random words from a curated dictionary and joins them with hyphens, adding numbers for extra security. The result is a password that is both memorable and strong.',
          when: 'Use memorable passwords for accounts you need to remember without a password manager, or for situations where you need to share temporary credentials verbally.',
          faqs: [
            { q: 'Are word-based passwords secure?', a: 'Yes, a 4-word password with numbers added provides excellent security while being much easier to remember than random characters.' },
            { q: 'How many words should I use?', a: 'We recommend 4 words for a good balance of security and memorability. Each additional word significantly increases strength.' },
          ],
        }
      }
      return {
        what: `A${isStrong ? ' strong' : isSecure ? ' secure' : ''} password generator creates${isStrong ? ' extra-strong' : isSecure ? ' highly secure' : ''} random passwords that are resistant to guessing and brute-force attacks.${isStrong ? ' It enforces maximum security settings.' : ''}`,
        how: 'Our generator uses cryptographically-inspired randomization to select characters from your chosen character sets (uppercase, lowercase, numbers, symbols). The strength meter evaluates real-world password security factors like length, character diversity, and pattern avoidance.',
        when: 'Use a password generator whenever you need to create a new account, update an existing password, or generate secure credentials for APIs, databases, or other systems.',
        faqs: [
          { q: 'How strong should my password be?', a: 'We recommend at least 16 characters with a mix of uppercase, lowercase, numbers, and symbols. Aim for "Strong" or "Very Strong" on our strength meter.' },
          { q: 'Should I use a password manager?', a: 'Yes! Password managers securely store your generated passwords and auto-fill them, so you only need to remember one master password.' },
          { q: 'Are these passwords truly random?', a: 'The passwords are generated using high-quality randomization. For maximum security, the generation happens entirely in your browser.' },
          { q: `What makes a ${isStrong ? 'strong' : 'secure'} password?`, a: `A ${isStrong ? 'strong' : 'secure'} password is long (16+ characters), uses multiple character types, and contains no dictionary words or predictable patterns.` },
        ],
      }
    }
    case 'uuid': {
      const isV7 = data.feature === 'v7'
      const isValidator = data.feature === 'validator'
      if (isValidator) {
        return {
          what: 'A UUID validator checks if a given string is a valid UUID and identifies its version (v4, v7, etc.). It verifies the format and the correct version/variant bits.',
          how: 'Our UUID validator parses the input string, strips formatting characters, checks for exactly 32 hex characters, and reads the version nibble to identify the UUID version.',
          when: 'Use the UUID validator when you need to verify UUID format in your data, debug UUID-related issues, or check which version a UUID belongs to.',
          faqs: [
            { q: 'What makes a UUID valid?', a: 'A valid UUID is a 128-bit value formatted as 8-4-4-4-12 hex digits (36 characters with hyphens). It must have correct version and variant bits.' },
            { q: 'What UUID versions exist?', a: 'Common versions include v1 (time-based), v3/v5 (name-based), v4 (random), and v7 (time-ordered). Our tool supports validating all versions.' },
          ],
        }
      }
      return {
        what: `A UUID${isV7 ? ' v7' : ' v4'} generator creates ${isV7 ? 'time-ordered UUID v7 identifiers based on the Unix timestamp' : 'random UUID v4 identifiers with 122 random bits'}. UUIDs are 128-bit universally unique identifiers.`,
        how: `Our UUID${isV7 ? ' v7' : ' v4'} generator uses cryptographically strong random numbers${isV7 ? ' combined with the current Unix timestamp' : ''} and properly sets the version and variant bits according to RFC 9562.`,
        when: `Use a UUID${isV7 ? ' v7' : ' v4'} generator when you need unique identifiers for database keys, API resources, distributed systems, or any scenario requiring collision-resistant IDs.${isV7 ? ' UUID v7 is particularly useful for time-ordered database indexing.' : ''}`,
        faqs: [
          { q: `What is UUID ${isV7 ? 'v7' : 'v4'}?`, a: `UUID ${isV7 ? 'v7 is a time-ordered UUID that combines a Unix timestamp with random bits, making it sortable by creation time' : 'v4 is a randomly generated UUID with 122 bits of entropy, offering approximately 5.3 × 10^36 possible values'}.` },
          { q: 'Are UUIDs truly unique?', a: 'While not guaranteed, the probability of collision in UUID v4 is extremely low — about 1 in 5.3 × 10^36. For practical purposes, they are considered unique.' },
          { q: 'What is the difference between v4 and v7?', a: 'UUID v4 is fully random, while UUID v7 is time-prefixed. v7 values are sortable by generation time, making them better for database indexes.' },
        ],
      }
    }
    default: return null
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
    <!-- 404 -->
    <div v-if="!toolData" class="text-center py-20">
      <h1 class="font-heading text-3xl font-bold text-heading mb-4">Tool Not Found</h1>
      <p class="text-ink-400 mb-6">The tool page you're looking for doesn't exist.</p>
      <router-link to="/" class="text-accent hover:text-accent-hover transition-colors">Go back home</router-link>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- ===== MAIN ===== -->
      <div class="lg:col-span-2">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm text-ink-500 mb-6">
          <router-link to="/" class="hover:text-accent transition-colors">Home</router-link>
          <span class="text-ink-700">/</span>
          <router-link to="/" class="hover:text-accent transition-colors">Tools</router-link>
          <span class="text-ink-700">/</span>
          <span class="text-ink-300">{{ toolData.type === 'password' ? 'Password' : toolData.type === 'imei' ? 'IMEI' : 'Phone' }}</span>
          <span class="text-ink-700">/</span>
          <span class="text-accent truncate max-w-[200px]">{{ toolData.seo.title.replace(/ - .*$/, '') }}</span>
        </nav>

        <ToolLayout
          :title="toolData.seo.title.replace(/ - (LXS Tools|Online).*$/, '')"
          :description="toolData.seo.description"
        >
          <component :is="toolComponent" v-bind="toolData" />
        </ToolLayout>

        <!-- SEO Content -->
        <div v-if="faqContent" class="max-w-3xl mx-auto mt-10 space-y-10">
          <section>
            <h2 class="font-heading text-xl font-semibold text-heading mb-3">What Is This Tool?</h2>
            <p class="text-ink-300 leading-relaxed">{{ faqContent.what }}</p>
          </section>

          <section>
            <h2 class="font-heading text-xl font-semibold text-heading mb-3">How Does It Work?</h2>
            <p class="text-ink-300 leading-relaxed">{{ faqContent.how }}</p>
          </section>

          <section>
            <h2 class="font-heading text-xl font-semibold text-heading mb-3">When Should You Use It?</h2>
            <p class="text-ink-300 leading-relaxed">{{ faqContent.when }}</p>
          </section>

          <!-- FAQ -->
          <section>
            <h2 class="font-heading text-xl font-semibold text-heading mb-4">Frequently Asked Questions</h2>
            <div class="space-y-2">
              <details
                v-for="(faq, i) in faqContent.faqs"
                :key="i"
                class="group glass-card rounded-xl overflow-hidden"
              >
                <summary class="px-5 py-3.5 cursor-pointer text-heading font-medium text-sm hover:bg-surface-hover transition-colors list-none flex items-center justify-between">
                  {{ faq.q }}
                  <svg class="w-4 h-4 text-ink-500 group-open:rotate-180 transition-transform shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div class="px-5 pb-4">
                  <p class="text-sm text-ink-400 leading-relaxed">{{ faq.a }}</p>
                </div>
              </details>
            </div>
          </section>
        </div>
      </div>

      <!-- ===== SIDEBAR ===== -->
      <aside class="lg:col-span-1 space-y-5">
        <!-- Same category tools -->
        <div class="glass-card rounded-xl p-5">
          <h3 class="font-heading font-semibold text-sm text-heading mb-3 flex items-center gap-2">
            <span>{{ toolIcon(toolData.type) }}</span>
            <span>Related {{ toolData.type === 'password' ? 'Password' : toolData.type === 'imei' ? 'IMEI' : toolData.type === 'uuid' ? 'UUID' : 'Phone' }} Tools</span>
          </h3>
          <div class="space-y-1">
            <router-link
              v-for="t in sameTypeTools.slice(0, 10)"
              :key="t.slug"
              :to="'/tools/' + t.slug"
              class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all"
            >
              {{ toolTitle(t) }}
            </router-link>
          </div>
          <p v-if="sameTypeTools.length > 10" class="text-xs text-ink-600 mt-2 px-3">
            +{{ sameTypeTools.length - 10 }} more tools in this category
          </p>
        </div>

        <!-- US State pages (for phone tools) -->
        <div v-if="toolData.type === 'phone' && toolData.country === 'US'" class="glass-card rounded-xl p-5">
          <h3 class="font-heading font-semibold text-sm text-heading mb-3">US Phone Numbers by State</h3>
          <div class="grid grid-cols-2 gap-1">
            <router-link
              v-for="t in relatedStatePages"
              :key="t.slug"
              :to="'/tools/' + t.slug"
              class="px-2.5 py-1.5 rounded-md text-xs text-ink-400 hover:text-accent hover:bg-surface-hover transition-colors truncate"
            >
              {{ t.feature }}
            </router-link>
          </div>
        </div>

        <!-- Brand pages (for IMEI tools) -->
        <div v-if="toolData.type === 'imei' && toolData.feature !== 'validator'" class="glass-card rounded-xl p-5">
          <h3 class="font-heading font-semibold text-sm text-heading mb-3">IMEI by Brand</h3>
          <div class="space-y-1">
            <router-link
              v-for="t in allToolRoutes.filter(t => t.type === 'imei' && t.brand && t.slug !== slug)"
              :key="t.slug"
              :to="'/tools/' + t.slug"
              class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all"
            >
              {{ t.brand }} IMEI Generator
            </router-link>
            <router-link to="/tools/imei-validator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">
              IMEI Validator
            </router-link>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="glass-card rounded-xl p-5">
          <h3 class="font-heading font-semibold text-sm text-heading mb-2">Popular Tools</h3>
          <div class="space-y-1">
            <router-link to="/tools/password-generator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">🔐 Password Generator</router-link>
            <router-link to="/tools/imei-generator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">📱 IMEI Generator</router-link>
            <router-link to="/tools/strong-password-generator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">🛡️ Strong Password Generator</router-link>
            <router-link to="/tools/imei-validator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">✅ IMEI Validator</router-link>
            <router-link to="/tools/us-phone-number-generator" class="block px-3 py-2 rounded-lg text-sm text-ink-400 hover:text-accent hover:bg-surface-hover transition-all">📞 US Phone Generator</router-link>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
