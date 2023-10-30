<template>
  <DataTable
    :value="getFollowContainerList"
    v-model:selection="selectedContainer"
    selectionMode="single"
    @row-click="containerSelected($event)"
    v-model:filters="filters"
    filterDisplay="row"
    style="font-size: 85%"
  >
    <Column field="sira" header="#"></Column>
    <Column
      field="musteriadi"
      header="Müşteri"
      :showFilterMenu="false"
      :showFilterOperator="false"
      :showClearButton="false"
      :showApplyButton="false"
      :showFilterMatchModes="false"
      :showAddButton="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column
      field="siparisno"
      header="Po"
      :showFilterMenu="false"
      :showFilterOperator="false"
      :showClearButton="false"
      :showApplyButton="false"
      :showFilterMatchModes="false"
      :showAddButton="false"
    >
      <template #filter="{ filterModel, filterCallback }">
        <InputText
          v-model="filterModel.value"
          type="text"
          @input="filterCallback()"
          class="p-column-filter"
        />
      </template>
    </Column>
    <Column field="sevk_tarihi" header="Sevk Tarihi"></Column>
    <Column field="konteynerno" header="K.No"></Column>
    <Column field="line" header="Hat"></Column>
    <Column field="eta" header="Eta"></Column>
    <Column field="kalan_sure" header="Kalan Süre"></Column>
    <Column field="konsimento" header="Eta">
      <template #body="slotProps">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            v-model="slotProps.data.konsimento"
            disabled
          />
          <label
            class="form-check-label"
            for="flexCheckDefault"
            v-if="slotProps.data.konsimento"
          >
            Gönderildi
          </label>
          <label class="form-check-label" for="flexCheckDefault" v-else>
            Gönderilmedi
          </label>
        </div>
      </template>
    </Column>
    <Column field="liman" header="Liman"></Column>
    <Column field="sorumlusu" header="Sorumlu"></Column>
    <Column field="pesinat" header="Peşinat">
      <template #body="slotProps">
        {{ $filters.formatPrice(slotProps.data.pesinat) }}
      </template>
    </Column>
    <Column field="kalan_alacak" header="Kalan">
      <template #body="slotProps">
        {{ $filters.formatPrice(slotProps.data.kalan_alacak) }}
      </template>
    </Column>
  </DataTable>
  <Dialog
    v-model:visible="is_container_form"
    :header="header"
    modal
    :style="{ width: '100vw' }"
  >
    <followForm :value="selectedContainer" />
  </Dialog>
</template>
<script>
import { useContainerStore } from "../stores/container";
import { useLoadingStore } from "../stores/loading";
import { mapState } from "pinia";

import form from "../components/container/form.vue";

import { socket } from "../services/customServices/realTimeService";
import { containerService } from "../services/containerService";

import { FilterMatchMode } from "primevue/api";

export default {
  computed: {
    ...mapState(useContainerStore, ["getFollowContainerList"]),
  },
  components: {
    followForm: form,
  },
  data() {
    return {
      selectedContainer: {},
      is_container_form: false,
      header: "",
      filters: {
        musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      },
    };
  },
  methods: {
    containerSelected(event) {
      this.header = event.data.musteriadi + "/" + event.data.siparisno;
      this.is_container_form = true;
    },
  },
  mounted() {
    socket.socketIO.on("container_update_follow_list_on", () => {
      useLoadingStore().begin_loading_act();
      containerService.getFollowList().then((data) => {
        useContainerStore().follow_container_list_load_act(data);
        useLoadingStore().end_loading_act();
      });
    });
  },
};
</script>
<style scoped></style>
