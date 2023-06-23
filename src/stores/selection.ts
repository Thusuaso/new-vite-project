import { defineStore } from 'pinia';

export const useSelectionStore = defineStore('selection', {
    state: ()=>{
        return {
            selectionModelList:[],
            selectionForm:[],
            selectionList: [],
            selectionListFilter:[],
            orderList: [],
            orderDetailList: [],
            mineList: [],
            supplierList: [],
            productUnitList: [],
            productSummaryList: [],
            btnFormMekmer: true,
            btnFormOuter: false,
            btnFormMekmerOuter: false,
            btnFormNotFound: false,
            selectionSum: {
                crate: 0,
                cratePiece: 0,
                boxPiece: 0,
                m2:0
            },
            selectionNewButton: false,
            filteredSelectionList: [],
        }
    },
    actions: {
        selection_filtered_list_load_act(data: any) {
            this.filteredSelectionList = data;
        },
        selection_model_list_load_act(data: any) {
            this.selectionModelList = data;
        },
        selection_list_load_act(data: any) {
            this.selectionList = data.productionList;
            this.selectionListFilter = data.productionList.filter((x: { tedarikci_id: number;disarda:boolean;bulunamayan:boolean; })=> (x.tedarikci_id == 1 || x.tedarikci_id == 123) && x.disarda==false && x.bulunamayan ==false);
            this.selection_total_sum_load_act(this.selectionListFilter);
            
            this.orderList = data.orderList;
            this.orderDetailList = data.orderDetailList;
            this.mineList = data.mineList;
            this.supplierList = data.supplierList;
            this.productUnitList = data.productUnitList;
            this.productSummaryList = data.productSummaryList;

        },
        selection_form_load_act(data: any) {
            this.selectionForm = data;
        },
        btn_form_mekmer_load_act() {
            this.btnFormMekmer = true;
            this.btnFormOuter = false;
            this.btnFormMekmerOuter = false;
            this.btnFormNotFound = false;
            this.selectionListFilter = this.selectionList.filter((x: { tedarikci_id: number;disarda:boolean;bulunamayan:boolean; })=> (x.tedarikci_id == 1 || x.tedarikci_id == 123) && x.disarda==false && x.bulunamayan == false);
            this.selectionSum = {
                crate: 0,
                cratePiece: 0,
                boxPiece: 0,
                m2: 0
            };
            this.selectionSum.crate = this.selectionListFilter.length;
            for (let item of this.selectionListFilter) {
                
                this.selectionSum.cratePiece += parseInt(item.kasaadet);
                this.selectionSum.boxPiece +=  parseInt(item.kutuadet);
                this.selectionSum.m2 +=  parseFloat(item.m2);
            };
        },
        btn_form_outer_load_act() {
            this.btnFormMekmer = false;
            this.btnFormOuter = true;
            this.btnFormMekmerOuter = false;
            this.btnFormNotFound = false;
            this.selectionListFilter = this.selectionList.filter((x: { tedarikci_id: number;disarda:boolean;bulunamayan:boolean })=> !(x.tedarikci_id == 1 || x.tedarikci_id == 123) && x.disarda == true && x.bulunamayan == false);
            this.selectionSum = {
                crate: 0,
                cratePiece: 0,
                boxPiece: 0,
                m2: 0
            };
            this.selectionSum.crate = this.selectionListFilter.length;
            for (let item of this.selectionListFilter) {
                this.selectionSum.cratePiece += parseInt(item.kasaadet);
                this.selectionSum.boxPiece +=  parseInt(item.kutuadet);
                this.selectionSum.m2 +=  parseFloat(item.m2);
            };
        },
        btn_form_mekmer_outer_load_act() {
            this.btnFormMekmer = false;
            this.btnFormOuter = false;
            this.btnFormMekmerOuter = true;
            this.btnFormNotFound = false;
            this.selectionListFilter = this.selectionList.filter((x: { tedarikci_id: number;disarda:boolean;bulunamayan:boolean })=> !(x.tedarikci_id == 1 || x.tedarikci_id == 123) && x.disarda == false && x.bulunamayan == false);
            this.selectionSum = {
                crate: 0,
                cratePiece: 0,
                boxPiece: 0,
                m2: 0
            };
            this.selectionSum.crate = this.selectionListFilter.length;
            for (let item of this.selectionListFilter) {
                
                this.selectionSum.cratePiece += parseInt(item.kasaadet);
                this.selectionSum.boxPiece +=  parseInt(item.kutuadet);
                this.selectionSum.m2 +=  parseFloat(item.m2);
            };
        },
        btn_form_not_found_load_act() {
            this.btnFormMekmer = false;
            this.btnFormOuter = false;
            this.btnFormMekmerOuter = false;
            this.btnFormNotFound = true;
            this.selectionListFilter = this.selectionList.filter((x: { bulunamayan: boolean; })=> x.bulunamayan == true);
            this.selectionSum.crate = this.selectionListFilter.length
            for (let item of this.selectionListFilter) {
                this.selectionSum =  {
                    crate: 0,
                    cratePiece: 0,
                    boxPiece: 0,
                    m2:0
                }
                this.selectionSum.cratePiece += item.kasaadet;
                this.selectionSum.boxPiece += item.kutuadet;
                this.selectionSum.m2 += item.m2;
            }
        },
        selection_new_button_load_act(data: any) {
            this.selectionNewButton = data;
        },
        selection_total_sum_load_act(data: any) {
            this.selectionSum = {
                crate: 0,
                cratePiece: 0,
                boxPiece: 0,
                m2: 0
            };
            this.selectionSum.crate = data.length;
            for (const item of data) {
                
                this.selectionSum.cratePiece += parseInt(item.kasaadet);
                this.selectionSum.boxPiece +=  parseInt(item.kutuadet);
                this.selectionSum.m2 +=  parseFloat(item.m2);
            };
        }
    },  
    getters: {
        getFilteredSelectionList(state) {
            return state.filteredSelectionList;  
        },
        getSelectionList(state) {
            return state.selectionListFilter;
        },
        getOrderList(state) {
            return state.orderList;
        },
        getOrderDetailList(state) {
            return state.orderDetailList;
        },
        getMineList(state) {
            return state.mineList;
        },
        getSupplierList(state) {
            return state.supplierList;
        },
        getProductUnitList(state) {
            return state.productUnitList;
        },
        getProductSummaryList(state) {
            return state.productSummaryList;
        },
        getBtnFormMekmer(state) {
            return state.btnFormMekmer;
        },
        getBtnFormOuter(state) {
            return state.btnFormOuter;
        },
        getBtnFormMekmerOuter(state) {
            return state.btnFormMekmerOuter;
        },
        getBtnFormNotFound(state) {
            return state.btnFormNotFound;
        },
        getSelectionSum(state) {
            return state.selectionSum;
        },
        getSelectionModelList(state) {
            return state.selectionModelList;
        },
        getSelectionNewButton(state) {
            return state.selectionNewButton;
        }

    }
    

})