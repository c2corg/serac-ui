export default interface Report {
  id: number;
  validated: boolean;
  custom: Record<string, any>;
  elevation?: number;
  nb_participants?: number;
  geometry?: string;
  age?: number;
  autonomy?: 'non_autonomous' | 'autonomous' | 'initiator' | 'expert';
  avalanche_slope?:
    | 'slope_lt_30'
    | 'slope_30_35'
    | 'slope_35_40'
    | 'slope_40_45'
    | 'slope_gt_45';
  activities?: (
    | 'skitouring'
    | 'snow_ice_mixed'
    | 'mountain_climbing'
    | 'rock_climbing'
    | 'ice_climbing'
    | 'hiking'
    | 'snowshoeing'
    | 'paragliding'
    | 'mountain_biking'
    | 'via_ferrata'
    | 'slacklining'
  )[];
  nb_outings?:
    | 'nb_outings_4'
    | 'nb_outings_9'
    | 'nb_outings_14'
    | 'nb_outings_15';
  gender?: 'male' | 'female';
  nb_impacted?: number;
  date?: string; //!
  rescue?: boolean;
  author_status?:
    | 'primary_impacted'
    | 'secondary_impacted'
    | 'internal_witness'
    | 'external_witness';
  event_type: (
    | 'avalanche'
    | 'stone_fall'
    | 'falling_ice'
    | 'person_fall'
    | 'crevasse_fall'
    | 'roped_fall'
    | 'physical_failure'
    | 'lightning'
    | 'other'
  )[];
  severity?:
    | 'severity_no'
    | '1d_to_3d'
    | '4d_to_1m'
    | '1m_to_3m'
    | 'more_than_3m';
  activity_rate?:
    | 'activity_rate_150'
    | 'activity_rate_50'
    | 'activity_rate_30'
    | 'activity_rate_20'
    | 'activity_rate_10'
    | 'activity_rate_5'
    | 'activity_rate_1';
  previous_injuries?: 'no' | 'previous_injuries_2' | 'previous_injuries_3';
  avalanche_level?:
    | 'level_1'
    | 'level_2'
    | 'level_3'
    | 'level_4'
    | 'level_5'
    | 'level_na';
  locales: Locale[];
}

export interface Locale {
  modifications?: string;
  motivations?: string;
  training?: string;
  place?: string;
  route_study?: string;
  summary?: string;
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
