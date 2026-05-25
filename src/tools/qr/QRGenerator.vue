<script setup lang="ts">
import { ref } from 'vue'
import QRCode from 'qrcode'

const inputText = ref('')
const errorCorrection = ref<'L' | 'M' | 'Q' | 'H'>('M')
const qrSize = ref(256)
const qrDataUrl = ref('')
const generated = ref(false)

async function generate() {
  const text = inputText.value.trim()
  if (!text) return

  try {
    qrDataUrl.value = await QRCode.toDataURL(text, {
      width: qrSize.value,
      margin: 2,
      color: {
        dark: '#1a1410',
        light: '#ffffff',
      },
      errorCorrectionLevel: errorCorrection.value,
    })
    generated.value = true
  } catch (err) {
    console.error('QR generation failed:', err)
  }
}

function download() {
  if (!qrDataUrl.value) return
  const link = document.createElement('a')
  link.download = `qrcode-${Date.now()}.png`
  link.href = qrDataUrl.value
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    generate()
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Input -->
    <div>
      <label class="block text-sm font-medium text-ink-300 mb-1.5">
        Text or URL
      </label>
      <textarea
        v-model="inputText"
        placeholder="Enter text or URL to generate QR code..."
        rows="4"
        class="w-full px-4 py-3 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors resize-y font-mono"
        @keydown="handleKeydown"
      />
      <p class="text-xs text-ink-500 mt-1.5">
        Press Ctrl+Enter (or Cmd+Enter) to generate
      </p>
    </div>

    <!-- Options -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Error Correction -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Error Correction</label>
        <select
          v-model="errorCorrection"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option value="L">Low (L) — ~7% recovery</option>
          <option value="M">Medium (M) — ~15% recovery</option>
          <option value="Q">Quartile (Q) — ~25% recovery</option>
          <option value="H">High (H) — ~30% recovery</option>
        </select>
      </div>

      <!-- Size -->
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Size (pixels)</label>
        <select
          v-model.number="qrSize"
          class="w-full px-3.5 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-colors appearance-none cursor-pointer"
        >
          <option :value="128">128 x 128</option>
          <option :value="256">256 x 256</option>
          <option :value="512">512 x 512</option>
          <option :value="1024">1024 x 1024</option>
        </select>
      </div>
    </div>

    <!-- Generate Button -->
    <button
      @click="generate"
      :disabled="!inputText.trim()"
      class="w-full sm:w-auto px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 active:scale-[0.98]"
    >
      Generate QR Code
    </button>

    <!-- QR Code Display -->
    <div v-if="generated" class="space-y-4">
      <hr class="border-border" />
      <div class="flex flex-col items-center gap-4">
        <div class="glass-card rounded-xl p-6 inline-flex">
          <img
            :src="qrDataUrl"
            :width="qrSize"
            :height="qrSize"
            alt="Generated QR Code"
            class="rounded-lg"
          />
        </div>

        <button
          @click="download"
          class="inline-flex items-center gap-2 px-5 py-2.5 bg-surface-hover border border-border text-heading font-heading font-semibold rounded-lg hover:bg-ink-800 transition-all text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download PNG
        </button>

        <p class="text-xs text-ink-500 text-center">
          QR code generated from: <span class="font-mono text-heading break-all">{{ inputText }}</span>
        </p>
      </div>
    </div>

    <!-- Info Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">4</div>
        <div class="text-xs text-ink-500 mt-0.5">Error correction levels</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">7,089</div>
        <div class="text-xs text-ink-500 mt-0.5">Max numeric chars</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">2,953</div>
        <div class="text-xs text-ink-500 mt-0.5">Max bytes</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">PNG</div>
        <div class="text-xs text-ink-500 mt-0.5">Download format</div>
      </div>
    </div>
  </div>
</template>
