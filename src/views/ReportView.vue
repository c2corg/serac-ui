<template>
  <section v-if="report" class="container is-fluid">
    <div class="box level">
      <h1>{{ report.locales[0].title }} {{ date }}</h1>
      <div class="level-right">
        <router-link
          :to="{ name: 'report-edit', params: { id: report.id } }"
          title="Modifier"
        >
          <fa-icon icon="edit" />
        </router-link>
        <a
          href="#"
          title="Publier sur camptcamp.org"
          @click="publish"
          v-if="!report.validated"
        >
          <fa-icon icon="upload" />
        </a>
      </div>
    </div>
    <div class="columns">
      <div class="column is-4">
        <div class="box">
          <field-view title="Activités">
            <activity-list :activities="report.activities" />
          </field-view>
          <!-- FIXME: contributeur -->
          <field-view
            class="is-lowercase"
            :title="i18n('event_type')"
            v-if="report.event_type && report.event_type.length"
          >
            {{ eventTypes }}
          </field-view>
          <simple-field-view
            :report="report"
            field="avalanche_level"
          ></simple-field-view>
          <simple-field-view :report="report" field="avalanche_slope" />
          <field-view :title="i18n('elevation')" v-if="report.elevation">
            {{ report.elevation }}&nbsp;m
          </field-view>
          <simple-field-view :report="report" field="nb_participants" />
          <simple-field-view :report="report" field="nb_impacted" />
          <simple-field-view :report="report" field="rescue" />
          <simple-field-view :report="report" field="severity" />
        </div>
        <div class="box">
          <p>Geolocation</p>
        </div>
      </div>
      <div class="column">
        <div class="box">
          <div
            v-if="report.locales[0].summary"
            v-dompurify-html="report.locales[0].summary"
            class="is-italic"
          ></div>
          <div v-for="field in textFields" :key="field">
            <text-view
              v-if="report.locales[0][field]"
              :title="i18n(field)"
              :content="report.locales[0][field]"
            ></text-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';

import api from '../services/api.service';
import Report from '../model/report';
import ActivityList from '../components/ActivityList.vue';
import TextView from '../components/TextView.vue';
import FieldView from '../components/FieldView.vue';
import SimpleFieldView from '../components/SimpleFieldView.vue';
import i18n from '../model/i18n';
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

@Component({
  name: 'report',
  components: { ActivityList, TextView, FieldView, SimpleFieldView },
})
export default class ReportView extends Vue {
  report: Report | null = null;

  textFields = [
    'description',
    'place',
    'route_study',
    'conditions',
    'training',
    'motivations',
    'group_management',
    'risk_study',
    'time_management',
    'safety',
    'reduce_impact',
    'increase_impact',
    'modifications',
    'other_comments',
  ];

  beforeRouteEnter(
    to: Route,
    from: Route,
    next: (to?: RawLocation | false | ((vm: ReportView) => any) | void) => void
  ): void {
    api
      .getReport(to.params.id)
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
      .getReport(to.params.id)
      .then(report => {
        this.report = report;
        next();
      })
      .catch((err: Error) => next(err));
  }

  get date() {
    return this.report && this.report.date
      ? format(parseISO(this.report.date), 'd MMMM y', { locale: fr })
      : '';
  }

  get eventTypes() {
    return this.report && this.report.event_type
      ? this.report.event_type.map(event => i18n.get(event)).join(', ')
      : '';
  }

  setReport(report: Report) {
    this.report = report;
  }

  i18n(field: string) {
    return i18n.get(field);
  }

  publish() {
    this.$buefy.dialog.confirm({
      title: 'Valider et publier sur camptocamp.org?',
      message:
        'En validant ce rapport, il ne pourra plus être modifié et sera publié sur le site <a href="https://www.camptocamp.org">camptocamp.org</a>.',
      cancelText: 'Annuler',
      confirmText: 'Valider',
      type: 'is-info',
      hasIcon: true,
      icon: 'info',
      onConfirm: () => {
        if (!this.report) {
          return;
        }
        const loadingComponent = this.$buefy.loading.open({});
        api
          .validateReport(this.report)
          .then(() =>
            this.$buefy.toast.open({
              type: 'is-success',
              message: 'Something happened',
            })
          ) // ! FIXME: more to do on success
          .catch(() =>
            this.$buefy.toast.open({
              type: 'is-danger',
              message:
                "Le rapport n'a pas pu être validé. Merci de réessayer plus tard.",
            })
          )
          .finally(() => loadingComponent.close());
      },
    });
  }
}
</script>
