<template>
  <div v-if="report">
    <h1>{{ report.locales[0].title }}</h1>
    <div>
      <p>Activités: <activities :activities="report.activities" /></p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';

import api from '../services/api.service';
import Report from '../model/report';
import Activities from '../components/Activities.vue';

@Component({ name: 'report', components: { Activities } })
export default class ReportView extends Vue {
  report: Report | null = null;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportView) => any) | void) => void
  ): void {
    api.report(to.params.id).then(report => {
      next(vm => vm.setReport(report));
    });
  }

  beforeRouteUpdate(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportView) => any) | void) => void
  ): void {
    this.report = null;
    api.report(to.params.id).then(report => {
      this.report = report;
      next();
    });
  }

  setReport(report: Report) {
    this.report = report;
  }
}
</script>
