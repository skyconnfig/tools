// Run: npx tsx scripts/generate-sitemap.ts
// Auto-runs on `npm run build`

import { writeFileSync } from 'fs'
import { resolve } from 'path'

const BASE = 'https://lxs.best'

const staticPages = [
  '/',
  '/tools',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms',
  '/blog',
]

const toolSlugs = [
  // Country phone
  'us-phone-number-generator',
  'canada-phone-number-generator',
  'uk-phone-number-generator',
  'australia-phone-number-generator',
  'germany-phone-number-generator',
  'france-phone-number-generator',
  'japan-phone-number-generator',
  'china-phone-number-generator',
  'india-phone-number-generator',
  'brazil-phone-number-generator',
  'mexico-phone-number-generator',
  'south-korea-phone-number-generator',
  // US States
  'new-york-phone-number-generator',
  'california-phone-number-generator',
  'texas-phone-number-generator',
  'florida-phone-number-generator',
  'illinois-phone-number-generator',
  'pennsylvania-phone-number-generator',
  'ohio-phone-number-generator',
  'georgia-phone-number-generator',
  'washington-phone-number-generator',
  'massachusetts-phone-number-generator',
  // IMEI
  'imei-generator',
  'samsung-imei-generator',
  'apple-imei-generator',
  'google-imei-generator',
  'xiaomi-imei-generator',
  'oneplus-imei-generator',
  'huawei-imei-generator',
  'imei-validator',
  // UUID
  'uuid-generator',
  'uuid-v4-generator',
  'uuid-v7-generator',
  'uuid-validator',
  // Password
  'password-generator',
  'strong-password-generator',
  'random-password-generator',
  'secure-password-generator',
  'memorable-password-generator',
  'pin-code-generator',
]

const blogSlugs = [
  'why-you-need-a-strong-password-generator',
  'what-is-imei-number-and-how-to-use-imei-generator',
  'guide-to-phone-number-generators-for-testing',
]

function xml(urls: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${BASE}${u}</loc>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : u.includes('/tools/') ? '0.9' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`
}

const all = [
  ...staticPages,
  ...toolSlugs.map(s => `/tools/${s}`),
  ...blogSlugs.map(s => `/blog/${s}`),
]

writeFileSync(resolve('public/sitemap.xml'), xml(all))
console.log(`✓ sitemap.xml generated with ${all.length} URLs`)
