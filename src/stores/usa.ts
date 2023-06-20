import { defineStore } from 'pinia';
export const useUsaStore = defineStore('usa', {
    state: () => {
        return {
            usaList: [],
            usaNewButton: false,
            usaSkuList: [],
            usaProductList: {},
            usaCommentActiveList: [],
            usaCommentPassiveList: [],
        }
    },
    actions: {
        usa_list_load_act(data: any) {
            this.usaList = data;
        },
        usa_new_button_load_act(data: any) {
            this.usaNewButton = data;
        },
        usa_sku_list_load_act(data: any) {
            this.usaSkuList = data;
        },
        usa_product_detail_list_load_act(data: any) {
            this.usaProductList = data;
        },
        usa_comment_list_load_act(data: any) {
            console.log(data)
            this.usaCommentActiveList = data;
            this.usaCommentPassiveList = data.filter((x: { show: boolean; })=>x.show == false);
        }
    },
    getters: {
        getUsaList(state) {
            return state.usaList;
        },
        getUsaNewButton(state) {
            return state.usaNewButton;
        },
        getUsaSkuList(state) {
            return state.usaSkuList;
        },
        getUsaProductList(state) {
            return state.usaProductList;
        },
        getUsaCommentActiveList(state) {
            return state.usaCommentActiveList;
        },
        getUsaCommentPassiveList(state) {
            return state.usaCommentPassiveList;
        }
    }
})