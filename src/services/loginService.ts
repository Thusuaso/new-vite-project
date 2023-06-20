import {  api } from '@/services/customServices/doctorService';

export const loginService = {
    login(username: any,password: any) {
        return api.get(`login/${username}/${password}`).then(response=>response.data)
    }
}
