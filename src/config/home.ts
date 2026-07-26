import {
  Skull, Crown, Map, Gamepad2, Flame, Users, Wrench,
  ScrollText, Code, BookOpen, type LucideIcon,
} from 'lucide-react';

export interface StatConfig {
  val: string;
  labelKey: string;
}

export interface ModuleCardConfig {
  key: string;
  labelKey: string;
  titleKey: string;
  descKey: string;
  href: string;
  stats: StatConfig[];
  icon: LucideIcon;
  ctaKey?: string;
}

export interface GameFeatureConfig {
  titleKey: string;
  descKey: string;
  icon: LucideIcon;
}

export interface StartHereStepConfig {
  titleKey: string;
  descKey: string;
  href: string;
}

export interface HeroCtaConfig {
  labelKey: string;
  href: string;
  style: 'primary' | 'secondary';
}

export const HOME_CONFIG = {
  hero: {
    videoId: '0HU7nDM4PvU',
    badgeKeys: [
      'home_hero_badge_earlyAccess',
      'home_hero_badge_platform',
      'home_hero_badge_clark',
      'home_hero_badge_backrooms',
      'home_hero_badge_genre',
    ],
    ctas: [
      { labelKey: 'home_hero_cta_guides', href: '/guides/beginner-guide', style: 'primary' as const },
      { labelKey: 'home_hero_cta_tierList', href: '/tier-list', style: 'secondary' as const },
      { labelKey: 'home_hero_cta_entities', href: '/entities', style: 'secondary' as const },
    ],
  },

  moduleCards: [
    { key: 'codes', labelKey: 'home_module_codes', titleKey: 'home_module_codes_title', descKey: 'home_module_codes_desc', href: '/codes', stats: [{ val: '0', labelKey: 'home_module_active_codes' }, { val: 'EA', labelKey: 'home_module_early_access' }], icon: Code, ctaKey: 'home_module_codes_cta' },
    { key: 'guides', labelKey: 'home_module_guides', titleKey: 'home_module_guides_title', descKey: 'home_module_guides_desc', href: '/guides', stats: [{ val: '__guideCount', labelKey: 'home_module_starter_pages' }, { val: 'A', labelKey: 'home_module_difficulty' }], icon: BookOpen, ctaKey: 'home_module_guides_cta' },
    { key: 'entities', labelKey: 'home_module_entities', titleKey: 'home_module_entities_title', descKey: 'home_module_entities_desc', href: '/entities', stats: [{ val: 'S', labelKey: 'home_module_clark_tier' }, { val: '1+', labelKey: 'home_module_tracked_entities' }], icon: Skull },
    { key: 'tier-list', labelKey: 'home_module_tierList', titleKey: 'home_module_tierList_title', descKey: 'home_module_tierList_desc', href: '/tier-list', stats: [{ val: 'S-A-B-C', labelKey: 'home_module_tier_levels' }, { val: '4+', labelKey: 'home_module_rated_strategies' }], icon: Crown },
    { key: 'map', labelKey: 'home_module_map', titleKey: 'home_module_map_title', descKey: 'home_module_map_desc', href: '/map', stats: [{ val: '5+', labelKey: 'home_module_corridor_types' }, { val: '1', labelKey: 'home_module_main_entity' }], icon: Map },
    { key: 'controls', labelKey: 'home_module_controls', titleKey: 'home_module_controls_title', descKey: 'home_module_controls_desc', href: '/controls', stats: [{ val: '2', labelKey: 'home_module_movement_modes' }, { val: '1', labelKey: 'home_module_light_source' }], icon: Gamepad2 },
    { key: 'updates', labelKey: 'home_module_updates', titleKey: 'home_module_updates_title', descKey: 'home_module_updates_desc', href: '/updates', stats: [{ val: 'Jul 26', labelKey: 'home_module_last_patch' }, { val: 'EA', labelKey: 'home_module_early_access' }], icon: Flame },
    { key: 'multiplayer', labelKey: 'home_module_multiplayer', titleKey: 'home_module_multiplayer_title', descKey: 'home_module_multiplayer_desc', href: '/multiplayer', stats: [{ val: '50', labelKey: 'home_module_server_size' }, { val: '6K+', labelKey: 'home_module_current_players' }], icon: Users },
    { key: 'tools', labelKey: 'home_module_tools', titleKey: 'home_module_tools_title', descKey: 'home_module_tools_desc', href: '/tools', stats: [{ val: '4+', labelKey: 'home_module_community_tools' }, { val: 'Free', labelKey: 'home_module_tool_cost' }], icon: Wrench },
    { key: 'comparison', labelKey: 'home_module_comparison', titleKey: 'home_module_comparison_title', descKey: 'home_module_comparison_desc', href: '/comparison', stats: [{ val: '2+', labelKey: 'home_module_games_compared' }, { val: 'S', labelKey: 'home_module_audio_priority' }], icon: ScrollText },
  ] as ModuleCardConfig[],

  gameFeatures: [
    { titleKey: 'home_feature_serverLock', descKey: 'home_feature_serverLock_desc', icon: Users },
    { titleKey: 'home_feature_clarkStalker', descKey: 'home_feature_clarkStalker_desc', icon: Skull },
    { titleKey: 'home_feature_audioFirst', descKey: 'home_feature_audioFirst_desc', icon: Gamepad2 },
    { titleKey: 'home_feature_flashlight', descKey: 'home_feature_flashlight_desc', icon: Map },
  ] as GameFeatureConfig[],

  startHereSteps: [
    { titleKey: 'home_start_1_title', descKey: 'home_start_1_desc', href: '/guides/beginner-guide' },
    { titleKey: 'home_start_2_title', descKey: 'home_start_2_desc', href: '/entities' },
    { titleKey: 'home_start_3_title', descKey: 'home_start_3_desc', href: '/controls' },
    { titleKey: 'home_start_4_title', descKey: 'home_start_4_desc', href: '/tier-list' },
    { titleKey: 'home_start_5_title', descKey: 'home_start_5_desc', href: '/multiplayer' },
  ] as StartHereStepConfig[],

  gameOverview: {
    infoItems: ['developer', 'platform', 'genre', 'releaseDate', 'serverSize', 'accessType'],
    cta: {
      guideLabelKey: 'home_about_cta',
      guideHref: '/guides',
      externalLabelKey: 'home_cta_play',
      externalLinkKey: 'roblox',
    },
  },

  faq: {
    keys: ['isFree', 'serverLock', 'clarkHow', 'flashlight', 'earlyAccess', 'multiplayer', 'gameLength', 'audioPriority', 'gamePasses'],
  },

  bottomCta: {
    guideHref: '/guides/beginner-guide',
    guideLabelKey: 'home_cta_guide',
    externalLinkKey: 'roblox',
    externalLabelKey: 'home_cta_play',
  },
};
