<script setup lang="ts">
import { ref } from 'vue'
import { countries, usStates } from '@/data/countries'
import { generatePhones } from '@/utils/phone'
import { useCopy } from '@/composables/useCopy'

const props = withDefaults(defineProps<{
  country?: string
  feature?: string
}>(), {})

const { copy } = useCopy()

const selectedCountry = ref(props.country || 'US')
const selectedState = ref(usStates.includes(props.feature || '') ? (props.feature || '') : '')
const count = ref(5)
const format = ref<'international' | 'national' | 'dots' | 'hyphens'>('international')
const results = ref<string[]>([])

const showStatePicker = selectedCountry.value === 'US'

function generate() {
  results.value = generatePhones({
    country: selectedCountry.value,
    count: count.value,
    format: format.value,
  })
}

function copyAll() {
  copy(results.value.join('\n'))
}

function copySingle(text: string) {
  copy(text)
}

generate()
</script>

<template>
  <div class="space-y-6">
    <!-- Controls -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Country -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Country</label>
        <select
          v-model="selectedCountry"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option v-for="c in countries" :key="c.code" :value="c.code">
            {{ c.flag }} {{ c.name }} (+{{ c.dialCode }})
          </option>
        </select>
      </div>

      <!-- State (US only) -->
      <div v-if="showStatePicker">
        <label class="block text-sm font-medium text-ink-300 mb-1.5">State (optional)</label>
        <select
          v-model="selectedState"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="">Any State</option>
          <option v-for="s in usStates" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <!-- Count -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Count</label>
        <input
          v-model.number="count"
          type="number"
          min="1"
          max="50"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
        />
      </div>

      <!-- Format -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Format</label>
        <select
          v-model="format"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="international">International (+1 XXX)</option>
          <option value="national">National (XXXXXXXXXX)</option>
          <option value="dots">Dots (XXX.XXX.XXXX)</option>
          <option value="hyphens">Hyphens (XXX-XXX-XXXX)</option>
        </select>
      </div>
    </div>

    <!-- Generate button -->
    <button
      @click="generate"
      class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.98]"
    >
      Generate Phone Numbers
    </button>

    <!-- Results -->
    <div v-if="results.length" class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs text-ink-500">{{ results.length }} numbers generated</span>
        <button
          @click="copyAll"
          class="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Copy All
        </button>
      </div>
      <div class="space-y-1.5">
        <div
          v-for="(num, i) in results"
          :key="i"
          class="fade-in group flex items-center justify-between px-4 py-3 bg-surface-hover/50 rounded-lg border border-border hover:border-accent/20 transition-all"
          :style="{ animationDelay: `${i * 50}ms` }"
        >
          <code class="font-mono text-sm text-heading">{{ num }}</code>
          <button
            @click="copySingle(num)"
            class="opacity-0 group-hover:opacity-100 text-xs text-ink-400 hover:text-accent transition-all px-2 py-1 rounded hover:bg-surface-hover"
            title="Copy"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
