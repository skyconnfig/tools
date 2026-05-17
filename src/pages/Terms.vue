<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'Terms of Service - LXS Tools',
  meta: [
    { name: 'description', content: 'LXS Tools terms of service. By using our tools, you agree to these terms and conditions.' },
  ],
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-6">Terms of Service</h1>
    <p class="text-ink-400 text-sm mb-8">Last updated: January 2025</p>

    <div class="space-y-6 text-ink-300 leading-relaxed">
      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Acceptance of Terms</h2>
      <p>
        By using LXS Tools, you agree to these terms of service. If you do not agree, please do not use our tools.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Use of Tools</h2>
      <p>
        All tools provided on this website are for <strong>legal and ethical purposes only</strong>. You agree not to use our tools for:
      </p>
      <ul class="list-disc pl-6 space-y-1">
        <li>Any illegal activity or fraud</li>
        <li>Harassment or malicious purposes</li>
        <li>Circumventing security measures</li>
        <li>Generating data for deceptive purposes</li>
      </ul>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Disclaimer</h2>
      <p>
        Our tools are provided "as is" without any warranty. We make no guarantees about the accuracy or suitability of generated data for any particular purpose. Generated data should not be used as real, production, or sensitive information.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Limitation of Liability</h2>
      <p>
        LXS Tools shall not be liable for any damages arising from the use or inability to use our tools.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-6 mb-2">Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
      </p>
    </div>
  </div>
</template>
