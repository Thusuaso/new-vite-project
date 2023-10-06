import { defineStore } from 'pinia';
export const useHomeStore = defineStore('home', {
    state: () => {
        return {
            dashboard: {
                'gelenSiparisMekmar':[{'gelenSiparisFob':0,'gelenSiparisAy':'',}],
                'gelenSiparisYearMekmar':[
                    {'gelenSiparisYilSonuTahmini':0,
                    'gelenSiparisFob':0,
                    'gelenSiparisYil':0,
                    'gelenSiparisAy':0,
                    'gelenSiparisAylikOrtalama':0,

                    }
                
                ],
                'gelenSiparisMekmarYuklenen':[{'gelenSiparisFob':0,'gelenSiparisAy':''}],
                'gelenSiparisYearYuklenenMekmar':[{
                    'gelenSiparisFob':0,'gelenSiparisYil':'','gelenSiparisAy':'',
                    'gelenSiparisAylikOrtalama':0,'gelenSiparisYilSonuTahmini':0
                }]
            },
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