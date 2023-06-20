import { api } from '../services/customServices/doctorService';

export const containerService = {
    getFollowList() {
        return api.get('/operasyon/listeler/sevkTakipListesi').then(response => response.data);
    },
    getUnfollowList() {
        return api.get('/operasyon/listeler/sevkTakipDusenListesi').then(response => response.data);
    },
    followSave(data: any) {
        return api.put('/operasyon/islemler/sevkTakipGuncelle', data).then(response => response.data);
    },
    getContainerInputList() {
        return api.get('/operasyon/listeler/KonteynerFormListeler').then(response => response.data);
    },
    getCurrency(year: any, month: any, day: any) {
        return api.get(`/listeler/DovizListe/${year}/${month}/${day}`).then(response => response.data);
    },
    save(data: any) {
        return api.post('/operasyon/islemler/konteynerKayit', data).then(response => response.data);
    },
    informationSave(data: any) {
        return api.post('/operasyon/islemler/konteyner/konteynerDosyaKaydet', data).then(response => response.data);
    },
    getContainerList() {
        return api.get('/operasyon/listeler/KonteynerList').then(response => response.data);
    }

}