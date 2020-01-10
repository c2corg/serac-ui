export default interface Report {
  id: string;
  validated: boolean;
  custom: Record<string, any>;
  elevation?: number;
  nb_participants?: number;
  geometry?: string;
  age?: number;
  autonomy?: Autonomy;
  avalanche_slope?: AvalancheSlope;
  event_activity: EventActivity;
  gender?: Gender;
  nb_impacted?: number;
  date?: string;
  rescue?: boolean;
  author_status?: AuthorStatus;
  event_type?: EventType;
  severity?: Severity;
  activity_rate?: ActivityRate;
  previous_injuries?: PreviousInjuries;
  avalanche_level?: AvalancheLevel;
  supervision?: Supervision;
  qualification?: Qualification;
  locales: Locale[];
}

export interface Locale {
  modifications?: string;
  motivations?: string;
  training?: string;
  place?: string;
  route_study?: string;
  safety?: string;
  description?: string;
  reduce_impact?: string;
  risk?: string;
  title: string;
  other_comments?: string;
  increase_impact?: string;
  time_management?: string;
  conditions?: string;
  group_management?: string;
}

export const ALL_EVENT_ACTIVITIES = [
  'sport_climbing',
  'multipitch_climbing',
  'alpine_climbing',
  'snow_ice_mixed',
  'ice_climbing',
  'skitouring',
  'other',
];

export type EventActivity =
  | 'sport_climbing'
  | 'multipitch_climbing'
  | 'alpine_climbing'
  | 'snow_ice_mixed'
  | 'ice_climbing'
  | 'skitouring'
  | 'other';

export const ALL_SEVERITIES = [
  'severity_no',
  '1d_to_3d',
  '4d_to_1m',
  '1m_to_3m',
  'more_than_3m',
];

export type Severity =
  | 'severity_no'
  | '1d_to_3d'
  | '4d_to_1m'
  | '1m_to_3m'
  | 'more_than_3m';

export const ALL_EVENT_TYPES = [
  'avalanche',
  'stone_ice_fall',
  'ice_cornice_collapse',
  'person_fall',
  'crevasse_fall',
  'physical_failure',
  'injury_without_fall',
  'blocked_person',
  'weather_event',
  'safety_operation',
  'critical_situation',
  'other',
];

export type EventType =
  | 'avalanche'
  | 'stone_ice_fall'
  | 'ice_cornice_collapse'
  | 'person_fall'
  | 'crevasse_fall'
  | 'physical_failure'
  | 'injury_without_fall'
  | 'blocked_person'
  | 'weather_event'
  | 'safety_operation'
  | 'critical_situation'
  | 'other';

export const ALL_AVALANCHE_LEVELS = [
  'level_1',
  'level_2',
  'level_3',
  'level_4',
  'level_5',
  'level_na',
];

export type AvalancheLevel =
  | 'level_1'
  | 'level_2'
  | 'level_3'
  | 'level_4'
  | 'level_5'
  | 'level_na';

export const ALL_AVALANCHE_SLOPES = [
  'slope_lt_30',
  'slope_30_35',
  'slope_35_40',
  'slope_40_45',
  'slope_gt_45',
];
export type AvalancheSlope =
  | 'slope_lt_30'
  | 'slope_30_35'
  | 'slope_35_40'
  | 'slope_40_45'
  | 'slope_gt_45';

export const ALL_GENDERS = ['male', 'female'];

export type Gender = 'male' | 'female';

export const ALL_AUTHOR_STATUSES = [
  'primary_impacted',
  'secondary_impacted',
  'internal_witness',
  'external_witness',
];

export type AuthorStatus =
  | 'primary_impacted'
  | 'secondary_impacted'
  | 'internal_witness'
  | 'external_witness';

export const ALL_AUTONOMIES = ['non_autonomous', 'autonomous', 'expert'];

export type Autonomy = 'non_autonomous' | 'autonomous' | 'expert';

export const ALL_ACTIVITY_RATES = [
  'activity_rate_y5',
  'activity_rate_m2',
  'activity_rate_w1',
];

export type ActivityRate =
  | 'activity_rate_y5'
  | 'activity_rate_m2'
  | 'activity_rate_w1';

export const ALL_PREVIOUS_INJURIES = [
  'no',
  'previous_injuries_2',
  'previous_injuries_3',
];

export type PreviousInjuries =
  | 'no'
  | 'previous_injuries_2'
  | 'previous_injuries_3';

export const ALL_SUPERVISIONS = [
  'no_supervision',
  'federal_supervision',
  'professional_supervision',
];

export type Supervision =
  | 'no_supervision'
  | 'federal_supervision'
  | 'professional_supervision';

export const ALL_QUALIFICATIONS = [
  'federal_supervisor',
  'federal_trainer',
  'professional_diploma',
];

export type Qualification =
  | 'federal_supervisor'
  | 'federal_trainer'
  | 'professional_diploma';
