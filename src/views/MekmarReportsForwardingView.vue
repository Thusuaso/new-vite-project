<template>
    <div class="row m-auto mt-3" v-if="!getMobile">
        <div class="col-2">
            <Calendar v-model="f_dates" selectionMode="range" :manualInput="false" dateFormat="dd/mm/yy"/>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-success" @click="searchForwardingDate">Ara</button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-primary" @click="f_dates = null">Temizle</button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="excelOutput">Excel</button>
        </div>
        <div class="col-1">
            <Dropdown v-model="selectedQuarter" :options="quarters" optionLabel="quarter"  @change="quarterSelected($event)"/>

        </div>
    </div>
    <div class=" m-auto mt-3" v-if="getMobile">
            <div class="">
                <Calendar class="w-100 mb-3" v-model="f_dates" selectionMode="range" :manualInput="false" dateFormat="dd/mm/yy"/>
            </div>
            <div class="">
                <button type="button" class="btn btn-success w-100 mb-3" @click="searchForwardingDate">Ara</button>
            </div>
            <div class="">
                <button type="button" class="btn btn-primary w-100 mb-3" @click="f_dates = null">Temizle</button>
            </div>
            <div class="">
                <button type="button" class="btn btn-secondary w-100 mb-3" @click="excelOutput">Excel</button>
            </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarForwardingList" 
                    tableStyle="font-size:65%"
                    paginator 
                    :rows="15"
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="filterTotal($event)"
        
                >
                <Column field="tarih" header="Tarih"></Column>
                <Column 
                        field="musteriadi" 
                        header="Kime"
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
                        field="kimden" 
                        header="Kimden"
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
                        field="urunKartID" 
                        header="Ürün Kart"
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
                        field="kategori" 
                        header="Kategori"
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
                        field="kasano" 
                        header="Kasa"
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
                        field="urunadi" 
                        header="Ürün"
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
                        field="ocakadi" 
                        header="Ocak"
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
                        field="yuzeyadi" 
                        header="Yüzey"
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
                        field="en" 
                        header="En"
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
                        field="boy"
                        header="Boy"
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
                        field="kenar" 
                        header="Kenar"
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
                <Column field="kutuadet" header="Kutu"
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
                <Column field="adet" header="Adet"
                :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                >
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.adet) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmarForwardingTotalList.piece) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="miktar" header="Miktar"
                :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                >
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmarForwardingTotalList.amount) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="birimadi" header="Birim"></Column>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="birimfiyat" header="Fiyat">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.birimfiyat) }}
                    </template>
                </Column>
                <Column field="toplam" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarForwardingTotalList.totalPrice) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLocalStore } from '../stores/local';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';

import { mapState } from 'pinia';

import { localDateService } from '../services/localDateService';

import { FilterMatchMode } from 'primevue/api';
import { reportsService } from '../services/reportsService';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarForwardingList',
            'getMekmarForwardingTotalList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    data() {
        return {
            filters: {
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kimden: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunKartID: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kasano: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ocakadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yuzeyadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                miktar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kutuadet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },


            },
            f_dates: null,
            selectedQuarter:{'id':1,'quarter':'1Q'},
            quarters:[
                {'id':1,'quarter':'1Q'},
                {'id':2,'quarter':'2Q'},
                {'id':3,'quarter':'3Q'},
                {'id':4,'quarter':'4Q'},
            ]

        }
    },
    methods: {
        quarterSelected(event){
            useLoadingStore().begin_loading_act();

            let year = new Date().getFullYear();
            if(event.value.id == 1){

                reportsService.getMekmarForwardingReportsQuarter(year,year-2).then(response=>{
                    useReportsStore().mekmar_forwarding_list_load_act(response);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.value.id == 2){
                reportsService.getMekmarForwardingReportsQuarter(year-3,year-5).then(response=>{
                    useReportsStore().mekmar_forwarding_list_load_act(response);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.value.id == 3){
                reportsService.getMekmarForwardingReportsQuarter(year-6,year-8).then(response=>{
                    useReportsStore().mekmar_forwarding_list_load_act(response);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.value.id == 4){
                reportsService.getMekmarForwardingReportsQuarter(year-9,year-12).then(response=>{
                    useReportsStore().mekmar_forwarding_list_load_act(response);
                    useLoadingStore().end_loading_act();
                });
            } 
            


        },
        excelOutput() {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarForwardingExcel(this.getMekmarForwardingList).then((responce) => {
                if (responce.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl +
                        "raporlar/dosyalar/sevkiyatRaporExcelListe";

                    link.setAttribute("download", "sevkiyat_listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();
                }
            });
        },
        searchForwardingDate() {
            if (this.f_dates) {
                useLoadingStore().begin_loading_act();
                const firstDate = localDateService.getDateString(this.f_dates[0]);
                const secondDate = localDateService.getDateString(this.f_dates[1]);
                reportsService.getMekmarForwardingListDate(firstDate,secondDate).then(data => {
                    useReportsStore().mekmar_forwarding_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmarForwardingList(new Date().getFullYear()).then(data => {
                    useReportsStore().mekmar_forwarding_list_load_act(data);
                    useLoadingStore().end_loading_act();
                })
            };
        },
        filterTotal(event) {
            useReportsStore().mekmar_forwarding_total_list_load_act(event.filteredValue);
        }
    }
}
</script>