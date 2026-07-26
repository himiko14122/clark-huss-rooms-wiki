import { routing, type Locale } from '@/i18n/routing';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hussroomswiki.wiki';
export const SITE_NAME = 'Clark (EARLY ACCESS) - Huss rooms Wiki';
export const HERO_IMAGE = '/images/hero.webp';
export const LOGO_IMAGE = '/favicon.svg';
export const TWITTER_HANDLE = '';
export const GA_TRACKING_ID = 'G-V6BWS2LLBS';
export const SLUG_PREFIX = 'Clark-Huss-Rooms-';

export const EXTERNAL_LINKS = {
  youtube: '',
  discord: '',
  twitter: '',
  website: '',
  roblox: 'https://www.roblox.com/games/94610770420769/Clark-Huss-rooms',
} as const;

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function localizedPath(locale: Locale | string, path = '/') {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return normalized === '/' ? '/' : normalized;
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}