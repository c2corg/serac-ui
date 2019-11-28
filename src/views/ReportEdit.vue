<template>
  <section>
    <validation-observer v-slot="{ handleSubmit }">
      <form v-if="model" action="#" @submit.prevent="handleSubmit(onSubmit)">
        <validation-provider rules="required_title" v-slot="{ errors }">
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
          <span>{{ errors[0] }}</span>
        </validation-provider>

        <h2>Description</h2>
        <textarea v-model.trim="model.locales[0].description"></textarea>

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

import api from '../services/api.service';
import Report from '../model/report';

extend('required_title', {
  ...required,
  message: 'Le titre ne peut pas être vide',
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

  private isExistingReport(
    report: Report | Omit<Report, 'id'>
  ): report is Report {
    return 'id' in report;
  }
}
</script>
