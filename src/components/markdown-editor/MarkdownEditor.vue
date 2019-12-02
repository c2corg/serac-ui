<template>
  <div
    class="markdown-editor"
    :class="{ 'is-active': focus, fullScreen: fullScreen }"
  >
    <div class="button-bar">
      <div class="buttons has-addons is-pulled-right">
        <editor-button
          :icon="fullScreen ? 'compress' : 'expand'"
          :tooltip="
            fullScreen
              ? $t('markdown.button.shrink')
              : $t('markdown.button.expand')
          "
          @click="fullScreen = !fullScreen"
        />
      </div>

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
          :tooltip="$gettext('Heading')"
        />

        <span>&nbsp;</span>

        <editor-button
          icon="link"
          :disabled="preview"
          @click="handleLink"
          :tooltip="$gettext('Insert link')"
        />

        <span>&nbsp;</span>

        <editor-button
          icon="list-ul"
          :disabled="preview"
          @click="handleListUl"
          :tooltip="$gettext('Unordered list')"
        />
        <editor-button
          icon="list-ol"
          :disabled="preview"
          @click="handleListOl"
          :tooltip="$gettext('Ordered list')"
        />

        <span>&nbsp;</span>

        <editor-button
          :icon="preview ? 'code' : 'eye'"
          :text="preview ? $gettext('Back to code') : $gettext('Preview')"
          @click="preview = !preview"
        />
      </div>
    </div>

    <div class="markdown-editor-content">
      <textarea
        ref="textarea"
        class="textarea"
        :placeholder="placeholder"
        @change="onInput"
        @focus="focus = true"
        @blur="focus = false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import EditorButton from './EditorButton.vue';

class Selection {
  textarea: HTMLTextAreaElement;
  onInput: (content: string) => void;

  constructor(
    textarea: HTMLTextAreaElement,
    onInput: (content: string) => void
  ) {
    this.textarea = textarea;
    this.onInput = onInput;
  }

  get start() {
    return this.textarea.selectionStart;
  }
  set start(value) {
    this.textarea.selectionStart = value;
  }

  get end() {
    return this.textarea.selectionEnd;
  }
  set end(value) {
    this.textarea.selectionEnd = value;
  }

  get length() {
    return this.end - this.start;
  }

  get text() {
    return this.textarea.value.substr(this.start, this.length);
  }

  get isEmpty() {
    return this.start === this.end;
  }

  set(start: number, end: number = start) {
    this.start = start;
    this.end = end;
  }

  // TODO : remove before and after, and rewite calls with f-strings
  setText(text: string, before: string = '', after: string = '') {
    const chunk = before + text + after;

    const start = this.start;
    this.textarea.value =
      this.textarea.value.substr(0, this.start) +
      chunk +
      this.textarea.value.substr(this.end, this.textarea.value.length);
    this.set(start + before.length, start + before.length + text.length);

    this.onInput(this.textarea.value);
  }

  replace(
    pattern: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replacement: string
  ) {
    this.setText(this.text.replace(pattern, replacement));
  }

  isSurroundedBy(before: string, after: string) {
    const beforeLength = before.length;
    const afterLength = after.length;
    const content = this.textarea.value;

    return (
      content.substr(this.start - beforeLength, beforeLength) === before &&
      content.substr(this.end, afterLength) === after
    );
  }

  expandToEntireLine() {
    const start = this.textarea.value.lastIndexOf('\n', this.start);
    this.start = start + 1;
    const end = this.textarea.value.indexOf('\n', this.end);
    this.end = end === -1 ? this.textarea.value.length : end;
  }

  linesStartsWith(tag: string) {
    for (const line of this.text.split('\n')) {
      if (!line.startsWith(tag)) {
        return false;
      }
    }

    return true;
  }

  removeLinePrefix(tag: string) {
    this.setText(
      this.text
        .split('\n')
        .map(line => line.substr(tag.length))
        .join('\n')
    );
  }

  addLinePrefix(tag: string) {
    this.setText(
      this.text
        .split('\n')
        .map(line => tag + line)
        .join('\n')
    );
  }
}

@Component({ components: { EditorButton } })
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
  fullScreen = false;

  $refs!: {
    textarea: HTMLTextAreaElement;
  };

  mounted() {
    this.$refs.textarea.value = this.value;
    this.selection = new Selection(this.$refs.textarea, this.onInput);
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

    // ! TODO:
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
.markdown-editor {
  border: 1px solid lightgrey;
  box-shadow: none;
  transition: 300ms;
  border-radius: 3px;
  background: white;

  .button-bar {
    padding: 0.5rem;
    background: #eee;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .button-bar {
    border-bottom: 1px dashed lightgrey;
  }

  .buttons {
    margin: 0;
  }

  .markdown-editor-content {
    position: relative;
  }

  textarea,
  textarea:focus {
    font-family: monospace;
    border: 0;
    box-shadow: none;
    min-height: 100px;
  }

  .preview,
  .preview-error {
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

.is-active {
  border: 1px solid #66afe9;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(102, 175, 233, 0.6);
  transition: 300ms;
}

.fullScreen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .markdown-editor-content {
    flex-grow: 1;

    textarea {
      height: 100%;
      resize: None;
      max-height: None;
    }
  }
}
</style>
