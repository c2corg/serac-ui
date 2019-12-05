<template>
  <l-map
    :zoom="zoom"
    :center="center"
    :options="mapOptions"
    class="map"
    @click="handleClick"
  >
    <l-control-layers position="bottomleft"></l-control-layers>
    <l-tile-layer
      v-for="tileProvider in tileProviders"
      :key="tileProvider.name"
      :name="tileProvider.name"
      :visible="tileProvider.visible"
      :url="tileProvider.url"
      :attribution="tileProvider.attribution"
      :token="tileProvider.token"
      layer-type="base"
    />
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
import {
  LMap,
  LTileLayer,
  LCircleMarker,
  LControl,
  LControlLayers,
} from 'vue2-leaflet';
import {
  latLng,
  MapOptions,
  LatLng,
  LeafletMouseEvent,
  CRS,
  Point,
} from 'leaflet';

import { primary } from '@/utils/colors';

@Component({
  components: { LMap, LTileLayer, LCircleMarker, LControl, LControlLayers },
})
export default class GeolocationMap extends Vue {
  @Prop({ type: Boolean, default: false })
  editable!: boolean;

  @Prop({ type: Object, required: false })
  coords!: LatLng;

  zoom: number = 6;
  center: LatLng = latLng(45.011369, 366.141357);
  mapOptions: MapOptions = { zoomSnap: 0.5, maxZoom: 17 };

  tileProviders = [
    {
      name: 'OpenTopoMap',
      visible: true,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution:
        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    },
    {
      name: 'OpenStreetMap',
      visible: false,
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    },
    {
      name: 'ESRI',
      visible: false,
      attribution:
        '<a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f" target="_blank" rel="noreferer">Esri</a>',
      url:
        'https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/WMTS?layer=World_Topo_Map&style=default&tilematrixset=GoogleMapsCompatible&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fjpeg&TileMatrix={z}&TileCol={x}&TileRow={y}',
    },
  ];

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
    this.marker = new LatLng(event.latlng.lat, event.latlng.lng);

    // ensure the coordinates emitted are valid, i.e. -180 < lng < 180. Map event could have any offset value for lng.
    let lng = event.latlng.lng % 360;
    if (lng > 180) {
      lng -= 360;
    } else if (lng < -180) {
      lng += 360;
    }
    this.$emit('geolocation', new LatLng(event.latlng.lat, lng));
  }

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
