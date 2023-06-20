<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarGuMekusList" 
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="guMekusFiltered($event)"                
                >
                <Column 
                    field="siparisNo" 
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
                <Column field="mekusMasraf" header="Mekus">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.mekusMasraf) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuMekusTotalList.total) }}
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
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuMekusList',
            'getMekmarGuMekusTotalList'
        ])
    },
    data() {
        return {
            filters: {
                siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        guMekusFiltered(event) {

        }
    }
}
</script>