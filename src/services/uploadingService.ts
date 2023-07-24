import { api } from '../services/customServices/doctorService';

export const uploadingService = {
    getUploadingProductList() {
        return api.get('/evrak/listeler/siparisListe').then(response => response.data);
    },
    save(data:any) {
        return api.post('/islemler/evrak/evrakFaturaModel', data).then(response => response.data);
    },
    getUploadingFolderList(po:any) {
        return api.get(`/evrak/faturaList/${po}`).then(response => response.data);
    },
    getSupplierList(po:any) {
        return api.get(`/evrak/tedarikci/faturaList/${po}`).then(response => response.data);
    },
    getUploadingDocumentControl(supplier:any,po:any) {
        return api.get(`operasyon/islemler/tedarikci/tedarikciKontrol/${supplier}/${po}`).then(response => response.data);
    },
    setSupplierInvoice(supplier: any) {
        return api.post('/operasyon/islemler/tedarikci/tedarikciDosyaKaydet',supplier).then(response => response.data);
    },
    setSupplier(data:any){
        return api.post(`/operasyon/islemler/tedarikci/tedarikciKayit`,data).then(response => response.data);
    },
    setWorkerman(data: any) {
        return api.post('/operasyon/islemler/ekstra/ozelIscilikDosyaKaydet', data).then(response => response.data);
    },
    getWorkermanSupplierList(po: any) {
        return api.get(`/operasyon/islemler/iscilik/tedarikci/list/${po}`).then(response => response.data);
    }
}