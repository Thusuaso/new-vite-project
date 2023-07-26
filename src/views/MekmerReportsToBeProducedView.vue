<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="excel_output_list">Excel</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmerToBeProducedList" 
                    style="font-size:85%;"
                    paginator 
                    :rows="15"
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="toBeProducedFilters($event)"
                    v-model:selection="selectedToBeProduced"
                    selectionMode="single"
                    @row-click="toBeProducedSelected($event)"
                    sortField="uretilmesiGereken"
                    :sortOrder="-1"
                >
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
                        field="yuzey" 
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
                <Column field="sipMiktari" header="Sipariş">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.sipMiktari) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerToBeProducedTotalList.order) }}
                    </template>
                </Column>
                <Column field="uretimMiktar" header="Üretim">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.uretimMiktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerToBeProducedTotalList.produce) }}
                    </template>
                </Column>
                <Column field="uretilmesiGereken" header="Üretilecek">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.background }" style="color:black;font-weight: bolder;text-align:center;">{{ $filters.formatDecimal(slotProps.data.uretilmesiGereken) }}</div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="to_be_produced_form" header="" modal :style="{'width':'100vw'}">
        <mekmerReportsToBeProducedDetail />
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import { FilterMatchMode } from 'primevue/api';

import mekmerReportsToBeProducedDetail from '../components/reports/mekmerReportsToBeProducedDetail.vue';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerToBeProducedList',
            'getMekmerToBeProducedTotalList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    components: {
        mekmerReportsToBeProducedDetail
    },
    data() {
        return {
            filters: {
                kategori: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                urunAdi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                yuzey: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                en: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            to_be_produced_form: false,
            selectedToBeProduced: {},
        }
    },
    methods: {
        excel_output_list() {
            reportsService.getMekmerToBeProducedExcelOutput(this.getMekmerToBeProducedList).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/listeler/uretilenSipExcelListe";
                    link.setAttribute("download", "UretilenSip.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            })
        },
        toBeProducedFilters(event) {
            useReportsStore().mekmer_to_be_produced_total_list_load_act(event.filteredValue);
        },
        toBeProducedSelected(event) {
            console.log(event)
            useLoadingStore().begin_loading_act();
            reportsService.getMekmerToBeProducedDetailList(event.data.urunKartId).then(data => {
                useReportsStore().mekmer_to_be_produced_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.to_be_produced_form = true;
            })
        }
    }
}
</script>