export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
  format: string
  areaCodes?: string[]
}

export interface SEOData {
  title: string
  description: string
  keywords: string
  ogTitle?: string
  ogDescription?: string
}

export interface ToolRoute {
  slug: string
  type: 'phone' | 'imei' | 'password' | 'uuid' | 'qr' | 'name' | 'json'
  country?: string
  brand?: string
  feature?: string
  seo: SEOData
}

export interface PasswordOptions {
  length: number
  uppercase: boolean
  lowercase: boolean
  numbers: boolean
  symbols: boolean
  excludeAmbiguous: boolean
}

export interface IMEIOptions {
  brand?: string
  count: number
  validOnly: boolean
}

export interface PhoneOptions {
  country: string
  count: number
  areaCode?: string
  format: 'international' | 'national' | 'dots' | 'hyphens'
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  author: string
  category: string
  tags: string[]
}
