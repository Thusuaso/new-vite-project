import {defineStore} from 'pinia';

export const useFinanceTestStore = defineStore('financetest',{
    state : ()=>{
        return{
            financeTestList:[],
            financeTestListAll:[],
            financeTestListTotal:{
                'total_orders':0,
                'orders':0,
                'forwarding':0,
                'paid':0,
                'advance_payment':0,
                'balance':0,
                'balanceExceptProduct':0,
            },
            financeTestDetailList:[],
            financeTestDetailTotalList:{
                'cost':0,
                'paid':0,
                'balance':0,
                'advanced_payment':0,
            },
            financeTestDetailPaidList:[],
            financeTestDetailPaidTotalList:{
                'paid':0
            },
            financeTestDetailPaidDetailList:[],
            financeTestDetailPaidDetailTotalList:{
                'paid':0,
                'cost':0,
            },
            financeTestDetailPaymentList:[],

        }
    },
    actions:{
        finance_test_detail_list_load_act(data:any){
            this.financeTestDetailList = data.financeDetail;
            this.financeTestDetailPaidList = data.financePaid;
            this.financeTestDetailTotalList = {
                'cost':0,
                'paid':0,
                'balance':0,
                'advanced_payment':0,
            };
            this.financeTestDetailPaidTotalList ={
                'paid':0
            };
            for(const item of data.financeDetail){
                this.financeTestDetailTotalList.cost += item.cost;
                this.financeTestDetailTotalList.paid += item.paid;
                this.financeTestDetailTotalList.balance += item.balance;
                this.financeTestDetailTotalList.advanced_payment += item.advanced_payment;
            };
            for(const item of data.financePaid){
                this.financeTestDetailPaidTotalList.paid += item.paid;
            };
        },
        finance_test_list_loac_act(data:any){
            this.financeTestList = [];
            for(const item of data) {
                if(item.total == 0){
                    continue;
                }else if (item.total > 8 || item.total < -8){
                    this.financeTestList.push(item);
                }
            };

            this.financeTestListAll = data;
            this.finance_test_total_list_load_act(this.financeTestList);
        },
        finance_test_total_list_load_act(data:any){
            this.financeTestListTotal = {
                'total_orders':0,
                'orders':0,
                'forwarding':0,
                'paid':0,
                'advance_payment':0,
                'balance':0,
                'balanceExceptProduct':0,
            };
            for(const item of data){
                this.financeTestListTotal.total_orders += item.total_order_amount;
                this.financeTestListTotal.orders += item.production;
                this.financeTestListTotal.forwarding += item.forwarding;
                this.financeTestListTotal.paid += item.paid;
                this.financeTestListTotal.advance_payment += item.advanced_payment;
                this.financeTestListTotal.balance += item.total;
                this.financeTestListTotal.balanceExceptProduct += (item.forwarding - item.paid);
            };
        },
        finance_test_detail_paid_detail_list_load_act(data:any){
            this.financeTestDetailPaidDetailList = data;
            this.finance_test_detail_paid_detail_total_list_load_act(data);
        },
        finance_test_detail_paid_detail_total_list_load_act(data:any){
            this.financeTestDetailPaidDetailTotalList = {
                'paid':0,
                'cost':0,
            };
            for(const item of data){
                this.financeTestDetailPaidDetailTotalList.paid += item.tutar;
                this.financeTestDetailPaidDetailTotalList.cost += item.masraf;

            }
        },
        finance_test_detail_payment_list_load_act(data:any){
            this.financeTestDetailPaymentList = data;
        }
    },
    getters:{
        getFinanceTestList(state){
            return state.financeTestList;
        },
        getFinanceTestListTotal(state){
            return state.financeTestListTotal;
        },
        getFinanceTestListAll(state){
            return state.financeTestListAll;
        },
        getFinanceTestDetailList(state){
            return state.financeTestDetailList;
        },
        getFinanceTestDetailPaidList(state){
            return state.financeTestDetailPaidList;
        },
        getFinanceTestDetailTotalList(state){
            return state.financeTestDetailTotalList;
        },
        getFinanceTestDetailPaidTotalList(state){
            return state.financeTestDetailPaidTotalList;
        },
        getFinanceTestDetailPaidDetailList(state){
            return state.financeTestDetailPaidDetailList;
        },
        getFinanceTestDetailPaidDetailTotalList(state){
            return state.financeTestDetailPaidDetailTotalList;
        },
        getFinanceTestDetailPaymentList(state){
            return state.financeTestDetailPaymentList;
        }
    }
})