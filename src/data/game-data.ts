import { Skull, Footprints, Eye, Headphones, Battery, Users, Zap, Droplets, Wind, Snowflake, Shield, Flame, Mountain, Sparkles, BookOpen, Crown, ArrowRight, Map, Gamepad2, Wrench, ScrollText, Code, Radio, Lock, type LucideIcon } from 'lucide-react';

/* ──────────────── Entity Interface (Clark as hero — primary stalker) ──────────────── */
export interface Hero {
  id: string;
  nameKey: string;
  tier: string;
  elementKey: string;
  ailmentKey: string;
  roleKey: string;
  factionKey: string;
  icon: LucideIcon;
}

export const heroes: Hero[] = [
  { id: 'clark', nameKey: 'entity_clark', tier: 'S', elementKey: 'entity_element_audio', ailmentKey: 'entity_ailment_stalker', roleKey: 'entity_role_primary', factionKey: 'entity_faction_backrooms', icon: Skull },
];

/* ──────────────── Status Ailment Interface (audio tells / runtime mechanics) ──────────────── */
export interface StatusAilment {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  effectKey: string;
  heroesKey: string;
  icon: LucideIcon;
}

export const statusAilments: StatusAilment[] = [
  { id: 'audio-tracking', nameKey: 'entity_ailment_audioTracking', tier: 'S', descKey: 'entity_audioTracking_desc', effectKey: 'entity_audioTracking_effect', heroesKey: 'entity_audioTracking_trigger', icon: Headphones },
  { id: 'flashlight-spotted', nameKey: 'entity_ailment_flashlightSpotted', tier: 'A', descKey: 'entity_flashlightSpotted_desc', effectKey: 'entity_flashlightSpotted_effect', heroesKey: 'entity_flashlightSpotted_trigger', icon: Battery },
  { id: 'line-of-sight', nameKey: 'entity_ailment_lineOfSight', tier: 'A', descKey: 'entity_lineOfSight_desc', effectKey: 'entity_lineOfSight_effect', heroesKey: 'entity_lineOfSight_trigger', icon: Eye },
  { id: 'breathing-cadence', nameKey: 'entity_ailment_breathingCadence', tier: 'A', descKey: 'entity_breathingCadence_desc', effectKey: 'entity_breathingCadence_effect', heroesKey: 'entity_breathingCadence_trigger', icon: Radio },
  { id: 'server-locked', nameKey: 'entity_ailment_serverLocked', tier: 'S', descKey: 'entity_serverLocked_desc', effectKey: 'entity_serverLocked_effect', heroesKey: 'entity_serverLocked_trigger', icon: Lock },
];

/* ──────────────── Familiar Interface (community tools alias) ──────────────── */
export interface Familiar {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  abilityKey: string;
  sourceKey: string;
  badgeKey: string;
  icon: LucideIcon;
}

export const familiars: Familiar[] = [
  { id: 'audio-trainer', nameKey: 'tool_audioTrainer', tier: 'S', descKey: 'tool_audioTrainer_desc', abilityKey: 'tool_audioTrainer_ability', sourceKey: 'tool_source_community', badgeKey: 'tool_cost_free', icon: Headphones },
  { id: 'battery-calc', nameKey: 'tool_batteryCalc', tier: 'A', descKey: 'tool_batteryCalc_desc', abilityKey: 'tool_batteryCalc_ability', sourceKey: 'tool_source_community', badgeKey: 'tool_cost_free', icon: Battery },
  { id: 'server-tracker', nameKey: 'tool_serverTracker', tier: 'A', descKey: 'tool_serverTracker_desc', abilityKey: 'tool_serverTracker_ability', sourceKey: 'tool_source_official', badgeKey: 'tool_cost_free', icon: Users },
  { id: 'corridor-mapper', nameKey: 'tool_corridorMapper', tier: 'B', descKey: 'tool_corridorMapper_desc', abilityKey: 'tool_corridorMapper_ability', sourceKey: 'tool_source_community', badgeKey: 'tool_cost_free', icon: Map },
];

/* ──────────────── Entity (rich structure for Clark variants) ──────────────── */
export interface Entity {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  behaviorKey: string;
  counterKey: string;
  audioTellKey: string;
  icon: LucideIcon;
}

export const entities: Entity[] = [
  {
    id: 'clark',
    nameKey: 'entity_clark',
    tier: 'S',
    descKey: 'entity_clark_desc',
    behaviorKey: 'entity_clark_behavior',
    counterKey: 'entity_clark_counter',
    audioTellKey: 'entity_clark_audioTell',
    icon: Skull,
  },
];

/* ──────────────── Strategy Tier Interface ──────────────── */
export interface StrategyTier {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  bestFor: string;
  badge: string;
}

export const strategyTiers: StrategyTier[] = [
  {
    id: 'controlled-retreat',
    nameKey: 'strategy_controlledRetreat',
    tier: 'S',
    descKey: 'strategy_controlledRetreat_desc',
    bestFor: 'Squad coordination, audio-first',
    badge: 'Recommended',
  },
  {
    id: 'silent-run',
    nameKey: 'strategy_silentRun',
    tier: 'A',
    descKey: 'strategy_silentRun_desc',
    bestFor: 'Solo runs, low-stamina situations',
    badge: 'Strong',
  },
  {
    id: 'audio-first',
    nameKey: 'strategy_audioFirst',
    tier: 'A',
    descKey: 'strategy_audioFirst_desc',
    bestFor: 'All players — fundamental discipline',
    badge: 'Core',
  },
  {
    id: 'panic-sprint',
    nameKey: 'strategy_panicSprint',
    tier: 'C',
    descKey: 'strategy_panicSprint_desc',
    bestFor: 'Emergency-only — burns stamina and exposes position',
    badge: 'Avoid',
  },
];

/* ──────────────── Corridor Type Interface ──────────────── */
export interface CorridorType {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  dangerKey: string;
  icon: LucideIcon;
}

export const corridorTypes: CorridorType[] = [
  {
    id: 'long-hall',
    nameKey: 'corridor_longHall',
    tier: 'S',
    descKey: 'corridor_longHall_desc',
    dangerKey: 'corridor_longHall_danger',
    icon: Eye,
  },
  {
    id: 't-junction',
    nameKey: 'corridor_tJunction',
    tier: 'A',
    descKey: 'corridor_tJunction_desc',
    dangerKey: 'corridor_tJunction_danger',
    icon: Footprints,
  },
  {
    id: 'dead-end',
    nameKey: 'corridor_deadEnd',
    tier: 'C',
    descKey: 'corridor_deadEnd_desc',
    dangerKey: 'corridor_deadEnd_danger',
    icon: Eye,
  },
  {
    id: 'junction-cluster',
    nameKey: 'corridor_junctionCluster',
    tier: 'B',
    descKey: 'corridor_junctionCluster_desc',
    dangerKey: 'corridor_junctionCluster_danger',
    icon: Map,
  },
  {
    id: 'open-room',
    nameKey: 'corridor_openRoom',
    tier: 'S',
    descKey: 'corridor_openRoom_desc',
    dangerKey: 'corridor_openRoom_danger',
    icon: Mountain,
  },
];

/* ──────────────── Community Tools (full list) ──────────────── */
export interface CommunityTool {
  id: string;
  nameKey: string;
  tier: string;
  descKey: string;
  costKey: string;
  icon: LucideIcon;
}

export const communityTools: CommunityTool[] = [
  {
    id: 'audio-trainer',
    nameKey: 'tool_audioTrainer',
    tier: 'S',
    descKey: 'tool_audioTrainer_desc',
    costKey: 'tool_cost_free',
    icon: Headphones,
  },
  {
    id: 'battery-calc',
    nameKey: 'tool_batteryCalc',
    tier: 'A',
    descKey: 'tool_batteryCalc_desc',
    costKey: 'tool_cost_free',
    icon: Battery,
  },
  {
    id: 'server-tracker',
    nameKey: 'tool_serverTracker',
    tier: 'A',
    descKey: 'tool_serverTracker_desc',
    costKey: 'tool_cost_free',
    icon: Users,
  },
  {
    id: 'corridor-mapper',
    nameKey: 'tool_corridorMapper',
    tier: 'B',
    descKey: 'tool_corridorMapper_desc',
    costKey: 'tool_cost_free',
    icon: Map,
  },
];

/* ──────────────── Color Maps (horror palette — navy/yellow/red) ──────────────── */
export const TIER_COLOR_MAP: Record<string, string> = {
  S: 'var(--color-tier-s)',
  A: 'var(--color-tier-a)',
  B: 'var(--color-tier-b)',
  C: 'var(--color-tier-c)',
};

export const AILMENT_COLOR_MAP: Record<string, string> = {
  'audio-tracking': 'var(--color-accent)',
  'flashlight-spotted': 'var(--color-accent-secondary)',
  'line-of-sight': 'var(--color-accent)',
  'breathing-cadence': 'var(--color-accent-secondary)',
  'server-locked': 'var(--color-accent)',
};

export const FACTION_COLOR_MAP: Record<string, string> = {
  backrooms: 'var(--color-accent-secondary)',
};

export const CORRIDOR_COLOR_MAP: Record<string, string> = {
  'long-hall': 'var(--color-accent)',
  't-junction': 'var(--color-accent-secondary)',
  'dead-end': 'var(--color-tier-c)',
  'junction-cluster': 'var(--color-tier-b)',
  'open-room': 'var(--color-accent)',
};

export function tierColor(tier: string): string {
  return TIER_COLOR_MAP[tier] ?? 'var(--color-tier-c)';
}

export function ailmentColor(ailment: string): string {
  return AILMENT_COLOR_MAP[ailment] ?? 'var(--color-accent)';
}

export function factionColor(faction: string): string {
  return FACTION_COLOR_MAP[faction] ?? 'var(--color-accent-secondary)';
}

export function corridorColor(id: string): string {
  return CORRIDOR_COLOR_MAP[id] ?? 'var(--color-accent)';
}

/* ──────────────── Entity Icon Map ──────────────── */
export const HERO_ICONS: Record<string, LucideIcon> = {
  clark: Skull,
};

export const CORRIDOR_ICONS: Record<string, LucideIcon> = {
  'long-hall': Eye,
  't-junction': Footprints,
  'dead-end': Eye,
  'junction-cluster': Map,
  'open-room': Mountain,
};

export const STRATEGY_ICONS: Record<string, LucideIcon> = {
  'controlled-retreat': Shield,
  'silent-run': Footprints,
  'audio-first': Headphones,
  'panic-sprint': Zap,
};

export const TOOL_ICONS: Record<string, LucideIcon> = {
  'audio-trainer': Headphones,
  'battery-calc': Battery,
  'server-tracker': Users,
  'corridor-mapper': Map,
};

/* ──────────────── Module Map (for explore grid) — slugs match existing routes ──────────────── */
export interface ExploreModule {
  key: 'codes' | 'guides' | 'entities' | 'tier-list' | 'map' | 'controls' | 'updates' | 'multiplayer' | 'tools' | 'comparison';
  labelKey: string;
  titleKey: string;
  descKey: string;
  href: string;
  icon: LucideIcon;
  stat1Key: string;
  stat2Key: string;
}

export const exploreModules: ExploreModule[] = [
  { key: 'codes', labelKey: 'home_module_codes', titleKey: 'home_module_codes_title', descKey: 'home_module_codes_desc', href: '/codes', icon: Code, stat1Key: 'home_module_active_codes', stat2Key: 'home_module_early_access' },
  { key: 'guides', labelKey: 'home_module_guides', titleKey: 'home_module_guides_title', descKey: 'home_module_guides_desc', href: '/guides', icon: BookOpen, stat1Key: 'home_module_starter_pages', stat2Key: 'home_module_difficulty' },
  { key: 'entities', labelKey: 'home_module_entities', titleKey: 'home_module_entities_title', descKey: 'home_module_entities_desc', href: '/entities', icon: Skull, stat1Key: 'home_module_clark_tier', stat2Key: 'home_module_tracked_entities' },
  { key: 'tier-list', labelKey: 'home_module_tierList', titleKey: 'home_module_tierList_title', descKey: 'home_module_tierList_desc', href: '/tier-list', icon: Crown, stat1Key: 'home_module_tier_levels', stat2Key: 'home_module_rated_strategies' },
  { key: 'map', labelKey: 'home_module_map', titleKey: 'home_module_map_title', descKey: 'home_module_map_desc', href: '/map', icon: Map, stat1Key: 'home_module_corridor_types', stat2Key: 'home_module_main_entity' },
  { key: 'controls', labelKey: 'home_module_controls', titleKey: 'home_module_controls_title', descKey: 'home_module_controls_desc', href: '/controls', icon: Gamepad2, stat1Key: 'home_module_movement_modes', stat2Key: 'home_module_light_source' },
  { key: 'updates', labelKey: 'home_module_updates', titleKey: 'home_module_updates_title', descKey: 'home_module_updates_desc', href: '/updates', icon: Flame, stat1Key: 'home_module_last_patch', stat2Key: 'home_module_early_access' },
  { key: 'multiplayer', labelKey: 'home_module_multiplayer', titleKey: 'home_module_multiplayer_title', descKey: 'home_module_multiplayer_desc', href: '/multiplayer', icon: Users, stat1Key: 'home_module_server_size', stat2Key: 'home_module_current_players' },
  { key: 'tools', labelKey: 'home_module_tools', titleKey: 'home_module_tools_title', descKey: 'home_module_tools_desc', href: '/tools', icon: Wrench, stat1Key: 'home_module_community_tools', stat2Key: 'home_module_tool_cost' },
  { key: 'comparison', labelKey: 'home_module_comparison', titleKey: 'home_module_comparison_title', descKey: 'home_module_comparison_desc', href: '/comparison', icon: ScrollText, stat1Key: 'home_module_games_compared', stat2Key: 'home_module_audio_priority' },
];
