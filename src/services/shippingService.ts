import { api } from '../services/customServices/doctorService';

export const shippingService = {
    getShippingList() {
        return api.get('/operasyon/listeler/nakliyebilgilistesi').then(response => response.data);
    },
    save(data:any) {
        return api.post('/operasyon/islemler/nakliyeKayit', data).then(response => response.data);
    },
    getCurrency(year: any, month: any, day: any) {
        return api.get(`/listeler/DovizListe/${year}/${month}/${day}`).then(response => response.data);
    },
    informationSave(data: any) {
        return api.post('/operasyon/islemler/nakliyeKayit', data).then(response => response.data);
    },
    invoiceFileSave(data: any) {
        return api.post('/operasyon/islemler/nakliye/nakliyeDosyaKaydet', data).then(response => response.data);
    },
    getShippingInvoiceList() {
        return api.get('/operasyon/listeler/nakliyeListesi').then(response => response.data);
    },
    getCompanyList() {
        return api.get('/operasyon/listeler/FirmaList').then(response => response.data);
    },
    companySave(data:any) {
        return api.post('/operasyon/islemler/FirmaKayit',data).then(response => response.data);
    }
}