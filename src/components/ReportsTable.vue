<template>
  <ag-grid-vue
    style="width: 100%; height: 300px;"
    :columnDefs="columnDefs"
    :rowData="rowData"
    :modules="modules"
  ></ag-grid-vue>
</template>

<script lang="ts">
import Vue from 'vue';
import { AgGridVue } from '@ag-grid-community/vue';
import { AllCommunityModules, ColDef } from '@ag-grid-community/all-modules';
import { Prop, Component } from 'vue-property-decorator';
import Report from '../model/report';
import TitleCellRenderer from './cell-renderers/TitleCellRenderer.vue';
import EventTypeCellRenderer from './cell-renderers/EventTypeCellRenderer.vue';
import ActivitiesCellRenderer from './cell-renderers/ActivitiesCellRender.vue';

@Component({
  components: {
    AgGridVue,
  },
})
export default class ReportsTable extends Vue {
  @Prop({ type: Array, required: true })
  rowData!: Report[];

  columnDefs!: ColDef[];
  modules = AllCommunityModules; // ! FIXME:

  beforeMount() {
    this.columnDefs = [
      {
        headerName: this.$t('field.date.label') as string,
        field: 'date',
      },
      {
        headerName: this.$t('field.title.label') as string,
        cellRendererFramework: TitleCellRenderer,
      },
      {
        headerName: this.$t('field.event_type.label') as string,
        cellRendererFramework: EventTypeCellRenderer,
      },
      {
        headerName: this.$t('field.activities.label') as string,
        cellRendererFramework: ActivitiesCellRenderer,
      },
    ];
  }
}
</script>

<!-- FIXME: -->
<style src="@ag-grid-community/all-modules/dist/styles/ag-grid.css" />
<style src="@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css" />
