<script setup lang="ts">
import { ref } from 'vue'
import { generateUUIDs, validateUUID, uuidVersion } from '@/utils/uuid'
import { useCopy } from '@/composables/useCopy'
import type { UUIDVersion, UUIDCase, UUIDFormat } from '@/utils/uuid'

const { copy } = useCopy()

const count = ref(5)
const version = ref<UUIDVersion>('v4')
const format = ref<UUIDFormat>('standard')
const ucase = ref<UUIDCase>('lower')
const results = ref<string[]>([])

// Validator
const validatorInput = ref('')
const validationResult = ref<{ valid: boolean; version: number | null } | null>(null)

function generate() {
  results.value = generateUUIDs(count.value, version.value, format.value, ucase.value)
}

function copyAll() {
  copy(results.value.join('\n'))
}

function copySingle(text: string) {
  copy(text)
}

function validate() {
  const valid = validateUUID(validatorInput.value)
  const ver = valid ? uuidVersion(validatorInput.value) : null
  validationResult.value = { valid, version: ver }
}

generate()
</script>

<template>
  <div class="space-y-6">
    <!-- ===== Controls ===== -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <!-- Version -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Version</label>
        <select
          v-model="version"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="v4">UUID v4 (Random)</option>
          <option value="v7">UUID v7 (Time-based)</option>
        </select>
      </div>

      <!-- Format -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Format</label>
        <select
          v-model="format"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="standard">xxxxxxxx-xxxx-xxxx</option>
          <option value="nohyphens">xxxxxxxxxxxxxxxx</option>
          <option value="braced">{xxxxxxxx-xxxx}</option>
          <option value="urn">urn:uuid:xxxx-xxxx</option>
        </select>
      </div>

      <!-- Case -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Case</label>
        <select
          v-model="ucase"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="lower">Lowercase</option>
          <option value="upper">UPPERCASE</option>
        </select>
      </div>

      <!-- Count -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Count</label>
        <input
          v-model.number="count"
          type="number"
          min="1"
          max="100"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors"
        />
      </div>
    </div>

    <!-- Generate -->
    <button
      @click="generate"
      class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all duration-200 active:scale-[0.98]"
    >
      Generate UUIDs
    </button>

    <!-- ===== Results ===== -->
    <div v-if="results.length" class="space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs text-ink-500">{{ results.length }} UUIDs generated</span>
        <button
          @click="copyAll"
          class="text-xs text-accent hover:text-accent-hover transition-colors font-medium"
        >
          Copy All
        </button>
      </div>
      <div class="space-y-1.5">
        <div
          v-for="(uuid, i) in results"
          :key="i"
          class="fade-in group flex items-center justify-between px-4 py-3 bg-surface-hover/50 rounded-lg border border-border hover:border-accent/20 transition-all"
          :style="{ animationDelay: `${i * 50}ms` }"
        >
          <code class="font-mono text-xs sm:text-sm text-heading break-all pr-2 select-all">{{ uuid }}</code>
          <button
            @click="copySingle(uuid)"
            class="shrink-0 opacity-0 group-hover:opacity-100 text-xs text-ink-400 hover:text-accent transition-all px-2 py-1 rounded hover:bg-surface-hover"
            title="Copy"
          >
            Copy
          </button>
        </div>
      </div>
    </div>

    <!-- ===== Divider ===== -->
    <hr class="border-border my-6" />

    <!-- ===== UUID Validator ===== -->
    <div>
      <h3 class="font-heading font-semibold text-heading text-base mb-3">UUID Validator</h3>
      <div class="flex gap-3">
        <input
          v-model="validatorInput"
          placeholder="Paste a UUID to validate..."
          class="flex-1 px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm font-mono focus:outline-none focus:border-accent/50 transition-colors"
          @keyup.enter="validate"
        />
        <button
          @click="validate"
          class="px-5 py-2.5 bg-surface-hover border border-border text-heading font-heading font-semibold rounded-lg hover:bg-ink-800 transition-all whitespace-nowrap text-sm"
        >
          Validate
        </button>
      </div>

      <div
        v-if="validationResult"
        class="mt-3 px-4 py-3 rounded-lg border text-sm"
        :class="validationResult.valid ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' : 'bg-red-500/5 border-red-500/20 text-red-400'"
      >
        <span class="font-medium">{{ validationResult.valid ? 'Valid UUID' : 'Invalid UUID' }}</span>
        <span v-if="validationResult.version" class="text-ink-400 ml-2">— UUID v{{ validationResult.version }}</span>
      </div>
    </div>

    <!-- ===== UUID Info ===== -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">1 × 10{{ '¹' }}⁸</div>
        <div class="text-xs text-ink-500 mt-0.5">v4 possible values</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">122</div>
        <div class="text-xs text-ink-500 mt-0.5">Random bits (v4)</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">v4 / v7</div>
        <div class="text-xs text-ink-500 mt-0.5">Versions supported</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">4</div>
        <div class="text-xs text-ink-500 mt-0.5">Format variants</div>
      </div>
    </div>
  </div>
</template>
