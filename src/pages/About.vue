<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'About Us - LXS Tools',
  meta: [
    { name: 'description', content: 'Learn about LXS Tools — our mission to provide free, privacy-focused online utility tools for everyone.' },
  ],
})
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-6">About LXS Tools</h1>

    <div class="space-y-6 text-ink-300 leading-relaxed">
      <p>
        LXS Tools is a collection of free, privacy-focused online utility tools designed to help developers, testers, and everyday users accomplish common tasks quickly and efficiently.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-8 mb-3">Our Mission</h2>
      <p>
        We believe that essential online tools should be free, fast, and private. Every tool on this platform runs entirely in your browser — no data is sent to any server, no tracking cookies are used, and no personal information is collected.
      </p>

      <h2 class="font-heading text-xl font-semibold text-heading mt-8 mb-3">Why We Built This</h2>
      <p>
        Most online tool sites are cluttered with ads, slow loading times, and questionable privacy practices. We built LXS Tools to be different:
      </p>
      <ul class="list-disc pl-6 space-y-2">
        <li><strong>Client-side only</strong> — all processing happens in your browser</li>
        <li><strong>No registration</strong> — just open and use</li>
        <li><strong>No limits</strong> — generate as many results as you need</li>
        <li><strong>Fast by design</strong> — minimal dependencies, instant results</li>
      </ul>

      <h2 class="font-heading text-xl font-semibold text-heading mt-8 mb-3">Our Tools</h2>
      <p>
        We currently offer tools for generating passwords, IMEI numbers, and phone numbers, with more tools coming soon. Each tool is built with care, tested thoroughly, and designed to be intuitive and efficient.
      </p>
    </div>
  </div>
</template>
