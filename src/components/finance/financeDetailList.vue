<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Toplam Sipariş</th>
                    <th scope="col">Toplam Gelen Bedel</th>
                    <th scope="col">Toplam Borç</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $filters.formatPrice(financeDetailTotal.product) }}</td>
                        <td>{{ $filters.formatPrice(detailGetPaidTotal) }}</td>
                        <td>{{ $filters.formatPrice(financeDetailTotal.product - detailGetPaidTotal) }}</td>
                    </tr>
                </tbody>
                </table>
        </div>
    </div>
    <div class="row m-auto">
        <div class="col-8">
            <DataTable
                class="p-datatable-sm"
                :value="getFinanceDetailList" 
                scrollable 
                scrollHeight="600px"
                v-model:filters="filtersDetail"
                filterDisplay="row"
                @filter="financeDetailFilter($event)"
                v-model:selection="selectedFinanceDetail"
                selectionMode="single"
                @row-click="financeDetailSelectedPo($event)"
                :loading="financeDetailLoading"
        >
            <Column field="siparisno" header="Po"
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
            <Column field="yuklemetarihi" header="Y.Tarihi"></Column>
            <Column field="tip" header="Durum"></Column>
            <Column field="siparis_total" header="Sipariş Toplamı">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.siparis_total) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeDetailTotal.product) }}
                </template>
            </Column>
            <Column field="odenen_tutar" header="Ödenen">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.odenen_tutar) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeDetailTotal.paid) }}
                </template>
            </Column>
            <Column field="kalan" header="Kalan">
                <template #body="slotProps">
                    <div :style="{
                            'backgroundColor':
                            slotProps.data.kalan > 0 ? 'green' : '' ||
                                slotProps.data.kalan < 0 ? 'red' : '',
                            'color':
                            slotProps.data.kalan >0 ? 'white': '' ||
                            slotProps.data.kalan < 0 ? 'white' : ''

                            }
                        ">
                            {{ $filters.formatPrice(slotProps.data.kalan) }}
                    </div>
                    
                </template>
                <template #footer>
                    {{ $filters.formatPrice(financeDetailTotal.remainder) }}
                </template>
            </Column>
            <Column field="vade" header="Vade"></Column>
            <Column field="tahmini_eta" header="Eta"></Column>
        </DataTable>
        </div>
        <div class="col-4">
            <DataTable 
                    v-model:value="getFinanceDetailPaymentList" 
                    scrollable 
                    scrollHeight="600px" 
                    class="p-datatable-sm"
                    v-model:selection="selectedFinanceDetailPayment"
                    selectionMode="single"
                    @row-click="financeDetailPaymentSelected($event)"
                    :loading="financeDateDetailLoading"
                >
                <Column field="id" header="#"></Column>
                <Column field="tarih" header="Tarih"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(detailGetPaidTotal) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="finance_detail_collection_form" :header="customerPo" modal>
        <financeDetailCollection :collectionReminder="collectionReminder"/>
    </Dialog>
    <Dialog v-model:visible="finance_date_detail_form" :header="financeDate" modal>
        <financeDateDetail/>
    </Dialog>
</template>
<script>
import { mapState } from 'pinia';
import { useFinanceStore } from '../../stores/finance';
import { useLoadingStore } from '../../stores/loading';

import { FilterMatchMode } from 'primevue/api'

import { financeService } from '../../services/financeService';
import { socket } from '../../services/customServices/realTimeService';

import financeDetailCollection from './financeDetailCollection.vue';
import financeDateDetail from './financeDateDetail.vue';
export default {
    props:['customerId'],
    computed: {
        ...mapState(useFinanceStore, [
            'getFinanceDetailList',
            'getFinanceDetailPaymentList',
        ])
    },
    components: {
        financeDetailCollection,
        financeDateDetail
    },
    data() {
        return {
            filtersDetail: {
                'siparisno': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            detailGetPaidTotal: 0,
            selectedFinanceDetail: {},
            financeDetailTotal: {
                'product': 0,
                'paid': 0,
                'remainder': 0
            },
            finance_detail_collection_form: false,
            customerPo: "",
            collectionReminder: 0,
            financeDetailLoading: false,
            selectedFinanceDetailPayment: {},
            financeDateDetailLoading: false,
            financeDate: "",
            finance_date_detail_form:false,
        }
    },
    created() {
        this.financeDetailListSum(this.getFinanceDetailList);
        this.financeDetailGetPaidSum(this.getFinanceDetailPaymentList);
    },
    methods: {
        financeDetailPaymentSelected(event) {
            this.financeDate = event.data.tarih;
            this.financeDateDetailLoading = true;
            financeService.getFinanceDateDetailList(this.customerId,event.data.tarih).then(data => {
                useFinanceStore().finance_date_detail_list_load_act(data);
                this.financeDateDetailLoading = false;
                this.finance_date_detail_form = true;
            })
        },
        financeDetailSelectedPo(event) {
            this.collectionReminder = event.data.kalan;
            this.customerPo = event.data.siparisno
            useLoadingStore().begin_loading_act();
            financeService.getFinanceDetailCollectionList(event.data.musteri_id, event.data.siparisno).then(data => {
                useFinanceStore().finance_detail_collection_list_load_act(data);
                this.finance_detail_collection_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        financeDetailFilter(event) {
            this.financeDetailListSum(event.filteredValue);
        },
        financeDetailGetPaidSum(data) {
            this.detailGetPaidTotal = 0;
            for (const item of data) {
                this.detailGetPaidTotal += item.tutar;
            }
        },
        financeDetailListSum(data) {
            this.financeDetailTotal = {
                'product': 0,
                'paid': 0,
                'remainder': 0
            };
            for (const item of data) {
                this.financeDetailTotal.product += item.siparis_total;
                this.financeDetailTotal.paid += item.odenen_tutar;
                this.financeDetailTotal.remainder += item.kalan;
            };
        },
    },
    mounted() {
        
        socket.socketIO.on('finance_detail_list_update_on', (customer_id) => {
            this.financeDetailLoading = true;
            financeService.getFinanceDetailList(customer_id).then(data => {
                useFinanceStore().finance_detail_list_load_act(data);
                this.finance_detail_form = true;
                this.financeDetailLoading = false;

            })
        })
    }

}
</script>
<style scoped>

</style>