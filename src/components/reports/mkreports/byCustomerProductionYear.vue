<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarMkByMarketingProductionList" 
                    tableStyle="min-width: 50rem"
                >
                <template #header>
                    {{ year }} Marketinge Göre Siparişler
                </template>
                <Column field="marketing" header="Marketing"></Column>
                <Column field="toplam" header="Fob">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(mekmarMkByMarketingProductionTotalList.fob) }}
                    </template>
                </Column>
                <Column field="toplamCfr" header="Ddp">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(mekmarMkByMarketingProductionTotalList.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarMkByCustomerProductionList" 
                tableStyle="min-width: 50rem"
                sortField="toplamCfr"
                :sortOrder="-1"
                v-model:filters="filters"
                filterDisplay="row"
                @filter="byCustomerFilter($event)"
            >
            <template #header>
                {{ year }} Müşteri Bazında Güncel Siparişler
            </template>
            <Column 
                    field="musteriAdi" 
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
            <Column 
                    field="marketing" 
                    header="Marketing"
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
                    field="ulkeAdi" 
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
            <Column field="toplam" header="Fob">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.toplam) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarMkByCustomerProductionTotalList.fob) }}
                </template>
            </Column>
            <Column field="toplamCfr" header="Ddp">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarMkByCustomerProductionTotalList.ddp) }}
                </template>
            </Column>

            </DataTable>
        </div>
    </div>
    
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia'

import { FilterMatchMode } from 'primevue/api';

export default {
    props: ['year'],
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarMkByCustomerProductionList',
            'getMekmarMkByCustomerProductionTotalList',
            'getMekmarMkByMarketingProductionList',
            'mekmarMkByMarketingProductionTotalList'
        ])
    },
    data() {
        return {
            filters: {
                musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        byCustomerFilter(event) {
            useReportsStore().mekmar_mk_by_customer_production_total_list_load_act(event.filteredValue);
        }
    }
}
</script>
<style scoped></style>