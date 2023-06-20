import { defineStore } from 'pinia';
export const useLoadingStore = defineStore('loading', {
    state: () => {
        return {
            loading:false,
        }
    },
    actions: {
        begin_loading_act() {
            this.loading = true
        },
        end_loading_act() {
            this.loading = false
        }
    },
    getters: {
        getLoading(state) {
            return state.loading
        }
    }
})