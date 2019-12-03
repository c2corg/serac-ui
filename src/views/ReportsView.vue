<template>
  <div class="container">
    <p class="title" v-t="'list.title'"></p>

    <b-button
      type="is-primary"
      @click="
        $router.push({
          name: 'report-add',
        })
      "
    >
      <fa-icon icon="plus"></fa-icon> {{ $t('button.new') }}
    </b-button>

    <section>
      <b-table
        :data="reports"
        :loading="loading"
        paginated
        backend-pagination
        pagination-position="both"
        pagination-size="is-small"
        :total="total"
        per-page="30"
        :current-page.sync="currentPage"
        @page-change="onPageChange"
        :aria-next-label="$t('table.next')"
        :aria-previous-label="$t('table.previous')"
        :aria-page-label="$t('table.page')"
        :aria-current-label="$t('table.current')"
        striped
      >
        <template slot-scope="props">
          <b-table-column field="date" :label="$t('field.date.label')">
            <span class="cell--nowrap">{{ props.row.date }}</span>
          </b-table-column>

          <b-table-column field="title" :label="$t('field.title.label')">
            <router-link :to="{ name: 'report', params: { id: props.row.id } }">
              {{ props.row.locales[0].title }}
            </router-link>
          </b-table-column>

          <b-table-column
            field="event_type"
            :label="$t('field.event_type.label')"
          >
            {{
              props.row.event_type
                .map(event => $t('field.event_type.values.' + event))
                .join(', ')
            }}
          </b-table-column>

          <b-table-column
            field="activities"
            :label="$t('field.activities.label')"
          >
            <div class="activities-column">
              <activity-list :activities="props.row.activities"></activity-list>
            </div>
          </b-table-column>
        </template>
      </b-table>
    </section>
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

@Component({ name: 'reports', components: { ActivityList } })
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

<style lang="scss" scoped>
.cell {
  &--nowrap {
    white-space: nowrap;
  }
}

.activities-column {
  min-width: 6em;
}
</style>
