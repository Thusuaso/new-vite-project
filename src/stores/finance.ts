import { defineStore } from 'pinia';
export const useFinanceStore = defineStore('finance', {
    state: () => {
        return {
            showingFinanceList:[],
            financeListNotFilter:[],
            financeList: [],
            warehouseList: [],
            expiryList: [],
            collectionList: [],
            collectionMonthList: [],
            collectionYearList: [],
            advancePaymentList: [],
            financeDetailList: [],
            financeDetailPaymentList: [],
            financeDetailPoList: [],
            financeDetailCollectionList: [],
            financeDetailCollectionModel: [],
            financeDateDetailList: [],
        }
    },
    actions: {
        finance_list_load_act(data: any) {
            this.financeListNotFilter = data.konteyner_list;
            this.financeList = [];
            for (const item of data.konteyner_list) {
                if (item.genel_bakiye > 8 || item.genel_bakiye < -8) {
                    this.financeList.push(item);
                }
            }
            this.showing_finance_list_load_act(this.financeList);

            this.warehouseList = data.depo_list;
            this.expiryList = data.vade_list;
        },
        showing_finance_list_load_act(data:any) {
            this.showingFinanceList = data;
        },
        finance_collection_list_load_act(data: any) {
            this.collectionList = data;
        },
        finance_collection_year_list_load_act(data: any) {
            this.collectionYearList = data;
        },
        finance_collection_month_list_load_act(data: any) {
            this.collectionMonthList = data;
        },
        finance_advanced_payment_list_load_act(data: any) {
            this.advancePaymentList = data;
        },
        finance_detail_list_load_act(data: any) {
            this.financeDetailList = data.ayrinti_list;
            this.financeDetailPaymentList = data.odeme_liste;
            this.financeDetailPoList = data.po_list;
        },
        finance_detail_collection_list_load_act(data: any) {
            this.financeDetailCollectionList = data.musteri_list;
            this.financeDetailCollectionModel = data.musteri_model;

        },
        finance_date_detail_list_load_act(data: any) {
            this.financeDateDetailList = data;
        }
    },
    getters: {
        getShowingFinanceList(state) {
            return state.showingFinanceList;
        },
        getFinanceListNotFilter(state) {
            return state.financeListNotFilter;
        },
        getFinanceList(state) {
            return state.financeList;
        },
        getWarehouseList(state) {
            return state.warehouseList;
        },
        getExpirtyList(state) {
            return state.expiryList;
        },
        getCollectionList(state) {
            return state.collectionList;
        },
        getCollectionYearList(state) {
            return state.collectionYearList;
        },
        getCollectionMonthList(state) {
            return state.collectionMonthList;
        },
        getAdvancedPaymentList(state) {
            return state.advancePaymentList;
        },
        getFinanceDetailList(state) {
            return state.financeDetailList;
        },
        getFinanceDetailPaymentList(state) {
            return state.financeDetailPaymentList
        },
        getFinanceDetailPoList(state) {
            return state.financeDetailPoList;
        },
        getFinanceDetailCollectionList(state) {
            return state.financeDetailCollectionList;
        },
        getFinanceDetailCollectionModel(state) {
            return state.financeDetailCollectionModel;
        },
        getFinanceDateDetailList(state) {
            return state.financeDateDetailList;
        }
    }
})