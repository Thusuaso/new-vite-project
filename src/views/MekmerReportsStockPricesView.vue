<template>
    <div class="row m-auto mt-3">
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="mekmermekmoz" id="flexRadioDefault1" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault1">
                    Mekmer + Mekmoz
                </label>
            </div>    
        </div>
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="dismekmer" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault2">
                    Dışarda Olan Mekmer Kasaları
                </label>
            </div>
        </div>
        <div class="col-3">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="mekmerdis" v-model="stocks_radio_button" @input="radio_button_change($event)">
                <label class="form-check-label" for="flexRadioDefault4">
                   Mekmerde Olan Dış Kasalar
                </label>
            </div>
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-secondary" @click="excel_output_list">Excel</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                v-model:value="getMekmerProductionPricesList" 
                paginator 
                :rows="15"
                v-model:filters="filters"
                filterDisplay="row"
                @filter="mekmerStockFilters($event)"
                v-model:selection="selectedStock"
                selectionMode="single"
                @row-click="stockSelected($event)"
                style="font-size:85%;"
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
                <Column 
                    field="urunAdi"
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
                    field="yuzeyIslem"
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
                <Column field="kasaSayisi" header="Kasa">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasaSayisi) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(mekmerProductionPricesTotalList.crate) }}
                    </template>
                </Column>
                <Column field="miktar" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(mekmerProductionPricesTotalList.amount) }}
                    </template>
                </Column>
                <Column field="price" header="Fiyat">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.price) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="mekmer_reports_stock_form" header="" modal :style="{ 'width': '100vw' }">
        <mekmerReportsStockPricesDetail :status="stocks_radio_button" :productId="selectedStock.urunKartId" :price="selectedStock.price"/>
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLocalStore } from '../stores/local';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';
import { reportsService } from '../services/reportsService';
import { socket } from '../services/customServices/realTimeService';
import mekmerReportsStockPricesDetail from '../components/reports/mekmerReportsStockPricesDetail.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerProductionPricesList',
            'mekmerProductionPricesTotalList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ]),
    },
    components: {
        mekmerReportsStockPricesDetail
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
            stocks_radio_button: 'mekmermekmoz',
            mekmer_reports_stock_form: false,
            selectedStock: {},
        }
    },
    methods: {
        
        excel_output_list() {
            reportsService.getMekmerStockPricesExcelOutput(this.getMekmerProductionPricesList).then((response) => {
                if (response.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/listeler/stokRaporuFiyatli";

                    link.setAttribute("download", "stockFiyatli.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            });
        },
        mekmerStockFilters(event) {
            useReportsStore().mekmer_production_prices_total_list_load_act(event.filteredValue);
        },
        stockSelected(event) {
            if (this.stocks_radio_button == 'mekmermekmoz') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesDetailList(event.data.urunKartId).then(data => {
                    useReportsStore().mekmer_production_prices_detail_list_load_act(data);
                    useLoadingStore().end_loading_act();
                    this.mekmer_reports_stock_form = true;
                });
            }
            else if (this.stocks_radio_button == 'dismekmer') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesOutsideDetail(event.data.urunKartId).then(data => {
                    useReportsStore().mekmer_production_prices_detail_list_load_act(data);
                    useLoadingStore().end_loading_act();
                    this.mekmer_reports_stock_form = true;
                });
            }
            else if (this.stocks_radio_button == 'mekmerdis') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesMekmerOutsideDetail(event.data.urunKartId).then(data => {
                    useReportsStore().mekmer_production_prices_detail_list_load_act(data);
                    useLoadingStore().end_loading_act();
                    this.mekmer_reports_stock_form = true;
                });
            };
            
        },
        radio_button_change(event) {
            if (event.target._value == 'mekmermekmoz') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesList().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.target._value == 'dismekmer') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesOutside().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (event.target._value == 'mekmerdis') {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesMekmerOutside().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            };
        }
    },
    mounted() {
        this.emitter.on('close_reports_stock_prices_dialog', () => {
            this.mekmer_reports_stock_form = false;
        });
        socket.socketIO.on('mekmer_reports_stock_prices_list_update_list_on', (status) => {
            if (status == 1) {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesList().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (status == 2) {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesOutside().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            } else if (status == 3) {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerStockPricesMekmerOutside().then(data => {
                    useReportsStore().mekmer_production_prices_list_load_act(data);
                    useReportsStore().mekmer_production_prices_total_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            }
        })
    }
}
</script>
<style scoped>

</style>