<template>
    <div class="row m-auto mt-3">
        <div class="col-2">
            <Calendar v-model="m_r_date" selectionMode="range" :manualInput="false" placeholder="Bir Tarih Aralığı Seçiniz"/>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="m_r_date= null">Temizle</button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-success" @click="getSelectedRangeDate">Ara</button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="excel_mekmer_reports_list">Excel</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmerProductionList" 
                style="font-size:85%;"
                paginator 
                :rows="15"
                v-model:filters="filters"
                filterDisplay="row"
            >
                <Column field="tarih" header="Tarih"></Column>
                <Column 
                    field="kimden" 
                    header="Tedarikçi"
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
                <Column 
                        field="urunKartID" 
                        header="Ürün Kart Id"
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="miktar" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerProductionTotalList.amount) }}
                    </template>
                </Column>
                <Column field="adet" header="Adet">
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerProductionTotalList.piece) }}
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="aciklama" header="Not"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';
import { localDateService } from '../services/localDateService';
import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerProductionList',
            'getMekmerProductionTotalList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    data() {
        return {
            filters: {
                kimden: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                urunKartID: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kategori: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kasano: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                urunadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                ocakadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                yuzeyadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                en: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                siparisno: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            m_r_date:null,
        }
    },
    methods: {
        getSelectedRangeDate() {
            if (this.m_r_date != null) {
                let first = localDateService.getDateString(this.m_r_date[0]);
                let last = localDateService.getDateString(this.m_r_date[1]);
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerProductionsDateRange(first, last).then(data => {
                    useReportsStore().mekmer_production_list_load_act(data);
                    useLoadingStore().end_loading_act();
                })
            } else {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmerProductionsListYear(new Date().getFullYear()).then(data => {
                    useReportsStore().mekmer_production_list_load_act(data);
                    useLoadingStore().end_loading_act();
                });
            }
            
        },
        excel_mekmer_reports_list() {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmerProductionsExcelList(this.getMekmerProductionList).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl +
                        "raporlar/dosyalar/uretimRaporExcelListe";
                    link.setAttribute("download", "uretim_rapor_listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();

                }
            });
        }
    }
}
</script>
<style scoped>

</style>