<template>
  <section v-if="report" class="container is-fluid">
    <div class="box level report-title">
      <p class="is-size-3">
        {{ report.locales[0].title }} <span class="is-size-6">{{ date }}</span>
      </p>
      <div class="level-right">
        <router-link
          :to="{ name: 'report-edit', params: { id: report.id } }"
          :title="$t('button.edit')"
        >
          <fa-icon icon="edit" />
        </router-link>
        <a href="#" :title="$t('button.delete')" @click="deleteReport">
          <fa-icon icon="trash" />
        </a>
        <a
          href="#"
          :title="$t('button.publish')"
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
          <field-view
            class="is-lowercase"
            :title="$t('field.event_type.label')"
            v-if="report.event_type && report.event_type.length"
          >
            {{ eventTypes }}
          </field-view>
          <simple-field-view
            :report="report"
            field="avalanche_level"
          ></simple-field-view>
          <simple-field-view :report="report" field="avalanche_slope" />
          <field-view
            :title="$t('field.elevation.label')"
            v-if="report.elevation"
          >
            {{ report.elevation }}&nbsp;m
          </field-view>
          <simple-field-view :report="report" field="nb_participants" />
          <simple-field-view :report="report" field="nb_impacted" />
          <simple-field-view :report="report" field="rescue" />
          <simple-field-view :report="report" field="severity" />
          <!-- TODO: add supervision, autonomy (?), activity_rate (?), qualification -->
        </div>
        <div class="box" v-if="coords">
          <geolocation-map :coords="coords"></geolocation-map>
        </div>
      </div>
      <div class="column">
        <!-- TODO: remove summary -->
        <div class="box">
          <div
            v-if="report.locales[0].summary"
            v-dompurify-html="cookedSummary"
            class="is-italic"
          ></div>
          <div v-for="field in textFields" :key="field">
            <text-view
              v-if="report.locales[0][field]"
              :title="$t(`field.${field}.label`)"
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
import { format } from 'date-fns';
import { parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CRS, LatLng, Point } from 'leaflet';
import marked from 'marked';

import api from '@/services/api.service';
import Report from '@/model/report';
import ActivityList from '@/components/ActivityList.vue';
import TextView from '@/components/TextView.vue';
import FieldView from '@/components/FieldView.vue';
import SimpleFieldView from '@/components/SimpleFieldView.vue';
import GeolocationMap from '@/components/GeolocationMap.vue';
import { DialogConfig } from 'buefy/types/components';

@Component({
  name: 'report',
  components: {
    ActivityList,
    TextView,
    FieldView,
    SimpleFieldView,
    GeolocationMap,
  },
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
    return this.report?.date
      ? format(parseISO(this.report.date), 'd MMMM y', { locale: fr })
      : '';
  }

  get eventTypes() {
    return this.report?.event_type
      ? this.report.event_type
          .map(event => this.$t(`field.event_type.values.${event}`))
          .join(', ')
      : '';
  }

  get coords(): LatLng | undefined {
    if (!this.report?.geometry) {
      return undefined;
    }
    const coords: [number, number] = JSON.parse(this.report.geometry)
      .coordinates;
    return CRS.EPSG3857.unproject(new Point(coords[0], coords[1]));
  }

  get cookedSummary() {
    return this.report?.locales[0]?.summary
      ? marked(this.report.locales[0].summary)
      : '';
  }

  setReport(report: Report) {
    this.report = report;
  }

  publish() {
    this.$buefy.dialog.confirm({
      title: this.$t('publish.dialog.title').toString(),
      message: this.$t('publish.dialog.message').toString(),
      cancelText: this.$t('button.cancel').toString(),
      confirmText: this.$t('button.validate').toString(),
      type: 'is-info',
      hasIcon: true,
      icon: 'info',
      onConfirm: () => {
        const loadingComponent = this.$buefy.loading.open({});
        api
          .validateReport(this.report!)
          .then(() =>
            this.$buefy.toast.open({
              type: 'is-success',
              message: this.$t('publish.success').toString(),
            })
          ) // ! FIXME: more to do on success
          .catch(() =>
            this.$buefy.toast.open({
              type: 'is-danger',
              message: this.$t('publish.error').toString(),
            })
          )
          .finally(() => loadingComponent.close());
      },
    });
  }

  deleteReport() {
    // warn before deleting
    let options: Partial<DialogConfig> = {
      cancelText: this.$t('button.cancel').toString(),
      confirmText: this.$t('button.delete').toString(),
      type: 'is-info',
      hasIcon: true,
      icon: 'info',
      onConfirm: this.onDeleteConfirm,
    };
    let dialogOptions: DialogConfig;
    if (this.report!.validated) {
      dialogOptions = {
        ...options,
        title: this.$t('delete.dialog.title').toString(),
        message: this.$t('delete.dialog.message').toString(),
      };
    } else {
      dialogOptions = {
        ...options,
        message: this.$t('delete.dialog.title').toString(),
      };
    }
    this.$buefy.dialog.confirm(dialogOptions);
  }

  private onDeleteConfirm() {
    const loadingComponent = this.$buefy.loading.open({});
    api
      .deleteReport(this.report!)
      .then(() => {
        this.$router.push({ name: 'reports' });
      })
      .catch(() =>
        this.$buefy.toast.open({
          type: 'is-danger',
          message: this.$t('delete.error').toString(),
        })
      )
      .finally(() => loadingComponent.close());
  }
}
</script>

<style lang="scss" scoped>
.report-title {
  margin-top: 1em;
}
</style>
