<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="all">
                <label class="form-check-label" for="flexSwitchCheckDefault">Hepsi</label>
            </div>
        </div>
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="mekmar" @change="isChangeMekmar">
                <label class="form-check-label" for="flexSwitchCheckDefault">Mekmar</label>
            </div>
        </div>
    </div>
    <DataTable 
        :value=" !all ? getFinanceTestList:getFinanceTestListAll " 
        tableStyle="min-width: 50rem" 
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
        <Column field="customer_name" header="Müşteri">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="total_order_amount" header="Toplam Sipariş">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.total_order_amount) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.total_orders) }}
            </template>
        </Column>
        <Column field="production" header="Üretimde">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.production) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.orders) }}
            </template>
        </Column>
        <Column field="forwarding" header="Sevk Edilen">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.forwarding) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.forwarding) }}
            </template>
        </Column>
        <Column field="paid" header="Ödenen">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.paid) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.paid) }}
            </template>
        </Column>
        <Column field="advanced_payment" header="Peşinat">
            <template #body="slotProps">
                <div :style="{'backgroundColor': slotProps.data.advanced_payment ? 'red':'', 'color':slotProps.data.advanced_payment ? 'white':''}">
                    {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
                </div>
                
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.advance_payment) }}
            </template>
        </Column>
        <Column field="total " header="Bakiye(Borç)">
            <template #body="slotProps">
                <div :style="{'backgroundColor':slotProps.data.total < -8 ? 'green':'','color':slotProps.data.total <-8 ? 'white':'black'}">
                    {{ $filters.formatPrice(slotProps.data.total) }}
                </div>
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.balance) }}
            </template>
        </Column>
        <Column field="total" header="Bakiye (Üretim Hariç)">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.forwarding - slotProps.data.paid) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getFinanceTestListTotal.balanceExceptProduct) }}
            </template>
        </Column>

    </DataTable>
    <Dialog v-model:visible="finance_test_form" :header="customer_name" modal>
        <detail :customer_id="customer_id"/>
    </Dialog>
</template>
<script>
import { useFinanceTestStore } from '../../stores/financetest';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { financeServiceTest } from '../../services/financeServiceTest';
import { socket } from '../../services/customServices/realTimeService';

import { FilterMatchMode } from 'primevue/api';

import detail from '../financetest/detail.vue';

export default {
    components:{
        detail,
    },
    computed:{
        ...mapState(useFinanceTestStore,[
            'getFinanceTestList',
            'getFinanceTestListTotal',
            'getFinanceTestListAll'
        ])
    },
    data(){
        return{
            filters:{
                customer_name: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            all:false,
            selectedFinance:null,
            finance_test_form:false,
            customer_name:"",
            customer_id: 0,
            finance_list: [],
            mekmar: false,
            
        }
    },
    created(){
        this.finance_list = this.getFinanceTestList;
    },
    methods: {
        isChangeMekmar() {
            if (this.mekmar) {
                console.log(this.finance_list)
                const result = this.finance_list.filter(x => x.marketing == 'Mekmar');
                useFinanceTestStore().finance_test_list_loac_act(result);
            } else {
                useFinanceTestStore().finance_test_list_loac_act(this.finance_list);
            }
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