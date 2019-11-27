<template>
  <div>
    <h1>Rapports incidents/accidents</h1>
    <reports-table :rowData="reports"></reports-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import ActivityList from '../components/ActivityList.vue';
import ReportsTable from '../components/ReportsTable.vue';
import Report from '../model/report';
import api from '../services/api.service';

@Component({ name: 'reports', components: { ActivityList, ReportsTable } })
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
