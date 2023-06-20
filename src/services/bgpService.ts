import { api } from './customServices/doctorService';
export const bgpService = {
    bgpList(userId:any) {
        return api.get(`/bgpProject/getBgpProjectList/${userId}`).then(response=>response.data)
    },
    bgpSave(data: any) {
        return api.post('/bgpProject/SaveBgpProject',data).then(response=>response.data)
    },
    bgpDelete(projectName: String) {
        return api.delete(`/bgpProject/setBgpProjecDelete/${projectName}`).then(response=>response.data)
    },
    bgpDetail(projectName: String) {
        return api.get(`/bgpProject/getBgpProjectDetail/${projectName}`).then(response=>response.data)
    },
    bgpProjectDetailModel() {
        return api.get('/bgpProject/detail/model').then(response=>response.data)
    },
    bgpProjectDetailSave(data:any) {
        return api.post('/bgpProject/setBgpProjectDetailIslem',data).then(response=>response.data)
    },
    bgpProjectDetailUpdate(data: any) {
        return api.put('/bgpProject/setBgpProjectDetailIslem',data).then(response=>response.data)
    },
    bgpProjectDetailDelete(data: any) {
        return api.delete(`/bgpProject/setBgpProjectDetailDelete/${data}`).then(response=>response.data)
    },
    bgpProjectRepresentiveCountry() {
        return api.get('/bgpProject/getBgpProjectCountryandReseptation').then(response=>response.data)
    }
}