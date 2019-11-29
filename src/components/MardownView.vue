<template>
  <div v-dompurify-html="rendered"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import marked from 'marked';

@Component
export default class MarkdownView extends Vue {
  @Prop({ required: true })
  content!: string;

  get rendered() {
    return this.content ? marked(this.content) : '';
  }
}
</script>
