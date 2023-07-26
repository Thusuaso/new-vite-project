import { defineStore } from 'pinia';
export const useMobilStore = defineStore('mobil', {
    state: () => {
        return {
            mobile:false,
        }
    },
    actions: {
        mobile_load_act(data: any) {
            this.mobile = data;
        }
    },
    getters: {
        getMobile(state) {
            return state.mobile;
        }
    }
})