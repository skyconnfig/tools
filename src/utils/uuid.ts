function hex(bytes: number[]): string {
  return bytes.map(b => b.toString(16).padStart(2, '0')).join('')
}

function randomBytes(n: number): number[] {
  const arr = new Uint8Array(n)
  crypto.getRandomValues(arr)
  return Array.from(arr)
}

export type UUIDVersion = 'v4' | 'v7'
export type UUIDCase = 'lower' | 'upper'
export type UUIDFormat = 'standard' | 'nohyphens' | 'braced' | 'urn'

export function generateUUID(
  version: UUIDVersion = 'v4',
  fmt: UUIDFormat = 'standard',
  ucase: UUIDCase = 'lower',
): string {
  const bytes = randomBytes(16)

  // Set version (4 bits) and variant (2 bits)
  if (version === 'v4') {
    bytes[6] = (bytes[6] & 0x0f) | 0x40  // version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80  // variant 1
  } else {
    // v7: Unix timestamp ms + random
    const ts = Date.now()
    bytes[0] = (ts >> 40) & 0xff
    bytes[1] = (ts >> 32) & 0xff
    bytes[2] = (ts >> 24) & 0xff
    bytes[3] = (ts >> 16) & 0xff
    bytes[4] = (ts >> 8) & 0xff
    bytes[5] = ts & 0xff
    bytes[6] = (bytes[6] & 0x0f) | 0x70  // version 7
    bytes[8] = (bytes[8] & 0x3f) | 0x80  // variant 1
  }

  let raw = hex(bytes)
  if (ucase === 'upper') raw = raw.toUpperCase()

  switch (fmt) {
    case 'standard':
      return `${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20)}`
    case 'nohyphens':
      return raw
    case 'braced':
      return `{${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20)}}`
    case 'urn':
      return `urn:uuid:${raw.slice(0,8)}-${raw.slice(8,12)}-${raw.slice(12,16)}-${raw.slice(16,20)}-${raw.slice(20)}`
  }
}

export function generateUUIDs(
  count: number,
  version: UUIDVersion = 'v4',
  fmt: UUIDFormat = 'standard',
  ucase: UUIDCase = 'lower',
): string[] {
  return Array.from({ length: count }, () => generateUUID(version, fmt, ucase))
}

export function uuidVersion(uuid: string): number | null {
  const clean = uuid.replace(/[{}urn:]/g, '').replace(/-/g, '')
  if (!/^[0-9a-fA-F]{32}$/.test(clean)) return null
  return parseInt(clean[12], 16)
}

export function validateUUID(uuid: string): boolean {
  const clean = uuid.replace(/[{}urn:]/g, '').replace(/-/g, '')
  return /^[0-9a-fA-F]{32}$/.test(clean)
}
