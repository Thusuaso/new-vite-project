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


                <Column field="hata" header="Mistake"
                :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>

                <Column header="">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-danger" @click="deleteCost(slotProps.data.id)">Delete</button>
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
                hata: { value: null, matchMode: FilterMatchMode.CONTAINS },
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