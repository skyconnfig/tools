import type { Country } from '@/types'

export const countries: Country[] = [
  { code: 'US', name: 'United States', dialCode: '1', flag: '🇺🇸', format: '(XXX) XXX-XXXX' },
  { code: 'CA', name: 'Canada', dialCode: '1', flag: '🇨🇦', format: '(XXX) XXX-XXXX' },
  { code: 'GB', name: 'United Kingdom', dialCode: '44', flag: '🇬🇧', format: '07XXX XXXXXX' },
  { code: 'AU', name: 'Australia', dialCode: '61', flag: '🇦🇺', format: '04XX XXX XXX' },
  { code: 'DE', name: 'Germany', dialCode: '49', flag: '🇩🇪', format: '017X XXXXXXX' },
  { code: 'FR', name: 'France', dialCode: '33', flag: '🇫🇷', format: '06 XX XX XX XX' },
  { code: 'JP', name: 'Japan', dialCode: '81', flag: '🇯🇵', format: '090-XXXX-XXXX' },
  { code: 'CN', name: 'China', dialCode: '86', flag: '🇨🇳', format: '1XX XXXX XXXX' },
  { code: 'BR', name: 'Brazil', dialCode: '55', flag: '🇧🇷', format: '(XX) XXXXX-XXXX' },
  { code: 'IN', name: 'India', dialCode: '91', flag: '🇮🇳', format: 'XXXXX XXXXX' },
  { code: 'MX', name: 'Mexico', dialCode: '52', flag: '🇲🇽', format: 'XX XXXX XXXX' },
  { code: 'KR', name: 'South Korea', dialCode: '82', flag: '🇰🇷', format: '010-XXXX-XXXX' },
  { code: 'IT', name: 'Italy', dialCode: '39', flag: '🇮🇹', format: '3XX XXX XXXX' },
  { code: 'ES', name: 'Spain', dialCode: '34', flag: '🇪🇸', format: '6XX XXX XXX' },
  { code: 'RU', name: 'Russia', dialCode: '7', flag: '🇷🇺', format: '9XX XXX-XX-XX' },
]

export const usAreaCodes: Record<string, string[]> = {
  'New York': ['212', '315', '347', '516', '585', '607', '631', '716', '718', '845', '914'],
  'California': ['209', '213', '310', '323', '408', '415', '424', '442', '510', '530', '559', '562', '619', '626', '650', '657', '661', '707', '714', '747', '760', '805', '818', '831', '858', '909', '916', '925', '949', '951'],
  'Texas': ['210', '214', '254', '281', '325', '361', '409', '430', '432', '469', '512', '682', '713', '726', '737', '806', '817', '830', '832', '903', '915', '936', '940', '956', '972', '979'],
  'Florida': ['239', '305', '321', '352', '386', '407', '561', '689', '727', '754', '772', '786', '813', '850', '863', '904', '941', '954'],
  'Illinois': ['217', '224', '309', '312', '331', '618', '630', '708', '773', '815', '847', '872'],
  'Pennsylvania': ['215', '267', '272', '412', '484', '570', '610', '717', '724', '814', '878'],
  'Ohio': ['216', '234', '283', '330', '380', '419', '440', '513', '567', '614', '740', '937'],
  'Georgia': ['229', '404', '470', '478', '678', '706', '762', '770', '912'],
  'Washington': ['206', '253', '360', '425', '509', '564'],
  'Massachusetts': ['339', '351', '413', '508', '617', '774', '781', '857', '978'],
}

export const usStates = Object.keys(usAreaCodes)
