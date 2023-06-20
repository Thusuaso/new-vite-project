import { defineStore } from 'pinia';

export const useShopperStore = defineStore('shopper', {
    state: () => {
        return {
            shopperList: [],
            shopperModel: [],
            shopperRepresentativeList: [],
            shopperCountryList: [],
            shopperNewButton: false,
            shopperBuyingList: [],
            shopperSellerList: [],
            shopperSellerProductList: [],
            shopperOfferList: [],
            shopperOfferModel: [],
            shopperOfferCountryList: [],
            shopperOfferNewButton: false,
            shopperBgpList: [],
            shopperBgpModel: [],
            shopperBgpCountryList: [],
            shopperBgpNewButton: false,
            shopperFairList: [],
            shopperFairModel: [],
            shopperFairCountryList: [],
            shopperFairNewButton: false,
            shopperSelectionSurfaceList: [],
            shopperSelectionCustomerList: [],
            shopperSelectionCustomerListGroups: [],
            shopperSelectionModel: [],
            shopperSelectionCountryList: [],
            shopperSelectionNewButton: false,
        }
    },
    actions: {
        shopper_list_load_act(data: any) {
            this.shopperList = data;
        },
        shopper_model_load_act(data: any) {
            this.shopperModel = data.musteri_model;
            this.shopperRepresentativeList = data.temsilci_list;
            this.shopperCountryList = data.ulke_list;
            this.shopperBuyingList = data.siparis_ozet;
        },
        shopper_new_button_load_act(data: any) {
            this.shopperNewButton = data;
        },
        shopper_seller_list_load_act(data: any) {
            this.shopperSellerList = data;
        },
        shopper_seller_product_list_load_act(data: any) {
            this.shopperSellerProductList = data;
        },
        shopper_offer_list_load_act(data: any) {
            this.shopperOfferList = data;
        },
        shopper_offer_model_load_act(data: any) {
            this.shopperOfferModel = data.model;
            this.shopperOfferCountryList = data.ulkeler;
        },
        shopper_offer_new_button_load_act(data: any) {
            this.shopperOfferNewButton = data;
        },
        shopper_bgp_list_load_act(data: any) {
            this.shopperBgpList = data;
        },
        shopper_bgp_model_load_act(data: any) {
            this.shopperBgpModel = data.model;
            this.shopperBgpCountryList = data.country;
        },
        shopper_bgp_new_button_load_act(data: any) {
            this.shopperBgpNewButton = data;
        },
        shopper_fair_list_load_act(data: any) {
            this.shopperFairList = data;
        },
        shopper_fair_model_load_act(data: any) {
            this.shopperFairModel = data.model;
            this.shopperFairCountryList = data.country;
        },
        shopper_fair_new_button_load_act(data: any) {
            this.shopperFairNewButton = data;
        },
        shopper_selection_list_load_act(data: any) {
            this.shopperSelectionSurfaceList = data.surfaceList;
            this.shopperSelectionCustomerList = data.customersList;
            this.shopperSelectionCustomerListGroups = []
            for (const i of data.surfaceList) {
                this.shopperSelectionCustomerListGroups.push({ surfaceName:i.surface ,dataList:data.customersList.filter((x: { surfaceId: any; }) => x.surfaceId == i.id) })
            }
        },
        shopper_selection_model_load_act(data: any) {
            this.shopperSelectionModel = data.model;
            this.shopperSelectionCustomerList = data.customer;
            this.shopperSelectionCountryList = data.country;
            this.shopperSelectionSurfaceList = data.surface;
        },
        shopper_selection_new_button_load_act(data: any) {
            this.shopperSelectionNewButton = data;
        }
    },
    getters: {
        getShopperList(state) {
            return state.shopperList;
        },
        getShopperModel(state) {
            return state.shopperModel;
        },
        getShopperRepresentativeList(state) {
            return state.shopperRepresentativeList;
        },
        getShopperCountryList(state) {
            return state.shopperCountryList;
        },
        getShopperNewButton(state) {
            return state.shopperNewButton;
        },
        getShopperBuyingList(state) {
            return state.shopperBuyingList;
        },
        getShopperSellerList(state) {
            return state.shopperSellerList;
        },
        getShopperSellerProductList(state) {
            return state.shopperSellerProductList;
        },
        getShopperOfferList(state) {
            return state.shopperOfferList;
        },
        getShopperOfferModel(state) {
            return state.shopperOfferModel;
        },
        getShopperOfferCountryList(state) {
            return state.shopperOfferCountryList;
        },
        getShopperOfferNewButton(state) {
            return state.shopperOfferNewButton;
        },
        getShopperBgpList(state) {
            return state.shopperBgpList;
        },
        getShopperBgpModel(state) {
            return state.shopperBgpModel;
        },
        getShopperBgpCountryList(state) {
            return state.shopperBgpCountryList;
        },
        getShopperBgpNewButton(state) {
            return state.shopperBgpNewButton;
        },
        getShopperFairList(state) {
            return state.shopperFairList;
        },
        getShopperFairModel(state){
            return state.shopperFairModel;
        },
        getShopperFairCountryList(state){
            return state.shopperFairCountryList;
        },
        getShopperFairNewButton(state) {
            return state.shopperFairNewButton;
        },
        getShopperSelectionSurfaceList(state) {
            return state.shopperSelectionSurfaceList;
        },
        getShopperSelectionCustomerList(state) {
            return state.shopperSelectionCustomerList;
        },
        getShopperSelectionCustomerListGroups(state) {
            return state.shopperSelectionCustomerListGroups;
        },
        getShopperSelectionModel(state) {
            return state.shopperSelectionModel;
        },
        getShopperSelectionCountryList(state) {
            return state.shopperSelectionCountryList;
        },
        getShopperSelectionNewButton(state) {
            return state.shopperSelectionNewButton;
        }
    }
})