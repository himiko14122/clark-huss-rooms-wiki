import { setRequestLocale, getTranslations } from 'next-intl/server';
import { routing, type Locale } from '@/i18n/routing';
import { SITE_URL } from '@/config/site';
import { getAllContent } from '@/lib/content';
import CategoryPage from '@/components/CategoryPage';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
  setRequestLocale(validLocale);
  const t = await getTranslations();
  const camel = 'multiplayer';
  const navKey = t.has(`nav_${camel}`) ? `nav_${camel}` : 'nav_home';
  return {
    title: `${t(navKey)} | ${t('site_title')}`,
    description: t.has(`page_${camel}_description`) ? t(`page_${camel}_description`) : t('site_description'),
    alternates: {
      canonical: `${SITE_URL}/multiplayer`,
      languages: {
        'en': `${SITE_URL}/multiplayer`,
        'ko': `${SITE_URL}/ko/multiplayer`,
        'ja': `${SITE_URL}/ja/multiplayer`,
        'de': `${SITE_URL}/de/multiplayer`,
        'x-default': `${SITE_URL}/multiplayer`,
      },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
  setRequestLocale(validLocale);

  const allContent = await getAllContent('multiplayer', validLocale);
  const articles = allContent.map(item => ({ slug: item.slug, metadata: item.metadata }));

  return <CategoryPage catKey="multiplayer" articles={articles} />;
}