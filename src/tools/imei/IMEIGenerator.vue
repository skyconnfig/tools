<script setup lang="ts">
import { ref, computed } from 'vue'
import { generateIMEIs, validateIMEI, getIMEIBrands, identifyBrand } from '@/utils/imei'
import { useCopy } from '@/composables/useCopy'

const props = withDefaults(defineProps<{
  brand?: string
  feature?: string
}>(), {})

const selectedBrand = ref(props.brand || '')
const count = ref(5)
const results = ref<string[]>([])
const validatorInput = ref('')
const validationResult = ref<{ valid: boolean; brand: string | null } | null>(null)

const { copy } = useCopy()

const brands = getIMEIBrands()
const isValidatorMode = computed(() => props.feature === 'validator')

function generate() {
  results.value = generateIMEIs(selectedBrand.value || undefined, count.value)
}

function copyAll() {
  copy(results.value.join('\n'))
}

function copySingle(text: string) {
  copy(text)
}

function validate() {
  const cleaned = validatorInput.value.replace(/\D/g, '')
  const valid = validateIMEI(cleaned)
  const brand = valid ? identifyBrand(cleaned) : null
  validationResult.value = { valid, brand }
}

generate()
</script>

<template>
  <div class="space-y-6">
    <!-- Validator Mode -->
    <div v-if="isValidatorMode">
      <label class="block text-sm font-medium text-ink-300 mb-2">Enter IMEI Number</label>
      <div class="flex gap-3">
        <input
          v-model="validatorInput"
          placeholder="Enter 15-digit IMEI number..."
          maxlength="15"
          class="flex-1 px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm font-mono focus:outline-none focus:border-accent/50 transition-colors"
          @keyup.enter="validate"
        />
        <button
          @click="validate"
          class="px-6 py-2.5 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all whitespace-nowrap"
        >
          Validate
        </button>
      </div>

      <div v-if="validationResult" class="mt-4 p-4 rounded-lg border" :class="validationResult.valid ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'">
        <div class="flex items-center gap-2">
          <span class="text-lg">{{ validationResult.valid ? '✅' : '❌' }}</span>
          <span class="font-medium" :class="validationResult.valid ? 'text-emerald-400' : 'text-red-400'">
            {{ validationResult.valid ? 'Valid IMEI Number' : 'Invalid IMEI Number' }}
          </span>
        </div>
        <p v-if="validationResult.brand" class="text-sm text-ink-400 mt-1">
          Brand: {{ validationResult.brand }}
        </p>
      </div>

      <hr class="border-border my-6" />
    </div>

    <!-- Generator Controls -->
    <div v-if="!isValidatorMode">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-ink-300 mb-1.5">Brand</label>
          <select
            v-model="selectedBrand"
            class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
          >
            <option value="">Generic / Random</option>
            <option v-for="b in brands" :key="b" :value="b">{{ b }}</option>
          </select>
        </div>

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
      </div>

      <button
        @click="generate"
        class="mt-4 w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.98]"
      >
        Generate IMEI Numbers
      </button>

      <!-- Results -->
      <div v-if="results.length" class="mt-6 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs text-ink-500">{{ results.length }} IMEI numbers generated</span>
          <button @click="copyAll" class="text-xs text-accent hover:text-accent-hover transition-colors font-medium">Copy All</button>
        </div>
        <div class="space-y-1.5">
          <div
            v-for="(imei, i) in results"
            :key="i"
            class="fade-in group flex items-center justify-between px-4 py-3 bg-surface-hover/50 rounded-lg border border-border hover:border-accent/20 transition-all"
            :style="{ animationDelay: `${i * 50}ms` }"
          >
            <code class="font-mono text-sm text-heading">{{ imei }}</code>
            <button
              @click="copySingle(imei)"
              class="opacity-0 group-hover:opacity-100 text-xs text-ink-400 hover:text-accent transition-all px-2 py-1 rounded hover:bg-surface-hover"
            >Copy</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
