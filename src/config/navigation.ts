import {
  BookOpen, Crown, Flame, Map, ScrollText, Home, Info,
  Users, Wrench, Zap, Code, Gamepad2, type LucideIcon,
} from 'lucide-react';

export const NAVIGATION_CONFIG = [
  { key: 'home', labelKey: 'nav_home', path: '/', icon: Home, showInHeader: false, showInSidebar: true, showInFooter: false, sitemap: true, priority: 1, changeFrequency: 'daily' },
  { key: 'codes', labelKey: 'nav_codes', path: '/codes', icon: Code, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'guides', labelKey: 'nav_guides', path: '/guides', icon: BookOpen, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'entities', labelKey: 'nav_entities', path: '/entities', icon: Zap, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'tier-list', labelKey: 'nav_tierList', path: '/tier-list', icon: Crown, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.9, changeFrequency: 'weekly' },
  { key: 'map', labelKey: 'nav_map', path: '/map', icon: Map, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'controls', labelKey: 'nav_controls', path: '/controls', icon: Gamepad2, isContentType: true, showInHeader: true, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'updates', labelKey: 'nav_updates', path: '/updates', icon: Flame, isContentType: true, showInHeader: false, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.8, changeFrequency: 'weekly' },
  { key: 'multiplayer', labelKey: 'nav_multiplayer', path: '/multiplayer', icon: Users, isContentType: true, showInHeader: false, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'weekly' },
  { key: 'tools', labelKey: 'nav_tools', path: '/tools', icon: Wrench, isContentType: true, showInHeader: false, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'monthly' },
  { key: 'comparison', labelKey: 'nav_comparison', path: '/comparison', icon: ScrollText, isContentType: true, showInHeader: false, showInSidebar: true, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'monthly' },
  { key: 'about', labelKey: 'nav_about', path: '/about', icon: Info, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.7, changeFrequency: 'monthly' },
  { key: 'sitemap', labelKey: 'nav_sitemap', path: '/sitemap', icon: Map, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: false, priority: 0.5, changeFrequency: 'monthly' },
  { key: 'privacy-policy', labelKey: 'nav_privacyPolicy', path: '/privacy-policy', icon: ScrollText, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.4, changeFrequency: 'yearly' },
  { key: 'terms-of-service', labelKey: 'nav_termsOfService', path: '/terms-of-service', icon: ScrollText, showInHeader: false, showInSidebar: false, showInFooter: true, sitemap: true, priority: 0.4, changeFrequency: 'yearly' },
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => 'isContentType' in item && item.isContentType).map((item) => item.key);

export const CONTENT_TYPES_WITH_DEDICATED_PAGES = new Set(CONTENT_TYPES);

export type NavigationItem = (typeof NAVIGATION_CONFIG)[number];
export type ContentType = (typeof CONTENT_TYPES)[number];

export function isContentType(value: string): value is ContentType {
  return CONTENT_TYPES.includes(value as ContentType);
}

export function getNavigationItem(path: string) {
  const normalized = path === '' ? '/' : path.startsWith('/') ? path : `/${path}`;
  return NAVIGATION_CONFIG.find((item) => item.path === normalized || item.key === path);
}

export const CONTENT_DIR_NAMES: Record<ContentType | string, string> = {
  codes: 'codes',
  guides: 'guides',
  entities: 'entities',
  'tier-list': 'tier-list',
  map: 'map',
  controls: 'controls',
  updates: 'updates',
  multiplayer: 'multiplayer',
  tools: 'tools',
  comparison: 'comparison',
} as Record<ContentType, string>;

export function getContentDir(contentType: ContentType): string {
  return CONTENT_DIR_NAMES[contentType] || contentType;
}

export const GUIDE_CATEGORIES: Record<string, { emoji: string; order: number }> = {
  general:           { emoji: '🚀', order: 1 },
  codes:             { emoji: '🎁', order: 2 },
  guides:            { emoji: '📚', order: 3 },
  entities:          { emoji: '👁️', order: 4 },
  'tier-list':       { emoji: '👑', order: 5 },
  map:               { emoji: '🗺️', order: 6 },
  controls:          { emoji: '🎮', order: 7 },
  updates:           { emoji: '✨', order: 8 },
  multiplayer:       { emoji: '👥', order: 9 },
  tools:             { emoji: '🔧', order: 10 },
  comparison:        { emoji: '⚖️', order: 11 },
};

export const CATEGORY_ORDER = Object.entries(GUIDE_CATEGORIES)
  .sort(([, a], [, b]) => a.order - b.order)
  .map(([key]) => key);

export const CATEGORY_AFFINITY: Record<string, string[]> = {
  general:           ['guides', 'entities'],
  codes:             ['updates', 'tools'],
  guides:            ['entities', 'controls', 'multiplayer'],
  entities:          ['guides', 'tier-list', 'controls'],
  'tier-list':       ['entities', 'guides', 'controls'],
  map:               ['guides', 'entities', 'multiplayer'],
  controls:          ['guides', 'entities'],
  updates:           ['guides', 'codes'],
  multiplayer:       ['guides', 'controls', 'entities'],
  tools:             ['guides', 'entities'],
  comparison:        ['guides', 'entities'],
};