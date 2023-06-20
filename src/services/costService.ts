import { api } from '../services/customServices/doctorService';
export const costService = {
    getList() {
        return api.get('/raporlar/maliyet/hatalar').then(response => response.data);
    },
    getModel() {
        return api.get('/raporlar/maliyet/hatalar/model').then(response => response.data);
    },
    save(data: any) {
        return api.post('/raporlar/maliyet/hatalar',data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/raporlar/maliyet/hatalar',data).then(response => response.data);
    },
    delete(id: any) {
        return api.delete(`/raporlar/maliyet/hatalar/delete/${id}`).then(response => response.data);
    },
    detail(id: any) {
        return api.get(`/raporlar/maliyet/hatalar/detay/${id}`).then(response => response.data);
    }
}