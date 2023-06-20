import { defineStore } from 'pinia';

export const useSampleStore = defineStore('sample', {
    state: () => {
        return {
            sampleList: [],
            sampleYearList: [],
            sampleModel: [],
            sampleCategoryList: [],
            sampleCustomerList: [],
            sampleCountryList: [],
            sampleUnitList: [],
            sampleRepresentativeList: [],
            samplePaidList: [],
            sampleNewButton: false,
            sampleFinanceListBank: [],
            sampleFinanceListSample: [],
            sampleFinanceListSampleTotal: {
                'buyingUsd': 0,
                'sellingUsd': 0,
                'buyingEuro': 0,
                'sellingEuro': 0,
                'buyingTl': 0,
                'sellingTl': 0,
            },
            sampleFinanceYearList: [],
            sampleFinanceListBankTotal: {
                'usd': 0,
            },
            sampleFinanceSampleDetailList: [],
            sampleFinanceBankDetailList: [],
            sampleFinanceBankDetailTotalList: {
                'usd': 0,
                'euro': 0,
                'tl': 0,
            }
        }
    },
    actions: {
        sample_list_load_act(data: any) {
            this.sampleList = data.numuneList;
            this.sampleYearList = data.numuneYil;
        },
        sample_model_list_load_act(data: any) {
            this.sampleModel = data.model;
            this.sampleCategoryList = data.kategoriList;
            this.sampleCustomerList = data.musteriList;
            this.sampleCountryList = data.ulkeList;
            this.sampleUnitList = data.birimList;
            this.sampleRepresentativeList = data.temsilciList;
            this.samplePaidList = data.odemeler;
        },
        sample_new_button_load_act(data: any) {
            this.sampleNewButton = data;
        },
        sample_finance_list_load_act(data: any) {
            this.sampleFinanceListBank = data.banka_list;
            this.sampleFinanceListSample = data.numune_list;
            this.sampleFinanceYearList = data.yil_list;
            this.sample_finance_list_total_load_act(data.numune_list);
            this.sample_finance_bank_list_load_act(data.banka_list);
        },
        sample_finance_list_total_load_act(data: any) {
            this.sampleFinanceListSampleTotal = {
                'buyingUsd': 0,
                'sellingUsd': 0,
                'buyingEuro': 0,
                'sellingEuro': 0,
                'buyingTl': 0,
                'sellingTl': 0,
            };
            for (const item of data) {
                this.sampleFinanceListSampleTotal.buyingUsd += item.kuryeAlis;
                this.sampleFinanceListSampleTotal.sellingUsd += item.kuryeSatis;
                this.sampleFinanceListSampleTotal.buyingEuro += item.Euro_Alis;
                this.sampleFinanceListSampleTotal.sellingEuro += item.Euro_Satis;
                this.sampleFinanceListSampleTotal.buyingTl += item.TL_Alis;
                this.sampleFinanceListSampleTotal.sellingTl += item.TL_Satis;


            }
        },
        sample_finance_bank_list_load_act(data: any) {
            this.sampleFinanceListBankTotal = {
                'usd': 0,
            };
            for (const item of data) {
                this.sampleFinanceListBankTotal.usd += item.bedel;
            };
        },
        sample_finance_sample_detail_list_load_act(data: any) {
            this.sampleFinanceSampleDetailList = data;
        },
        sample_finance_bank_detail_list_load_act(data: any) {
            this.sampleFinanceBankDetailList = data;
            this.sample_finance_bank_detail_total_list_load_act(data);
        },
        sample_finance_bank_detail_total_list_load_act(data: any) {
            this.sampleFinanceBankDetailTotalList = {
                'usd': 0,
                'euro': 0,
                'tl': 0,
            };
            for (const item of data) {
                this.sampleFinanceBankDetailTotalList.usd += item.bedel_dolar;
                this.sampleFinanceBankDetailTotalList.euro += item.bedel_euro;
                this.sampleFinanceBankDetailTotalList.tl += item.bedel_tl;
            }
        }
    },

    getters: {
        getSampleList(state) {
            return state.sampleList;
        },
        getSampleYearList(state) {
            return state.sampleYearList;
        },
        getSampleModel(state) {
            return state.sampleModel;
        },
        getSampleCategoryList(state) {
            return state.sampleCategoryList;
        },
        getSampleCustomerList(state) {
            return state.sampleCustomerList;
        },
        getSampleCountryList(state) {
            return state.sampleCountryList;
        },
        getSampleUnitList(state) {
            return state.sampleUnitList;
        },
        getSampleRepresentativeList(state) {
            return state.sampleRepresentativeList;
        },
        getSampleNewButton(state) {
            return state.sampleNewButton;
        },
        getSamplePaidList(state) {
            return state.samplePaidList;
        },
        getSampleFinanceListBank(state) {
            return state.sampleFinanceListBank;
        },
        getSampleFinanceListSample(state) {
            return state.sampleFinanceListSample;
        },
        getSampleFinanceListSampleTotal(state) {
            return state.sampleFinanceListSampleTotal;
        },
        getSampleFinanceYearList(state) {
            return state.sampleFinanceYearList;
        },
        getSampleFinanceListBankTotal(state) {
            return state.sampleFinanceListBankTotal;
        },
        getSampleFinanceSampleDetailList(state) {
            return state.sampleFinanceSampleDetailList;
        },
        getSampleFinanceBankDetailList(state) {
            return state.sampleFinanceBankDetailList;
        },
        getSampleFinanceBankDetailTotalList(state) {
            return state.sampleFinanceBankDetailTotalList;
        }
    }

})