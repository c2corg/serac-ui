<template>
  <field-view class="is-lowercase" v-if="report[field]" :title="title">
    {{ content }}
  </field-view>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import FieldView from './FieldView.vue';
import Report from '../model/report';

@Component({ components: { FieldView } })
export default class SimpleFieldView extends Vue {
  @Prop({ type: Object, required: true })
  report!: Report;

  @Prop({ type: String, required: true })
  field!: string;

  get title() {
    return this.$t(`field.${this.field}.label`);
  }

  get content() {
    const field: string = this.field;
    const value: any = (this.report as any)[field];
    switch (typeof value) {
      case 'string':
        return this.$t(`field.${this.field}.values.${value}`);
      case 'number':
        return value;
    }
  }
}
</script>
