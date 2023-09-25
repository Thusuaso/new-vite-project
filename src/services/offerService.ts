import {  api } from '@/services/customServices/doctorService';

export const offerService = {
    getOfferMainPage(userId: any) {
        return api.get(`/listeler/teklif/anaSayfaData/${userId}`).then(response => response.data);
    },
    getOfferAllList() {
        return api.get('/listeler/teklif/kullaniciAyrintiListe2').then(response => response.data);
    },
    getOfferAllRepresentativeList(userId: any) {
        return api.get(`/listeler/teklif/kullaniciAyrintiListe/${userId}`).then(response => response.data);
    },
    getOfferFormModel() {
        return api.get('/listeler/teklif/teklifFormListeler').then(response => response.data);
    },
    setOfferFile(data:any) {
        return api.post('/islemler/teklif/teklifDosyaKaydet', data).then(response => response.data);
    },
    deleteOfferFile(id: any) {
        return api.delete(`/islemler/teklif/teklifDosyaSil/${id}`).then(response => response.data);
    },
    setOfferProforma(data:any) {
        return api.post('/islemler/teklif/proformaKaydet', data).then(response => response.data);
    },
    setOfferSample(data: any) {
        return api.post('/islemler/teklif/teklifNumuneKaydet', data).then(response => response.data);
    },
    save(data: any) {
        return api.post('/islemler/teklif/teklifModel', data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/islemler/teklif/teklifModel', data).then(response => response.data);
    },
    delete(id: any) {
        return api.delete(`/islemler/teklif/teklifSil/${id}`).then(response => response.data);
    },
    getOfferDetail(id: any) {
        return api.get(`/islemler/teklif/teklifModel/${id}`).then(response => response.data);
    },
    getOffersAllList() {
        return api.get('/listeler/teklif/tumTeklifList').then(response => response.data);
    },
    setEnBoy(data: any) {
        return api.post('/listeler/teklif/addEnBoy', data).then(response => response.data);
    }
}