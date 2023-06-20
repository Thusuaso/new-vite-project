import { defineStore } from 'pinia';

export const useCardStore = defineStore('card', {
    state: () => {
        return {
            cardNewButton: false,
            cardList: [],
            cardCategoryList: [],
            cardProductList: [],
            cardSizeList: [],
            cardSurfaceList: [],
            cardCustomerSalesList: [],
        }
    },
    actions: {
        card_list_load_act(data:any) {
            this.cardList = data
        },
        card_model_list_load_act(data: any) {
            this.cardCategoryList = data.kategoriList;
            this.cardProductList = data.urunList;
            this.cardSizeList = data.olcuList;
            this.cardSurfaceList = data.yuzeyList;
            this.cardCustomerSalesList = data.musteriSatisList;
        },
        card_new_button_load_act(data: any) {
            this.cardNewButton = data;
        }
    },
    getters: {
        getCardList(state) {
            return state.cardList
        },
        getCardCategoryList(state) {
            return state.cardCategoryList;
        },
        getCardProductList(state) {
            return state.cardProductList;
        },
        getCardSizeList(state) {
            return state.cardSizeList;
        },
        getCardSurfaceList(state) {
            return state.cardSurfaceList;
        },
        getCardCustomerSalesList(state){
            return state.cardCustomerSalesList;
        },
        getCardNewButton(state) {
            return state.cardNewButton;
        }
    }
})