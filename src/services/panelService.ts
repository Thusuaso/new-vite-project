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
        return api.post('/panel/mekmarcom/fotoEkle', data);
    }
}