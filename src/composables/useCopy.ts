import { ref } from 'vue'

const toastMessage = ref('')
const toastVisible = ref(false)
let toastTimer: ReturnType<typeof setTimeout> | null = null

function showToast(msg: string) {
  toastMessage.value = msg
  toastVisible.value = true
  if (toastTimer) clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toastVisible.value = false
  }, 2000)
}

export function useToast() {
  return { toastMessage, toastVisible }
}

export function useCopy() {
  async function copy(text: string): Promise<boolean> {
    // Modern API
    try {
      await navigator.clipboard.writeText(text)
      showToast('Copied!')
      return true
    } catch {
      // Fallback for HTTP / older browsers
      try {
        const ta = document.createElement('textarea')
        ta.value = text
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        showToast('Copied!')
        return true
      } catch {
        showToast('Copy failed')
        return false
      }
    }
  }

  return { copy }
}
