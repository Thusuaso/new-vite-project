import { defineStore } from 'pinia';
export const useForwardingStore = defineStore('forwarding', {
    state: () => {
        return {
            model: [],
            orderList: [],
            productList: [],
            crateList: [],
        }
    },
    actions: {
        forwarding_load_act(data: any) {
            this.model = data.model;
            this.orderList = data.siparis_liste;
        },
        forwarding_product_list_load_act(data: any) {
            this.productList = [];
            this.crateList = [];
            this.productList = data.siparis_kalem_list;
            this.crateList = data.siparis_kalem_kasa_list;
        }
    },
    getters: {
        getModel(state) {
            return state.model;
        },
        getOrderList(state) {
            return state.orderList;
        },
        getProductList(state) {
            return state.productList;
        },
        getCrateList(state) {
            return state.crateList;
        }
    }
})