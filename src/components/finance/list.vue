<template>
        <DataTable 
            :value="getShowingFinanceList" 
            style="font-size:85%;"
            @filter="financeFilterList($event)" 
            v-model:filters="filters" 
            filterDisplay="row" 
            sortField="genel_bakiye" 
            sortOrder="-1"
            scrollable 
            scrollHeight="650px"
            v-model:selection="selectedFinance"
            selectionMode="single"
            @row-click="financeDetailSelected($event)"
        >
        <template #header>
            Konteynır Alacak Listesi
        </template>
            <Column field="musteriadi" header="Müşteri"
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
            <Column field="kapanmayan_siparis" header="Açık Po Fatura Toplamı">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kapanmayan_siparis) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeTotal.openingPoInvoice) }}
                </template>
            </Column>
            <Column field="kapanmayan_odenen" header="Açık Po için Ödemeler">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kapanmayan_odenen) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeTotal.openingPoPaid) }}
                </template>
            </Column>
            <Column field="kapanmayan_kalan" header="Açık Po için Kalan Alacak">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kapanmayan_kalan) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeTotal.openingPoWillReceive) }}
                </template>
            </Column>
            <Column field="pesinat" header="Yüklenmemiş Order Peşinatı">
                <template #body="slotProps">
                    <div
                        :class="slotProps.data.pesinat > 10 ||
                                slotProps.data.eski_pesinat > 10 ||
                                (slotProps.data.pesinat < -8 &&
                                    slotProps.data.genel_bakiye < -8)
                                ? 'genel_bakiye_style'
                                : ''
                            "
                    >
                    {{ $filters.formatPrice(slotProps.data.pesinat + slotProps.data.eski_pesinat) }}

                    </div>
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeTotal.advancePayment) }}
                </template>
            </Column>
            <Column field="genel_bakiye" header="Risk Bakiye">
                <template #body="slotProps">
                    <div v-if="slotProps.data.genel_bakiye < -8" class="genel_bakiye_style">
                    {{ $filters.formatPrice(slotProps.data.genel_bakiye) }}
                  </div>
                  <div v-else-if="slotProps.data.genel_bakiye > 8" class="genel_bakiye_style2">
                    {{ $filters.formatPrice(slotProps.data.genel_bakiye) }}
                  </div>
                  <div v-else class="genelClassRisk">
                    {{ $filters.formatPrice(slotProps.data.genel_bakiye) }}
                  </div>
                    
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeTotal.balance) }}
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="finance_detail_form" :header="customer" modal>
            <financeDetailList :customerId="customerId"/>
        </Dialog>
</template>

<script>
import { mapState } from 'pinia';
import { useFinanceStore } from '../../stores/finance';
import { FilterMatchMode } from 'primevue/api'
import { socket } from '../../services/customServices/realTimeService';
import { financeService } from '../../services/financeService';
import { useLoadingStore } from '../../stores/loading';

import financeDetailList from './financeDetailList.vue';
export default {
    computed: {
        ...mapState(useFinanceStore, [
            'getShowingFinanceList',
        ])
    },
    components: {
        financeDetailList
    },
    data() {
        return {
            filters: {
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            financeTotal: {
                'openingPoInvoice':0,
                'openingPoPaid':0,
                'openingPoWillReceive':0,
                'advancePayment': 0,
                'balance':0
            },
            finance_detail_form: false,
            customer: "",
            customerId:0,
            
        }
    },
    created() {
        this.financeListSum(this.getShowingFinanceList);
    },
    methods: {  
        financeDetailSelected(event) {
            this.customer = event.data.musteriadi;
            this.customerId = event.data.id;
            useLoadingStore().begin_loading_act();
            financeService.getFinanceDetailList(event.data.id).then(data => {
                useFinanceStore().finance_detail_list_load_act(data);
                this.finance_detail_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        financeFilterList(event) {
            this.financeListSum(event.filteredValue);

        },
        financeListSum(data) {
            this.financeTotal = {
                'openingPoInvoice': 0,
                'openingPoPaid': 0,
                'openingPoWillReceive': 0,
                'advancePayment': 0,
                'balance': 0
            };
            for (const item of data) {
                this.financeTotal.openingPoInvoice += item.kapanmayan_siparis;
                this.financeTotal.openingPoPaid += item.kapanmayan_odenen;
                this.financeTotal.openingPoWillReceive += item.kapanmayan_kalan;
                this.financeTotal.advancePayment += item.pesinat;
                this.financeTotal.balance += item.genel_bakiye;

            };
        },
        
        
        
    },
    mounted() {
        socket.socketIO.on('finance_main_list_update_on', () => {
            const date = new Date();
            const year = date.getFullYear();
            useLoadingStore().begin_loading_act();
            financeService.getFinanceList(year).then(data => {
                console.log(data);
                useFinanceStore().finance_list_load_act(data);
                this.financeListSum(data.konteyner_list);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>
<style scoped>
    .genel_bakiye_style {
        background-color: #f59c9c;
        color: #f23a3a;
        font-weight: bold;
    }
    .genel_bakiye_style2 {
  color: #527f62;
  background-color: #c8fdda;
  font-weight: bold;
}
</style>