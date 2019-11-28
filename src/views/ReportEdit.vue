<template>
  <section>
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

        <!-- ! activités -->

        <!-- ! geolocation -->

        <b-field grouped>
          <validation-provider rules="required" v-slot="{ errors }">
            <b-field label="Date" :message="errors[0]">
              <b-datepicker
                placeholder="Cliquez pour choisir la date"
                icon="calendar"
                :max-date="today"
                v-model="date"
              ></b-datepicker>
            </b-field>
          </validation-provider>

          <b-field label="Nombre de participants">
            <b-input
              type="number"
              min="1"
              v-model="model.nb_impacted"
            ></b-input>
          </b-field>
        </b-field>

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

        <b-field label="Nombre de personnes touchées">
          <b-input type="number" min="1"></b-input>
        </b-field>

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

        <b-field label="Intervention des services de secours">
          <b-radio v-model="model.rescue" native-value="true">Oui</b-radio>
          <b-radio v-model="model.rescue" native-value="false">Non</b-radio>
          <b-radio v-model="model.rescue" native-value="null">
            <em>Pas d'information</em>
          </b-radio>
        </b-field>

        <b-field label="Résumé">
          <b-input type="textarea" v-model="model.locales[0].summary"></b-input>
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
import Report, { ALL_SEVERITIES, ALL_EVENT_TYPES } from '../model/report';
import i18n from '../model/i18n';

extend('required', {
  ...required,
  message: (fieldName, placeholders) => {
    switch (fieldName) {
      case 'title':
        return 'Le titre ne peut pas être vide';
      default:
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

@Component({ components: { ValidationProvider, ValidationObserver } })
export default class ReportEdit extends Vue {
  @Prop()
  report!: Report;

  model: Report | Omit<Report, 'id'> | null = null;

  today: Date = new Date();
  severities = ALL_SEVERITIES.map(severity => ({
    key: severity,
    value: i18n.get(severity),
  }));
  eventTypes = ALL_EVENT_TYPES.map(event => ({
    key: event,
    value: i18n.get(event),
  }));

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
