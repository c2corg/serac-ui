<template>
  <div class="modal-card">
    <header class="modal-card-head" v-t="'markdown.link-helper.title'"></header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">
          {{ $t('markdown.link-helper.text-to-display') }}
        </label>
        <div class="control">
          <input class="input" v-model="chunk" />
        </div>
      </div>
      <div class="field">
        <label class="label">
          {{ $t('markdown.link-helper.url') }}
        </label>
        <div class="control">
          <input class="input" v-model="url" />
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <button class="button" @click.prevent="$parent.close()">
        {{ $t('button.cancel') }}
      </button>
      <button class="button is-primary" @click.prevent="insert">
        {{ $t('markdown.link-helper.button.insert') }}
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { ModalProgrammatic } from 'buefy';

@Component
export default class LinkHelper extends Vue {
  @Prop({ type: String, required: true })
  chunk!: string;

  @Prop({ type: String, required: true })
  url!: string;

  $parent!: any;

  insert() {
    this.$emit('insert', this.chunk, this.url);
    this.$parent.close();
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
