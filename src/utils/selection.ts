export default class Selection {
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

  setText(text: string, before = '', after = '') {
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
