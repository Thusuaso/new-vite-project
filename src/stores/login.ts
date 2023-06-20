import { defineStore } from 'pinia'

export const useLoginStore = defineStore('login',{
    state: () => {
        return {
            username: '',
            userId: 0,
            authentication:false,
        }
    },
    actions: {
        login_act(data:any) {
            this.username = data.username
            this.userId = data.userId
        },
        login_authentication_act(data: any) {
            this.authentication = data
        }

    },
    getters: {
        getUsername(state) {
            return state.username
        },
        getUserId(state) {
            return state.userId
        },
        getAuthentication(state) {
            return state.authentication
        }

    }
})
