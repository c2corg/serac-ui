<template>
  <div>
    <h1>Rapports incidents/accidents</h1>
    <ul>
      <li v-for="report in reports" :key="report.id">
        <router-link :to="{ name: 'report', params: { id: report.id } }">
          {{ report.id }} | {{ report.date }} | {{ report.locales[0].title }} |
          <activities :activities="report.activities"></activities>
          |
          {{ report.event_type.join(', ') }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import Activities from '../components/Activities.vue';
import Report from '../model/report';
import api from '../services/api.service';

@Component({ name: 'reports', components: { Activities } })
export default class ReportsView extends Vue {
  loading = true;
  reports: Report[] = [];

  created() {
    this.fetchData();
  }

  fetchData() {
    api.reports().then(page => {
      this.reports = [...page.content];
      this.loading = false;
    });
  }
}
</script>
