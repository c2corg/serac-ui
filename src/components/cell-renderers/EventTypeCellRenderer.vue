<template>
  <span>{{ eventTypes }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import i18n from '../../model/i18n';
import { EventType } from '../../model/report';

@Component
export default class EventTypeListCellRenderer extends Vue {
  params: any = null;

  get eventTypes() {
    if (!this.params) {
      return '';
    }
    return (this.params.data.event_type as EventType[])
      .map(event => i18n.get(event))
      .join(', ');
  }
}
</script>
