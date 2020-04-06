<template>
  <div>
    <span class="field__title">{{ titleWithColons }} </span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class FieldView extends Vue {
  @Prop({ type: String, required: true })
  title!: string;

  get titleWithColons() {
    return this.title?.endsWith(':') ? this.title : this.title + '\u00a0:';
  }
}
</script>

<style lang="scss" scoped>
.field {
  &__title {
    font-weight: bold;
  }
}
</style>
