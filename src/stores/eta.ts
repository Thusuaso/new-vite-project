import { defineStore } from 'pinia';
export const useEtaStore = defineStore('eta', {
    state: () => {
        return {
            list: [],
            listLength: 0,
        }
    },
    actions: {
        eta_list_load_act(data: any) {
            this.list = data;
            this.eta_list_length_load_act(data);
        },
        eta_list_length_load_act(data: any) {
            this.listLength = data.length;
        }
    },
    getters: {
        getList(state) {
            return state.list;
        },
        getListLength(state) {
            return state.listLength;
        }
    }
})