<template>
    <div class="row m-auto mb-3" v-if="!getMobile"> 
        <div class="col-1">
            <Dropdown v-model="selectedYear" :options="getMekmarLoadingYearList" optionLabel="yil" class="w-full md:w-14rem" @change="changeYear($event)"/>
        </div>
        <div class="col-2">
            <Dropdown v-model="selectedMonth" :options="getMekmarLoadingMonthList" optionLabel="ay_str" class="w-full md:w-14rem" @change="changeMonth($event)"/>
        </div>
        <div class="col-1">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="musteri" id="flexRadioDefault1" v-model="selectedKind" @input="kindSelected($event)">
                <label class="form-check-label" for="flexRadioDefault1">
                    Müşteri
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" value="po" id="flexRadioDefault2" checked v-model="selectedKind" @input="kindSelected($event)">
                <label class="form-check-label" for="flexRadioDefault2">
                    Po
                </label>
            </div>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="excel_output_month">Excel Ay</button>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="excel_output_year">Excel Yıl</button>
        </div>
    </div>

    <div class=" m-auto mb-3" v-if="getMobile"> 
            <div class="">
                <Dropdown v-model="selectedYear" :options="getMekmarLoadingYearList" optionLabel="yil" class="w-100 mb-3" @change="changeYear($event)"/>
            </div>
            <div class="">
                <Dropdown v-model="selectedMonth" :options="getMekmarLoadingMonthList" optionLabel="ay_str" class="w-100 mb-3" @change="changeMonth($event)"/>
            </div>
            <div class="row mb-3">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" value="musteri" id="flexRadioDefault1" v-model="selectedKind" @input="kindSelected($event)">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Müşteri
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" value="po" id="flexRadioDefault2" checked v-model="selectedKind" @input="kindSelected($event)">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Po
                        </label>
                    </div>
                </div>
                
                
            </div>
            <div class="">
                <button type="button" class="btn btn-secondary w-100 mb-3" @click="excel_output_month">Excel Ay</button>
            </div>
            <div class="">
                <button type="button" class="btn btn-secondary w-100 mb-3" @click="excel_output_year">Excel Yıl</button>
            </div>
        </div>


    <div class="row m-auto mb-3">
        <div class="col">
            <DataTable 
                    :value=" kind ? getMekmarLoadingListByCustomer : mekmarLoadingListMonth"
                    scrollable 
                    scrollHeight="550px"
                    v-model:filters="monthFilters"
                    filterDisplay="row"
                    @filter="monthFilterTotal($event)"
                    style="font-size:85%;"
                    
                >
                <template #header>
                    Aylık Yükleme
                </template>
                <Column field="yukleme_tarihi" header="Yükleme Tarihi">
                    <template #body="slotProps">
                        {{ $filters.formatDate(slotProps.data.yukleme_tarihi) }}
                    </template>
                </Column>
                <Column 
                    field="siparis_no" 
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
                <Column 
                        field="musteri_adii" 
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
                <Column field="fob" header="F">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarLoadingTotalListMonth.fob) }}
                    </template>
                </Column>
                <Column field="dtp" header="C/D">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.dtp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarLoadingTotalListMonth.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                    :value="mekmarLoadingListYear" 
                    scrollable 
                    scrollHeight="550px"
                    v-model:filters="yearFilters"
                    filterDisplay="row"
                    @filter="yearFilterTotal($event)"
                    style="font-size:85%;"
                >
                <template #header>
                    Yıllık Yükleme
                </template>
                <Column 
                    field="musteri_adi" 
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
                <Column field="fob" header="F">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarLoadingTotalListYear.fob) }}
                    </template>
                </Column>
                <Column field="dtp" header="C/D">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.dtp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarLoadingTotalListYear.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable :value="getMekmarLoadingListYearCounting" style="font-size:85%;">
                <template #header>
                    Pazarlama Toplam Yüklemeler
                </template>
                <Column field="marketing" header="Marketing"></Column>
                <Column field="yukleme_sayisiay" header="Ay">
                    <template #footer>
                        {{ getMekmarLoadingTotalListMarketing.month }}
                    </template>
                </Column>
                <Column field="yukleme_sayisi" header="Yıl">
                    <template #footer>
                        {{ getMekmarLoadingTotalListMarketing.year }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import { reportsService } from '../services/reportsService';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'mekmarLoadingListMonth',
            'getMekmarLoadingTotalListMonth',
            'mekmarLoadingListYear',
            'getMekmarLoadingTotalListYear',
            'getMekmarLoadingListByCustomer',
            'getMekmarLoadingListYearCounting',
            'getMekmarLoadingTotalListMarketing',
            'getMekmarLoadingYearList',
            'getMekmarLoadingMonthList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            selectedYear: {},
            selectedMonth: {},
            selectedKind: {},
            kind: false,
            monthFilters: {
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                musteri_adii: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            yearFilters: {
                musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    created() {
        this.selectedYear = this.getMekmarLoadingYearList[0];
        this.selectedMonth = this.getMekmarLoadingMonthList[0];
    },
    methods: {
        excel_output_year() {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingYearListExcelOutput(this.mekmarLoadingListYear).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/listeler/yuklemeYilExcelCikti";

                    link.setAttribute("download", "Yukleme-Yil.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();
                };
            });
        },
        excel_output_month() {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingMonthListExcelOutput(this.getMekmarLoadingListByCustomer).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/listeler/yuklememusExcelCikti";

                    link.setAttribute("download", "Yukleme-Musteri.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();

                };
            });
        },
        changeYear(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingMonthList(event.value.yil).then(months => {
                reportsService.getMekmarLoadingList(event.value.yil, months[0].ay).then(data => {
                    useReportsStore().mekmar_loading_list_load_act(data);
                    useReportsStore().mekmar_loading_month_list_load_act(months);
                    this.selectedMonth = months[0];
                    useLoadingStore().end_loading_act();
                })
                
            })
        },
        changeMonth(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingList(this.selectedYear.yil, event.value.ay).then(data => {
                useReportsStore().mekmar_loading_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        },
        kindSelected(event) {
            if (event.target._value == 'musteri') {
                this.kind = true;
            } else {
                this.kind = false;
            }
        },
        yearFilterTotal(event) {
            useReportsStore().mekmar_loading_total_list_year(event.filteredValue);
        },
        monthFilterTotal(event) {
            useReportsStore().mekmar_loading_total_list_month(event.filteredValue);
        }

    }

}
</script>
<style scoped>

</style>