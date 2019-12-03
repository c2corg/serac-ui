<template>
  <a
    class="button has-text-primary is-small"
    :disabled="disabled"
    :title="tooltip"
    :target="target"
    :href="href"
    @click="!disabled ? $emit('click', arguments[0]) : {}"
  >
    <span v-if="icon" class="icon">
      <fa-icon :icon="icon" />
    </span>
    <span v-if="text">
      {{ text }}
    </span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class EditorButton extends Vue {
  @Prop({
    type: String,
    default: null,
  })
  text!: string;

  @Prop({
    type: String,
    default: null,
  })
  icon!: string;

  @Prop({
    type: String,
    default: null,
  })
  tooltip!: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  disabled!: boolean;

  @Prop({
    type: String,
    default: null,
  })
  target!: string;

  @Prop({
    type: String,
    default: null,
  })
  href!: string;
}
</script>
