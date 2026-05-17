const brandTACs: Record<string, string[]> = {
  Samsung: ['35730200', '35730500', '35730900', '35731200', '35733000', '35733900', '35734200', '35735000'],
  Apple: ['35741300', '35744100', '35744800', '35745600', '35746100', '35746800', '35747200', '35749000'],
  Google: ['35989700', '35989800', '35990300', '35990800', '35990900'],
  Xiaomi: ['86619600', '86625700', '86627900', '86637400', '86639400', '86640000'],
  OnePlus: ['86249900', '86280200', '86290100', '86352300', '86370300', '86370400'],
  Huawei: ['86981400', '86981500', '86981600', '86139700', '86139800', '86139900'],
  Generic: ['35265600', '35436900', '35443400', '35443600', '35445300', '35446200', '35447800', '35448400', '35449900', '35454600'],
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function luhnChecksum(digits: number[]): number {
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    let d = digits[i]
    if (i % 2 === 0) {
      d *= 2
      if (d > 9) d -= 9
    }
    sum += d
  }
  return (10 - (sum % 10)) % 10
}

export function generateIMEI(brand?: string): string {
  const tacs = brand && brandTACs[brand] ? brandTACs[brand] : brandTACs.Generic
  const tac = tacs[randInt(0, tacs.length - 1)]
  const serial = String(randInt(0, 999999)).padStart(6, '0')
  const digits = (tac + serial).split('').map(Number)
  const checksum = luhnChecksum(digits)
  return `${tac}${serial}${checksum}`
}

export function generateIMEIs(brand: string | undefined, count: number): string[] {
  return Array.from({ length: count }, () => generateIMEI(brand))
}

export function validateIMEI(imei: string): boolean {
  const cleaned = imei.replace(/\D/g, '')
  if (cleaned.length !== 15) return false
  const digits = cleaned.split('').map(Number)
  const checkDigit = digits.pop()!
  return luhnChecksum(digits) === checkDigit
}

export function getIMEIBrands(): string[] {
  return Object.keys(brandTACs)
}

export function identifyBrand(imei: string): string | null {
  const cleaned = imei.replace(/\D/g, '')
  const tac = cleaned.slice(0, 8)
  for (const [brand, tacs] of Object.entries(brandTACs)) {
    if (tacs.includes(tac)) return brand
  }
  return null
}
