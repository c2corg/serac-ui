<template>
  <div>
    <span
      v-for="activity of activities"
      :key="activity.key"
      :title="activity.value"
      :checked="value_.includes(activity.key)"
      @click="toggle(activity.key)"
    >
      <icon-activity :activity="activity.key"></icon-activity>
      <span>{{ activity.value }}</span>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { ALL_ACTIVITIES, Activity } from '../../model/report';
import i18n from '../../model/i18n';
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
      value: i18n.get(activity),
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
span[checked] {
  color: red;
}
</style>
