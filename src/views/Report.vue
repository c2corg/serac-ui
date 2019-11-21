<template>
  <div>
    <h1>{{ report.title }}</h1>
    <p>Id: {{ report.id }}</p>
    <p>Id(*): {{ id }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class Report extends Vue {
  name = 'report';

  report = {
    id: 1234,
    title: 'Le titre est là',
  };

  created() {
    this.fetchData();
  }

  get id() {
    return this.$route.params.id;
  }

  fetchData() {
    console.log(this.$route.params.id);
  }
}
</script>
