<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { generatePassword, calculateStrength, generateMemorablePassword, generatePIN } from '@/utils/password'
import type { PasswordOptions } from '@/types'
import { useCopy } from '@/composables/useCopy'

const props = withDefaults(defineProps<{
  feature?: string
}>(), {})

const length = ref(16)
const uppercase = ref(true)
const lowercase = ref(true)
const numbers = ref(true)
const symbols = ref(true)
const excludeAmbiguous = ref(false)
const result = ref('')
const { copy } = useCopy()
const isMemorableModel = computed(() => props.feature === 'memorable')
const isPINMode = computed(() => props.feature === 'pin')

const strength = computed(() => calculateStrength(result.value))

const options = computed<PasswordOptions>(() => ({
  length: length.value,
  uppercase: uppercase.value,
  lowercase: lowercase.value,
  numbers: numbers.value,
  symbols: symbols.value,
  excludeAmbiguous: excludeAmbiguous.value,
}))

function generate() {
  if (isMemorableModel.value) {
    result.value = generateMemorablePassword(4)
  } else if (isPINMode.value) {
    result.value = generatePIN(length.value)
  } else {
    result.value = generatePassword(options.value)
  }
}

function copyResult() {
  copy(result.value)
}

watch(length, generate, { immediate: false })

generate()
</script>

<template>
  <div class="space-y-6">
    <!-- Password Display -->
    <div class="relative">
      <div class="w-full px-4 py-4 bg-surface-hover border border-border rounded-xl text-heading font-mono text-lg sm:text-xl tracking-wider text-center break-all min-h-[3.5rem] flex items-center justify-center">
        <span v-if="result" class="select-all">{{ result }}</span>
        <span v-else class="text-ink-500 text-base font-sans tracking-normal">Click generate to create a password</span>
      </div>
      <button
        v-if="result"
        @click="copyResult"
        class="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-accent/10 text-accent text-xs font-medium rounded-lg hover:bg-accent/20 transition-colors"
      >
        Copy
      </button>
    </div>

    <!-- Strength Meter -->
    <div v-if="result && !isPINMode" class="space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="text-ink-400">Strength</span>
        <span class="font-medium" :style="{ color: strength.color }">{{ strength.label }}</span>
      </div>
      <div class="h-1.5 bg-surface-hover rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${strength.score}%`, backgroundColor: strength.color }"
        />
      </div>
    </div>

    <!-- PIN mode controls -->
    <div v-if="isPINMode" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">PIN Length: <span class="text-heading">{{ length }}</span></label>
        <input v-model.number="length" type="range" min="4" max="12" class="w-full accent-accent" />
      </div>
      <button @click="generate" class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all active:scale-[0.98]">
        Generate PIN
      </button>
    </div>

    <!-- Memorable mode controls -->
    <div v-else-if="isMemorableModel" class="space-y-4">
      <p class="text-sm text-ink-400">Generated using word-based combination for easy memorization.</p>
      <button @click="generate" class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all active:scale-[0.98]">
        Generate New
      </button>
    </div>

    <!-- Standard password controls -->
    <div v-else class="space-y-5">
      <!-- Length -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Length: <span class="text-heading font-mono">{{ length }}</span></label>
        <input v-model.number="length" type="range" min="6" max="64" class="w-full accent-accent" />
        <div class="flex justify-between text-xs text-ink-500 mt-1">
          <span>6</span>
          <span>64</span>
        </div>
      </div>

      <!-- Toggles -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-hover rounded-lg border border-border cursor-pointer hover:border-accent/20 transition-colors" :class="{ 'border-accent/30': uppercase }">
          <input v-model="uppercase" type="checkbox" class="accent-accent w-4 h-4" />
          <span class="text-sm text-ink-300">A-Z</span>
        </label>
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-hover rounded-lg border border-border cursor-pointer hover:border-accent/20 transition-colors" :class="{ 'border-accent/30': lowercase }">
          <input v-model="lowercase" type="checkbox" class="accent-accent w-4 h-4" />
          <span class="text-sm text-ink-300">a-z</span>
        </label>
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-hover rounded-lg border border-border cursor-pointer hover:border-accent/20 transition-colors" :class="{ 'border-accent/30': numbers }">
          <input v-model="numbers" type="checkbox" class="accent-accent w-4 h-4" />
          <span class="text-sm text-ink-300">0-9</span>
        </label>
        <label class="flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-hover rounded-lg border border-border cursor-pointer hover:border-accent/20 transition-colors" :class="{ 'border-accent/30': symbols }">
          <input v-model="symbols" type="checkbox" class="accent-accent w-4 h-4" />
          <span class="text-sm text-ink-300">!@#$%</span>
        </label>
      </div>

      <!-- Exclude ambiguous -->
      <label class="flex items-center gap-2.5 cursor-pointer">
        <input v-model="excludeAmbiguous" type="checkbox" class="accent-accent w-4 h-4" />
        <span class="text-sm text-ink-400">Exclude ambiguous characters (0O1lI5S2Z)</span>
      </label>

      <button
        @click="generate"
        class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.98]"
      >
        Generate Password
      </button>
    </div>
  </div>
</template>
