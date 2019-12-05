<template>
  <div v-dompurify-html="cooked" class="markdown"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import marked from 'marked';

@Component
export default class MarkdownView extends Vue {
  @Prop({ required: true })
  content!: string;

  get cooked() {
    return this.content ? marked(this.content) : '';
  }
}
</script>
