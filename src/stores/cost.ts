import { defineStore } from 'pinia';
export const useCostStore = defineStore('cost', {
    state: () => {
        return {
            list: [],
            model: [],
            newButton:false,
        }
    },
    actions: {
        cost_error_list_load_act(data: any) {
            this.list = data;
        },
        cost_error_model_load_act(data: any) {
            this.model = data;
        },
        cost_error_new_button_load_act(data: any) {
            this.newButton = data;
        }
    },
    getters: {
        getList(state) {
            return state.list;
        },
        getModel(state) {
            return state.model;
        },
        getNewButton(state) {
            return state.newButton;
        }
    }
})