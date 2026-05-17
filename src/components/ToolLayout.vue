<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-2 text-sm text-ink-400 mb-6">
      <router-link to="/" class="hover:text-accent transition-colors">Home</router-link>
      <span class="text-ink-600">/</span>
      <span class="text-ink-300">Tools</span>
      <span class="text-ink-600">/</span>
      <span class="text-accent">{{ title }}</span>
    </nav>

    <!-- Title -->
    <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading leading-tight mb-4">
      {{ title }}
    </h1>

    <!-- Description -->
    <p class="text-ink-300 leading-relaxed mb-8">
      {{ description }}
    </p>

    <!-- Tool UI slot -->
    <div class="glass-card rounded-xl p-6 sm:p-8 mb-8">
      <slot />
    </div>

    <!-- Content slot for SEO text, FAQ -->
    <div class="prose-custom">
      <slot name="content" />
    </div>
  </div>
</template>

<style scoped>
.prose-custom :deep(h2) {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose-custom :deep(h3) {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-custom :deep(p) {
  color: var(--color-ink-300);
  line-height: 1.75;
  margin-bottom: 1rem;
}

.prose-custom :deep(ul) {
  color: var(--color-ink-300);
  line-height: 1.75;
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.prose-custom :deep(li) {
  margin-bottom: 0.25rem;
}

.prose-custom :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.prose-custom :deep(a:hover) {
  color: var(--color-accent-hover);
}
</style>
