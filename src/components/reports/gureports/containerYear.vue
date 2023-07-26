<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarGuContainerCountryList" 
                scrollable 
                scrollHeight="450px"
                v-model:filters="filtersCountry"
                filterDisplay="row"
                @filter="guContainerCountryFiltered($event)"
                v-model:selection="selectedGuContainerCountry"
                selectionMode="single"
                @row-click="guContainerCountrySelected($event)"
                style="font-size:85%;"
            >   
                <template #header>
                    Ülkeye Göre Konteynır {{ getMekmarGuContainerCountryTotalList.country }}
                </template>
                <Column 
                    field="ulke_adi" 
                    header="Ülke"
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
                <Column field="sip_sayisi" header="Sipariş Sayısı">
                    <template #footer>
                        {{ getMekmarGuContainerCountryTotalList.order }}
                    </template>
                </Column>
                <Column field="konteynir_sayisi" header="Konteynır Sayısı">
                    <template #footer>
                        {{ getMekmarGuContainerCountryTotalList.container }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                    :value="getMekmarGuContainerCustomerList" 
                    scrollable 
                    scrollHeight="450px"
                    v-model:filters="filtersCustomer"
                    filterDisplay="row"
                    @filter="guContainerCustomerFiltered($event)"
                    v-model:selection="selectedGuContainerCustomer"
                    selectionMode="single"
                    @row-click="guContainerCustomerSelected($event)"
                    style="font-size:85%;"
                >
                <template #header>
                    Müşteriye Göre Konteynır {{ getMekmarGuContainerCustomerTotalList.customer }}
                </template>
                <Column 
                    field="ulke_adi" 
                    header="Ülke"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                    </template>    
                </Column>
                <Column 
                    field="firma_adi"
                    header="Firma"
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
                <Column field="yuk_mus_sayisi" header="Yüklenen Sipariş">
                    <template #footer>
                        {{ getMekmarGuContainerCustomerTotalList.forwarding }}
                    </template>
                </Column>
                <Column field="konteynir_sayisi" header="Konteynır Sayısı">
                    <template #footer>
                        {{ getMekmarGuContainerCustomerTotalList.container }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                    :value="getmekmarGuContainerSupplierList" 
                    scrollable 
                    scrollHeight="450px"
                    v-model:filters="filtersSupplier"
                    filterDisplay="row"
                    @filter="guContainerSupplierFiltered($event)"
                    v-model:selection="selectedGuContainerSupplier"
                    selectionMode="single"
                    @row-click="guContainerSupplierSelected($event)"
                    style="font-size:85%;"
                >
                <template #header>
                    Tedarikçiye Göre Konteynır {{ getMekmarGuContainerSupplierTotalList.supplier }}
                </template>
                <Column 
                    field="firma_adi" 
                    header="Firma"
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
                <Column field="yuklenen_tedarikci_sayisi" header="Yüklenen Sayısı">
                    <template #footer>
                        {{ getMekmarGuContainerSupplierTotalList.forwarding }}
                    </template>
                </Column>
                <Column field="total_alis" header="Toplam($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.total_alis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerSupplierTotalList.getPaid) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="container_by_country_detail_form" header="" modal :style="{ 'width': '100vw' }">
        <containerByCountryDetail/>
    </Dialog>
    <Dialog v-model:visible="container_by_customer_detail_form" header="" modal :style="{ 'width': '100vw' }">
        <containerByCustomerDetail/>
    </Dialog>
    <Dialog v-model:visible="container_by_supplier_detail_form" header="" modal :style="{ 'width': '100vw' }">
        <containerBySupplierDetail/>
    </Dialog>
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { useLoadingStore } from '../../../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { reportsService } from '../../../services/reportsService';

import containerByCountryDetail from './containerByCountryDetail.vue';
import containerByCustomerDetail from './containerByCustomerDetail.vue';
import containerBySupplierDetail from './containerBySupplierDetail.vue';
export default {
    props:['year'],
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuContainerCountryList',
            'getMekmarGuContainerCountryTotalList',
            'getMekmarGuContainerCustomerList',
            'getMekmarGuContainerCustomerTotalList',
            'getmekmarGuContainerSupplierList',
            'getMekmarGuContainerSupplierTotalList'
        ])
    },
    components: {
        containerByCountryDetail,
        containerByCustomerDetail,
        containerBySupplierDetail
    },
    data() {
        return {
            filtersCountry: {
                ulke_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filtersCustomer: {
                ulke_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filtersSupplier: {
                firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedGuContainerCountry: {},
            container_by_country_detail_form: false,
            selectedGuContainerCustomer: {},
            container_by_customer_detail_form: false,
            selectedGuContainerSupplier: {},
            container_by_supplier_detail_form:false,
            
        }
    },
    methods: {
        guContainerSupplierSelected(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarGuContainerBySupplierDetailList(event.data.tedarikci_id, this.year).then(data => {
                useReportsStore().mekmar_gu_container_by_supplier_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.container_by_supplier_detail_form = true;
            });
        },
        guContainerCustomerSelected(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarGuContainerByCustomerDetailList(event.data.id, this.year).then(data => {
                useReportsStore().mekmar_gu_container_by_customer_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.container_by_customer_detail_form = true;
            });
        },
        guContainerCountrySelected(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarGuContainerByCountryDetailList(event.data.ulke_id,this.year).then(data => {
                useReportsStore().mekmar_gu_container_by_country_detail_list_load_act(data);
                this.container_by_country_detail_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        guContainerCountryFiltered(event) {
            useReportsStore().mekmar_gu_container_country_total_list_load_act(event.filteredValue);
        },
        guContainerCustomerFiltered(event) {
            useReportsStore().mekmar_gu_container_customer_total_list_load_act(event.filteredValue);
        },
        guContainerSupplierFiltered(event) {
            useReportsStore().mekmar_gu_container_supplier_total_list_load_act(event.filteredValue);
        }
    }
}
</script>