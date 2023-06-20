import { api } from '../services/customServices/mekmarWebSiteService';

export const usaService = {
    getList() {
        return api.get('/panel/mekmarusa/depoUrunListe').then(response => response.data);
    },
    getUsaSkuList() {
        return api.get('/panel/mekmarusa/usaProductList').then(response => response.data);
    },
    setPhotos(data:any) {
        return api.post('/panel/mekmarusa/usaAddPhotos',data).then(response => response.data);
    },
    save(data:any) {
        return api.post('/panel/mekmarusa/usaProductSave',data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/panel/mekmarusa/usaProductSave',data).then(response => response.data);
    },
    getCommentList() {
        return api.get('/listeler/depo/panelYorumList').then(response => response.data);
    },
    setActivePassive(data:any) {
        return api.put('/panel/mekmarusa/dataIslem/urunAktifPasifYap',data).then(response => response.data);
    },
    addUsaPhotos(data: any) {
        return api.post('/panel/mekmarusa/usaAddPhotos', data).then(response => response.data);
    }
}