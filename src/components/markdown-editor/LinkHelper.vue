<template>
  <div class="modal-card">
    <header class="modal-card-head" v-t="'markdown.link-helper.title'"></header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">
          {{ $t('markdown.link-helper.text-to-display') }}
        </label>
        <div class="control">
          <input class="input" v-model="userChunk" />
        </div>
      </div>
      <div class="field">
        <label class="label">
          {{ $t('markdown.link-helper.url') }}
        </label>
        <div class="control">
          <input class="input" v-model="userUrl" />
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

@Component
export default class LinkHelper extends Vue {
  @Prop({ type: String, required: true })
  chunk!: string;

  @Prop({ type: String, required: true })
  url!: string;

  userChunk: string = '';
  userUrl: string = '';

  $parent!: any;

  mounted() {
    this.userChunk = this.chunk;
    this.userUrl = this.url;
  }

  insert() {
    this.$emit('insert', this.userChunk, this.userUrl);
    this.$parent.close();
  }
}
</script>

<style lang="scss" scoped>
.modal-card-foot {
  justify-content: flex-end;
}
</style>
