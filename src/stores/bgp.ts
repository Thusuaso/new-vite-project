import { defineStore } from "pinia";

export const useBgpStore = defineStore('bgp', {
    state: () => {
        return {
            bgpList: [],
            bgpListDetail: [],
            bgpListDetailModel:[],
            bgpCountryList: [],
            statisticList: [],
            countryList: [],
            bgpProjectNewButtonStatus: false,
            representiveCountry:[]
        }
    },
    actions: {
        bgp_list_load_act(data:any) {
            this.bgpList = data
        },
        bgp_list_detail_load_act(data: any) {
            this.bgpListDetail = data
        },
        bgp_country_list_load_act(data: any) {
            this.bgpCountryList = data
        },
        bgp_statistic_list_load_act(data: any) {
            this.statisticList = data
        },
        country_list_load_act(data: any) {
            this.countryList = data
        },
        bgp_list_detail_model_load_act(data:any) {
            this.bgpListDetailModel = data
        },
        bgp_project_new_button_load_act(data: any) {
            this.bgpProjectNewButtonStatus = data
        },
        bgp_project_representive_country_load_act(data: any) {
            this.representiveCountry = data
        }

    },
    getters: {
        getBgpList(state) {
            return state.bgpList
        },
        getBgpCountryList(state) {
            return state.bgpCountryList
        },
        getStatisticList(state) {
            return state.statisticList
        },
        getCountryList(state) {
            return state.countryList
        },
        getBgpListDetail(state) {
            return state.bgpListDetail
        },
        getBgpListDetailModel(state) {
            return state.bgpListDetailModel
        },
        getbgpProjectNewButtonStatus(state) {
            return state.bgpProjectNewButtonStatus
        },
        getRepresentiveCountry(state) {
            return state.representiveCountry
        }
        

    }
})