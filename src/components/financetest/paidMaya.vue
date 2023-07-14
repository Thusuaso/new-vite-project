<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                v-model:value="getFinanceTestMayaList"
                v-model:filters="filters"
                filterDisplay="row"
            >
                <template #header>
                    Maya Ödemeleri
                </template>
                <Column 
                        field="order_date" 
                        header="S.Tarih"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #body="slotProps">
                        {{ changeDate(slotProps.data.order_date) }}
                    </template>

                </Column>
                <Column 
                        field="forwarding_date"
                        header="Y.Tarih"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #body="slotProps">
                        {{ changeDate(slotProps.data.forwarding_date) }}
                    </template>
    
                </Column>
                <Column 
                        field="customer" 
                        header="Müşteri"
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="order_amount" header="Sipariş">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.order_amount) }}
                    </template>
                </Column>
                <Column field="paid" header="Ödeme(GELEN)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.paid) }}
                    </template>
                </Column>
                <Column field="balance" header="Balans(Tahsil Edilmedi)">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.balance > 0 ? 'green':'','color':slotProps.data.balance>0 ? 'white':''}">
                            {{ $filters.formatPrice(slotProps.data.balance) }}
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useFinanceTestStore } from '../../stores/financetest';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';

import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useFinanceTestStore, [
            'getFinanceTestMayaList'
        ]),
        
    },
    data() {
        return {
            filters: {
                customer: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods: {
        changeDate(event) {
            if (event == null) {
                return ''
            } else {
                return localDateService.getDateString(event);
            }   
        }
    }

}
</script>
<style scoped>

</style>