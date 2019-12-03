<template>
  <div class="error-notification__wrapper">
    <b-notification type="is-danger" v-if="error" class="error-notification">
      {{ error }}<br />
      <a @click="$router.go()">{{ $t('error.reload') }}</a>
    </b-notification>
  </div>
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

<style lang="scss" scoped>
.error-notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;

  &__wrapper {
    position: relative;
  }
}
</style>
