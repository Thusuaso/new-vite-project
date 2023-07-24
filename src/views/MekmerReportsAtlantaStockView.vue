<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmerAtlantaStockList" 
                    style="font-size:85%;"
                    paginator 
                    :rows="15"
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="mekmerAtlantaStockFiltered($event)"
                    v-model:selection="selectedAtlantaStock"
                    selectionMode="single"
                    @row-click="atlantaStockSelected($event)"
                >
                <Column 
                    field="sku"
                    header="Sku"
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
                        field="kod" 
                        header="Kod"
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
                        field="tanim" 
                        header="Tanım"
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
                        field="po" 
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
                <Column field="kasa_adet" header="Kasa Adet">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasa_adet) }}
                    </template>
                </Column>
                <Column field="kasa_kutu" header="Kasa Kutu">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasa_kutu) }}
                    </template>
                </Column>
                <Column field="kasa_m2" header="Kasa M2">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasa_m2) }}
                    </template>
                </Column>
                <Column field="kasa_Sqft" header="Kasa Sqft">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kasa_Sqft) }}
                    </template>
                </Column>
                <Column field="stok_kutu" header="Stok Kutu">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.stok_kutu) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.stockBox) }}
                    </template>
                </Column>
                <Column field="stok_sqft" header="Stok Sqft">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.stok_sqft) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.stockSqft) }}
                    </template>
                </Column>
                <Column field="stok_m2" header="Stok M2">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.stok_m2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.stockM2) }}
                    </template>
                </Column>
                <Column field="su_kutu" header="Su Kutu">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.su_kutu) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.seaBox) }}
                    </template>
                </Column>
                <Column field="su_sqft" header="Su Sqft">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.su_sqft) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.seaSqft) }}
                    </template>
                </Column>
                <Column field="su_m2" header="Su M2">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.su_m2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerAtlantaStockTotalList.seaM2) }}
                    </template>
                </Column>
                <Column field="toplam_mekus" header="Mekus">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplam_mekus) }}
                    </template>
                </Column>
                <Column field="mekmar_fiyat" header="Mekus Efes">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.mekmar_fiyat) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="atlanta_stock_form" header="" modal>
        <mekmerReportsStockAtlantaDetail/>
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import { FilterMatchMode } from 'primevue/api';

import mekmerReportsStockAtlantaDetail from '../components/reports/mekmerReportsStockAtlantaDetail.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerAtlantaStockList',
            'getMekmerAtlantaStockTotalList'
        ])
    },
    components: {
        mekmerReportsStockAtlantaDetail
    },
    data() {
        return {
            filters: {
                sku: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kod: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                tanim: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                po: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            selectedAtlantaStock: {},
            atlanta_stock_form: false,
            
        }
    },
    methods: {
        mekmerAtlantaStockFiltered(event) {
            useReportsStore().mekmer_atlanta_stock_total_list_load_act(event.filteredValue);
        },
        atlantaStockSelected(event) {
            console.log(event)
            useLoadingStore().begin_loading_act();
            reportsService.getMekmerAtlantaStockDetailList(event.data.sku).then(data => {
                useReportsStore().mekmer_atlanta_stock_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.atlanta_stock_form = true;
            })
        }
    }
    
}
</script>
<style scoped>

</style>