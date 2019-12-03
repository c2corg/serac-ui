<template>
  <div class="input-event-type">
    <span
      v-for="type of types"
      :key="type.key"
      :title="type.value"
      class="button is-primary is-rounded input-event-type__button"
      :class="{ 'is-outlined': !value_.includes(type.key) }"
      @click="toggle(type.key)"
    >
      {{ type.value }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { ALL_EVENT_TYPES, EventType } from '../../model/report';

@Component
export default class InputEventType extends Vue {
  @Prop({ type: Array, required: true })
  value!: EventType[];

  get value_() {
    return this.value || [];
  }

  set value_(value: EventType[]) {
    this.$emit('input', value);
  }

  get types() {
    return ALL_EVENT_TYPES.map(type => ({
      key: type,
      value: this.$t('field.event_type.values.' + type),
    }));
  }

  toggle(type: EventType) {
    const index: number = this.value_.indexOf(type);
    const newValue = [...this.value];
    if (index === -1) {
      newValue.push(type);
    } else {
      newValue.splice(index, 1);
    }
    this.value_ = newValue;
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.input-event-type {
  &__button {
    display: inline-flex;
    flex-direction: column;
    margin-right: 0.5em;
    margin-bottom: 0.5em;
  }
}
</style>
