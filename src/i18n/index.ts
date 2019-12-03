import Vue from 'vue';
import VueI18n, { LocaleMessages } from 'vue-i18n';

export const messages: LocaleMessages = {
  fr: {
    required: 'Ce champ est obligatoire',
    button: {
      cancel: 'Annuler',
      edit: 'Éditer',
      new: 'Ajouter un nouveau rapport',
      submit: 'Soumettre',
      validate: 'Publier sur camptcamp.org',
    },
    error: { default: 'Un erreur est survenue', reload: 'Recharger la page' },
    field: {
      activities: {
        label: 'Activités',
        values: {
          skitouring: 'Ski de randonnée',
          snow_ice_mixed: 'Neige, glace, mixte',
          mountain_climbing: 'Rocher haute montagne',
          rock_climbing: 'Escalade',
          ice_climbing: 'Cascade de glace',
          hiking: 'Randonnée',
          snowshoeing: 'Raquettes',
          paragliding: 'Parapente',
          mountain_biking: 'VTT',
          via_ferrata: 'Via ferrata',
          slacklining: 'Slackline',
        },
      },
      activity_rate: {
        label: "Fréquence de pratique dans l'activité",
        values: {
          activity_rate_150: 'Au moins 3 fois par semaine',
          activity_rate_50: '1 à 2 fois par semaine',
          activity_rate_30: '2 à 3 fois par mois',
          activity_rate_20: '1 fois par mois',
          activity_rate_10: "Moins d'une fois par mois",
          activity_rate_5: "Moins d'une fois par an",
          activity_rate_1: 'Première fois de sa vie',
        },
      },
      age: { label: 'Âge' },
      author_status: {
        label: 'Implication dans la situation',
        values: {
          primary_impacted: 'Victime principale',
          secondary_impacted: 'Victime secondaire',
          internal_witness: 'Témoin direct',
          external_witness: 'Témoin indirect',
        },
      },
      autonomy: {
        label: 'Niveau de pratique',
        values: {
          non_autonomous: 'Non autonome',
          autonomous: 'Autonome',
          initiator: 'Débrouillé',
          expert: 'Expert',
        },
      },
      avalanche_level: {
        label: "Niveau de risque d'avalanche",
        values: {
          level_1: '1 - faible',
          level_2: '2 - limité',
          level_3: '3 - marqué',
          level_4: '4 - fort',
          level_5: '5 - très fort',
          level_na: 'Niveau non renseigné',
        },
      },
      avalanche_slope: {
        label: 'Pente de la zone de départ',
        values: {
          slope_lt_30: 'Pente inférieure à 30°',
          slope_30_35: 'Pente de 30 à 35°',
          slope_35_40: 'Pente de 35 à 40°',
          slope_40_45: 'Pente de 40 à 45°',
          slope_gt_45: 'Pente supérieure à 45°',
        },
      },
      date: {
        label: 'Date',
        placeholder: 'Cliquez pour choisir la date',
      },
      description: {
        label: 'Description',
        placeholder:
          "Décrivez le déroulement de la sortie et de l'incident/accident. Si vous avez déjà saisi une sortie, vous pouvez décrire uniquement l'évènement, puis associez ce compte-rendu à la sortie.",
      },
      conditions: {
        label: 'Conditions',
        placeholder:
          "Décrivez les informations récoltées avant la sortie et le suivi de leur évolution sur le terrain. Cela concerne les prévisions météo, les bulletins d'évaluation du risque d'avalanche, la qualité du regel, la qualité de la neige/glace/rocher, les compte rendu des jours précédents, etc.",
      },
      elevation: { label: 'Altitude' },
      event_type: {
        label: "Type d'évènement",
        values: {
          avalanche: 'Avalanche',
          stone_fall: 'Chute de pierre',
          falling_ice: 'Chute de glace',
          person_fall: "Chute d'une personne",
          crevasse_fall: 'Chute en crevasse',
          roped_fall: 'Chute encordé',
          physical_failure: 'Défaillance physique',
          lightning: 'Foudre',
          other: 'Autre',
        },
      },
      gender: {
        label: 'Sexe',
        values: {
          male: 'Homme',
          female: 'Femme',
        },
      },
      group_management: {
        label: 'Gestion du groupe',
        placeholder:
          'Communication des objectifs et attentes de chacun, des craintes et observations en cours de sortie, briefing pour établir de nouvelles stratégies, éléments de conduite de groupe et de responsabilités, groupe habitué à fonctionner ensemble ou non, émulation, etc.',
      },
      increase_impact: {
        label: 'Eléments ayant aggravé les conséquences de l’événement',
      },
      modifications: {
        label: 'Conséquences sur les pratiques',
        placeholder:
          'Cet évènement a-t-il modifié vos habitudes ? Quels enseignements en avez-vous tiré ?',
      },
      motivations: {
        label: 'Motivations',
        placeholder:
          "Pourquoi avoir choisi cette sortie ? A quel point étiez-vous attaché à l'objectif fixé ? Considérez l'influence de possibles choix effectués en amont (jours de congés, long trajet, réservations de nuitées...), des efforts réalisés jusque-là, de la rareté de l'opportunité, etc.",
      },
      nb_impacted: { label: 'Nombre de personnes touchées' },
      nb_outings: {
        label: 'Nombre de sorties',
        values: {
          nb_outings_4: 'De 0 à 4',
          nb_outings_9: 'De 5 à 9',
          nb_outings_14: 'De 10 à 14',
          nb_outings_15: '15 et plus',
        },
      },
      nb_participants: { label: 'Nombre de participants' },
      other_comments: {
        label: 'Conséquences physiques et autres commentaires',
        placeholder:
          "Décrivez brièvement les blessures éventuelles, et ce que vous feriez aujourd'hui avec du recul. Les commentaires qui n'entrent dans aucun autre champ peuvent être saisis ici.",
      },
      place: {
        label: 'Lieu',
        placeholder:
          "Information sur la localisation de l'incident. Positionner la localisation sur la carte ci-dessus, même de manière peu précise (auquel cas vous pouvez ajouter plus de détails dans ce champ). Après avoir complété le rapport, vous pouvez associer un itinéraire, un point de passage ou une sortie.",
      },
      previous_injuries: {
        label: 'Blessures antérieures',
        values: {
          no: 'Non',
          previous_injuries_2: 'Autres blessures',
          previous_injuries_3: 'Autres blessures',
        },
      },
      reduce_impact: {
        label: "Éléments ayant atténué les conséquences de l'évènement",
      },
      rescue: {
        label: 'Intervention des services de secours',
        values: {
          true: 'Oui',
          false: 'Non',
          null: "Pas d'information",
        },
      },
      risk_study: {
        label: "Niveau de l'attention et évaluation des risques",
        placeholder:
          "Avez-vous (ré)évalué les risques à chaque changement de situation ?&#10;Considérez des facteurs qui ont pu influencer votre niveau d'attention tels que la fatigue, le stress, la baisse d'attention une fois les difficultés passées ou à la descente, un secteur connu ou réputé facile, la présence de traces ou d'autres personnes, une confiance totale dans le responsable du groupe, etc.",
      },
      route_study: {
        label: "Éude de l'itinéraire",
        placeholder:
          'Carte, topos, connaissance de l’itinéraire, anticipation d’un plan B, réévaluation de l’itinéraire en cours de sortie ?',
      },
      safety: {
        label: 'Mesures et techniques de sécurité mises en oeuvre',
        placeholder:
          "Type d'assurage et de protection, vérifications entre grimpeurs, tests de stabilité du manteau neigeux, test des DVA, etc.",
      },
      severity: {
        label: 'Gravité',
        values: {
          severity_no: 'Pas de blessure',
          '1d_to_3d': 'De 1 à 3 jours',
          '4d_to_1m': 'De 4 jours à 1 mois',
          '1m_to_3m': 'De 1 à 3 mois',
          more_than_3m: 'Supérieur à 3 mois',
        },
      },
      time_management: {
        label: "Gestion de l'horaire",
        placeholder:
          "Un horaire avait-il été prévu ? A t-il été tenu ? La gestion du temps a t-elle eu une influence sur le déclenchement de l'événement ?",
      },
      title: {
        label: 'Titre',
      },
      training: {
        label: 'Préparation physique et niveau technique',
        placeholder:
          'Décrivez votre niveau technique et expérience par rapport à l’objectif choisi, votre condition physique, la fatigue accumulée avant la sortie, l’acclimatation pour une sortie en altitude, etc.',
      },
    },
    list: { title: 'Rapports incidents/accidents' },
    markdown: {
      button: {
        emphasized: 'Italique',
        expand: 'Plein écran',
        heading: 'Titre',
        link: 'Lien hypertexte',
        'list-ul': 'Liste à puces',
        'list-ol': 'Liste ordonnée',
        preview: 'Aperçu',
        code: 'Retour au code',
        shrink: 'Quitter le plein écran',
        strong: 'Gras',
      },
      'link-helper': {
        button: { insert: 'Insérer le lien' },
        'text-to-display': 'texte à afficher',
        title: 'Insérer un lien',
        url: 'URL',
      },
    },
    table: {
      next: 'Page suivante',
      previous: 'Page précédente',
      current: 'Page actuelle',
      page: 'Page',
    },
  },
};

Vue.use(VueI18n);

const i18n: VueI18n = new VueI18n({
  locale: 'fr',
  fallbackLocale: 'fr',
  messages,
});

export default i18n;
