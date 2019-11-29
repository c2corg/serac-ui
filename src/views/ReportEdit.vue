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

          <b-field label="Activités">
            <!-- TODO: error handling, activity is mandatory -->
            <input-activity v-model="model.activities"></input-activity>
          </b-field>

          <!-- ! geolocation -->

          <div class="columns">
            <validation-provider
              rules="required"
              v-slot="{ errors }"
              tag="div"
              class="column"
            >
              <b-field label="Date" :message="errors[0]">
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

          <!-- type d'évènement -->
          <b-field label="Type d'évènement">
            <b-checkbox-button
              v-for="event in eventTypes"
              :key="event.key"
              v-model="model.event_type"
              :native-value="event.key"
            >
              {{ event.value }}
            </b-checkbox-button>
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
              <b-field label="Gravité">
                <b-select v-model="model.severity">
                  <option
                    v-for="option in severities"
                    :key="option.key"
                    :value="option.key"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
            </div>

            <div clas="column">
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
              <b-field label="Niveau de risque d'avalanche">
                <b-select v-model="model.avalanche_level">
                  <option
                    v-for="option in avalancheLevels"
                    :key="option.key"
                    :value="option.key"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Pente de la zone de départ">
                <b-select v-model="model.avalanche_slope">
                  <option
                    v-for="option in avalancheSlopes"
                    :key="option.key"
                    :value="option.key"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
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
              <b-field label="Sexe">
                <b-select v-model="model.gender">
                  <option
                    v-for="option in genders"
                    :key="option.key"
                    :value="option.key"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Implication dans la situation">
                <b-select v-model="model.author_status">
                  <option
                    v-for="option in statuses"
                    :key="option.key"
                    :value="option.key"
                  >
                    {{ option.value }}
                  </option>
                </b-select>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column"></div>
            <div class="column"></div>
            <div class="column"></div>
          </div>

          <div class="columns">
            <div class="column"></div>
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

          <button type="submit">Soumettre</button>
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
import { required, email } from 'vee-validate/dist/rules';
import { formatISO } from 'date-fns';

import api from '../services/api.service';
import InputActivity from '../components/form/InputActivity.vue';
import Report, {
  ALL_SEVERITIES,
  ALL_EVENT_TYPES,
  ALL_AVALANCHE_LEVELS,
  ALL_AVALANCHE_SLOPES,
  ALL_GENDERS,
  ALL_AUTHOR_STATUSES,
} from '../model/report';
import i18n from '../model/i18n';

extend('required', {
  ...required,
  message: (fieldName, placeholders) => {
    switch (fieldName) {
      case 'title':
        return 'Le titre ne peut pas être vide';
      default:
        // ! FIXME:
        return `Ce champ ${
          placeholders ? placeholders['_field_'] : 'xx'
        } ne peut pas être vide`;
    }
  },
});

const newReport = (): Omit<Report, 'id'> => ({
  validated: false,
  custom: {},
  event_type: [],
  locales: [
    {
      title: '',
    },
  ],
});

@Component({
  components: { ValidationProvider, ValidationObserver, InputActivity },
})
export default class ReportEdit extends Vue {
  @Prop()
  report!: Report;

  model: Report | Omit<Report, 'id'> | null = null;

  today: Date = new Date();
  severities = this.select(ALL_SEVERITIES);
  eventTypes = this.select(ALL_EVENT_TYPES);
  avalancheLevels = this.select(ALL_AVALANCHE_LEVELS);
  avalancheSlopes = this.select(ALL_AVALANCHE_SLOPES);
  genders = this.select(ALL_GENDERS);
  statuses = this.select(ALL_AUTHOR_STATUSES);

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

  private select(
    values: string[]
  ): { key: string; value: string | undefined }[] {
    return values.map(value => ({ key: value, value: i18n.get(value) }));
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
