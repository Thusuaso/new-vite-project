<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <DataTable 
                        :value="getOfferAllListA" 
                        scrollable 
                        scrollHeight="400px" 
                        style="font-size:85%;"
                        v-model:filters="filters1"
                        filterDisplay="row"
                        @filter="offerAllListAFilter($event)"
                        v-model:selection="selectedOfferListA"
                        selectionMode="single"
                        @row-click="offerListASelected($event)"     
                    >
                    <template #header>
                        Teklifler A Listesi
                    </template>
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
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column 
                            field="sira" 
                            header="Sira"
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
                            field="musteriAdi" 
                            header="Müşteri"
                            :showFilterMenu="false"
                            :showFilterOperator="false"
                            :showClearButton="false"
                            :showApplyButton="false"
                            :showFilterMatchModes="false"
                            :showAddButton="false"
                        >
                        <template #body="slotProps">
                            <div :style="{ 'backgroundColor': slotProps.data.goruldu ? '' : 'yellow' }">
                                {{ slotProps.data.musteriAdi }}
                            </div>

                        </template>
                        <template #footer>
                            {{ getOfferAllListATotal }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column 
                            field="ulkeAdi" 
                            header="Ülke"
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
                            field="temsilciAdi" 
                            header="Temsilci"
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
                    <Column field="teklifOncelik" header="Öncelik"></Column>
                    <!-- <Column header="">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-danger" @click="offerDelete(slotProps.data.id)">Sil</button>

                    </template>
                    </Column> -->
                </DataTable>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <Chart type="bar" :data="getOfferAllChartListA" :options="chartOptions" class="w-100 mb-3 mt-3"  />
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <DataTable 
                        :value="getOfferAllListB" 
                        scrollable 
                        scrollHeight="400px" 
                        style="font-size:85%;"
                        v-model:filters="filters2"
                        filterDisplay="row"
                        @filter="offerAllListBFilter($event)"
                        v-model:selection="selectedOfferListB"
                        selectionMode="single"
                        @row-click="offerListBSelected($event)"
                        :rowStyle="rowStyle"
                        sortField="acil" :sortOrder="-1"
                    >
                    <template #header>
                        Teklifler B Listesi
                    </template>
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
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column 
                            field="sira" 
                            header="Sira"
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
                            field="musteriAdi" 
                            header="Müşteri"
                            :showFilterMenu="false"
                            :showFilterOperator="false"
                            :showClearButton="false"
                            :showApplyButton="false"
                            :showFilterMatchModes="false"
                            :showAddButton="false"
                            >
                        <template #footer>
                            {{ getOfferAllListBTotal }}
                        </template>
                        <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column 
                            field="ulkeAdi" 
                            header="Ülke"
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
                            field="temsilciAdi" 
                            header="Temsilci"
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
                    <Column field="teklifOncelik" header="Öncelik"></Column>
                    <!-- <Column header="">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-danger" @click="offerDelete(slotProps.data.id)">Sil</button>

                    </template>
                    </Column> -->
                </DataTable>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <Chart type="bar" :data="getOfferAllChartListB" :options="chartOptions" class=" mb-3 mt-3"  />
            </div>
        </div>
    </div>
    <div v-if="getMobile">

        <DataTable 
                :value="getOfferAllListA" 
                scrollable 
                scrollHeight="400px" 
                style="font-size:85%;"
                v-model:filters="filters1"
                filterDisplay="row"
                @filter="offerAllListAFilter($event)"
                v-model:selection="selectedOfferListA"
                selectionMode="single"
                @row-click="offerListASelected($event)"  
       
            >
            <template #header>
                Teklifler A Listesi
            </template>
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
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column 
                    field="sira" 
                    header="Sira"
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
                    field="musteriAdi" 
                    header="Müşteri"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                <template #body="slotProps">
                    <div :style="{ 'backgroundColor': slotProps.data.goruldu ? '' : 'yellow' }">
                        {{ slotProps.data.musteriAdi }}
                    </div>

                </template>
                <template #footer>
                    {{ getOfferAllListATotal }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column 
                    field="ulkeAdi" 
                    header="Ülke"
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
                    field="temsilciAdi" 
                    header="Temsilci"
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
            <Column field="teklifOncelik" header="Öncelik"></Column>
        </DataTable>


        <Chart type="bar" :data="getOfferAllChartListA" :options="chartOptions" class="w-100 mb-3 mt-3"  />

        <DataTable 
                :value="getOfferAllListB" 
                scrollable 
                scrollHeight="400px" 
                style="font-size:85%;"
                v-model:filters="filters2"
                filterDisplay="row"
                @filter="offerAllListBFilter($event)"
                v-model:selection="selectedOfferListB"
                selectionMode="single"
                @row-click="offerListBSelected($event)"  
                :rowStyle="rowStyle"
            >
            <template #header>
                Teklifler B Listesi
            </template>
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
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column 
                    field="sira" 
                    header="Sira"
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
                    field="musteriAdi" 
                    header="Müşteri"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    >
                <template #footer>
                    {{ getOfferAllListBTotal }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column 
                    field="ulkeAdi" 
                    header="Ülke"
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
                    field="temsilciAdi" 
                    header="Temsilci"
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
            <Column field="teklifOncelik" header="Öncelik"></Column>

        </DataTable>
        <Chart type="bar" :data="getOfferAllChartListB" :options="chartOptions" class=" mb-3 mt-3"  />

    </div>

    <Dialog v-model:visible="offer_detail_form" :header="queue" modal :style="{ width: '100vw' }" :closeOnEscape="false">
        <offerForm />
    </Dialog>

</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import { offerService } from '../../services/offerService';
import { socket } from '../../services/customServices/realTimeService';

import offerForm from '../../components/offer/offerFormAll.vue';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferAllListA',
            'getOfferAllListB',
            'getOfferAllListATotal',
            'getOfferAllListBTotal',
            'getOfferAllChartListA',
            'getOfferAllChartListB',
            'getOfferAllButton'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    components: {
        offerForm
    },
    data() {
        return {
            queue:null,
            filters1: {
                tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                temsilciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filters2: {
                tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                temsilciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedOfferListA: {},
            selectedOfferListB: {},
            offer_detail_form:false,
        }
    },
    methods: {
        rowStyle(event){
            if(event.acil){

                return {'backgroundColor':'gray'}
                
            }
        },
        offerDelete(queue){
            offerService.delete(queue).then(data => {
                if (data.status) {
                    socket.socketIO.emit('offer_list_emit');
                    socket.socketIO.emit('offer_detail_list_all_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    useLoadingStore().end_loading_act();
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                    useLoadingStore().end_loading_act();
                };
            });
        },
        offerListBSelected(event) {
            useLoadingStore().begin_loading_act();

            offerService.getOfferDetail(event.data.id).then(data => {
                useOfferStore().offer_form_model_list_load_act(data);
                useOfferStore().offer_new_button_load_act(false);
                useOfferStore().offer_all_button_load_act(false);
                this.offer_detail_form = true;
                this.queue = event.data.sira;
                useLoadingStore().end_loading_act();

            })
        },
        offerListASelected(event) {
            useLoadingStore().begin_loading_act();
            offerService.getOfferDetail(event.data.id).then(data => {
                useOfferStore().offer_form_model_list_load_act(data);
                useOfferStore().offer_new_button_load_act(false);
                useOfferStore().offer_all_button_load_act(false);
                this.offer_detail_form = true;
                this.queue = event.data.sira;
                useLoadingStore().end_loading_act();
            })
        },
        offerAllListAFilter(event) {
            useOfferStore().offer_all_list_a_total_load_act(event.filteredValue);
        },
        offerAllListBFilter(event) {
            useOfferStore().offer_all_list_b_total_load_act(event.filteredValue);
        }
    },
    mounted() {
        this.emitter.on('offer_detail_dialog_close', () => {
            this.offer_detail_form = false;
        });
        socket.socketIO.on('offer_detail_list_all_on', () => {
            offerService.getOfferAllList().then(data => {
                useOfferStore().offer_all_list_load_act(data);
                useLoadingStore().end_loading_act();

            });
        });
    }
}
</script>