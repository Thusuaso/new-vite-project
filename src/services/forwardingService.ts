import { api } from '../services/customServices/doctorService';

export const forwardingService = {
    getForwardingModel() {
        return api.get('/sevkiyat/islemler/sevkiyatNewModel').then(response => response.data);
    },
    getForwardingProductList(po: any) {
        return api.get(`/sevkiyat/listeler/siparisKalemList/${po}`).then(response => response.data);
    },
    save(data:any) {
        return api.put('/sevkiyat/islemler/sevkiyatKayit', data).then(response => response.data);
    }
}