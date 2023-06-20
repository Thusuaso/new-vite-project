import { defineStore } from "pinia";

export const useCustomerStore = defineStore('customer',{
    state: () => {
        return {
            customerListA: [],
            customerListB: [],
            customerListC: [],
            customerListDetail: [],
            customerModel: [],
            customerNewButtonStatus:false,
            
            
        }
    },
    actions: {
        customer_list_load_act(data:any) {
            this.customerListA = data.filter((x: { oncelik: string; }) => x.oncelik == 'A')
            this.customerListB = data.filter((x: { oncelik: string; })=>x.oncelik == 'B')
            this.customerListC = data.filter((x: { oncelik: string; })=>x.oncelik == 'C')
        },
        customer_list_detail_load_act(data: any) {
            this.customerListDetail = data
        },
        customer_model_load_act(data: any) {
            this.customerModel = data
        },
        customer_new_button_status_load_act(data:any) {
            this.customerNewButtonStatus = data
        }
    },
    getters: {
        getCustomerListA(state) {
            return state.customerListA
        },
        getCustomerListB(state) {
            return state.customerListB
        },
        getCustomerListC(state) {
            return state.customerListC
        },
        getCustomerListDetail(state) {
            return state.customerListDetail
        },
        getCustomerNewButtonStatus(state) {
            return state.customerNewButtonStatus
        },
        getCustomerModel(state) {
            return state.customerModel
        }
    }
})