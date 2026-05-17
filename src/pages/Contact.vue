<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Contact Us - LXS Tools',
  meta: [
    { name: 'description', content: 'Get in touch with the LXS Tools team. Send us your feedback, suggestions, or report issues.' },
  ],
})

const name = ref('')
const email = ref('')
const message = ref('')
const sent = ref(false)

function submit() {
  if (!name.value || !email.value || !message.value) return
  window.location.href = `mailto:support@lxs.best?subject=Contact from ${encodeURIComponent(name.value)}&body=${encodeURIComponent(message.value)}`
  sent.value = true
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-6">Contact Us</h1>
    <p class="text-ink-300 mb-8">Have feedback, suggestions, or found a bug? We'd love to hear from you.</p>

    <div v-if="sent" class="glass-card rounded-xl p-8 text-center">
      <p class="text-heading font-medium text-lg mb-2">Message Sent!</p>
      <p class="text-ink-400">Your email client should open. If not, please email us directly at support@lxs.best.</p>
    </div>

    <form v-else @submit.prevent="submit" class="glass-card rounded-xl p-6 sm:p-8 space-y-5">
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Name</label>
        <input v-model="name" required class="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 transition-colors" placeholder="Your name" />
      </div>
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Email</label>
        <input v-model="email" type="email" required class="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 transition-colors" placeholder="your@email.com" />
      </div>
      <div>
        <label class="block text-sm font-medium text-ink-300 mb-1.5">Message</label>
        <textarea v-model="message" required rows="5" class="w-full px-4 py-2.5 bg-surface-hover border border-border rounded-lg text-heading text-sm focus:outline-none focus:border-accent/50 transition-colors resize-y" placeholder="Your message..." />
      </div>
      <button type="submit" class="px-6 py-3 bg-accent text-surface font-heading font-semibold rounded-lg hover:bg-accent-hover transition-all">
        Send Message
      </button>
    </form>
  </div>
</template>
