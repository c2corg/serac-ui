<template>
  <router-link :to="{ name: 'report', params: { id: params.data.id } }">
    {{ params.data.locales[0].title }}
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TitleCellRenderer extends Vue {
  params: any = null;
}
</script>
