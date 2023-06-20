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
    }
}