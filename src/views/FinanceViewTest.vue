<template>
    <div class="row m-auto mt-0">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="paymentList">Tahsilat</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="advancedPayment">Peşinat</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-info" @click="excelOutput">Excel</button>
        </div>
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="all" @change="allButtonSelected($event)">
                <label class="form-check-label" for="flexSwitchCheckDefault">Hepsi</label>
            </div>
        </div>

    </div>
    <list />


    <Dialog v-model:visible="payment_list_form" header="Tahsilat Listesi" modal :style="{'width':'100vw'}">
        <collectionList/>
    </Dialog>
    <Dialog v-model:visible="advanced_payment_form" header="Peşinat" modal :style="{ 'width': '100vw' }">
        <advancedPayment/>
    </Dialog>
</template>
<script>
import { useFinanceTestStore } from '../stores/financetest';
import {useFinanceStore} from '../stores/finance';
import {useLoadingStore} from '../stores/loading';
import {useLocalStore} from '../stores/local';

import {mapState} from 'pinia';

import {financeServiceTest} from '../services/financeServiceTest';
import {financeService} from '../services/financeService';
import {socket} from '../services/customServices/realTimeService';

import list from '../components/financetest/list.vue';
import collectionList from '../components/finance/collectionList.vue';
import advancedPayment from '../components/finance/advancedPayment.vue';
export default {
    components:{
        list,
        collectionList,
        advancedPayment,
    },
    computed:{
      ...mapState(useFinanceTestStore,[
          'getFinanceTestList',
          'getFinanceTestListAll'
        ]),
      ...mapState(useLocalStore,[
            'getLocalServiceUrl',
        ])
    },
    data(){
        return{
            payment_list_form:false,
            advanced_payment_form: false,
            all: false,
            mekmar: false,
            finance_list:[],
        }
    },
    created() {
        this.finance_list = this.getFinanceTestList;
    },
    methods: {

        allButtonSelected(event) {
            useLoadingStore().begin_loading_act();
            useFinanceTestStore().finance_test_all_button(event.target._modelValue);
            useLoadingStore().end_loading_act();
        },
        excelOutput(){
            financeServiceTest.getExcelList(this.getFinanceTestListAll).then(data=>{
                if(data.status){
                    const link = document.createElement("a");
                    link.href = this.getLocalServiceUrl + "finance/reports/test/excel";

                    link.setAttribute("download", "finans_test_list.xlsx");
                    document.body.appendChild(link);
                    link.click();
                };
            });
        },
        advancedPayment(){
            useLoadingStore().begin_loading_act();
            financeService.getAdvancedPaymentList().then(data => {
                useFinanceStore().finance_advanced_payment_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.advanced_payment_form = true;
            });  
        },
        paymentList(){
            useLoadingStore().begin_loading_act();
            financeService.getFinanceCollectionYearList().then(year => {
                useFinanceStore().finance_collection_year_list_load_act(year);
                financeService.getFinanceCollectionMonthList(year[0].yil).then(month => {
                    useFinanceStore().finance_collection_month_list_load_act(month);
                    financeService.getFinanceCollectionList(year[0].yil, month[0].ay).then(data => {
                        useFinanceStore().finance_collection_list_load_act(data);
                        useLoadingStore().end_loading_act();
                        this.payment_list_form = true;

                    });
                });
            });
        
        }
    },
    mounted(){
        socket.socketIO.on('finance_test_list_on', () => {
            useLoadingStore().begin_loading_act();
            financeServiceTest.getList().then((data) => {
                useFinanceTestStore().finance_test_list_loac_act(data);
                useLoadingStore().end_loading_act();
            });
        });
        socket.socketIO.on('finance_test_advanced_payment_list_on', () => {
            useLoadingStore().begin_loading_act();
            financeService.getAdvancedPaymentList().then(data => {
                useFinanceStore().finance_advanced_payment_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        })
    }
}
</script>