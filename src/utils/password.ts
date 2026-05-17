import type { PasswordOptions } from '@/types'

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?~'
const AMBIGUOUS = '0O1lI5S2Z8B'

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generatePassword(opts: PasswordOptions): string {
  let chars = ''
  if (opts.uppercase) chars += UPPERCASE
  if (opts.lowercase) chars += LOWERCASE
  if (opts.numbers) chars += NUMBERS
  if (opts.symbols) chars += SYMBOLS

  if (!chars) chars = LOWERCASE

  let pool = chars
  if (opts.excludeAmbiguous) {
    for (const ch of AMBIGUOUS) {
      pool = pool.replace(ch, '')
    }
  }

  let password = ''
  for (let i = 0; i < opts.length; i++) {
    password += pool[randInt(0, pool.length - 1)]
  }

  return password
}

export function generatePasswords(opts: PasswordOptions, count: number): string[] {
  return Array.from({ length: count }, () => generatePassword(opts))
}

export function calculateStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0
  if (pw.length >= 8) score += 25
  if (pw.length >= 12) score += 15
  if (pw.length >= 16) score += 10
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score += 15
  if (/\d/.test(pw)) score += 10
  if (/[^a-zA-Z0-9]/.test(pw)) score += 15
  if (pw.length > 20) score += 10

  if (score >= 80) return { score, label: 'Very Strong', color: '#10b981' }
  if (score >= 60) return { score, label: 'Strong', color: '#22c55e' }
  if (score >= 40) return { score, label: 'Medium', color: '#f59e0b' }
  if (score >= 20) return { score, label: 'Weak', color: '#f97316' }
  return { score, label: 'Very Weak', color: '#ef4444' }
}

export function generateMemorablePassword(wordCount: number = 4): string {
  const words = [
    'cloud', 'tiger', 'purple', 'river', 'stone', 'ocean', 'forest', 'eagle',
    'silver', 'copper', 'thunder', 'crystal', 'mountain', 'valley', 'desert',
    'falcon', 'raven', 'willow', 'maple', 'cedar', 'amber', 'jade', 'coral',
    'comet', 'nebula', 'aurora', 'blaze', 'frost', 'storm', 'shadow',
  ]
  const selected: string[] = []
  const available = [...words]
  for (let i = 0; i < wordCount; i++) {
    const idx = randInt(0, available.length - 1)
    selected.push(available[idx])
    available.splice(idx, 1)
  }
  const num = randInt(10, 99)
  return selected.join('-') + num
}

export function generatePIN(length: number = 6): string {
  return Array.from({ length }, () => randInt(0, 9)).join('')
}
