const i18n = new Map<string, string>([
  ['skitouring', 'Ski de randonnée'],
  ['snow_ice_mixed', 'Neige, glace, mixte'],
  ['mountain_climbing', 'Rocher haute montagne'],
  ['rock_climbing', 'Escalade'],
  ['ice_climbing', 'Cascade de glace'],
  ['hiking', 'Randonnée'],
  ['snowshoeing', 'Raquettes'],
  ['paragliding', 'Parapente'],
  ['mountain_biking', 'VTT'],
  ['via_ferrata', 'Via ferrata'],
  ['slacklining', 'Slackline'],

  ['severity_no', 'Pas de blessure'],
  ['1d_to_3d', 'De 1 à 3 jours'],
  ['4d_to_1m', 'De 4 jours à 1 mois'],
  ['1m_to_3m', 'De 1 à 3 mois'],
  ['more_than_3m', 'Supérieur à 3 mois'],

  ['avalanche', 'Avalanche'],
  ['stone_fall', 'Chute de pierre'],
  ['falling_ice', 'Chute de glace'],
  ['person_fall', "Chute d'une personne"],
  ['crevasse_fall', 'Chute en crevasse'],
  ['roped_fall', 'Chute encordé'],
  ['physical_failure', 'Défaillance physique'],
  ['lightning', 'Foudre'],
  ['other', 'Autre'],

  ['level_1', '1 - faible'],
  ['level_2', '2 - limité'],
  ['level_3', '3 - marqué'],
  ['level_4', '4 - fort'],
  ['level_5', '5 - très fort'],
  ['level_na', 'Niveau non renseigné'],

  ['slope_lt_30', 'Pente inférieure à 30°'],
  ['slope_30_35', 'Pente de 30 à 35°'],
  ['slope_35_40', 'Pente de 35 à 40°'],
  ['slope_40_45', 'Pente de 40 à 45°'],
  ['slope_gt_45', 'Pente supérieure à 45°'],

  ['male', 'Homme'],
  ['female', 'Femme'],

  ['primary_impacted', 'Victime principale'],
  ['secondary_impacted', 'Victime secondaire'],
  ['internal_witness', 'Témoin direct'],
  ['external_witness', 'Témoin indirect'],

  ['non_autonomous', 'Non autonome'],
  ['autonomous', 'Autonome'],
  ['initiator', 'Débrouillé'],
  ['expert', 'Expert'],

  ['nb_outings_4', 'De 0 à 4'],
  ['nb_outings_9', 'De 5 à 9'],
  ['nb_outings_14', 'De 10 à 14'],
  ['nb_outings_15', '15 et plus'],

  ['activity_rate_150', 'Au moins 3 fois par semaine'],
  ['activity_rate_50', '1 à 2 fois par semaine'],
  ['activity_rate_30', '2 à 3 fois par mois'],
  ['activity_rate_20', '1 fois par mois'],
  ['activity_rate_10', "Moins d'une fois par mois"],
  ['activity_rate_5', "Moins d'une fois par an"],
  ['activity_rate_1', 'Première fois de sa vie'],

  ['no', 'Non'],
  ['previous_injuries_2', 'Autres blessures'],
  ['previous_injuries_3', 'Autres blessures'],
]);

export default i18n;
