<template>
  <div>
    <h1>Rapports incidents/accidents</h1>
    <b-pagination
      :total="total"
      :current="currentPage"
      per-Page="30"
      @change="onPageChange"
    ></b-pagination>
    <div>
      <reports-table :rowData="reports"></reports-table>
      <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    </div>
    <b-pagination
      :total="total"
      :current="currentPage"
      per-Page="30"
      @change="onPageChange"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import ActivityList from '../components/ActivityList.vue';
import ReportsTable from '../components/ReportsTable.vue';
import Report from '../model/report';
import api from '../services/api.service';
import { Route, RawLocation } from 'vue-router';

@Component({ name: 'reports', components: { ActivityList, ReportsTable } })
export default class ReportsView extends Vue {
  loading = true;
  reports: Report[] = [];
  total: number = 0;
  currentPage: number = 1;

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportsView) => any) | void) => void
  ): void {
    next(vm => {
      const page: number = +to.query['page'] || 1;
      vm.currentPage = page;
      vm.fetchData(page);
    });
  }

  beforeRouteUpdate(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportsView) => any) | void) => void
  ): void {
    const page: number = +to.query['page'] || 1;
    if (this.currentPage !== page) {
      this.fetchData(page);
    }
    next();
  }

  fetchData(page: number): void {
    this.loading = true;
    api
      .getReports(page)
      .then(result => {
        this.reports = [...result.content];
        this.total = result.totalElements;
        this.currentPage = page;
      })
      .finally(() => {
        this.loading = false;
      });
  }

  onPageChange(page: number): void {
    if (this.currentPage !== page) {
      this.$router.push({
        name: 'reports',
        query: page !== 1 ? { page: page.toString() } : {},
      });
    }
  }
}
</script>
