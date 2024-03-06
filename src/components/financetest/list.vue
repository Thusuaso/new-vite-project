<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-0">
            <div class="col-9">
            <DataTable 
                :value="!getAllFinance ? getFinanceTestList : getFinanceTestListAll" 
                style="font-size:85%;"
                sortField="total" 
                sortOrder="-1" 
                scrollable 
                scrollHeight="600px"
                v-model:filters="filters"
                filterDisplay="row"
                @filter="financeFilters($event)"
                v-model:selection="selectedFinance"
                selectionMode="single"
                @row-click="financeSelected($event)"
        
            >
                <Column 
                    field="customer_name" 
                    header="Customer"
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
                <Column field="total_order_amount" header="Total Order">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.total_order_amount) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.total_orders) }}
                    </template>
                </Column>
                <Column field="production" header="On Production">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.production) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.orders) }}
                    </template>
                </Column>
                <Column field="forwarding" header="Shipped">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.forwarding) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.forwarding) }}
                    </template>
                </Column>
                <Column field="paid" header="Paid">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.paid) }}
                    </template>
                </Column>
                <Column field="advanced_payment" header="Prepayment">
                    <template #body="slotProps">
                        <div :style="{ 'backgroundColor': slotProps.data.advanced_payment ? 'red' : '', 'color': slotProps.data.advanced_payment ? 'white' : '' }">
                            {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
                        </div>
                
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.advance_payment) }}
                    </template>
                </Column>
                <Column field="total " header="Balance (Including Production)">
                    <template #body="slotProps">
                        <div :style="{ 'backgroundColor': slotProps.data.total < -8 ? 'green' : '', 'color': slotProps.data.total < -8 ? 'white' : 'black' }">
                            {{ $filters.formatPrice(slotProps.data.total) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.balance) }}
                    </template>
                </Column>
                <Column  header="Balance " sortable="">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.forwarding - slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.balanceExceptProduct) }}
                    </template>
                </Column>

            </DataTable>
            </div>
            <div class="col-3">
                <maturity />
            </div>
        </div>
        <div class="row m-auto mt-3 mb-5">
            <div class="col">
                <paidMaya />
            </div>
        </div>
    </div>
    <div v-if="getMobile">
            <DataTable 
                :value="!getAllFinance ? getFinanceTestList : getFinanceTestListAll" 
                style="font-size:85%;"
                sortField="total" 
                sortOrder="-1" 
                scrollable 
                scrollHeight="550px"
                v-model:filters="filters"
                filterDisplay="row"
                v-model:selection="selectedFinance"
                selectionMode="single"
                @row-click="financeSelected($event)"
        
            >
                <Column 
                    field="customer_name" 
                    header="Customer"
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
                <Column field="total_order_amount" header="Total Order">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.total_order_amount) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.total_orders) }}
                    </template>
                </Column>
                <Column field="production" header="On Production">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.production) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.orders) }}
                    </template>
                </Column>
                <Column field="forwarding" header="Shipped">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.forwarding) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.forwarding) }}
                    </template>
                </Column>
                <Column field="paid" header="Paid">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.paid) }}
                    </template>
                </Column>
                <Column field="advanced_payment" header="Prepayment">
                    <template #body="slotProps">
                        <div :style="{ 'backgroundColor': slotProps.data.advanced_payment ? 'red' : '', 'color': slotProps.data.advanced_payment ? 'white' : '' }">
                            {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
                        </div>
                
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.advance_payment) }}
                    </template>
                </Column>
                <Column field="total " header="Balance (Including Production)">
                    <template #body="slotProps">
                        <div :style="{ 'backgroundColor': slotProps.data.total < -8 ? 'green' : '', 'color': slotProps.data.total < -8 ? 'white' : 'black' }">
                            {{ $filters.formatPrice(slotProps.data.total) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.balance) }}
                    </template>
                </Column>
                <Column field="total" header="Balance">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.forwarding - slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestListTotal.balanceExceptProduct) }}
                    </template>
                </Column>

            </DataTable>
            <maturity />
            <paidMaya />
    </div>


    <Dialog v-model:visible="finance_test_form" :header="customer_name" modal :style="{'width':'100vw'}">
        <detail :customer_id="customer_id"/>
    </Dialog>
</template>
<script>
import { useFinanceTestStore } from '../../stores/financetest';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { financeServiceTest } from '../../services/financeServiceTest';
import { socket } from '../../services/customServices/realTimeService';

import { FilterMatchMode } from 'primevue/api';

import detail from '../financetest/detail.vue';
import maturity from '../financetest/maturity.vue';
import paidMaya from '../financetest/paidMaya.vue';

export default {
    components:{
        detail,
        maturity,
        paidMaya
    },
    computed:{
        ...mapState(useFinanceTestStore,[
            'getFinanceTestList',
            'getFinanceTestListTotal',
            'getFinanceTestListAll',
            'getAllFinance'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data(){
        return{
            filters:{
                customer_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            selectedFinance:null,
            finance_test_form:false,
            customer_name:"",
            customer_id: 0,
            
        }
    },

    methods: {
        financeFilters(event) {
            useFinanceTestStore().finance_test_total_list_load_act(event.filteredValue);
        },
        financeSelected(event){
            this.customer_name = event.data.customer_name;
            this.customer_id = event.data.customer_id;
            useLoadingStore().begin_loading_act();
            financeServiceTest.getDetailList(event.data.customer_id).then(data=>{
                useFinanceTestStore().finance_test_detail_list_load_act(data);
                this.finance_test_form = true;
                useLoadingStore().end_loading_act();

            });
        }
    },
    mounted(){
        socket.socketIO.on('finance_test_detail_on',(data)=>{
            useLoadingStore().begin_loading_act();
            financeServiceTest.getDetailList(data.customer_id).then(data=>{
                useFinanceTestStore().finance_test_detail_list_load_act(data);
                useLoadingStore().end_loading_act();

            });
        })
    }

}
</script>
<style scoped>

</style>