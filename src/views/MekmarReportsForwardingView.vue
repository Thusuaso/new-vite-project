<template>
    <div class="row m-auto mt-3">
        <div class="col-2">
            <Calendar v-model="f_dates" selectionMode="range" :manualInput="false"/>
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
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarForwardingList" 
                    tableStyle="min-width: 50rem;font-size:95%"
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
                <Column field="kutuadet" header="Kutu">
                
                </Column>
                <Column field="adet" header="Adet">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.adet) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmarForwardingTotalList.piece) }}
                    </template>
                </Column>
                <Column field="miktar" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmarForwardingTotalList.amount) }}
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
            },
            f_dates: null,
        }
    },
    methods: {
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