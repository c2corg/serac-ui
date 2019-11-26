<template>
  <div id="app">
    <vue-progress-bar></vue-progress-bar>
    <network-error :error="error"></network-error>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/reports">Reports</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';
import axios, { AxiosResponse } from 'axios';
import NetworkError from './components/NetworkError.vue';
import ReportView from './views/ReportView.vue';

@Component({ components: { NetworkError } })
export default class App extends Vue {
  error: string = '';

  mounted() {
    // [App.vue specific] When App.vue is finish loading finish the progress bar
    this.$Progress.finish();
    this.installAxiosInterceptors();
  }

  created() {
    // [App.vue specific] When App.vue is first loaded start the progress bar
    this.$Progress.start();
    // hook the progress bar to start before we move router-view
    this.$router.beforeEach(
      (
        to: Route,
        from: Route,
        next: (to?: RawLocation | false | ((vm: any) => any) | void) => void
      ) => {
        // start the progress bar
        this.$Progress.start();
        // continue to next page
        next();
      }
    );
    // hook the progress bar to finish after we've finished moving router-view
    this.$router.afterEach((to: Route, from: Route) => {
      // finish the progress bar
      this.$Progress.finish();
    });
    this.$router.onError((err: Error) => {
      this.$Progress.fail();
    });
  }

  installAxiosInterceptors() {
    axios.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        this.error = '';
        return response;
      },
      (error: any) => {
        this.error = error.response ? error.response.data.message : 'toto'; //! FIXME:
        return Promise.reject(new Error(this.error));
      }
    );
  }
}
</script>
