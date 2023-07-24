<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarMkByPoProductionList" 
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="byProductionFilter($event)"
                    sortField="tarih"
                    :sortOrder="-1"
                    style="font-size:85%;"
                >
                <template #header>
                    {{ year }} Po Bazında Üretim Listesi
                </template>
                <Column field="tarih" header="Tarih"></Column>
                <Column 
                        field="firma" 
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
                <Column field="teslim" header="Teslim"></Column>
                <Column field="fob" header="Fob">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarMkByPoProductionTotalList.fob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarMkByPoProductionTotalList.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';
export default {
    props:['year'],
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarMkByPoProductionList',
            'getMekmarMkByPoProductionTotalList'
        ])
    },
    data() {
        return {
            filters: {
                firma: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        byProductionFilter(event) {
            useReportsStore().mekmar_mk_by_po_production_total_list_load_act(event.filteredValue);
        }
    }
}
</script>
<style scoped>

</style>