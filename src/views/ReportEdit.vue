<template>
  <section>
    <div class="container">
      <validation-observer v-slot="{ handleSubmit }">
        <form v-if="model" action="#" @submit.prevent="handleSubmit(onSubmit)">
          <validation-provider rules="required" v-slot="{ errors }">
            <b-field
              label="Titre"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <b-input
                v-model.trim="model.locales[0].title"
                name="title"
              ></b-input>
            </b-field>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors }">
            <b-field
              label="Activités"
              :type="{ 'is-danger': errors.length }"
              :message="errors[0]"
            >
              <input-activity
                class="control"
                v-model="model.activities"
              ></input-activity>
            </b-field>
          </validation-provider>

          <!-- ! geolocation -->

          <div class="columns">
            <validation-provider
              rules="required"
              v-slot="{ errors }"
              tag="div"
              class="column"
            >
              <b-field
                label="Date"
                :message="errors[0]"
                :type="{ 'is-danger': errors.length }"
              >
                <b-datepicker
                  placeholder="Cliquez pour choisir la date"
                  icon="calendar"
                  :max-date="today"
                  v-model="date"
                ></b-datepicker>
              </b-field>
            </validation-provider>

            <div class="column">
              <b-field label="Nombre de participants">
                <b-input
                  type="number"
                  min="1"
                  v-model="model.nb_impacted"
                ></b-input>
              </b-field>
            </div>
          </div>

          <b-field label="Type d'évènement">
            <input-event-type
              class="control"
              v-model="model.event_type"
            ></input-event-type>
          </b-field>

          <div class="columns">
            <div class="column">
              <b-field label="Nombre de personnes touchées">
                <b-input
                  type="number"
                  min="1"
                  v-model="model.nb_impacted"
                ></b-input>
              </b-field>
            </div>

            <div class="column">
              <input-select
                field="severity"
                :report="model"
                :values="severities"
              ></input-select>
            </div>

            <div class="column">
              <b-field label="Intervention des services de secours">
                <div>
                  <b-radio v-model="model.rescue" native-value="true">
                    Oui
                  </b-radio>
                  <b-radio v-model="model.rescue" native-value="false">
                    Non
                  </b-radio>
                  <b-radio v-model="model.rescue" native-value="null">
                    <em>Pas d'information</em>
                  </b-radio>
                </div>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <input-select
                field="avalanche_level"
                :report="model"
                :values="avalancheLevels"
              ></input-select>
            </div>
            <div class="column">
              <input-select
                field="avalanche_slope"
                :report="model"
                :values="avalancheSlopes"
              ></input-select>
            </div>
            <div class="column"></div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field label="Âge">
                <b-input type="number" v-model="model.age" min="1"></b-input>
              </b-field>
            </div>
            <div class="column">
              <input-select
                field="gender"
                :report="model"
                :values="genders"
              ></input-select>
            </div>
            <div class="column">
              <input-select
                field="author_status"
                :report="model"
                :values="statuses"
              ></input-select>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <input-select
                field="autonomy"
                :report="model"
                :values="autonomies"
              ></input-select>
            </div>
            <div class="column">
              <input-select
                field="activity_rate"
                :report="model"
                :values="activityRates"
              ></input-select>
            </div>
            <div class="column">
              <input-select
                field="nb_outings"
                :report="model"
                :values="nbOutings"
              ></input-select>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <input-select
                field="previous_injuries"
                :report="model"
                :values="previousInjuries"
              ></input-select>
            </div>
            <div class="column"></div>
            <div class="column"></div>
          </div>

          <b-field label="Résumé">
            <b-input
              type="textarea"
              v-model="model.locales[0].summary"
            ></b-input>
          </b-field>

          <b-field label="Description">
            <b-input
              type="textarea"
              v-model="model.locales[0].description"
              placeholder="Décrivez le déroulement de la sortie et de l'incident/accident. Si vous avez déjà saisi une sortie, vous pouvez décrire uniquement l'évènement, puis associez ce compte-rendu à la sortie."
            ></b-input>
          </b-field>

          <b-field label="Lieu">
            <b-input
              type="textarea"
              v-model="model.locales[0].place"
              placeholder="Information sur la localisation de l'incident. Positionner la localisation sur la carte ci-dessus, même de manière peu précise (auquel cas vous pouvez ajouter plus de détails dans ce champ). Après avoir complété le rapport, vous pouvez associer un itinéraire, un point de passage ou une sortie."
            ></b-input>
          </b-field>

          <b-field label="Étude de l'itinéraire">
            <b-input
              type="textarea"
              v-model="model.locales[0].route_study"
              placeholder="Carte, topos, connaissance de l’itinéraire, anticipation d’un plan B, réévaluation de l’itinéraire en cours de sortie ?"
            ></b-input>
          </b-field>

          <b-field label="Conditions">
            <b-input
              type="textarea"
              v-model="model.locales[0].conditions"
              placeholder="Décrivez les informations récoltées avant la sortie et le suivi de leur évolution sur le terrain. Cela concerne les prévisions météo, les bulletins d'évaluation du risque d'avalanche, la qualité du regel, la qualité de la neige/glace/rocher, les compte rendu des jours précédents, etc."
            ></b-input>
          </b-field>

          <b-field label="Préparation physique et niveau technique">
            <b-input
              type="textarea"
              v-model="model.locales[0].training"
              placeholder="Décrivez votre niveau technique et expérience par rapport à l’objectif choisi, votre condition physique, la fatigue accumulée avant la sortie, l’acclimatation pour une sortie en altitude, etc."
            ></b-input>
          </b-field>

          <b-field label="Motivations">
            <b-input
              type="textarea"
              v-model="model.locales[0].motivations"
              placeholder="Pourquoi avoir choisi cette sortie ? A quel point étiez-vous attaché à l'objectif fixé ? Considérez l'influence de possibles choix effectués en amont (jours de congés, long trajet, réservations de nuitées...), des efforts réalisés jusque-là, de la rareté de l'opportunité, etc."
            ></b-input>
          </b-field>

          <b-field label="Gestion du groupe">
            <b-input
              type="textarea"
              v-model="model.locales[0].group_management"
              placeholder="Communication des objectifs et attentes de chacun, des craintes et observations en cours de sortie, briefing pour établir de nouvelles stratégies, éléments de conduite de groupe et de responsabilités, groupe habitué à fonctionner ensemble ou non, émulation, etc."
            ></b-input>
          </b-field>

          <b-field label="Niveau de l'attention et évaluation des risques">
            <b-input
              type="textarea"
              v-model="model.locales[0].risk"
              placeholder="Avez-vous (ré)évalué les risques à chaque changement de situation ?&#10;Considérez des facteurs qui ont pu influencer votre niveau d'attention tels que la fatigue, le stress, la baisse d'attention une fois les difficultés passées ou à la descente, un secteur connu ou réputé facile, la présence de traces ou d'autres personnes, une confiance totale dans le responsable du groupe, etc."
            ></b-input>
          </b-field>

          <b-field label="Gestion de l'horaire">
            <b-input
              type="textarea"
              v-model="model.locales[0].time_management"
              placeholder="Un horaire avait-il été prévu ? A t-il été tenu ? La gestion du temps a t-elle eu une influence sur le déclenchement de l'événement ?"
            ></b-input>
          </b-field>

          <b-field label="Mesures et techniques de sécurité mises en oeuvre">
            <b-input
              type="textarea"
              v-model="model.locales[0].safety"
              placeholder="Type d'assurage et de protection, vérifications entre grimpeurs, tests de stabilité du manteau neigeux, test des DVA, etc."
            ></b-input>
          </b-field>

          <div class="columns">
            <div class="column">
              <b-field
                label="Éléments ayant atténué les conséquences de l'évènement"
              >
                <b-input
                  type="textarea"
                  v-model="model.locales[0].reduce_impact"
                ></b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field
                label="Éléments ayant aggravé les conséqunces de l'évènement"
              >
                <b-input
                  type="textarea"
                  v-model="model.locales[0].increase_impact"
                ></b-input>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              <b-field label="Conséquences sur les pratiques">
                <b-input
                  type="textarea"
                  v-model="model.locales[0].modifications"
                  placeholder="Cet évènement a-t-il modifié vos habitudes ? Quels enseignements en avez-vous tiré ?"
                ></b-input>
              </b-field>
            </div>

            <div class="column">
              <b-field label="Conséquences physiques et autres commentaires">
                <b-input
                  type="textarea"
                  v-model="model.locales[0].other_comments"
                  placeholder="Décrivez brièvement les blessures éventuelles, et ce que vous feriez aujourd'hui avec du recul. Les commentaires qui n'entrent dans aucun autre champ peuvent être saisis ici."
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="buttons is-right">
            <b-button
              @click="
                $router.push({
                  name: 'report',
                  params: { id: $route.params.id },
                })
              "
            >
              Annuler
            </b-button>
            <b-button type="is-primary" native-type="submit">
              Soumettre
            </b-button>
          </div>
        </form>
      </validation-observer>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { formatISO } from 'date-fns';

import api from '../services/api.service';
import InputActivity from '../components/form/InputActivity.vue';
import InputEventType from '../components/form/InputEventType.vue';
import InputSelect from '../components/form/InputSelect.vue';
import Report, {
  ALL_SEVERITIES,
  ALL_AVALANCHE_LEVELS,
  ALL_AVALANCHE_SLOPES,
  ALL_GENDERS,
  ALL_AUTHOR_STATUSES,
  ALL_AUTONOMIES,
  ALL_ACTIVITY_RATES,
  ALL_NB_OUTINGS,
  ALL_PREVIOUS_INJURIES,
} from '../model/report';
import i18n from '../model/i18n';

extend('required', {
  ...required,
  message: 'Ce champ est obligatoire',
});

const newReport = (): Omit<Report, 'id'> => ({
  validated: false,
  custom: {},
  activities: [],
  event_type: [],
  locales: [
    {
      title: '',
    },
  ],
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    InputActivity,
    InputSelect,
    InputEventType,
  },
})
export default class ReportEdit extends Vue {
  @Prop()
  report!: Report;

  model: Report | Omit<Report, 'id'> | null = null;

  today: Date = new Date();
  severities = ALL_SEVERITIES;
  avalancheLevels = ALL_AVALANCHE_LEVELS;
  avalancheSlopes = ALL_AVALANCHE_SLOPES;
  genders = ALL_GENDERS;
  statuses = ALL_AUTHOR_STATUSES;
  autonomies = ALL_AUTONOMIES;
  activityRates = ALL_ACTIVITY_RATES;
  nbOutings = ALL_NB_OUTINGS;
  previousInjuries = ALL_PREVIOUS_INJURIES;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportEdit) => any) | void) => void
  ): void {
    (to.params.id ? api.getReport(to.params.id) : Promise.resolve(newReport()))
      .then(report => {
        next(vm => vm.setReport(report));
      })
      .catch((err: Error) => next(err));
  }

  beforeRouteUpdate(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportEdit) => any) | void) => void
  ): void {
    this.model = null;
    (to.params.id ? api.getReport(to.params.id) : Promise.resolve(newReport()))
      .then(report => {
        this.model = report;
        next();
      })
      .catch((err: Error) => next(err));
  }

  setReport(report: Report | Omit<Report, 'id'>) {
    this.model = report;
  }

  onSubmit() {
    if (!this.model) {
      return;
    }
    //! FIXME: handle submission error
    if (this.isExistingReport(this.model)) {
      const id = this.model.id;
      api
        .editReport(this.model)
        .then(() => this.$router.push({ name: 'report', params: { id: id } }));
    } else {
      api
        .createReport(this.model)
        .then(response =>
          this.$router.push({ name: 'report', params: { id: response.id } })
        );
    }
  }

  get date(): Date | null {
    return this.model && this.model.date ? new Date(this.model.date) : null;
  }

  set date(date: Date | null) {
    if (this.model) {
      this.model.date = date
        ? formatISO(date, { representation: 'date' })
        : undefined;
    }
  }

  private isExistingReport(
    report: Report | Omit<Report, 'id'>
  ): report is Report {
    return 'id' in report;
  }
}
</script>
