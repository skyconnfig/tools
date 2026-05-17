import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/tools', name: 'tools', component: () => import('@/pages/AllTools.vue') },
    { path: '/tools/:slug', name: 'tool', component: () => import('@/pages/ToolPage.vue') },
    { path: '/blog', name: 'blog', component: () => import('@/pages/BlogPage.vue') },
    { path: '/blog/:slug', name: 'blog-post', component: () => import('@/pages/BlogPage.vue') },
    { path: '/about', name: 'about', component: () => import('@/pages/About.vue') },
    { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
    { path: '/privacy-policy', name: 'privacy', component: () => import('@/pages/Privacy.vue') },
    { path: '/terms', name: 'terms', component: () => import('@/pages/Terms.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
