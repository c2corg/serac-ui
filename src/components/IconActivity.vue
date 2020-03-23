<template>
  <fa-icon
    :icon="['activity', activity]"
    :title="$t(`field.activities.values.${activity}`)"
    class="fa-2x"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class IconActivity extends Vue {
  @Prop({ required: true })
  activity!: string;
}
</script>
