<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
        <div class="col">
            <Dropdown v-model="selectedYear" :options="getSampleYearList" optionLabel="yil" class="w-full md:w-14rem" @change="yearSelected($event)"/>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getSampleList"
                v-model:filters="filters"
                filterDisplay="row"
                rowGroupMode="rowspan" 
                groupRowsBy="tarih"
                scrollable 
                scrollHeight="550px"
                v-model:selection="selectedSample"
                selectionMode="single"
                @row-click="sampleSelected($event)"
                style="font-size:85%;"

            >
                <Column 
                        field="tarih" 
                        header="G.Tarihi"
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
                <Column field="link" header="T" bodyStyle="text-align:center;">
                    <template #body="slotProps">
                        <img :src="slotProps.data.link" width="70" height="70"/>
                    </template>
                </Column>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="numuneNo" 
                    header="Po"
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
                <Column field="kategori" header="Kategori"></Column>
                <Column field="miktar" header="Miktar">
                    <template #body="slotProps">
                        {{ slotProps.data.miktar }} / {{ slotProps.data.birim }}
                    </template>
                </Column>
                <Column field="gonderi_tipi" header="G.Tipi"></Column>
                <Column field="banka_secimi" header="Banka"></Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="sample_form" header="" modal :style="{ 'width': '100vw' }">
        <listForm />
    </Dialog>
</template>
<script>
import { useSampleStore } from '../stores/sample';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import { sampleService } from '../services/sampleService';
import { socket } from '../services/customServices/realTimeService';

import listForm  from '../components/sample/listForm.vue';

export default {
    components: {
        listForm
    },
    computed: {
        ...mapState(useSampleStore, [
            'getSampleList',
            'getSampleYearList'
        ]),

    },
    data() {
        return {
            filters: {
                tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                numuneNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedYear: {},
            sample_form: false,
            selectedSample: {},
        }
    },
    created() {
        this.selectedYear = this.getSampleYearList[0];
    },
    methods: {

        sampleSelected(event) {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleListDetail(event.data.numuneNo).then(data => {
                useSampleStore().sample_model_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.sample_form = true;
            });
        },
        newForm() {
            useLoadingStore().begin_loading_act();
            sampleService.getModelList().then(data => {
                useSampleStore().sample_new_button_load_act(true);
                useSampleStore().sample_model_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.sample_form = true;
            });
        },
        yearSelected(event) {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleList(event.value.yil).then(data => {
                useSampleStore().sample_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        }
    },
    mounted() {
        socket.socketIO.on('sample_stock_list_on', () => {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleList(new Date().getFullYear()).then(data => {
                useSampleStore().sample_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        });
    }
}
</script>
<style scoped>

</style>