<template>
  <section>
    <div class="container">
      <validation-observer v-slot="{ handleSubmit }">
        <form v-if="model" action="#" @submit.prevent="handleSubmit(onSubmit)">
          <b-steps v-model="activeStep">
            <b-step-item
              :label="$t('wizard.general.title')"
              :clickable="true"
              icon="info"
            >
              <h1 class="title">{{ $t('wizard.general.title') }}</h1>
              <p class="subtitle">{{ $t('wizard.general.details') }}</p>
              <validation-provider rules="required" v-slot="{ errors }">
                <b-field
                  :label="$t('field.title.label')"
                  :type="{ 'is-danger': errors.length }"
                  :message="errors[0]"
                >
                  <b-input
                    v-model.trim="model.locales[0].title"
                    name="title"
                  ></b-input>
                </b-field>
              </validation-provider>

              <validation-provider rules="required" v-slot="{ errors }">
                <b-field
                  :label="$t('field.activities.label')"
                  :type="{ 'is-danger': errors.length }"
                  :message="errors[0]"
                >
                  <input-activity
                    class="control"
                    v-model="model.activities"
                  ></input-activity>
                </b-field>
              </validation-provider>
            </b-step-item>

            <b-step-item
              :label="$t('wizard.geolocation.title')"
              icon="globe-europe"
              :clickable="true"
            >
              <h1 class="title">{{ $t('wizard.geolocation.title') }}</h1>
              <p class="subtitle">{{ $t('wizard.geolocation.details') }}</p>
              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.elevation.label')">
                    <b-field>
                      <b-input
                        type="number"
                        min="1"
                        max="9999"
                        expanded
                      ></b-input>
                      <p class="control">
                        <span class="button is-static">m</span>
                      </p>
                    </b-field>
                  </b-field>
                </div>
                <div class="column is-hidden-mobile"></div>
                <div class="column is-hidden-mobile"></div>
              </div>

              <b-field :label="$t('field.geometry.label')">
                <geolocation-map
                  @geolocation="handleGeometry"
                  :editable="true"
                  :coords="coords"
                ></geolocation-map>
              </b-field>

              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.geometry.lat')">
                    <b-input :value="dmsLat" readonly></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <b-field :label="$t('field.geometry.lng')">
                    <b-input :value="dmsLng" readonly></b-input>
                  </b-field>
                </div>
              </div>
            </b-step-item>

            <b-step-item
              :label="$t('wizard.context.title')"
              icon="user-friends"
              :clickable="true"
            >
              <h1 class="title">{{ $t('wizard.context.title') }}</h1>
              <p class="subtitle">{{ $t('wizard.context.details') }}</p>
              <div class="columns">
                <validation-provider
                  rules="required"
                  v-slot="{ errors }"
                  tag="div"
                  class="column"
                >
                  <b-field
                    :label="$t('field.date.label')"
                    :message="errors[0]"
                    :type="{ 'is-danger': errors.length }"
                  >
                    <b-datepicker
                      :placeholder="$t('field.date.placeholder')"
                      icon="calendar"
                      :max-date="today"
                      v-model="date"
                    ></b-datepicker>
                  </b-field>
                </validation-provider>

                <div class="column">
                  <b-field :label="$t('field.nb_participants.label')">
                    <b-input
                      type="number"
                      min="1"
                      v-model="model.nb_participants"
                    ></b-input>
                  </b-field>
                </div>
              </div>

              <b-field :label="$t('field.event_type.label')">
                <input-event-type
                  class="control"
                  v-model="model.event_type"
                ></input-event-type>
              </b-field>

              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.nb_impacted.label')">
                    <b-input
                      type="number"
                      min="0"
                      v-model="model.nb_impacted"
                    ></b-input>
                  </b-field>
                </div>

                <div class="column">
                  <input-select
                    field="severity"
                    :report="model"
                    :values="severities"
                  ></input-select>
                </div>

                <div class="column">
                  <b-field :label="$t('field.rescue.label')">
                    <div>
                      <b-radio v-model="model.rescue" native-value="true">
                        {{ $t('field.rescue.values.true') }}
                      </b-radio>
                      <b-radio v-model="model.rescue" native-value="false">
                        {{ $t('field.rescue.values.false') }}
                      </b-radio>
                      <b-radio v-model="model.rescue" native-value="null">
                        <em v-t="'field.rescue.values.null'"></em>
                      </b-radio>
                    </div>
                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <input-select
                    field="avalanche_level"
                    :report="model"
                    :values="avalancheLevels"
                  ></input-select>
                </div>
                <div class="column">
                  <input-select
                    field="avalanche_slope"
                    :report="model"
                    :values="avalancheSlopes"
                  ></input-select>
                </div>
                <div class="column is-hidden-mobile"></div>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.age.label')">
                    <b-input
                      type="number"
                      v-model="model.age"
                      min="1"
                    ></b-input>
                  </b-field>
                </div>
                <div class="column">
                  <input-select
                    field="gender"
                    :report="model"
                    :values="genders"
                  ></input-select>
                </div>
                <div class="column">
                  <input-select
                    field="author_status"
                    :report="model"
                    :values="statuses"
                  ></input-select>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <input-select
                    field="autonomy"
                    :report="model"
                    :values="autonomies"
                  ></input-select>
                </div>
                <div class="column">
                  <input-select
                    field="activity_rate"
                    :report="model"
                    :values="activityRates"
                  ></input-select>
                </div>
                <div class="column">
                  <input-select
                    field="nb_outings"
                    :report="model"
                    :values="nbOutings"
                  ></input-select>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <input-select
                    field="previous_injuries"
                    :report="model"
                    :values="previousInjuries"
                  ></input-select>
                </div>
                <div class="column is-hidden-mobile"></div>
                <div class="column is-hidden-mobile"></div>
              </div>
            </b-step-item>

            <b-step-item
              :label="$t('wizard.text.title')"
              :clickable="true"
              icon="comments"
            >
              <h1 class="title">{{ $t('wizard.text.title') }}</h1>
              <p class="subtitle">{{ $t('wizard.text.details') }}</p>
              <b-field label="Résumé">
                <markdown-editor
                  v-model="model.locales[0].summary"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.description.label')">
                <markdown-editor
                  v-model="model.locales[0].description"
                  :placeholder="$t('field.description.placeholder')"
                >
                </markdown-editor>
              </b-field>

              <b-field :label="$t('field.place.label')">
                <markdown-editor
                  v-model="model.locales[0].place"
                  :placeholder="$t('field.place.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.route_study.label')">
                <markdown-editor
                  v-model="model.locales[0].route_study"
                  :placeholder="$t('field.route_study.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.conditions.label')">
                <markdown-editor
                  v-model="model.locales[0].conditions"
                  :placeholder="$t('field.conditions.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.training.label')">
                <markdown-editor
                  v-model="model.locales[0].training"
                  :placeholder="$t('field.training.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.motivations.label')">
                <markdown-editor
                  v-model="model.locales[0].motivations"
                  :placeholder="$t('field.motivations.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.group_management.label')">
                <markdown-editor
                  v-model="model.locales[0].group_management"
                  :placeholder="$t('field.group_management.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.risk_study.label')">
                <markdown-editor
                  v-model="model.locales[0].risk_study"
                  :placeholder="$t('field.risk_study.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.time_management.label')">
                <markdown-editor
                  v-model="model.locales[0].time_management"
                  :placeholder="$t('field.time_management.placeholder')"
                ></markdown-editor>
              </b-field>

              <b-field :label="$t('field.safety.label')">
                <markdown-editor
                  v-model="model.locales[0].safety"
                  :placeholder="$t('field.safety.placeholder')"
                ></markdown-editor>
              </b-field>

              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.reduce_impact.label')">
                    <markdown-editor
                      v-model="model.locales[0].reduce_impact"
                    ></markdown-editor>
                  </b-field>
                </div>

                <div class="column">
                  <b-field :label="$t('field.increase_impact.label')">
                    <markdown-editor
                      v-model="model.locales[0].increase_impact"
                    ></markdown-editor>
                  </b-field>
                </div>
              </div>

              <div class="columns">
                <div class="column">
                  <b-field :label="$t('field.modifications.label')">
                    <markdown-editor
                      v-model="model.locales[0].modifications"
                      :placeholder="$t('field.modifications.placeholder')"
                    ></markdown-editor>
                  </b-field>
                </div>

                <div class="column">
                  <b-field :label="$t('field.other_comments.label')">
                    <markdown-editor
                      v-model="model.locales[0].other_comments"
                      :placeholder="$t('field.other_comments.placeholder')"
                    ></markdown-editor>
                  </b-field>
                </div>
              </div>
            </b-step-item>

            <template slot="navigation" slot-scope="{ previous, next }">
              <div class="buttons is-right">
                <b-button
                  @click="
                    $router.push({
                      name: 'report',
                      params: { id: $route.params.id },
                    })
                  "
                  v-t="'button.cancel'"
                ></b-button>
                <b-button
                  :disabled="previous.disabled"
                  icon-left="angle-left"
                  @click.prevent="previous.action"
                >
                  {{ $t('button.previous') }}
                </b-button>
                <b-button
                  v-show="activeStep < 3"
                  :disabled="next.disabled"
                  @click.prevent="next.action"
                  icon-right="angle-right"
                  type="is-primary"
                >
                  {{ $t('button.next') }}
                </b-button>
                <b-button
                  v-show="activeStep === 3"
                  type="is-primary"
                  native-type="submit"
                  v-t="'button.submit'"
                  :class="{ 'is-loading': submitting }"
                  :disabled="submitting"
                ></b-button>
              </div>
            </template>
          </b-steps>
        </form>
      </validation-observer>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';
import { formatISO } from 'date-fns';
import { CRS, LatLng, Point } from 'leaflet';
import DmsCoordinates from 'dms-conversion';

import api from '@/services/api.service';
import InputActivity from '@/components/form/InputActivity.vue';
import InputEventType from '@/components/form/InputEventType.vue';
import InputSelect from '@/components/form/InputSelect.vue';
import MarkdownEditor from '@/components/markdown-editor/MarkdownEditor.vue';
import GeolocationMap from '@/components/GeolocationMap.vue';
import Report, {
  ALL_SEVERITIES,
  ALL_AVALANCHE_LEVELS,
  ALL_AVALANCHE_SLOPES,
  ALL_GENDERS,
  ALL_AUTHOR_STATUSES,
  ALL_AUTONOMIES,
  ALL_ACTIVITY_RATES,
  ALL_NB_OUTINGS,
  ALL_PREVIOUS_INJURIES,
} from '@/model/report';
import { messages } from '@/i18n';

extend('required', {
  ...required,
  message: messages.fr.required as string,
});

const newReport = (): Omit<Report, 'id'> => ({
  validated: false,
  custom: {},
  activities: [],
  event_type: [],
  locales: [
    {
      title: '',
    },
  ],
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    InputActivity,
    InputSelect,
    InputEventType,
    MarkdownEditor,
    GeolocationMap,
  },
})
export default class ReportEdit extends Vue {
  @Prop()
  report!: Report;

  model: Report | Omit<Report, 'id'> | null = null;
  activeStep: number = 0;
  submitting: boolean = false;

  today: Date = new Date();
  severities = ALL_SEVERITIES;
  avalancheLevels = ALL_AVALANCHE_LEVELS;
  avalancheSlopes = ALL_AVALANCHE_SLOPES;
  genders = ALL_GENDERS;
  statuses = ALL_AUTHOR_STATUSES;
  autonomies = ALL_AUTONOMIES;
  activityRates = ALL_ACTIVITY_RATES;
  nbOutings = ALL_NB_OUTINGS;
  previousInjuries = ALL_PREVIOUS_INJURIES;

  lat: number | undefined = 0;
  lng: number | undefined = 0;

  get coords() {
    return !this.lat || !this.lng ? undefined : new LatLng(this.lat, this.lng);
  }

  get dmsLat(): string {
    if (!this.lat || !this.lng) {
      return '';
    }
    const [degree, minute, seconds, hemisphere] = new DmsCoordinates(
      this.lat,
      this.lng
    ).latitude.getDmsArray();
    return this.formatDms(degree, minute, seconds, hemisphere);
  }

  get dmsLng() {
    if (!this.lat || !this.lng) {
      return '';
    }
    const [degree, minute, seconds, hemisphere] = new DmsCoordinates(
      this.lat,
      this.lng
    ).longitude.getDmsArray();
    return this.formatDms(degree, minute, seconds, hemisphere);
  }

  private formatDms(
    degree: number,
    minute: number,
    seconds: number,
    hemisphere: string
  ) {
    return `${degree}°${minute}′${Math.floor(1000 * seconds) /
      1000}″ ${hemisphere}`;
  }

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
    if (this.model.geometry) {
      const coords: [number, number] = JSON.parse(this.model.geometry)
        .coordinates;
      const latLng: LatLng = CRS.EPSG3857.unproject(
        new Point(coords[0], coords[1])
      );
      this.lat = latLng.lat;
      this.lng = latLng.lng;
    }
  }

  onSubmit() {
    if (!this.model) {
      return;
    }
    //! FIXME: handle submission error
    this.submitting = true;
    if (this.isExistingReport(this.model)) {
      const id = this.model.id;
      api
        .editReport(this.model)
        .then(() => this.$router.push({ name: 'report', params: { id: id } }))
        .finally(() => (this.submitting = false));
    } else {
      api
        .createReport(this.model)
        .then(response =>
          this.$router.push({ name: 'report', params: { id: response.id } })
        )
        .finally(() => (this.submitting = false));
    }
  }

  get date(): Date | null {
    return this.model && this.model.date ? new Date(this.model.date) : null;
  }

  set date(date: Date | null) {
    if (this.model) {
      this.model.date = date
        ? formatISO(date, { representation: 'date' })
        : undefined;
    }
  }

  private isExistingReport(
    report: Report | Omit<Report, 'id'>
  ): report is Report {
    return 'id' in report;
  }

  handleGeometry(coords: LatLng | undefined) {
    if (!this.model) {
      return;
    }
    if (coords) {
      this.lat = coords.lat;
      this.lng = coords.lng;
      const point: Point = CRS.EPSG3857.project(coords);
      this.model.geometry = `{"coordinates": [${point.x}, ${point.y}], "type": "Point"}`;
    } else {
      this.model.geometry = undefined;
      this.lat = undefined;
      this.lng = undefined;
    }
  }
}
</script>
