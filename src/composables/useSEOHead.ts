import { watch } from 'vue'
import { useHead } from '@vueuse/head'
import type { SEOData } from '@/types'

export function useSEOHead(seo: SEOData) {
  useHead({
    title: seo.title,
    meta: [
      { name: 'description', content: seo.description },
      { name: 'keywords', content: seo.keywords },
      { property: 'og:title', content: seo.ogTitle || seo.title },
      { property: 'og:description', content: seo.ogDescription || seo.description },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: seo.ogTitle || seo.title },
      { name: 'twitter:description', content: seo.ogDescription || seo.description },
    ],
  })
}

export function useDynamicSEO(seo: SEOData) {
  watch(
    () => seo,
    (newSeo) => {
      useSEOHead(newSeo)
    },
    { immediate: true, deep: true },
  )
}
