<template>
  <span class="activity-list" v-if="activities.length">
    <span
      class="activity-list__item"
      v-for="activity of sortedActivities"
      :key="activity"
    >
      <icon-activity :activity="activity" />
    </span>
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import IconActivity from '../components/IconActivity.vue';

@Component({ components: { IconActivity } })
export default class Activities extends Vue {
  @Prop({ default: [] })
  activities!: string[];

  get sortedActivities() {
    return this.activities.slice(0).sort();
  }
}
</script>
