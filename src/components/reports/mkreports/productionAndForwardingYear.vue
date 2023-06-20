<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarMkProductionAndForwardingList" 
                tableStyle="min-width: 50rem"
                v-model:filters="filters"
                filterDisplay="row"
                @filter="productionAndForwardingFiltered($event)"
            
            >
                <template #header>
                    {{ year }} Sipariş ve Sevkiyat

                </template>
                <Column 
                    field="musteriadi" 
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
                <Column field="siparisfob" header="Sipariş (Fob)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.siparisfob) }}
                    </template>
                     <template #footer>
                        {{ $filters.formatPrice(getMekmarMkProductionAndForwardingTotalList.product) }}
                     </template>
                </Column>
                <Column field="yuklenenddp" header="Yüklenen (Ddp)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.yuklenenddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarMkProductionAndForwardingTotalList.forward) }}
                    </template>
                </Column>
                <Column field="total" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.total) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarMkProductionAndForwardingTotalList.total) }}
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
            'getMekmarMkProductionAndForwardingList',
            'getMekmarMkProductionAndForwardingTotalList'
        ])
    },
    data() {
        return {
            filters: {
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        productionAndForwardingFiltered(event) {
            useReportsStore().mekmar_mk_production_and_forwarding_total_list_load_act(event.filteredValue);
        }
    }
}
</script>
<style scoped></style>