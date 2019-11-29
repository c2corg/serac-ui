<template>
  <b-notification closable="false" type="is-danger" v-if="error">
    Error: {{ error }}
  </b-notification>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class NetworkError extends Vue {
  @Prop({ default: null })
  error!: string;
}
</script>
