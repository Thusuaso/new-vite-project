import { defineStore } from 'pinia';

export const useContainerStore = defineStore('container', {
    state: () => {
        return {
            followContainerList: [],
            unfollowContainerList: [],
            containerInputCompanyList: [],
            containerInputProductList: [],
            containerList: [],
        }
    },
    actions: {
        follow_container_list_load_act(data: any) {
            this.followContainerList = data;
        },
        unfollow_container_list_load_act(data: any) {
            this.unfollowContainerList = data;
        },
        container_input_list_load_act(data: any) {
            this.containerInputCompanyList = data.konteyner_liste;
            this.containerInputProductList = data.siparis_list;
        },
        container_list_load_act(data: any) {
            this.containerList = data;
        }
    },
    getters: {
        getFollowContainerList(state) {
            return state.followContainerList;
        },
        getUnfollowContainerList(state) {
            return state.unfollowContainerList;
        },
        getContainerInputCompanyList(state) {
            return state.containerInputCompanyList;
        },
        getContainerInputProductList(state) {
            return state.containerInputProductList;
        },
        getContainerList(state) {
            return state.containerList;
        }
    }

})