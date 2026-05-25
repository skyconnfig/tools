<script setup lang="ts">
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { useCopy } from '@/composables/useCopy'

const { copy } = useCopy()

const input = ref(`# 欢迎使用 Markdown 编辑器

## 快速开始

在左侧编辑 Markdown，右侧实时预览。

**支持的功能：**

- 标题（H1 ~ H6）
- **粗体**、*斜体*、~~删除线~~
- [链接](https://lxs.best)
- 列表（有序/无序）
- \`行内代码\` 和代码块
- 表格
- 图片
- 引用

\`\`\`js
console.log('Hello Markdown!')
\`\`\`

> Markdown 是一种轻量级标记语言。
`)

const htmlOutput = computed(() => {
  try {
    return marked.parse(input.value, { breaks: true }) as string
  } catch {
    return '<p class="text-red-400">渲染出错</p>'
  }
})

const wordCount = computed(() => {
  const text = input.value.trim()
  if (!text) return 0
  return text.replace(/[#*`~\[\]()>|_-]/g, '').replace(/\s+/g, ' ').trim().split(/[\s一-鿿]/).length
})

function copyHtml() {
  copy(htmlOutput.value)
}

function exportMarkdown() {
  const blob = new Blob([input.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'document.md'
  a.click()
  URL.revokeObjectURL(url)
}

function exportHtml() {
  const blob = new Blob([`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>Markdown Export</title></head><body>${htmlOutput.value}</body></html>`], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'document.html'
  a.click()
  URL.revokeObjectURL(url)
}

function clearAll() {
  input.value = ''
}
</script>

<template>
  <div class="space-y-4">
    <!-- Toolbar -->
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <span class="text-xs text-ink-500 bg-surface-hover px-2.5 py-1 rounded-md">
          {{ wordCount }} 字
        </span>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="copyHtml"
          class="px-3.5 py-1.5 text-xs font-medium bg-surface-hover border border-border rounded-lg text-ink-300 hover:text-heading hover:border-accent/30 transition-all"
        >
          复制 HTML
        </button>
        <button
          @click="exportMarkdown"
          class="px-3.5 py-1.5 text-xs font-medium bg-surface-hover border border-border rounded-lg text-ink-300 hover:text-heading hover:border-accent/30 transition-all"
        >
          导出 .md
        </button>
        <button
          @click="exportHtml"
          class="px-3.5 py-1.5 text-xs font-medium bg-surface-hover border border-border rounded-lg text-ink-300 hover:text-heading hover:border-accent/30 transition-all"
        >
          导出 HTML
        </button>
        <button
          @click="clearAll"
          class="px-3.5 py-1.5 text-xs font-medium text-red-400/70 hover:text-red-400 border border-transparent hover:border-red-400/20 rounded-lg transition-all"
        >
          清空
        </button>
      </div>
    </div>

    <!-- Editor + Preview split -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-4">
      <!-- Editor -->
      <div class="md:order-1 order-1">
        <textarea
          v-model="input"
          class="w-full h-[420px] md:h-[520px] px-4 py-4 bg-surface-hover border border-border rounded-xl text-heading text-sm font-mono leading-relaxed focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-colors resize-none"
          placeholder="在此输入 Markdown..."
          spellcheck="false"
        />
      </div>

      <!-- Preview -->
      <div class="md:order-2 order-2 mt-4 md:mt-0">
        <div
          class="prose-preview w-full h-[420px] md:h-[520px] px-4 py-4 bg-surface-raised border border-border rounded-xl overflow-y-auto"
        >
          <div v-if="!input.trim()" class="flex items-center justify-center h-full text-sm text-ink-500">
            开始输入 Markdown 查看预览...
          </div>
          <div v-html="htmlOutput" />
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">{{ input.length }}</div>
        <div class="text-xs text-ink-500 mt-0.5">字符数</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">{{ input.trim() ? input.trim().split(/\s+/).length : 0 }}</div>
        <div class="text-xs text-ink-500 mt-0.5">单词数</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">{{ input.trim() ? input.trim().split('\n').length : 0 }}</div>
        <div class="text-xs text-ink-500 mt-0.5">行数</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">{{ Math.ceil(input.length / 2000) || 1 }}</div>
        <div class="text-xs text-ink-500 mt-0.5">预计阅读(分钟)</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.prose-preview :deep(h1),
.prose-preview :deep(h2),
.prose-preview :deep(h3),
.prose-preview :deep(h4) {
  font-family: var(--font-heading);
  color: var(--color-text-heading);
  font-weight: 600;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
.prose-preview :deep(h1) { font-size: 1.5rem; }
.prose-preview :deep(h2) { font-size: 1.25rem; }
.prose-preview :deep(h3) { font-size: 1.125rem; }
.prose-preview :deep(p) {
  color: var(--color-text);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}
.prose-preview :deep(ul),
.prose-preview :deep(ol) {
  padding-left: 1.25rem;
  margin-bottom: 0.75rem;
  color: var(--color-text);
}
.prose-preview :deep(li) { margin-bottom: 0.25rem; }
.prose-preview :deep(a) {
  color: var(--color-accent);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.prose-preview :deep(a:hover) { color: var(--color-accent-hover); }
.prose-preview :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  background: var(--color-surface-hover);
  padding: 0.15em 0.4em;
  border-radius: 4px;
}
.prose-preview :deep(pre) {
  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
  margin-bottom: 0.75rem;
}
.prose-preview :deep(pre code) {
  background: none;
  padding: 0;
  border-radius: 0;
}
.prose-preview :deep(blockquote) {
  border-left: 3px solid var(--color-accent);
  padding-left: 1rem;
  margin: 0.75rem 0;
  color: var(--color-ink-400);
}
.prose-preview :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 0.75rem;
}
.prose-preview :deep(th),
.prose-preview :deep(td) {
  border: 1px solid var(--color-border);
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-size: 0.875rem;
}
.prose-preview :deep(th) {
  background: var(--color-surface-hover);
  font-weight: 600;
  color: var(--color-text-heading);
}
.prose-preview :deep(td) { color: var(--color-text); }
.prose-preview :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.75rem 0;
}
.prose-preview :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 1.5rem 0;
}
.prose-preview :deep(strong) { color: var(--color-text-heading); }
</style>
