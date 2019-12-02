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

@Component
export default class InputSelect extends Vue {
  @Prop({ type: Object, required: true })
  report!: Report;

  @Prop({ type: String, required: true })
  field!: string;

  @Prop({ type: Array, required: true })
  values!: string[];

  get label() {
    return this.$t(`field.${this.field}.label`);
  }

  get options() {
    return this.values.map(value => ({
      key: value,
      value: this.$t(`field.${this.field}.values.${value}`),
    }));
  }
}
</script>
