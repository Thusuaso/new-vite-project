import { defineStore } from 'pinia';
export const useCostStore = defineStore('cost', {
    state: () => {
        return {
            list: [],
            model: [],
            users:[],
            newButton:true,
        }
    },
    actions: {
        cost_error_list_load_act(data: any) {
            this.list = data;
        },
        cost_error_model_load_act(data: any) {
            console.log(data.users)
            this.model = data.model;
            this.users = data.users;
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
        getUsers(state) {
            return state.users;  
        },
        getNewButton(state) {
            return state.newButton;
        }
    }
})