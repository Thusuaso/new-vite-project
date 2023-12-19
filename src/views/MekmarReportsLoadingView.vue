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

    <div class="row m-auto mb-3">
        <div class="col">
            <div class="row m-auto mb-3">
                <div class="col">
                    <Dropdown v-model="selectedYearNew" :options="mekmarReportsNewYearList" optionLabel="yil" class="w-100 mb-3 mt-3" @change="changeYearNew($event)"/>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-secondary w-100 mb-3 mt-3" @click="excel_output_new_customer">Yeni Müşteri Excel</button>
                </div>
            </div>
            <DataTable :value="mekmarLoadingListNewYear" v-model:filters="filters1" filterDisplay="row" scrollable scrollHeight="550px" :selection="selectedLoadingListNew" selectionMode="single" 
                @row-click="loadingListNewSelected($event)"
                @filter="filtersLoadingNewList($event)"
            >
                <template #header>
                    {{ selectedYearNew.yil }} Müşterileri ({{ mekmarLoadingListNewYear.length }})
                </template>
                <Column field="musteri_adi" header="Müşteri" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="fob" header="Fob">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(mekmarLoadingListNewYearTotal.fob) }}
                    </template>
                    
                </Column>
                <Column field="dtp" header="Ddp">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.dtp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(mekmarLoadingListNewYearTotal.ddp) }}
                    </template>
                </Column>


            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="mekmar_reports_loading_new_form" header="" modal>
        <button type="button" class="btn btn-secondary w-100 mb-3 mt-3" @click="excel_output_new_customer_detail">Excel</button>
        <DataTable :value="mekmarReportsNewDetail" >
            <Column field="siparis_no" header="Po"></Column>
            <Column field="yukleme_tarihi" header="Y.Tarihi"></Column>

            <Column field="fob" header="Fob">
                 <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.fob) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.fob) }}
                 </template>
            </Column>
            <Column field="navlun" header="Navlun">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.navlun) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.navlun) }}
                 </template>
            </Column>
            <Column field="detay_1" header="Detay 1">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_1) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.detay_1) }}
                 </template>
            </Column>
            <Column field="detay_2" header="Detay 2">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_2) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.detay_2) }}
                 </template>
            </Column>
            <Column field="detay_3" header="Detay 3">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_3) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.detay_3) }}
                 </template>
            </Column>
            <Column field="dtp" header="Ddp">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.dtp) }}
                 </template>
                 <template #footer>
                    {{ $filters.formatPrice(mekmarReportsNewDetailTotal.dtp) }}
                 </template>
            </Column>
        </DataTable>
    </Dialog>

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
            'getMekmarLoadingMonthList',
            'mekmarLoadingListNewYear',
            'mekmarLoadingListNewYearTotal'
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
            mekmarReportsNewYearList:[],
            filters1:{
                musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            mekmarReportsNewDetail:[],
            mekmar_reports_loading_new_form:false,
            selectedLoadingListNew:null,
            selectedYearNew:null,
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
            },
            mekmarReportsNewDetailTotal:{
                'fob':0,
                'navlun':0,
                'detay_1':0,
                'detay_2':0,
                'detay_3':0,
                'dtp':0,
            }
        }
    },
    created() {
        this.selectedYear = this.getMekmarLoadingYearList[0];
        this.selectedMonth = this.getMekmarLoadingMonthList[0];
        this.selectedYearNew = this.getMekmarLoadingYearList[0];
        this.mekmarReportsNewYearList = this.getMekmarLoadingYearList.filter(x=>x.yil >=2019);

    },
    methods: {
        excel_output_new_customer_detail(){
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingNewCustomerDetailExcelOutput(this.mekmarReportsNewDetail).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/loading/new/customer/detail/excel";

                    link.setAttribute("download", "yeni_musteri_yuklenen_detay.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();
                };
            });

        },
        excel_output_new_customer(){
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarLoadingNewCustomerExcelOutput(this.mekmarLoadingListNewYear).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/loading/new/customer/excel";

                    link.setAttribute("download", "yeni_musteri_yuklenen.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();
                };
            });
        },
        filtersLoadingNewList(event){
            useReportsStore().mekmar_loading_total_new_list_total(event.filteredValue);
        },
        loadingListNewTotal(data){
          this.mekmarReportsNewDetailTotal = {
                'fob':0,
                'navlun':0,
                'detay_1':0,
                'detay_2':0,
                'detay_3':0,
                'dtp':0,
            };
            for(const item of data){
                this.mekmarReportsNewDetailTotal.fob += item.fob;
                this.mekmarReportsNewDetailTotal.navlun += item.navlun;
                this.mekmarReportsNewDetailTotal.detay_1 += item.detay_1;
                this.mekmarReportsNewDetailTotal.detay_2 += item.detay_2;
                this.mekmarReportsNewDetailTotal.detay_3 += item.detay_3;
                this.mekmarReportsNewDetailTotal.dtp += item.dtp;
            }
        },
        loadingListNewSelected(event){
          reportsService.getMekmarNewListDetail(event.data.musteriID,this.selectedYearNew.yil)
          .then(response=>{
            this.loadingListNewTotal(response);
            this.mekmar_reports_loading_new_form = true;
            this.mekmarReportsNewDetail = response;
          });  
        },
        changeYearNew(event){
            useLoadingStore().begin_loading_act();
                reportsService.getMekmarNewList(event.value.yil).then(data => {
                    useReportsStore().mekmar_loading_new_list_load_act(data);
                    useLoadingStore().end_loading_act();
                })
                
        
        
        },
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