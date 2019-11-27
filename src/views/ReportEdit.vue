<template>
  <div v-if="model">
    <h1>Edition</h1>

    <h1>Titre</h1>
    <input type="text" v-model.trim="model.locales[0].title" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';
import api from '../services/api.service';
import Report from '../model/report';

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

@Component
export default class ReportEdit extends Vue {
  @Prop()
  report!: Report;

  model: Report | Omit<Report, 'id'> | null = null;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportEdit) => any) | void) => void
  ): void {
    (to.params.id ? api.report(to.params.id) : Promise.resolve(newReport()))
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
    (to.params.id ? api.report(to.params.id) : Promise.resolve(newReport()))
      .then(report => {
        this.model = report;
        next();
      })
      .catch((err: Error) => next(err));
  }

  setReport(report: Report | Omit<Report, 'id'>) {
    this.model = report;
  }
}
</script>
