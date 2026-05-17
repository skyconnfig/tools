import type { PhoneOptions } from '@/types'
import { countries, usAreaCodes } from '@/data/countries'

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateUSNumber(areaCode?: string, state?: string): string {
  const ac = areaCode || (state ? (usAreaCodes[state]?.[randInt(0, (usAreaCodes[state]?.length || 1) - 1)] || '555') : String(randInt(200, 999)))
  const prefix = randInt(200, 999)
  const line = randInt(1000, 9999)
  return `${ac}${prefix}${String(line).padStart(4, '0')}`
}

function generateUKNumber(): string {
  const prefix = randInt(7000, 7999)
  const subscriber = randInt(100000, 999999)
  return `07${String(prefix).slice(1)}${subscriber}`
}

function generateGenericNumber(dialCode: string, totalDigits: number): string {
  const num = randInt(10 ** (totalDigits - 1), 10 ** totalDigits - 1)
  return `${dialCode}${num}`
}

export function generatePhone(opts: PhoneOptions): string {
  const country = countries.find(c => c.code === opts.country)
  if (!country) return ''

  let raw: string
  switch (opts.country) {
    case 'US':
    case 'CA':
      raw = generateUSNumber(opts.areaCode)
      break
    case 'GB':
      raw = generateUKNumber()
      break
    default:
      raw = generateGenericNumber(country.dialCode, 10)
  }

  switch (opts.format) {
    case 'international':
      return `+${country.dialCode} ${raw}`
    case 'national':
      return raw
    case 'dots':
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, '$1.$2.$3')
    case 'hyphens':
      return raw.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
    default:
      return `+${country.dialCode} ${raw}`
  }
}

export function generatePhones(opts: PhoneOptions): string[] {
  return Array.from({ length: opts.count }, () => generatePhone(opts))
}

export function getCountryByCode(code: string) {
  return countries.find(c => c.code === code)
}
