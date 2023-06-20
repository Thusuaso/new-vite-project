import { defineStore } from 'pinia';

export const useSupplierStore = defineStore('supplier', {
    state: () => {
        return {
            supplierList: [],
            supplierNewButton:false,
        }
    },
    actions: {
        supplier_list_load_act(data: any) {
            this.supplierList = data;
        },
        supplier_new_button_load_act(data: any) {
            this.supplierNewButton = data;
        }
    },
    getters: {
        getSupplierList(state) {
            return state.supplierList;
        },
        getSupplierNewButton(state) {
            return state.supplierNewButton;
        }
    }

})