<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Sipariş Toplam</th>
                        <th scope="col">Gelen Bedel</th>
                        <th scope="col">Bakiye</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}</td>
                        <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}</td>
                        <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}</td>

                    </tr>
                </tbody>
                </table>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getFinanceTestDetailList"
                scrollable
                scrollHeight="500px"
                v-model:selection="selectedDetail"
                selectionMode="single"
                @row-click="detailSelected($event)"
            >
                <Column field="po" header="Po"></Column>
                <Column field="product_date" header="Sipariş Tarihi"></Column>
                <Column field="forwarding_date" header="Sevkiyat Tarihi"></Column>

                <Column field="status" header="Durum"></Column>
                <Column field="cost" header="Sipariş">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.cost) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}
                    </template>
                </Column>
                <Column field="paid" header="Ödenen">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}
                    </template>
                </Column>
                <Column field="balance" header="Kalan">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.balance > 0 ? '#6aa84f':'','color':slotProps.data.balance >0 ? 'white':''}">
                            {{ $filters.formatPrice(slotProps.data.balance) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}
                    </template>
                </Column>
                <Column field="advanced_payment" header="Peşinat">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailTotalList.advanced_payment) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable :value="getFinanceTestDetailPaidList" scrollable
                scrollHeight="500px"
                v-model:selection="selectedDetailPaid"
                selectionMode="single"
                @row-click="detailPaidSelected($event)"
                >
                <Column field="date" header="Tarih"></Column>
                <Column field="paid" header="Ödenen">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.paid) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailPaidTotalList.paid) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="paid_detail_form" :header="date" modal>
        <paidDetail />
    </Dialog>
    <Dialog v-model:visible="payment_detail_form" header="" modal>
        <paymentDetail :balance="balance" :customer_id2="customer_id2" :po="po"/>
    </Dialog>
</template>
<script>
import {useFinanceTestStore} from '../../stores/financetest';
import {mapState} from 'pinia';

import {financeServiceTest} from '../../services/financeServiceTest';
import {socket} from '../../services/customServices/realTimeService';

import paidDetail from '../financetest/paidDetail.vue';
import paymentDetail from '../financetest/paymentDetail.vue';
export default {
    components:{
        paidDetail,
        paymentDetail
    },
    computed:{
        ...mapState(useFinanceTestStore,[
            'getFinanceTestDetailList',
            'getFinanceTestDetailPaidList',
            'getFinanceTestDetailTotalList',
            'getFinanceTestDetailPaidTotalList'
        ])
    },
    props:['customer_id'],
    data(){
        return{
            selectedDetailPaid:[],
            date:"",
            paid_detail_form:false,
            selectedDetail:[],
            payment_detail_form:false,
            balance:0,
            customer_id2:0,
            po:"",
        }
    },
    methods:{
        detailSelected(event){
            this.customer_id2 = event.data.customer_id;
            this.po = event.data.po;
            this.balance = event.data.balance;
            financeServiceTest.getPaymentDetail(event.data.customer_id,event.data.po).then(data=>{
                useFinanceTestStore().finance_test_detail_payment_list_load_act(data);
                this.payment_detail_form = true;
            });

        },
        detailPaidSelected(event){
            const date = event.data.date.split('-');
            const year = date[0];
            const month = date[1];
            const day = date[2];
            const newDateFormat = day + '-' + month + '-' + year;
            this.date = newDateFormat;
            financeServiceTest.getPaidDetailList(this.customer_id,newDateFormat).then(data=>{
                useFinanceTestStore().finance_test_detail_paid_detail_list_load_act(data);
                this.paid_detail_form = true;
            })
        }
    },
    mounted(){
        socket.socketIO.on('finance_test_detail_payment_on',(data)=>{
            financeServiceTest.getPaymentDetail(data.customer_id,data.po).then(data=>{
                useFinanceTestStore().finance_test_detail_payment_list_load_act(data);
            });
        })
    }
}
</script>