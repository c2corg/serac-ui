<template>
  <div class="input-activity">
    <div
      v-for="activity of activities"
      :key="activity.key"
      :title="activity.value"
      @click="toggle(activity.key)"
      class="input-activity__item has-text-centered"
    >
      <icon-activity
        :activity="activity.key"
        class="input-activity__icon is-size-2"
        :class="{
          'has-text-primary': value_.includes(activity.key),
        }"
      ></icon-activity>
      <div>{{ activity.value }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { ALL_ACTIVITIES, Activity } from '../../model/report';
import IconActivity from '../IconActivity.vue';

@Component({ components: { IconActivity } })
export default class InputActivity extends Vue {
  @Prop({ type: Array, required: true })
  value!: Activity[];

  get value_() {
    return this.value || [];
  }

  set value_(value: Activity[]) {
    this.$emit('input', value);
  }

  get activities() {
    return ALL_ACTIVITIES.map(activity => ({
      key: activity,
      value: this.$t('field.activities.values.' + activity),
    }));
  }

  toggle(activity: Activity) {
    const index: number = this.value_.indexOf(activity);
    const newValue = [...this.value];
    if (index === -1) {
      newValue.push(activity);
    } else {
      newValue.splice(index, 1);
    }
    this.value_ = newValue;
  }
}
</script>

<style lang="scss" scoped>
.input-activity {
  &__item {
    display: inline-flex;
    flex-direction: column;
    width: 100px;
  }
  &__icon {
    margin: auto;
    cursor: pointer;
  }
}
</style>
