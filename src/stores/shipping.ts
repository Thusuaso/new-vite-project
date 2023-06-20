import { defineStore } from 'pinia';
export const useShippingStore = defineStore('shipping', {
    state: () => {
        return {
            shippingCompanyList: [],
            shippingProductList: [],
            shippingInvoiceList: [],
            shippingCompanyListDetail:[],
        }
    },
    actions: {
        shipping_list_load_act(data: any) {
            this.shippingCompanyList = data.nakliye_liste;
            this.shippingProductList = data.siparis_list;
        },
        shipping_invoice_list_load_act(data: any) {
            this.shippingInvoiceList = data;
        },
        shipping_company_list_detail_load_act(data: any) {
            this.shippingCompanyListDetail = data;
        }
    },
    getters: {
        getShippingCompanyList(state) {
            return state.shippingCompanyList;
        },
        getShippingProductList(state) {
            return state.shippingProductList;
        },
        getShippingInvoiceList(state) {
            return state.shippingInvoiceList;
        },
        getShippingCompanyListDetail(state) {
            return state.shippingCompanyListDetail;
        }
    }

});