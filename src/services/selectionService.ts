import { api } from '../services/customServices/doctorService';

export const selectionService = {
    getSelectionList() {
        return api.get('/seleksiyon/listeler/uretimList').then(response => response.data);
    },
    getSelectionModel() {
        return api.get('/seleksiyon/listeler/uretimDetayModel').then(response => response.data);
    },
    getSelectionProductDetail(po:any) {
        return api.get(`/seleksiyon/listeler/siparisUretimDetay/${po}`).then(response => response.data);
    },
    getSelectionCrateNo() {
        return api.get('/seleksiyon/islemler/seleksiyonFirmaKasaNo').then(response => response.data);
    },
    getSelectionOuterCrateNo() {
        return api.get('/seleksiyon/islemler/disFirmaKasaNo').then(response => response.data);
    },
    getSelectionDetail(crateNo:any) {
        return api.get(`/seleksiyon/listeler/uretimDetay/${crateNo}`).then(response => response.data);
    },
    save(data: any) {
        return api.post('/seleksiyon/islemler/uretimCokluKaydet', data).then(response => response.data);
    },
    delete(crateNo: any) {
        return api.delete(`/seleksiyon/islemler/uretimSilIslem/${crateNo}`).then(response => response.data);
    },
    update(data: any) {
        return api.put('/seleksiyon/islemler/uretimKayitIslem', data).then(response => response.data);
    },
    getSelectionExcelList(data:any) {
        return api.post('/siparisler/dosyalar/seleksiyonExcelCikti', data).then(response => response.data);
    },
    getTicketDataList(date: any) {
        return api.get(`/seleksiyon/listeler/seleksiyonEtiketTarih/${date}`).then(response => response.data);
    },
    getTicketExcelList(data: any) {
        return api.post('/siparisler/dosyalar/seleksiyonEtiketCikti',data).then(response => response.data);
    },
    getPoTicketDownload(code: any) {
        return api.get(`/islemler/evrak/etiketList/${code}`).then(response => response.data);
    }
}