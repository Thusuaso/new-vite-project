import { defineStore } from 'pinia';

export const useOfferStore = defineStore('offer', {
    state: () => {
        return {
            offerReminderList: [],
            offerCustomerList: [],
            offerCalendarList: [],
            offerRepresentativeList: [],
            offerRepresentativeTotalList: {
                'offer': 0,
                'pi': 0,
            },
            offerAllListB: [],
            offerAllListA: [],
            offerAllListATotal: 0,
            offerAllListBTotal: 0,
            offerAllChartListA: [],
            offerAllChartListB: [],
            offerModelList: [],
            offerProductModelList: [],
            offerCategoryList: [],
            offerProductList: [],
            offerLengthList: [],
            offerSurfaceList:[],
            offerEdgeList: [],
            offerShopperList: [],
            offerCountryList: [],
            offerNewButton: false,
            offerProductsList: [],
            offerDeletingProductsList: [],
            offerUpdatingProductsList: [],
            offerAddingProductsList: [],
            offersAllList: [],
        }
    },
    actions: {
        offers_all_list_load_act(data: any) {
            this.offersAllList = data;  
        },
        offer_main_page_list_load_act(data: any) {
            this.offerReminderList = data.hatirlatmaList;
            this.offerCustomerList = data.musteriOzetList;
            this.offerCalendarList = data.takvimList;
            this.offerRepresentativeList = data.temsilciOzetList;
            this.offer_main_page_representative_total_list_load_act(data.temsilciOzetList);
        },
        offer_main_page_representative_total_list_load_act(data: any) {
            this.offerRepresentativeTotalList = {
                'offer': 0,
                'pi': 0
            };
            for (const item of data) {
                this.offerRepresentativeTotalList.offer += item.teklifSayisi;
                this.offerRepresentativeTotalList.pi += item.proformaSayisi;
            }
        },
        offer_all_list_load_act(data: any) {
            this.offerAllListA = data.alist;
            this.offerAllListB = data.blist;
            this.offerAllChartListA = data.aListChart;
            this.offerAllChartListB = data.bListChart;

            this.offer_all_list_a_total_load_act(data.alist);
            this.offer_all_list_b_total_load_act(data.blist)
        },
        offer_all_list_a_total_load_act(data: any) {
            this.offerAllListATotal = data.length;
        },
        offer_all_list_b_total_load_act(data: any) {
            this.offerAllListBTotal = data.length;
        },
        offer_form_model_list_load_act(data: any) {
            this.offerModelList = data.teklifModel;
            this.offerProductModelList = data.teklifUrunModel;
            this.offerCategoryList = data.kategoriList;
            this.offerProductList = data.urunList;
            this.offerLengthList = data.enBoyList;
            this.offerEdgeList = data.kalinlikList;
            this.offerSurfaceList = data.yuzeyList
            this.offerShopperList = data.musteriList;
            this.offerCountryList = data.ulkeList;
            this.offerProductsList = [];
            for (const item of data.urunler) {
                this.offer_products_list_load_act(item);
            };
        },
        offer_new_button_load_act(data: any) {
            this.offerNewButton = data;
            if (data) {
                this.offerProductsList = [];
            }
            this.offerDeletingProductsList = [];
            this.offerUpdatingProductsList = [];
            this.offerAddingProductsList = [];
        },
        offer_products_list_load_act(data: any) {
            this.offerProductsList.push(data);
        },
        offer_products_deleting_list_load_act(data: any) {
            this.offerDeletingProductsList.push(data);
        },
        offer_products_updating_list_load_act(data: any) {
            this.offerUpdatingProductsList.push(data);
        },
        offer_products_adding_list_load_act(data: any) {
            this.offerAddingProductsList.push(data);
        }
    

    },
    getters: {
        getOfferReminderList(state) {
            return state.offerReminderList;
        },
        getOfferCustomerList(state) {
            return state.offerCustomerList;
        },
        getOfferCalendarList(state) {
            return state.offerCalendarList;
        },
        getOfferRepresentativeList(state) {
            return state.offerRepresentativeList;
        },
        getOfferRepresentativeTotalList(state) {
            return state.offerRepresentativeTotalList;
        },
        getOfferAllListA(state) {
            return state.offerAllListA;
        },
        getOfferAllListB(state) {
            return state.offerAllListB;
        },
        getOfferAllListATotal(state) {
            return state.offerAllListATotal;
        },
        getOfferAllListBTotal(state) {
            return state.offerAllListBTotal;
        },
        getOfferAllChartListA(state) {
            return state.offerAllChartListA;
        },
        getOfferAllChartListB(state) {
            return state.offerAllChartListB;
        },
        getOfferModelList(state) {
            return state.offerModelList;
        },
        getOfferProductModelList(state) {
            return state.offerProductModelList;
        },
        getOfferCategoryList(state) {
            return state.offerCategoryList;
        },
        getOfferProductList(state) {
            return state.offerProductList;
        },
        getOfferLengthList(state) {
            return state.offerLengthList;
        },
        getOfferEdgeList(state) {
            return state.offerEdgeList;
        },
        getOfferSurfaceList(state) {
            return state.offerSurfaceList;
        },
        getOfferShopperList(state) {
            return state.offerShopperList;
        },
        getOfferCountryList(state) {
            return state.offerCountryList;
        },
        getOfferNewButton(state) {
            return state.offerNewButton;
        },
        getOfferProductsList(state) {
            return state.offerProductsList;
        },
        getOfferDeletingProductsList(state) {
            return state.offerDeletingProductsList;
        },
        getOfferAddingProductsList(state) {
            return state.offerAddingProductsList;
        },
        getOfferUpdatingProductsList(state) {
            return state.offerUpdatingProductsList;
        },
        getOffersAllList(state) {
            return state.offersAllList;
        }


    }

})