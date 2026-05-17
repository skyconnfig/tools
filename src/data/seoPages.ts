import type { ToolRoute } from '@/types'
import { usStates } from './countries'

export const phoneCountryPages: ToolRoute[] = [
  { slug: 'us-phone-number-generator', type: 'phone', country: 'US', seo: { title: 'US Phone Number Generator - Random American Phone Numbers', description: 'Generate random US phone numbers with real area codes. Free American phone number generator for testing and development.', keywords: 'us phone number generator, american phone number, random us number' } },
  { slug: 'canada-phone-number-generator', type: 'phone', country: 'CA', seo: { title: 'Canada Phone Number Generator - Random Canadian Phone Numbers', description: 'Generate random Canadian phone numbers with real area codes. Free Canada phone number generator.', keywords: 'canada phone number generator, canadian phone number' } },
  { slug: 'uk-phone-number-generator', type: 'phone', country: 'GB', seo: { title: 'UK Phone Number Generator - Random British Phone Numbers', description: 'Generate random UK phone numbers with real area codes. Free British mobile number generator.', keywords: 'uk phone number generator, british phone number' } },
  { slug: 'australia-phone-number-generator', type: 'phone', country: 'AU', seo: { title: 'Australia Phone Number Generator - Random Australian Numbers', description: 'Generate random Australian phone numbers. Free Australia mobile number generator.', keywords: 'australia phone number generator' } },
  { slug: 'germany-phone-number-generator', type: 'phone', country: 'DE', seo: { title: 'Germany Phone Number Generator - Random German Numbers', description: 'Generate random German phone numbers. Free Deutschland Telefonnummer generator.', keywords: 'germany phone number generator, german phone number' } },
  { slug: 'france-phone-number-generator', type: 'phone', country: 'FR', seo: { title: 'France Phone Number Generator - Random French Numbers', description: 'Generate random French phone numbers. Free France mobile number generator.', keywords: 'france phone number generator, french phone number' } },
  { slug: 'japan-phone-number-generator', type: 'phone', country: 'JP', seo: { title: 'Japan Phone Number Generator - Random Japanese Numbers', description: 'Generate random Japanese phone numbers. Free Japan mobile number generator.', keywords: 'japan phone number generator' } },
  { slug: 'china-phone-number-generator', type: 'phone', country: 'CN', seo: { title: 'China Phone Number Generator - Random Chinese Numbers', description: 'Generate random Chinese phone numbers. Free China mobile number generator.', keywords: 'china phone number generator, chinese phone number' } },
  { slug: 'india-phone-number-generator', type: 'phone', country: 'IN', seo: { title: 'India Phone Number Generator - Random Indian Numbers', description: 'Generate random Indian phone numbers. Free India mobile number generator.', keywords: 'india phone number generator' } },
  { slug: 'brazil-phone-number-generator', type: 'phone', country: 'BR', seo: { title: 'Brazil Phone Number Generator - Random Brazilian Numbers', description: 'Generate random Brazilian phone numbers. Free Brazil mobile number generator.', keywords: 'brazil phone number generator' } },
  { slug: 'mexico-phone-number-generator', type: 'phone', country: 'MX', seo: { title: 'Mexico Phone Number Generator - Random Mexican Numbers', description: 'Generate random Mexican phone numbers. Free Mexico mobile number generator.', keywords: 'mexico phone number generator' } },
  { slug: 'south-korea-phone-number-generator', type: 'phone', country: 'KR', seo: { title: 'South Korea Phone Number Generator', description: 'Generate random South Korean phone numbers. Free Korea mobile number generator.', keywords: 'south korea phone number generator' } },
]

export const phoneStatePages: ToolRoute[] = usStates.map(state => ({
  slug: `${state.toLowerCase().replace(/\s+/g, '-')}-phone-number-generator`,
  type: 'phone' as const,
  country: 'US',
  feature: state,
  seo: {
    title: `${state} Phone Number Generator - Random ${state} Phone Numbers`,
    description: `Generate random ${state} phone numbers with real local area codes. Free ${state} phone number generator for testing and development.`,
    keywords: `${state.toLowerCase()} phone number generator, ${state.toLowerCase()} phone number`,
  },
}))

export const imeiPages: ToolRoute[] = [
  { slug: 'imei-generator', type: 'imei', seo: { title: 'IMEI Generator - Generate Valid IMEI Numbers Online', description: 'Generate valid IMEI numbers with Luhn checksum. Free IMEI generator tool for testing and development.', keywords: 'imei generator, generate imei, valid imei number' } },
  { slug: 'samsung-imei-generator', type: 'imei', brand: 'Samsung', seo: { title: 'Samsung IMEI Generator - Generate Samsung IMEI Numbers', description: 'Generate valid Samsung IMEI numbers with correct TAC codes. Free Samsung IMEI generator.', keywords: 'samsung imei generator, samsung imei number' } },
  { slug: 'apple-imei-generator', type: 'imei', brand: 'Apple', seo: { title: 'Apple IMEI Generator - Generate Apple IMEI Numbers', description: 'Generate valid Apple IMEI numbers with correct TAC codes for iPhone. Free Apple IMEI generator.', keywords: 'apple imei generator, iphone imei number' } },
  { slug: 'google-imei-generator', type: 'imei', brand: 'Google', seo: { title: 'Google Pixel IMEI Generator - Generate Google IMEI Numbers', description: 'Generate valid Google Pixel IMEI numbers. Free Google IMEI generator for Pixel devices.', keywords: 'google imei generator, pixel imei number' } },
  { slug: 'xiaomi-imei-generator', type: 'imei', brand: 'Xiaomi', seo: { title: 'Xiaomi IMEI Generator - Generate Xiaomi IMEI Numbers', description: 'Generate valid Xiaomi IMEI numbers with correct TAC codes. Free Xiaomi IMEI generator.', keywords: 'xiaomi imei generator, xiaomi imei number' } },
  { slug: 'oneplus-imei-generator', type: 'imei', brand: 'OnePlus', seo: { title: 'OnePlus IMEI Generator - Generate OnePlus IMEI Numbers', description: 'Generate valid OnePlus IMEI numbers. Free OnePlus IMEI generator for testing.', keywords: 'oneplus imei generator' } },
  { slug: 'huawei-imei-generator', type: 'imei', brand: 'Huawei', seo: { title: 'Huawei IMEI Generator - Generate Huawei IMEI Numbers', description: 'Generate valid Huawei IMEI numbers with correct TAC codes. Free Huawei IMEI generator.', keywords: 'huawei imei generator' } },
  { slug: 'imei-validator', type: 'imei', feature: 'validator', seo: { title: 'IMEI Validator - Check If IMEI Number Is Valid Online', description: 'Validate IMEI numbers with Luhn checksum verification. Free online IMEI validator tool.', keywords: 'imei validator, check imei, imei check' } },
]

export const passwordPages: ToolRoute[] = [
  { slug: 'password-generator', type: 'password', seo: { title: 'Password Generator - Generate Strong Random Passwords', description: 'Generate strong, secure passwords instantly. Free password generator with customizable length, symbols, and numbers.', keywords: 'password generator, strong password, random password' } },
  { slug: 'strong-password-generator', type: 'password', feature: 'strong', seo: { title: 'Strong Password Generator - Create Secure Passwords', description: 'Create strong, hack-proof passwords with our secure password generator. Customizable length and character types.', keywords: 'strong password generator, secure password' } },
  { slug: 'random-password-generator', type: 'password', feature: 'random', seo: { title: 'Random Password Generator - Generate Random Passwords', description: 'Generate completely random passwords with one click. Free secure random password generator.', keywords: 'random password generator, random password' } },
  { slug: 'secure-password-generator', type: 'password', feature: 'secure', seo: { title: 'Secure Password Generator - Create Hack-Proof Passwords', description: 'Create hack-proof passwords with our secure password generator. Military-grade random password generation.', keywords: 'secure password generator, hack proof password' } },
  { slug: 'memorable-password-generator', type: 'password', feature: 'memorable', seo: { title: 'Memorable Password Generator - Easy to Remember Passwords', description: 'Generate easy-to-remember but secure passwords using word-based combinations. Free memorable password generator.', keywords: 'memorable password generator, easy password' } },
  { slug: 'pin-code-generator', type: 'password', feature: 'pin', seo: { title: 'PIN Code Generator - Generate Random PIN Numbers', description: 'Generate random PIN codes of any length. Free PIN generator for secure numeric codes.', keywords: 'pin code generator, pin number generator' } },
]

export const uuidPages: ToolRoute[] = [
  { slug: 'uuid-generator', type: 'uuid', seo: { title: 'UUID Generator - Generate UUID v4 and v7 Online', description: 'Generate random UUID v4 and time-based UUID v7 online. Free UUID generator with multiple formats including lowercase, uppercase, braced, and URN.', keywords: 'uuid generator, uuid v4, uuid v7, generate uuid, random uuid' } },
  { slug: 'uuid-v4-generator', type: 'uuid', feature: 'v4', seo: { title: 'UUID v4 Generator - Generate Random UUID v4 Online', description: 'Generate random UUID v4 identifiers online. Free UUID v4 generator with 122 random bits.', keywords: 'uuid v4 generator, random uuid, uuid v4' } },
  { slug: 'uuid-v7-generator', type: 'uuid', feature: 'v7', seo: { title: 'UUID v7 Generator - Generate Time-Based UUID v7 Online', description: 'Generate time-ordered UUID v7 identifiers. Free UUID v7 generator with Unix timestamp prefix.', keywords: 'uuid v7 generator, time-based uuid, uuid v7' } },
  { slug: 'uuid-validator', type: 'uuid', feature: 'validator', seo: { title: 'UUID Validator - Validate UUID Online', description: 'Validate UUID strings and detect UUID version. Free online UUID validator tool.', keywords: 'uuid validator, validate uuid, check uuid' } },
]

export const allToolRoutes: ToolRoute[] = [
  ...phoneCountryPages,
  ...phoneStatePages,
  ...imeiPages,
  ...passwordPages,
  ...uuidPages,
]
