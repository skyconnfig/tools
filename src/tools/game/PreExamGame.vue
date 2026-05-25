<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

interface Bubble {
  id: number
  x: number
  size: number
  color: string
  speed: number
  popping: boolean
  delay: number
}

const score = ref(0)
const highScore = ref(0)
const timeLeft = ref(60)
const playing = ref(false)
const gameOver = ref(false)
const bubbles = ref<Bubble[]>([])
const combo = ref(0)

let timerInterval: ReturnType<typeof setInterval> | null = null
let spawnInterval: ReturnType<typeof setInterval> | null = null
let nextId = 0

const colors = [
  '#d4735c', '#e88d7a', '#f0a08e',
  '#7ec8a8', '#5ab0cd', '#f0c76a',
  '#c89bdd', '#f5a0b0', '#7ac7a0',
]

function randomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)]
}

function spawnBubble() {
  if (!playing.value) return
  bubbles.value.push({
    id: nextId++,
    x: Math.random() * 85 + 5,
    size: Math.random() * 30 + 40,
    color: randomColor(),
    speed: Math.random() * 3 + 2,
    popping: false,
    delay: Math.random() * 0.5,
  })
}

function popBubble(id: number) {
  const b = bubbles.value.find(b => b.id === id)
  if (!b || b.popping) return
  b.popping = true
  combo.value++
  const comboBonus = Math.min(combo.value, 10)
  score.value += 1 + Math.floor(comboBonus / 3)
  setTimeout(() => {
    bubbles.value = bubbles.value.filter(b2 => b2.id !== id)
  }, 300)
}

function startGame() {
  score.value = 0
  timeLeft.value = 60
  gameOver.value = false
  playing.value = true
  combo.value = 0
  bubbles.value = []
  nextId = 0

  spawnBubble()
  spawnInterval = setInterval(spawnBubble, 500 + Math.random() * 400)

  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame()
    }
  }, 1000)
}

function endGame() {
  playing.value = false
  gameOver.value = true
  if (score.value > highScore.value) {
    highScore.value = score.value
  }
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  if (spawnInterval) {
    clearInterval(spawnInterval)
    spawnInterval = null
  }
}

onBeforeUnmount(() => {
  if (timerInterval) clearInterval(timerInterval)
  if (spawnInterval) clearInterval(spawnInterval)
})
</script>

<template>
  <div class="space-y-4">
    <!-- Scoreboard -->
    <div class="grid grid-cols-3 gap-3">
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-accent font-mono">{{ score }}</div>
        <div class="text-xs text-ink-500 mt-0.5">得分</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-heading font-mono"
          :class="{ 'text-red-400 animate-pulse': timeLeft <= 10 }"
        >
          {{ timeLeft }}s
        </div>
        <div class="text-xs text-ink-500 mt-0.5">剩余时间</div>
      </div>
      <div class="px-4 py-3 bg-surface-hover/50 rounded-lg border border-border text-center">
        <div class="text-lg font-bold text-ink-400 font-mono">{{ highScore }}</div>
        <div class="text-xs text-ink-500 mt-0.5">最高分</div>
      </div>
    </div>

    <!-- Game area -->
    <div class="relative w-full h-[400px] bg-surface-hover/30 border border-border rounded-xl overflow-hidden select-none cursor-pointer"
      @click.self
    >
      <!-- Background decorations -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div v-for="i in 6" :key="'bg-' + i"
          class="absolute rounded-full opacity-[0.04]"
          :style="{
            width: Math.random() * 200 + 80 + 'px',
            height: Math.random() * 200 + 80 + 'px',
            left: Math.random() * 80 + 10 + '%',
            top: Math.random() * 80 + 10 + '%',
            background: colors[i % colors.length],
          }"
        />
      </div>

      <!-- Start / Game Over overlay -->
      <div v-if="!playing && !gameOver" class="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h3 class="font-heading text-lg font-semibold text-heading mb-2">🎈 泡泡消消乐</h3>
        <p class="text-sm text-ink-400 mb-6 text-center max-w-xs">点击泡泡获得分数，连击有加成！<br>60 秒内尽可能多地收集吧</p>
        <button
          @click="startGame"
          class="px-8 py-3 bg-accent text-surface font-heading font-semibold rounded-xl hover:bg-accent-hover transition-all active:scale-[0.97] shadow-lg shadow-accent/20"
        >
          开始游戏
        </button>
      </div>

      <!-- Playing state -->
      <div v-if="playing || gameOver" class="absolute inset-0">
        <!-- Bubbles -->
        <div
          v-for="b in bubbles"
          :key="b.id"
          class="absolute rounded-full transition-all duration-200 cursor-pointer select-none"
          :class="{ 'scale-150 opacity-0': b.popping }"
          :style="{
            left: b.x + '%',
            bottom: b.popping ? '50%' : '10%',
            width: b.size + 'px',
            height: b.size + 'px',
            background: `radial-gradient(circle at 30% 30%, ${b.color}dd, ${b.color}88)`,
            boxShadow: `inset -4px -4px 8px ${b.color}44, inset 4px 4px 8px rgba(255,255,255,0.3)`,
            animation: playing && !b.popping ? `bubbleFloat ${b.speed}s ease-out ${b.delay}s infinite` : 'none',
            filter: b.popping ? 'blur(2px)' : 'none',
          }"
          @click.stop="popBubble(b.id)"
        >
          <!-- Highlight -->
          <div class="absolute top-[12%] left-[20%] w-[30%] h-[25%] rounded-full bg-white/30" />
        </div>

        <!-- Combo indicator -->
        <transition
          enter-active-class="transition-all duration-200"
          leave-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-y-4 scale-75"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-4 scale-75"
        >
          <div
            v-if="combo >= 3"
            class="absolute top-4 left-1/2 -translate-x-1/2 font-heading font-bold text-lg"
            :class="combo >= 10 ? 'text-yellow-500' : combo >= 7 ? 'text-orange-400' : 'text-accent'"
          >
            {{ combo }} 连击! {{ combo >= 10 ? '🔥' : combo >= 7 ? '⚡' : '✨' }}
          </div>
        </transition>

        <!-- Game Over overlay -->
        <div
          v-if="gameOver"
          class="absolute inset-0 bg-surface/60 backdrop-blur-sm flex flex-col items-center justify-center z-10"
        >
          <h3 class="font-heading text-xl font-bold text-heading mb-1">时间到!</h3>
          <p class="text-sm text-ink-400 mb-1">得分: <span class="font-bold text-accent text-lg">{{ score }}</span></p>
          <p v-if="score >= highScore && score > 0" class="text-xs text-yellow-500 mb-4">🎉 新纪录!</p>
          <p v-else class="text-xs text-ink-500 mb-4">最高分: {{ highScore }}</p>
          <button
            @click="startGame"
            class="px-8 py-3 bg-accent text-surface font-heading font-semibold rounded-xl hover:bg-accent-hover transition-all active:scale-[0.97] shadow-lg shadow-accent/20"
          >
            再来一次
          </button>
        </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="text-center text-xs text-ink-400 leading-relaxed">
      点击泡泡得分 · 连续点击获得连击加成 · 每次游戏 60 秒
    </div>
  </div>
</template>

<style scoped>
@keyframes bubbleFloat {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(-400px - 100%)) scale(0.6);
    opacity: 0;
  }
}
</style>
