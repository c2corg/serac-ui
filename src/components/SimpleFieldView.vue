<template>
  <field-view class="is-lowercase" v-if="report[field]" :title="title">
    {{ content }}
  </field-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FieldView from './FieldView.vue';
import i18n from '../model/i18n';
import Report from '../model/report';

@Component({ components: { FieldView } })
export default class SimpleFieldView extends Vue {
  @Prop({ type: Object, required: true })
  report!: Report;

  @Prop({ type: String, required: true })
  field!: string;

  get title() {
    return i18n.get(this.field);
  }

  get content() {
    const field: string = this.field;
    const value: any = (this.report as any)[field];
    switch (typeof value) {
      case 'string':
        return i18n.get(value);
      case 'number':
        return value;
    }
  }
}
</script>
