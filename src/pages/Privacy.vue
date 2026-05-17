<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Privacy Policy - LXS Tools',
  meta: [
    { name: 'description', content: 'LXS Tools privacy policy. We are committed to protecting your privacy. No data collection, no tracking, no cookies.' },
  ],
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-6">Privacy Policy</h1>
    <p class="text-ink-400 text-sm mb-8">Last updated: January 2025</p>

    <div class="space-y-6 text-ink-300 leading-relaxed">
      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Our Commitment to Privacy</h2>
      <p>
        At LXS Tools, we take your privacy seriously. Our core principle is simple: <strong>we do not collect any personal data.</strong>
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Data Collection</h2>
      <p>
        We do not collect, store, or process any personal information. All tool processing happens entirely in your browser using client-side JavaScript. No data is transmitted to any server.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Cookies</h2>
      <p>
        We do not use tracking cookies, analytics cookies, or any form of user tracking. We may use essential cookies required for the basic functioning of the website (such as session management), but no personal data is stored.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Third-Party Services</h2>
      <p>
        We do not embed third-party tracking scripts, analytics services, or advertising networks that collect personal data. Our website is designed to be privacy-first.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. Any changes will be posted on this page.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Contact</h2>
      <p>
        If you have any questions about this privacy policy, please <router-link to="/contact" class="text-accent hover:text-accent-hover">contact us</router-link>.
      </p>
    </div>
  </div>
</template>
