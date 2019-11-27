<template>
  <span>{{ params.data.event_type.join(', ') }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Params } from '@fortawesome/fontawesome-svg-core';

@Component
export default class EventTypeListCellRenderer extends Vue {
  params: Params | null = null;
}
</script>
