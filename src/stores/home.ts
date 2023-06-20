import { defineStore } from 'pinia';
export const useHomeStore = defineStore('home', {
    state: () => {
        return {
            dashboard: [],
            dashboardSub:[]
        }
    },
    actions: {
        dashboard_load_act(data:any) {
            this.dashboard = data
        },
        dashboard_sub_load_act(data: any) {
            this.dashboardSub = data
        }
    },
    getters: {
        getDashboard(state) {
            return state.dashboard
        },
        getDashboardSub(state) {
            return state.dashboardSub
        }
    }
})