import { api } from '../services/customServices/mekmarWebSiteService';

export const panelService = {
    getPanelCategoryList() {
        return api.get('/panel/mekmarcom/kategoriList').then(response => response.data);
    },
    getPanelProductList(category:any) {
        return api.get(`/panelProductList/productKategoriList/${category}`).then(response => response.data);
    },
    getPanelModel() {
        return api.get('/panel/mekmarcom/productDetail/newProduct').then(response => response.data);
    },
    setFinishAdd(data:any) {
        return api.post('/panel/mekmarcom/productDetail/finishDataIslem', data).then(response => response.data);
    },
    setFinishDelete(data: any) {
        return api.put('/panel/mekmarcom/productDetail/finishDataIslem', data).then(response => response.data);
    },
    setSizeAdd(data: any) {
        return api.post('/panel/mekmarcom/productDetail/ebatDataIslem',data).then(response => response.data);
    },
    setSizeDelete(data: any) {
        return api.put('/panel/mekmarcom/productDetail/ebatDataSil', data).then(response => response.data);
    },
    setPhotosAdd(data: any) {
        return api.put('/panel/mekmarcom/fotoEkle', data);
    },
    getPanelDetail(product_id:any){
        return api.get(`/panel/mekmarcom/productDetail/${product_id}`).then(response=>response.data);
    },
    setPanelSave(data: any) {
        return api.post('/panel/mekmarcom/productDetail/VeriKayıt', data).then(response => response.data);
    },
    setPanelUpdate(data: any) {
        return api.put('/panel/mekmarcom/productDetail/VeriKayıt', data).then(response => response.data);
    },
    setPanelDelete(product_id: any) {
        return api.delete(`/panel/mekmarcom/urunSilme/${product_id}`).then(response => response.data);
    },
    deletePanelPhotos(data:any) {
        return api.put('/panel/mekmarcom/fotoIslem/fotoDegisim', data).then(response => response.data);
    }
}