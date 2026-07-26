import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import JsonLd from '@/components/JsonLd';
import { Link } from '@/i18n/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { getBaseMetadata, websiteJsonLd, itemListJsonLd } from '@/lib/seo';
import {
  heroes,
  statusAilments,
  familiars,
  strategyTiers,
  tierColor,
  ailmentColor,
  HERO_ICONS,
  STRATEGY_ICONS,
  type Hero,
  type StatusAilment,
  type Familiar,
  type StrategyTier,
} from '@/data/game-data';
import { getAllContent, getAllContentByDate } from '@/lib/content';
import { translate } from '@/lib/i18n';
import { EXTERNAL_LINKS } from '@/config/site';
import { HOME_CONFIG } from '@/config/home';
import AdBanner from '@/components/AdBanner';
import AutoScrollCarousel from '@/components/AutoScrollCarousel';
import YouTubePlayer from '@/components/YouTubePlayer';
import {
  ArrowRight, ChevronRight, Shield, Skull,
  Headphones, Battery, Users, Flame,
  BookOpen, Crown, Gamepad2, Wrench, ScrollText, Code, Map, Radio, Lock, Eye,
} from 'lucide-react';


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return getBaseMetadata('/', locale, t('page_home'), t('page_home_description'));
}

function resolveDynamic(val: string, ctx: Record<string, string>): string {
  return val.startsWith('__') ? (ctx[val] ?? val) : val;
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const validLocale = routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
  setRequestLocale(validLocale);
  const t = await getTranslations();
  const allGuides = await getAllContent('guides', validLocale);
  const latestContent = await getAllContentByDate(validLocale);
  const firstGuidePath = allGuides.length > 0 ? allGuides[0].path : '/guides';

  const dynCtx: Record<string, string> = {
    '__firstGuide': firstGuidePath,
    '__guideCount': String(allGuides.length),
    '__heroCount': String(heroes.length),
    '__ailmentCount': String(statusAilments.length),
    '__familiarCount': String(familiars.length),
    '__strategyCount': String(strategyTiers.length),
  };

  const heroBadgeKeys = HOME_CONFIG.hero.badgeKeys;
  const faqKeys = HOME_CONFIG.faq.keys;
  const infoItems = HOME_CONFIG.gameOverview.infoItems;
  const moduleCards = HOME_CONFIG.moduleCards.map((card) => ({
    ...card,
    label: t(card.labelKey),
    title: t(card.titleKey),
    desc: t(card.descKey),
    href: resolveDynamic(card.href, dynCtx),
    stats: card.stats.map((s) => ({ val: resolveDynamic(s.val, dynCtx), label: t(s.labelKey) })),
  }));

  const gameFeatures = HOME_CONFIG.gameFeatures.map((feat) => ({
    ...feat,
    title: t(feat.titleKey),
    desc: t(feat.descKey),
  }));

  const startHereSteps = HOME_CONFIG.startHereSteps.map((step) => ({
    title: t(step.titleKey),
    desc: t(step.descKey),
    href: resolveDynamic(step.href, dynCtx),
  }));

  const adKey = process.env.NEXT_PUBLIC_AD_BANNER_KEY;

  /* ── Status mechanic icon map ── */
  const AILMENT_ICONS: Record<string, typeof Skull> = {
    'audio-tracking': Headphones,
    'flashlight-spotted': Battery,
    'line-of-sight': Eye,
    'breathing-cadence': Radio,
    'server-locked': Lock,
  };

  return (
    <div>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={itemListJsonLd(
        heroes.map((hero: Hero) => ({ name: translate(t, hero.nameKey) || hero.id, path: '/entities' })),
        validLocale
      )} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-16 md:py-24 full-width-bg">
        <div className="absolute inset-0 opacity-40 hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)]/70 via-transparent to-[var(--color-bg-primary)]/40" />
        <div className="absolute top-1/4 left-[20%] -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent)]/8 rounded-full blur-[120px] pointer-events-none hero-glow" />
        <div className="absolute bottom-1/3 right-[15%] w-[300px] h-[300px] bg-[var(--color-accent-secondary)]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <p className="text-xs font-semibold text-[var(--color-accent)] uppercase tracking-widest">{t('home_hero_tagline')}</p>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-[var(--font-heading)] gradient-text leading-[1.1] tracking-tight">{t('site_title')}</h1>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed">{t('home_hero_description')}</p>
              <div className="flex flex-wrap gap-3">
                {HOME_CONFIG.hero.ctas.map((cta) => (
                  <Link key={cta.labelKey} href={resolveDynamic(cta.href, dynCtx)} className={cta.style === 'primary' ? 'btn-primary btn-hero-primary' : 'btn-secondary btn-hero-secondary'}>
                    {cta.style === 'primary' && <ArrowRight className="w-4 h-4 mr-0.5" />}
                    {t(cta.labelKey)}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {heroBadgeKeys.slice(0, 2).map((key) => (
                  <span key={key} className="hero-badge-primary">{t(key)}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {heroBadgeKeys.slice(2, 8).map((key) => (
                  <span key={key} className="hero-badge-secondary">{t(key)}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {heroBadgeKeys.slice(8).map((key) => (
                  <span key={key} className="hero-badge-tertiary">{t(key)}</span>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-[var(--color-accent-secondary)]/10 rounded-2xl opacity-50 blur-sm group-hover:opacity-80 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />
                <YouTubePlayer videoId={HOME_CONFIG.hero.videoId} />
              </div>
              <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">{t('home_hero_trailer')}</p>
            </div>
          </div>
        </div>
      </section>

      {adKey && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <AdBanner type="native-banner" />
        </div>
      )}

      <div className="glow-line full-width-bg" />

      {/* ===== LATEST UPDATES ===== */}
      {latestContent.length > 0 && (
        <section className="py-12">
          <AutoScrollCarousel
            items={latestContent.slice(0, 10).map((item, i) => ({
              slug: item.slug,
              title: item.metadata.title || item.slug,
              description: item.metadata.description,
              image: item.metadata.image,
              path: item.path,
              isNew: i < 5,
            }))}
            readMoreText={t('read_more')}
            title={t('latest_updates')}
            priorityCount={3}
          />
        </section>
      )}

      {/* ===== FEATURED GUIDES (must exist per skill spec) ===== */}
      <section className="py-12">
        <AutoScrollCarousel
          items={allGuides.slice(0, 20).map((guide) => ({
            slug: guide.slug,
            title: guide.metadata.title || guide.slug,
            description: guide.metadata.description,
            image: guide.metadata.image,
            path: guide.path,
          }))}
          readMoreText={t('read_more')}
          title={t('featured_guides')}
          autoScroll={false}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 text-center">
          <Link href="/guides" className="text-sm font-semibold text-[var(--color-accent)] hover:underline">{t('explore_all_guides')} →</Link>
        </div>
      </section>

      {/* ===== START HERE ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="section-label">{t('home_start_label')}</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-[var(--font-heading)] gradient-text">{t('home_start_title')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed text-[0.9375rem]">{t('home_start_subtitle')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {startHereSteps.map((step, idx) => (
            <Link key={idx} href={step.href} className="module-card group block relative overflow-hidden">
              <div className="absolute top-3 right-3 text-4xl font-extrabold font-[var(--font-heading)] text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] opacity-30 group-hover:opacity-60 transition-opacity">{String(idx + 1).padStart(2, '0')}</div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-secondary)] flex items-center justify-center text-white font-bold text-sm mb-4">{idx + 1}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">{step.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-3">{step.desc}</p>
              <span className="text-xs text-[var(--color-accent)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {t('read_more')} <ChevronRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== MODULE CARDS ===== */}
      <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] full-width-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="section-label">{t('home_modules_label')}</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-[var(--font-heading)] gradient-text">{t('home_modules_title')}</h2>
          <p className="text-[var(--color-text-secondary)] mb-10 max-w-2xl leading-relaxed text-[0.9375rem]">{t('home_modules_subtitle')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {moduleCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.key} href={card.href} className="group block rounded-2xl bg-white/[0.03] border border-white/[0.08] p-6 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_30px_rgba(233,69,96,0.1)] transition-all duration-300 backdrop-blur-sm card-accent-bar">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent-secondary)]/20 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">{card.label}</span>
                  </div>
                  <h3 className="text-base font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">{card.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-4">{card.desc}</p>
                  <div className="flex gap-4 mb-4">
                    {card.stats.map((stat, i) => (
                      <div key={i} className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold font-[var(--font-heading)] text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-secondary)]">{stat.val}</span>
                        <span className="text-[10px] text-[var(--color-text-muted)]">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-accent)] flex items-center gap-1">
                    {t(card.ctaKey ?? 'home_module_default_cta')}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GAME OVERVIEW ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="section-label">{t('home_about_label')}</div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-[var(--font-heading)] gradient-text">{t('home_about_title')}</h2>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-3xl leading-relaxed text-[0.9375rem]">{t('home_about_p1')}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {gameFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-sm hover:border-[var(--color-accent)]/30 transition-all duration-300">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent)]/15 to-[var(--color-accent-secondary)]/15 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-sm font-bold mb-2">{feat.title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{t('home_about_p2')}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={resolveDynamic(HOME_CONFIG.gameOverview.cta.guideHref, dynCtx)} className="btn-primary">
                {t(HOME_CONFIG.gameOverview.cta.guideLabelKey)}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
              <a href={EXTERNAL_LINKS[HOME_CONFIG.gameOverview.cta.externalLinkKey as keyof typeof EXTERNAL_LINKS]} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t(HOME_CONFIG.gameOverview.cta.externalLabelKey)}</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {infoItems.map((item) => (
              <div key={item} className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
                <p className="text-xs text-[var(--color-text-muted)]">{t(`home_info_${item}`)}</p>
                <p className="font-bold text-sm text-[var(--color-text-primary)]">{t(`home_info_${item}_value`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {adKey && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center">
          <AdBanner type="banner-728x90" />
        </div>
      )}

      <div className="glow-line full-width-bg" />

      {/* ===== ENTITY TIER TABLE (Data-Driven Table 1) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label">{t('home_module_heroes')}</div>
            <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] gradient-text">{t('home_module_heroes_title')}</h2>
          </div>
          <Link href="/entities" className="text-sm font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1">{t('view_all')} <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{t('home_module_heroes_desc')}</p>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr_1fr] sm:grid-cols-[2.5rem_1.5fr_5rem_1fr_1fr] gap-x-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)] px-4 py-3">
            <span></span>
            <span>{t('entity_role_primary')}</span>
            <span>{t('home_module_tier_levels')}</span>
            <span>{t('entity_ailment_stalker')}</span>
            <span>{t('entity_faction_backrooms')}</span>
          </div>
          {heroes.map((hero: Hero, idx) => {
            const tc = tierColor(hero.tier);
            const Icon = HERO_ICONS[hero.id] || Skull;
            return (
              <Link key={hero.id} href="/entities" className="grid grid-cols-[2rem_1fr_1fr_1fr_1fr] sm:grid-cols-[2.5rem_1.5fr_5rem_1fr_1fr] items-center gap-x-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-[var(--color-accent)]/5 transition-colors group">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{idx + 1}</span>
                <span className="flex items-center gap-2 min-w-0">
                  <Icon className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                  <span className="font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors truncate">{translate(t, hero.nameKey) || hero.id}</span>
                </span>
                <span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: tc, background: `${tc}15` }}>{hero.tier}</span></span>
                <span className="text-xs text-[var(--color-text-secondary)]">{translate(t, hero.ailmentKey)}</span>
                <span className="text-xs text-[var(--color-text-secondary)]">{translate(t, hero.factionKey)}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== STATUS MECHANICS CARDS (Data-Driven Cards 1) ===== */}
      <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] full-width-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-label">{t('home_module_statusAilments')}</div>
              <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] gradient-text">{t('home_module_statusAilments_title')}</h2>
            </div>
            <Link href="/entities" className="text-sm font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1">{t('view_all')} <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{t('home_module_statusAilments_desc')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {statusAilments.map((ailment: StatusAilment) => {
              const ac = ailmentColor(ailment.id);
              const AilIcon = AILMENT_ICONS[ailment.id] || Skull;
              return (
                <Link key={ailment.id} href="/entities" className="block rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-sm hover:border-[var(--color-accent)]/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: ac, background: `${ac}15` }}>{t('tierList_tierLabel')} {ailment.tier}</span>
                    <AilIcon className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {translate(t, ailment.nameKey) || ailment.id}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">{translate(t, ailment.descKey)}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY TOOLS TABLE (Data-Driven Table 2) ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="section-label">{t('home_module_familiars')}</div>
            <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] gradient-text">{t('home_module_familiars_title')}</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1">{t('view_all')} <ArrowRight className="w-3 h-3" /></Link>
        </div>
        <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{t('home_module_familiars_desc')}</p>
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.08] overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-[2rem_1fr_1fr_1fr] sm:grid-cols-[2.5rem_1.5fr_5rem_1fr] gap-x-4 text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider border-b border-[var(--color-border)] px-4 py-3">
            <span></span>
            <span>{t('home_module_familiars')}</span>
            <span>{t('home_module_tier_levels')}</span>
            <span>{t('home_module_tool_cost')}</span>
          </div>
          {familiars.map((familiar: Familiar, idx) => {
            const badgeVal = translate(t, familiar.badgeKey);
            const badgeColor = familiar.tier === 'S' ? 'var(--color-accent-secondary)' : familiar.tier === 'A' ? 'var(--color-accent)' : 'var(--color-tier-b)';
            return (
              <Link key={familiar.id} href="/tools" className="grid grid-cols-[2rem_1fr_1fr_1fr] sm:grid-cols-[2.5rem_1.5fr_5rem_1fr] items-center gap-x-4 px-4 py-3 border-b border-white/[0.04] last:border-b-0 hover:bg-[var(--color-accent)]/5 transition-colors group">
                <span className="text-xs font-mono text-[var(--color-text-muted)]">{idx + 1}</span>
                <span className="flex items-center gap-2 min-w-0">
                  <span className="font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors truncate">{translate(t, familiar.nameKey) || familiar.id.replace(/-/g, ' ')}</span>
                </span>
                <span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: tierColor(familiar.tier), background: `${tierColor(familiar.tier)}15` }}>{familiar.tier}</span></span>
                <span><span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: badgeColor, background: `${badgeColor}15` }}>{badgeVal}</span></span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ===== STRATEGY TIER CARDS (Data-Driven Cards 2) ===== */}
      <section className="bg-[var(--color-bg-secondary)] border-y border-[var(--color-border)] full-width-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="section-label">{t('home_module_tierList')}</div>
              <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] gradient-text">{t('home_module_tierList_title')}</h2>
            </div>
            <Link href="/tier-list" className="text-sm font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1">{t('view_all')} <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{t('home_module_tierList_desc')}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {strategyTiers.map((strategy: StrategyTier) => {
              const tc = tierColor(strategy.tier);
              const StratIcon = STRATEGY_ICONS[strategy.id] || Shield;
              return (
                <Link key={strategy.id} href="/tier-list" className="block rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-sm hover:border-[var(--color-accent)]/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ color: tc, background: `${tc}15` }}>{t('tierList_tierLabel')} {strategy.tier}</span>
                    <StratIcon className="w-4 h-4 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {translate(t, strategy.nameKey) || strategy.id}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">{translate(t, strategy.descKey)}</p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">{strategy.bestFor}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="glow-line full-width-bg" />

      {/* ===== FAQ ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <div className="section-label justify-center">{t('section_faq')}</div>
          <h2 className="text-2xl md:text-3xl font-bold font-[var(--font-heading)] gradient-text">{t('home_faq_title')}</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqKeys.map((key) => (
            <details key={key} className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-sm group">
              <summary className="font-semibold cursor-pointer list-none flex items-center justify-between text-sm">
                {t(`faq_${key}`)}
                <span className="text-[var(--color-accent)] group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">{t(`faq_${key}_answer`)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="relative overflow-hidden py-16 full-width-bg">
        <div className="absolute inset-0 opacity-20 hero-bg" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[var(--color-accent)]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[var(--font-heading)] gradient-text">{t('home_cta_title')}</h2>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed">{t('home_cta_description')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href={resolveDynamic(HOME_CONFIG.bottomCta.guideHref, dynCtx)} className="btn-primary">
              {t(HOME_CONFIG.bottomCta.guideLabelKey)}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
            <a href={EXTERNAL_LINKS[HOME_CONFIG.bottomCta.externalLinkKey as keyof typeof EXTERNAL_LINKS]} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t(HOME_CONFIG.bottomCta.externalLabelKey)}</a>
          </div>
        </div>
      </section>

      {adKey && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex justify-center">
          <div className="hidden md:block">
            <AdBanner type="banner-728x90" />
          </div>
          <div className="block md:hidden">
            <AdBanner type="banner-468x60" />
          </div>
        </div>
      )}
    </div>
  );
}