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
      v-if="marker"
      :lat-lng="marker"
      :fill="false"
      :radius="8"
      color="#666"
    ></l-circle-marker>
  </l-map>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { LMap, LTileLayer, LCircleMarker } from 'vue2-leaflet';
import {
  latLng,
  MapOptions,
  LatLng,
  LeafletMouseEvent,
  CRS,
  Point,
} from 'leaflet';

@Component({ components: { LMap, LTileLayer, LCircleMarker } })
export default class GeolocationMap extends Vue {
  @Prop({ type: Boolean, default: false })
  editable!: boolean;

  @Prop({ type: Array, required: false })
  coords!: [number, number];

  zoom: number = 6;
  center: LatLng = latLng(45.011369, 366.141357);
  mapOptions: MapOptions = { zoomSnap: 0.5 };

  marker!: LatLng;

  mounted() {
    console.log(this.coords);
    if (this.coords) {
      this.marker = CRS.EPSG3857.unproject(
        new Point(this.coords[0], this.coords[1])
      );
      this.center = this.marker;
    } else {
      this.center = latLng(45.011369, 366.141357);
    }
  }

  handleClick(event: LeafletMouseEvent) {
    if (!this.editable) {
      return;
    }
    this.marker = event.latlng;
  }
}
</script>

<style lang="scss" scoped>
.map {
  height: 275px;
  width: 100%;
}
</style>
