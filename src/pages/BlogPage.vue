<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { blogPosts } from '@/data/blogPosts'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const post = computed(() => blogPosts.find(p => p.slug === slug.value))

useHead({
  title: computed(() => post.value ? `${post.value.title} - LXS Tools Blog` : 'Blog - LXS Tools'),
  meta: computed(() => [
    { name: 'description', content: post.value ? post.value.excerpt : 'Read the latest articles from LXS Tools about online tools, security tips, and development guides.' },
  ]),
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
    <!-- Single Post -->
    <div v-if="post">
      <router-link to="/blog" class="text-sm text-accent hover:text-accent-hover transition-colors mb-4 inline-block">&larr; Back to Blog</router-link>
      <article>
        <header class="mb-8">
          <div class="flex items-center gap-3 text-xs text-ink-500 mb-3">
            <span>{{ post.category }}</span>
            <span class="w-1 h-1 rounded-full bg-ink-600" />
            <span>{{ post.date }}</span>
          </div>
          <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading leading-tight">{{ post.title }}</h1>
        </header>
        <div class="prose-custom">
          <p class="text-ink-400 text-lg leading-relaxed mb-6">{{ post.excerpt }}</p>
          <div class="whitespace-pre-line text-ink-300 leading-relaxed space-y-4">
            {{ post.content }}
          </div>
        </div>
      </article>
    </div>

    <!-- Blog Listing -->
    <div v-else>
      <h1 class="font-heading text-3xl sm:text-4xl font-bold text-heading mb-6">Blog</h1>
      <p class="text-ink-400 mb-8">Articles about online tools, security tips, and development guides.</p>

      <div class="space-y-4">
        <article
          v-for="post in blogPosts"
          :key="post.slug"
          class="glass-card rounded-xl p-6 hover:border-accent/20 transition-all group"
        >
          <router-link :to="'/blog/' + post.slug" class="block">
            <div class="flex items-center gap-3 text-xs text-ink-500 mb-2">
              <span>{{ post.category }}</span>
              <span class="w-1 h-1 rounded-full bg-ink-600" />
              <span>{{ post.date }}</span>
            </div>
            <h2 class="font-heading text-xl font-semibold text-heading group-hover:text-accent transition-colors mb-2">
              {{ post.title }}
            </h2>
            <p class="text-sm text-ink-400 leading-relaxed">{{ post.excerpt }}</p>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose-custom :deep(h2) {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text-heading);
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose-custom :deep(ul) {
  padding-left: 1.25rem;
  margin-bottom: 1rem;
}

.prose-custom :deep(li) {
  margin-bottom: 0.25rem;
}
</style>
