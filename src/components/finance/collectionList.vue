<template>
    <div class="row">
        <div class="col">
            <Dropdown v-model="selectedYear" :options="getCollectionYearList" optionLabel="yil" class="w-full md:w-14rem" @change="yearChange($event)"/>
        </div>
        <div class="col">
            <Dropdown v-model="selectedMonth" :options="getCollectionMonthList" optionLabel="ay_str" class="w-full md:w-14rem" @change="monthChange($event)" />
        </div>
        <div class="col">
            <button type="button" class="btn btn-primary" @click="excel_cikti_click" >Excel</button>
        </div>
    </div>
    <br/>
    <DataTable 
            :value="getCollectionList" 
            style="font-size:85%;"
            scrollable scrollHeight="400px" 
            @filter="financeCollectionFilter($event)" 
            v-model:filters="filters" 
            filterDisplay="row"
        >
        <Column field="tarih" header="Paid Date"></Column>
        <Column field="musteriadi" header="Customer"
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
        <Column field="po" header="Po"
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
        <Column field="tutar" header="Total">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(total) }}
            </template>
        </Column>
    </DataTable>
</template>
<script>
import { useFinanceStore } from '../../stores/finance';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api'
import { financeService } from '../../services/financeService';
import { useLocalStore } from '../../stores/local';
export default {
    computed: {
        ...mapState(useFinanceStore, [
            'getCollectionList',
            'getCollectionYearList',
            'getCollectionMonthList'
        ]),
        ...mapState(useLocalStore, [
            'url'
        ])
    },
    data() {
        return {
            selectedYear: {},
            selectedMonth: {},
            total: 0,
            filters: {
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            }
            
        }
    },
    created() {
        this.selectedYear = this.getCollectionYearList[0];
        this.selectedMonth = this.getCollectionMonthList[0];
        this.collectionTotalSum(this.getCollectionList);
    },
    methods: {
        excel_cikti_click() {
            useLoadingStore().begin_loading_act();

            financeService.getPaymentList(this.getCollectionList).then((res) => {
                if (res.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.url + "finans/listeler/odemelerAyrintiListesiExcel";
                    link.setAttribute("download", "odemeler_listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();


                }
            });
        },
        collectionTotalSum(data) {
            this.total = 0;
            for (const item of data) {
                this.total += item.tutar;
            }
        },
        financeCollectionFilter(event) {
            this.collectionTotalSum(event.filteredValue);
        },
        yearChange(event) {
            useLoadingStore().begin_loading_act();
            financeService.getFinanceCollectionMonthList(event.value.yil).then(month => {
                useFinanceStore().finance_collection_month_list_load_act(month);
                this.selectedMonth = month[0];
                financeService.getFinanceCollectionList(event.value.yil, month[0].ay).then(data => {
                    useFinanceStore().finance_collection_list_load_act(data);
                    useLoadingStore().end_loading_act();

                });
            })
        },
        monthChange(event) {
            useLoadingStore().begin_loading_act();
            financeService.getFinanceCollectionList(this.selectedYear.yil,event.value.ay).then(data => {
                useFinanceStore().finance_collection_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        }
    }
}
</script>