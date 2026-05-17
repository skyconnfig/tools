<script setup lang="ts">
</script>

<template>
  <footer class="border-t border-border bg-surface-raised/50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="flex items-center gap-2.5 mb-3">
            <div class="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <span class="text-surface font-heading font-bold text-xs">LX</span>
            </div>
            <span class="font-heading font-semibold text-heading">LXS Tools</span>
          </div>
          <p class="text-sm text-ink-400 leading-relaxed">
            Free online utility tools for developers and everyday use.
          </p>
        </div>

        <!-- Tools -->
        <div>
          <h4 class="font-heading font-semibold text-sm text-heading mb-3">Tools</h4>
          <ul class="space-y-2">
            <li><router-link to="/tools/password-generator" class="text-sm text-ink-400 hover:text-accent transition-colors">Password Generator</router-link></li>
            <li><router-link to="/tools/imei-generator" class="text-sm text-ink-400 hover:text-accent transition-colors">IMEI Generator</router-link></li>
            <li><router-link to="/tools/us-phone-number-generator" class="text-sm text-ink-400 hover:text-accent transition-colors">Phone Generator</router-link></li>
          </ul>
        </div>

        <!-- Pages -->
        <div>
          <h4 class="font-heading font-semibold text-sm text-heading mb-3">Pages</h4>
          <ul class="space-y-2">
            <li><router-link to="/blog" class="text-sm text-ink-400 hover:text-accent transition-colors">Blog</router-link></li>
            <li><router-link to="/about" class="text-sm text-ink-400 hover:text-accent transition-colors">About</router-link></li>
            <li><router-link to="/contact" class="text-sm text-ink-400 hover:text-accent transition-colors">Contact</router-link></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-heading font-semibold text-sm text-heading mb-3">Legal</h4>
          <ul class="space-y-2">
            <li><router-link to="/privacy-policy" class="text-sm text-ink-400 hover:text-accent transition-colors">Privacy Policy</router-link></li>
            <li><router-link to="/terms" class="text-sm text-ink-400 hover:text-accent transition-colors">Terms of Service</router-link></li>
          </ul>
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-xs text-ink-500">&copy; {{ new Date().getFullYear() }} LXS Tools. All rights reserved.</p>
        <p class="text-xs text-ink-500">Built for utility. Powered by precision.</p>
      </div>
    </div>
  </footer>
</template>
