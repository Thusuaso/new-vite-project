<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getList" 
                    style="font-size:85%;"
                    v-model:selection="selectedCostError"
                    selectionMode="single"
                    @row-click="costErrorSelected($event)"
                    v-model:filters="filters"
                    filterDisplay="row"
                >
                <Column 
                        field="tarih" 
                        header="Tarih"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    
                    >
                    <template #body="slotProps">
                        {{ $filters.formatDate(slotProps.data.tarih) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                        field="kullanici_adi" 
                        header="Hata Sahibi"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="hata" header="Hata"></Column>
                <Column field="maliyet" header="Maliyet">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.maliyet) }}
                    </template>
                </Column>
                <Column header="">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-danger" @click="deleteCost(slotProps.data.id)">Sil</button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useCostStore } from '../../stores/cost';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { costService } from '../../services/costService';
import { socket } from '../../services/customServices/realTimeService';

import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useCostStore, [
            'getList',
        ])
    },
    data() {
        return {
            selectedCostError: {},
            filters: {
                tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kullanici_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        costErrorSelected(event) {
            useLoadingStore().begin_loading_act();
            costService.detail(event.data.id).then(data => {
                useCostStore().cost_error_model_load_act(data);
                useCostStore().cost_error_new_button_load_act(false);
                this.emitter.emit('cost_dialog_status', true);
                useLoadingStore().end_loading_act();
            });
        },
        deleteCost(id) {
            useLoadingStore().begin_loading_act();
            costService.delete(id).then(data => {
                if (data.status) {
                    this.emitter.emit('cost_dialog_status', false);
                    socket.socketIO.emit('cost_error_list_emit');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'danger', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        }
    }
}
</script>