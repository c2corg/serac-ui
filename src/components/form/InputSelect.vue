<template>
  <b-field :label="label"
    ><b-select expanded v-model="report[field]">
      <option v-for="option in options" :key="option.key" :value="option.key">
        {{ option.value }}
      </option>
    </b-select>
  </b-field>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Report from '../../model/report';
import i18n from '../../model/i18n';

@Component
export default class InputSelect extends Vue {
  @Prop({ type: Object, required: true })
  report!: Report;

  @Prop({ type: String, required: true })
  field!: string;

  @Prop({ type: Array, required: true })
  values!: string[];

  get label() {
    return i18n.get(this.field);
  }

  get options() {
    return this.values.map(value => ({ key: value, value: i18n.get(value) }));
  }
}
</script>
