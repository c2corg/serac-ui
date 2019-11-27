<template>
  <activity-list :activities="params.data.activities"></activity-list>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ActivityList from '../ActivityList.vue';
import { Params } from '@fortawesome/fontawesome-svg-core';

@Component({ components: { ActivityList } })
export default class ActivitiesCellRenderer extends Vue {
  params: Params | null = null;
}
</script>
