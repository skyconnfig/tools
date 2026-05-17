<script setup lang="ts">
defineProps<{
  title: string
  description: string
  path: string
  icon: string
}>()
</script>

<template>
  <router-link
    :to="path"
    class="group glass-card rounded-xl p-4 sm:p-5 block transition-all duration-300 hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 active:scale-[0.98]"
  >
    <div class="flex items-start gap-3 sm:block sm:text-left">
      <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center text-base sm:text-lg shrink-0 group-hover:scale-110 transition-transform sm:mb-3">
        {{ icon }}
      </div>
      <div class="min-w-0">
        <h3 class="font-heading font-semibold text-sm sm:text-base text-heading mb-0.5 sm:mb-1.5 group-hover:text-accent transition-colors truncate sm:truncate-none">
          {{ title }}
        </h3>
        <p class="text-xs sm:text-sm text-ink-400 leading-relaxed line-clamp-2 hidden sm:block">
          {{ description }}
        </p>
      </div>
    </div>
  </router-link>
</template>
