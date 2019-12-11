<template>
  <div id="container">
    <vue-progress-bar></vue-progress-bar>
    <network-error :error="error"></network-error>
    <b-navbar>
      <template slot="brand"><h1>Serac-UI</h1></template>
      <template slot="start">
        <b-navbar-item><router-link to="/">Home</router-link></b-navbar-item>
        <b-navbar-item>
          <router-link to="/reports">Reports</router-link>
        </b-navbar-item>
        <b-navbar-item>
          <router-link to="/about">À propos</router-link>
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item tag="div">
          <a class="button is-primary">Login</a>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Route, RawLocation } from 'vue-router';
import axios, { AxiosResponse } from 'axios';
import NetworkError from './components/NetworkError.vue';

@Component({ components: { NetworkError } })
export default class App extends Vue {
  error: string = '';

  mounted() {
    document!.getElementById('splash')!.style.display = 'none';
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
    this.$router.afterEach(() => {
      // finish the progress bar
      this.$Progress.finish();
    });
    this.$router.onError(() => {
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
        this.error = error.response
          ? error.response.data.message
          : this.$t('error.default');
        return Promise.reject(new Error(this.error));
      }
    );
  }
}
</script>
