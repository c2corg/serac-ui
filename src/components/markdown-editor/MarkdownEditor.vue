<template>
  <div
    class="markdown-editor control"
    :class="{ 'is-active': focus, fullscreen: fullscreen }"
  >
    <div class="markdown-editor__button-bar">
      <div class="buttons has-addons">
        <editor-button
          icon="bold"
          :disabled="preview"
          @click="handleBold"
          :tooltip="$t('markdown.button.strong')"
        />
        <editor-button
          icon="italic"
          :disabled="preview"
          @click="handleItalic"
          :tooltip="$t('markdown.button.emphasized')"
        />
        <editor-button
          icon="heading"
          :disabled="preview"
          @click="handleHeading"
          :tooltip="$t('markdown.button.heading')"
        />
      </div>
      <div class="buttons has-addons">
        <editor-button
          icon="link"
          :disabled="preview"
          @click="handleLink"
          :tooltip="$t('markdown.button.link')"
        />
      </div>
      <div class="buttons has-addons">
        <editor-button
          icon="list-ul"
          :disabled="preview"
          @click="handleListUl"
          :tooltip="$t('markdown.button.list-ul')"
        />
        <editor-button
          icon="list-ol"
          :disabled="preview"
          @click="handleListOl"
          :tooltip="$t('markdown.button.list-ol')"
        />
      </div>
      <div class="buttons has-addons">
        <editor-button
          :icon="preview ? 'code' : 'eye'"
          :text="
            preview ? $t('markdown.button.code') : $t('markdown.button.preview')
          "
          @click="preview = !preview"
        />
      </div>

      <div class="buttons has-addons is-pulled-right">
        <editor-button
          :icon="fullscreen ? 'compress' : 'expand'"
          :tooltip="
            fullscreen
              ? $t('markdown.button.shrink')
              : $t('markdown.button.expand')
          "
          @click="fullscreen = !fullscreen"
        />
      </div>
    </div>

    <div class="markdown-editor__content">
      <textarea
        ref="textarea"
        class="textarea"
        :placeholder="placeholder"
        @change="onInput"
        @focus="focus = true"
        @blur="focus = false"
      />

      <div
        class="markdown-editor__preview markdown"
        v-if="preview"
        v-dompurify-html="cooked"
      ></div>
    </div>

    <b-modal has-modal-card trap-focus :active.sync="showLinkHelperModal">
      <link-helper
        @insert="insertLink"
        :chunk="linkHelperText"
        :url="linkHelperUrl"
      ></link-helper>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import marked from 'marked';

import EditorButton from './EditorButton.vue';
import LinkHelper from './LinkHelper.vue';
import Selection from '../../utils/selection';

@Component({ components: { EditorButton, LinkHelper } })
export default class MarkdownEditor extends Vue {
  @Prop({
    type: String,
    default: '',
  })
  value!: string;

  @Prop({
    type: String,
    default: undefined,
  })
  placeholder!: string;

  selection!: Selection;
  focus = false;
  preview = false;
  fullscreen = false;

  showLinkHelperModal: boolean = false;
  linkText: string = '';
  linkUrl: string = '';

  cooked!: string;

  $refs!: {
    textarea: HTMLTextAreaElement;
  };

  mounted() {
    this.$refs.textarea.value = this.value;
    this.selection = new Selection(this.$refs.textarea, this.onInput);
  }

  get linkHelperText() {
    return this.linkText || '';
  }

  get linkHelperUrl() {
    return this.linkUrl || 'https://';
  }

  onInput() {
    this.$emit('input', this.$refs.textarea.value);
  }

  @Watch('value')
  updateValue() {
    this.$refs.textarea.value = this.value;
  }

  @Watch('preview')
  computePreview() {
    if (!this.preview) {
      return;
    }
    this.cooked = marked(this.$refs.textarea.value);
  }

  handleSimpleMarkdownTag(tag: string, defaultChunk: string) {
    const tagLength = tag.length;

    if (this.selection.isSurroundedBy(tag, tag)) {
      // remove tag
      const chunk = this.selection.text;
      this.selection.set(
        this.selection.start - tagLength,
        this.selection.end + tagLength
      );
      this.selection.setText(chunk);
    } else {
      // add tag
      const chunk = this.selection.isEmpty ? defaultChunk : this.selection.text;
      this.selection.setText(chunk, tag, tag);
    }

    // give back focus to textarea
    // event may have given focus to a button
    this.$refs.textarea.focus();
  }

  handleBlockMarkdownTag(tag: string, defaultChunk: string) {
    this.selection.expandToEntireLine();

    if (this.selection.isEmpty) {
      this.selection.setText(defaultChunk);
      this.selection.set(this.selection.start + tag.length);
    } else if (this.selection.linesStartsWith(tag)) {
      this.selection.removeLinePrefix(tag);
      this.selection.set(this.selection.start);
    } else {
      this.selection.addLinePrefix(tag);
      this.selection.set(this.selection.start + tag.length);
    }

    this.$refs.textarea.focus();
  }

  handleBold() {
    this.handleSimpleMarkdownTag(
      '**',
      this.$t('markdown.button.strong').toString()
    );
  }

  handleItalic() {
    this.handleSimpleMarkdownTag(
      '_',
      this.$t('markdown.button.emphasized').toString()
    );
  }

  handleHeading() {
    const defaultChunk = this.$t('markdown.button.heading').toString();

    this.selection.expandToEntireLine();

    if (this.selection.text.startsWith('#')) {
      this.selection.replace(/^#+ */, '');
    } else {
      const chunk: string = this.selection.isEmpty
        ? defaultChunk
        : this.selection.text;
      this.selection.setText(chunk, '## ');
    }

    this.$refs.textarea.focus();
  }

  handleLink() {
    this.linkText = this.selection.text;
    this.linkUrl = 'http://';
    this.showLinkHelperModal = true;
  }

  insertLink(chunk: string, url: string) {
    this.selection.setText(`[${chunk}](${url})`);
    // give back focus to textarea
    // event may have given focus to a button
    this.$refs.textarea.focus();
  }

  handleListUl() {
    this.handleBlockMarkdownTag('* ', '* item 1\n* item 2\n* item 3');
  }

  handleListOl() {
    this.handleBlockMarkdownTag('1. ', '1. item 1\n2. item 2\n3. item 3');
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

.markdown-editor {
  border: 1px solid lightgrey;
  box-shadow: none;
  transition: 300ms;
  border-radius: 3px;

  &__button-bar {
    display: flex;
    padding: 0.5rem;
    background: $light;
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 1px dashed lightgrey;
  }

  .buttons {
    margin: 0 1em 0 0;
    &:last-child {
      margin-left: auto;
    }
  }

  &__content {
    position: relative;

    textarea,
    textarea:focus {
      border: 0;
      box-shadow: none;
      min-height: 120px;
    }
  }

  &__preview {
    padding: 0.5rem;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #ffffe0;
    overflow-y: auto;
  }
}

.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .markdown-editor {
    &__content {
      flex-grow: 1;
    }
  }
  textarea {
    height: 100%;
    resize: None;
    max-height: None;
  }
}
</style>
