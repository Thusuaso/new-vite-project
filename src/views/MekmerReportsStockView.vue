<template>
    <button type="button" class="btn btn-primary" @click="excel_output_list">Excel</button>
    <div class="row m-auto mt-3">
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="stock" id="flexRadioDefault1" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault1">
                    Sadece Stok
                </label>
            </div>    
        </div>
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="mekmer" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault2">
                    Mekmer
                </label>
            </div>
        </div>
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="mekmoz" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault4">
                    Mek-Moz
                </label>
            </div>
        </div>
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="hepsi" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault4">
                    Hepsi
                </label>
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                v-model:value="getMekmerStockList" 
                paginator 
                :rows="15"
                v-model:filters="filters"
                filterDisplay="row"
                @filter="mekmerStockFilters($event)"
                v-model="selectedStock"
                selectionMode="single"
                @row-click="stockSelected($event)"
                style="font-size:85%;"
                :sortField="['urunAdi']" :sortOrder="1"
            >
                <Column 
                    field="en" 
                    header="En"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    sortable 
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
                    sortable 
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
                    sortable 
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="urunAdi"
                    header="Ürün"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    sortable 
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="yuzeyIslem"
                    header="Yüzey"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    sortable 
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="kasaSayisi" header="Kasa" sortable >
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasaSayisi) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerStockListTotal.crate) }}
                    </template>
                </Column>
                <Column field="miktar" header="Miktar" sortable >
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerStockListTotal.amount) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="mekmer_reports_stock_form" header="" modal :style="{'width':'100vw'}">
        <mekmerReportsStockDetail/>
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';
import { reportsService } from '../services/reportsService';
import {useLocalStore} from '../stores/local';
import { useLoadingStore } from '../stores/loading';

import mekmerReportsStockDetail from '../components/reports/mekmerReportsStockDetail.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerStockList',
            'getMekmerStockListTotal'
        ]),
        ...mapState(useLocalStore,[
            'url'
        ])
    },
    components: {
        mekmerReportsStockDetail
    },
    data() {
        return {
            filters: {
                en: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                urunAdi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                yuzeyIslem: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            stocks_radio_button: 'hepsi',
            mekmer_reports_stock_form: false,
            selectedStock: {},
        }
    },
    methods: {
        mekmerStockFilters(event) {
            useReportsStore().mekmer_stock_list_total_load_act(event.filteredValue);
        },
        stockSelected(event) {
            useLoadingStore().begin_loading_act();
            let listStatus;
            if (this.stocks_radio_button == 'hepsi') listStatus = 1;
            else if (this.stocks_radio_button == 'mekmer') listStatus = 2;
            else if (this.stocks_radio_button == 'mekmoz') listStatus = 3;
            else if (this.stocks_radio_button == 'stock') listStatus = 4;
            const values = {
                'listStatus': listStatus,
                'value': event.data
            };
            reportsService.getMekmerStockListDetail(values).then(data => {
                useReportsStore().mekmer_stock_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.mekmer_reports_stock_form = true;
            })
        },
        radio_button_change(event) {
            if (event.target._value == 'hepsi') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockList().then(data => {
                    useReportsStore().mekmer_stock_list_load_act(data);
                    useReportsStore().mekmer_stock_list_total_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.target._value == 'mekmer') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockListMekmer(1).then(data => {
                    useReportsStore().mekmer_stock_list_load_act(data);
                    useReportsStore().mekmer_stock_list_total_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.target._value == 'mekmoz') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockListMekmoz(123).then(data => {
                    useReportsStore().mekmer_stock_list_load_act(data);
                    useReportsStore().mekmer_stock_list_total_load_act(data);
                    useLoadingStore().end_loading_act();
                })
            } else if (event.target._value == 'stock') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockListOnlyStock().then(data => {
                    useReportsStore().mekmer_stock_list_load_act(data);
                    useReportsStore().mekmer_stock_list_total_load_act(data);
                    useLoadingStore().end_loading_act();
                })
            }
        },
        excel_output_list(){
            reportsService.getStokExcelList(this.getMekmerStockList)
            .then(response=>{
                if(response.status){

                     
                        const link = document.createElement('a')
                        link.href = this.url + 'raporlar/listeler/stokRaporExcelListe' 

                        link.setAttribute('download','Stok_listesi.xlsx')
                        document.body.appendChild(link)
                        link.click()

                        }
            });
        }
    }
}
</script>
<style scoped>

</style>