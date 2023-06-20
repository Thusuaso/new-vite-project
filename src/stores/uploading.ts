import { defineStore } from 'pinia';

export const useUploadingStore = defineStore('uploading', {
    state: () => {
        return {
            uploadingProductList: [],
            uploadingFolderList: [],
            uploadingProductFolderList:[],
        }
    },
    actions: {
        uploading_product_list_load_act(data: any) {
            this.uploadingProductList = data;
        },
        uploading_folder_list_load_act(data: any) {
            this.uploadingFolderList = data;
        },
        uploading_product_folder_list_load_act(data: any) {
            this.uploadingProductFolderList = data;
        }
    },
    getters: {  
        getUploadingProductList(state) {
            return state.uploadingProductList;
        },
        getUploadingFolderList(state) {
            return state.uploadingFolderList;
        },
        getUploadingProductFolderList(state) {
            return state.uploadingProductFolderList;
        }
    }
});