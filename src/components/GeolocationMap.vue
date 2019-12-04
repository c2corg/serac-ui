<template>
  <l-map
    :zoom="zoom"
    :center="center"
    :options="mapOptions"
    class="map"
    @click="handleClick"
  >
    <l-tile-layer
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
    ></l-tile-layer>
    <l-circle-marker
      class="marker"
      v-if="marker"
      :lat-lng="marker"
      :radius="8"
      :color="primary"
      :fill="true"
      :fillColor="primary"
      fillOpactity="0.3"
    ></l-circle-marker>
    <l-control v-if="editable">
      <div class="map__buttons">
        <b-button size="is-small" @click="resetCoords">
          {{ $t('map.control.reset') }}
        </b-button>
        <b-button size="is-small" @click="clearCoords">
          {{ $t('map.control.clear') }}
        </b-button>
      </div>
    </l-control>
  </l-map>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { LMap, LTileLayer, LCircleMarker, LControl } from 'vue2-leaflet';
import {
  latLng,
  MapOptions,
  LatLng,
  LeafletMouseEvent,
  CRS,
  Point,
} from 'leaflet';

import { primary } from '@/utils/colors';

@Component({ components: { LMap, LTileLayer, LCircleMarker, LControl } })
export default class GeolocationMap extends Vue {
  @Prop({ type: Boolean, default: false })
  editable!: boolean;

  @Prop({ type: Object, required: false })
  coords!: LatLng;

  zoom: number = 6;
  center: LatLng = latLng(45.011369, 366.141357);
  mapOptions: MapOptions = { zoomSnap: 0.5 };

  initialCoords!: LatLng;
  marker: LatLng | undefined = latLng(0, 0);
  primary: string = primary;

  mounted() {
    if (this.coords) {
      this.initialCoords = new LatLng(this.coords.lat, this.coords.lng);
      this.marker = new LatLng(this.coords.lat, this.coords.lng);
      this.center = new LatLng(this.coords.lat, this.coords.lng);
      this.zoom = 13;
    } else {
      this.center = latLng(45.011369, 366.141357);
      this.marker = undefined;
    }
  }

  handleClick(event: LeafletMouseEvent) {
    if (!this.editable) {
      return;
    }
    this.marker = event.latlng;
    this.$emit('geolocation', this.marker);
  }

  // ! TODO:
  resetCoords() {
    this.marker = new LatLng(this.initialCoords.lat, this.initialCoords.lng);
    this.$emit('geolocation', this.marker);
  }

  clearCoords() {
    this.marker = undefined;
    this.$emit('geolocation', undefined);
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';

.map {
  height: 275px;
  width: 100%;

  &__buttons {
    display: flex;
    flex-direction: column;

    .button {
      margin-bottom: 0.5em;
    }
  }
}

.marker {
  stroke: $primary;
}
</style>
