<template>
  <div class="text-view">
    <p class="title is-4">{{ title }}</p>
    <div class="content">
      <markdown-view :content="content"></markdown-view>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import MarkdownView from '../components/MardownView.vue';

@Component({ components: { MarkdownView } })
export default class TextView extends Vue {
  @Prop({ type: String, required: true })
  content!: string;

  @Prop({ type: String, required: true })
  title!: string;
}
</script>

<style lang="scss" scoped>
.text-view {
  padding-top: 1em;
}
</style>
