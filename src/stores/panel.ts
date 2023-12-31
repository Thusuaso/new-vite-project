import { defineStore } from 'pinia';

export const usePanelStore = defineStore('panel', {
    state: () => {
        return {
            panelProductList: [],
            panelCategoryList: [],
            panelProductCategoryList: [],
            panelProductNewButton: false,
            productModel: [],
            productCategoryList:[],
            productFinishList: [],
            productSizeList: [],
            productSuggestedProductList: [],
            productSuggestedProductsList: [],
            productPhotoList: [],
            productColorEnList: [],
            productColorFrList: [],
            productColorEsList: [],
            productPickListPhotos: [],
            panelProjectList: [],
            panelProjectModel: [],
            panelProjectCountry: [],
            panelProjectDetailList: [],
            panelPickListPhotosDetailList: [],
            productPhotoListPick: [],
            panelCustomersList: [],
            panelCustomersModel:[],
            productSuggested:[],
            productQueueProducts:[],
            productAreasList : [],
            productAreasProductsList:[],

            productSurfaceFilteredList : [],
            productEdgeFilteredList : [],
            productMaterialFilteredList : [],
            productTypeFilteredList : [],
            productStyleFilteredList : [],

            productSurfaceFilteredProductsList:[],
            productEdgeFilteredProductsList:[],
            productMaterialFilteredProductsList:[],
            productTypeFilteredProductsList:[],
            productStyleFilteredProductsList:[],
            productKategoriAdi:null,
            productColorFilteredProductsList:[],
        }
    },
    actions: {
        panel_product_kategori_adi_load_act(data:any){
          this.productKategoriAdi = data;  
        },
        panel_queue_products_load_act(data:any){
          this.productQueueProducts = data  
        },
        panel_customers_detail_load_act(data: any) {
            this.panelCustomersModel = data;

        },
        panel_customers_load_act(data: any) {
            this.panelCustomersList = data.musteri_listesi;
            this.panelCustomersModel = data.musteri_model;

        },
        panel_project_detail_list_load_act(data: any) {
            this.panelProjectDetailList = data;
            this.panelPickListPhotosDetailList = [data.project_detail_list, []];
        },
        panel_project_model_load_act(data: any) {
            this.panelProjectModel = data.model;  
            this.panelProjectCountry = data.countryList;
        },
        panel_project_list_load_act(data: any) {
            this.panelProjectList = data;  
        },
        panel_product_list_load_act(data: any) {
            this.panelProductList = data;
        },
        panel_category_list_load_act(data: any) {
            this.panelCategoryList = data.kategorilist;
            this.panelProductCategoryList = data.productsList;
        },
        panel_product_new_button_load_act(data: any) {
            this.panelProductNewButton = data;
        },
        panel_product_model_list_load_act(data: any) {
            this.productModel = data.productdetail;
            this.productCategoryList = data.categoryList;
            this.productFinishList = data.finishlist;
            this.productSizeList = data.ebatlist;
            this.productSuggestedProductList = data.onerilenUrunList;
            this.productSuggestedProductsList = data.onerilernUrunlerList;
            this.productPhotoList = data.fotolist;
            this.productPhotoListPick = [data.fotolist, []];
            this.productSuggested = [data.onerilenUrunList,data.onerilernUrunlerList];
            this.productColorEnList = data.renkenlist;
            this.productColorFrList = data.renkfrlist;
            this.productColorEsList = data.renkeslist;
            this.productAreasList = data.alanlar;
            this.productAreasProductsList = data.areasProductList;
            this.productSurfaceFilteredList = data.surfaceFilteredList;
            this.productEdgeFilteredList = data.edgeFilteredList;
            this.productMaterialFilteredList = data.materialFilteredList;
            this.productTypeFilteredList = data.typeFilteredList;
            this.productStyleFilteredList = data.styleFilteredList;
            this.productSurfaceFilteredProductsList = data.surfaceFilteredProductList;
            this.productEdgeFilteredProductsList = data.edgeFilteredProductList;
            this.productMaterialFilteredProductsList = data.materialFilteredProductList;
            this.productTypeFilteredProductsList = data.typeFilteredProductList;
            this.productStyleFilteredProductsList = data.styleFilteredProductList;
            this.productColorFilteredProductsList = data.colorFilteredProductList;
        },
    },
    getters: {
        getProductColorFilteredProductsList(state){
            return state.productColorFilteredProductsList;
        },
        getProductSurfaceFilteredProductsList(state){
            return state.productSurfaceFilteredProductsList;
        },
        getProductEdgeFilteredProductsList(state){
            return state.productEdgeFilteredProductsList;
        },
        getProductMaterialFilteredProductsList(state){
            return state.productMaterialFilteredProductsList;
        },
        getProductTypeFilteredProductsList(state){
            return state.productTypeFilteredProductsList;
        },
        getProductStyleFilteredProductsList(state){
            return state.productStyleFilteredProductsList;
        },

        getProductKategoriAdi(state){
            return state.productKategoriAdi;
        },






        getProductStyleFilteredList(state){
          return state.productStyleFilteredList;  
        },
        getProductTypeFilteredList(state){
            return state.productTypeFilteredList;
        },
        getProductMaterialFilteredList(state){
          return state.productMaterialFilteredList;  
        },
        getProductEdgeFilteredList(state){
          return state.productEdgeFilteredList;  
        },
        getProductSurfaceFilteredList(state){
          return state.productSurfaceFilteredList;  
        },
        getProductAreasProductsList(state){
            return state.productAreasProductsList;
        },
        getProductAreasList(state){
            return state.productAreasList;
        },
        getProductQueueProducts(state){
          return state.productQueueProducts;  
        },
        getProductSuggested(state){
          return state.productSuggested;  
        },
        getPanelCustomersModel(state) {
            return state.panelCustomersModel;
        },
        getPanelCustomersList(state) {
            return state.panelCustomersList;
        },
        getProductPhotoListPick(state) {
            return state.productPhotoListPick;
        },
        getPanelPickListPhotosDetailList(state) {
            return state.panelPickListPhotosDetailList;
        },
        getPanelProjectDetailList(state) {
            return state.panelProjectDetailList;
        },
        getPanelProjectCountry(state) {
            return state.panelProjectCountry;
        },
        getPanelProjectModel(state) {
            return state.panelProjectModel;
        },
        getPanelProjectList(state) {
            return state.panelProjectList;  
        },
        getPanelProductList(state) {
            return state.panelProductList;
        },
        getPanelCategoryList(state) {
            return state.panelCategoryList;
        },
        getPanelProductCategoryList(state) {
            return state.panelProductCategoryList;
        },
        getPanelProductNewButton(state) {
            return state.panelProductNewButton;
        },
        getProductModel(state) {
            return state.productModel;
        },
        getProductCategoryList(state) {
            return state.productCategoryList;
        },
        getProductFinishList(state) {
            return state.productFinishList;
        },
        getProductSizeList(state) {
            return state.productSizeList;
        },
        getProductSuggestedProductList(state) {
            return state.productSuggestedProductList;
        },
        getProductSuggestedProductsList(state) {
            return state.productSuggestedProductsList;
        },
        getProductPhotoList(state) {
            return state.productPhotoList;
        },
        getProductColorEnList(state) {
            return state.productColorEnList;
        },
        getProductColorFrList(state) {
            return state.productColorFrList;
        },
        getProductColorEsList(state) {
            return state.productColorEsList;
        },
        getProductPickListPhotos(state) {
            return state.productPickListPhotos;
        }

    }

})