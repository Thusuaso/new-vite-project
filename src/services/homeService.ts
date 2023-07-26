import { api } from '@/services/customServices/doctorService'

export const homeService = {
    dashboard() {
        return api.get('/raporlar/dashboard/dasboardNew').then(response=>response.data)
    },
    dashboardSub() {
        return api.get('/raporlar/dashboard/dashboardSubData').then(response=>response.data)
    },
    getVadeControl() {
        return api.get('/kontroller/finansVadeTakipIslem').then(response => response.data);
    }
}