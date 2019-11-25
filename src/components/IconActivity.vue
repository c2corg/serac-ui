<template>
  <!--<fa-icon :icon="['activity', activity]" />-->
  <span>{{ activity }}</span>
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
