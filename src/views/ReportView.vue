<template>
  <div v-if="report">
    <h1>{{ report.locales[0].title }}</h1>
    <div>
      <p>
        Activités:
        <activity-list :activities="report.activities" />
      </p>
      <h2>Description</h2>
      <p>
        <markdown-view :content="report.locales[0].description"></markdown-view>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';

import api from '../services/api.service';
import Report from '../model/report';
import ActivityList from '../components/ActivityList.vue';
import MarkdownView from '../components/MardownView.vue';

@Component({ name: 'report', components: { ActivityList, MarkdownView } })
export default class ReportView extends Vue {
  report: Report | null = null;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportView) => any) | void) => void
  ): void {
    api
      .report(to.params.id)
      .then(report => {
        next(vm => vm.setReport(report));
      })
      .catch((err: Error) => next(err));
  }

  beforeRouteUpdate(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportView) => any) | void) => void
  ): void {
    this.report = null;
    api
      .report(to.params.id)
      .then(report => {
        this.report = report;
        next();
      })
      .catch((err: Error) => next(err));
  }

  setReport(report: Report) {
    this.report = report;
  }
}
</script>
