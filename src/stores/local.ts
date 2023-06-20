import { defineStore } from 'pinia';

export const useLocalStore = defineStore('local', {

    state: () => {
        return {
            // url: 'http://localhost:5000/',
            url: "https://doktor-servis.mekmar.com/"
        }
    },

    actions: {
        
    },
    getters: {
        getLocalServiceUrl(state) {
            return state.url;
        }
    }

})