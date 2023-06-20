import { api } from '../services/customServices/doctorService';

export const shopperService = {
    getShopperList() {
        return api.get('/musteriler/listeler/musteriListesi').then(response => response.data);
    },
    getShopperModel() {
        return api.get('/musteriler/listeler/yeniMusteriModel').then(response => response.data);
    },
    save(data: any) {
        return api.post('/musteriler/islemler/musteriKayitIslem', data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/musteriler/islemler/musteriKayitIslem', data).then(response => response.data);
    },
    delete(id: any) {
        return api.delete(`/musteriler/islemler/musteriKayitSilme/${id}`).then(response => response.data);
    },
    getShopperDetail(id: any) {
        return api.get(`/musteriler/listeler/musteriDetay/${id}`).then(response => response.data);
    },
    getShopperSellerList(year: any,id:any) {
        return api.get(`/musteriler/listeler/musteri/siparisDetay/${year}/${id}`);
    },
    getShopperSellerProductList(po: any) {
        return api.get(`/customers/products/detailList/${po}`).then(response => response.data);
    },
    getShopperOfferList() {
        return api.get('/listeler/teklifMusteriler').then(response => response.data);
    },
    getShopperOfferModel() {
        return api.get('/listeler/teklif/musteriler/model').then(response => response.data);
    },
    saveShopperOffer(data:any) {
        return api.post('/listeler/setNewTeklifMusteriler', data).then(response => response.data);
    },
    updateShopperOffer(data: any) {
        return api.put('/listeler/setNewTeklifMusteriler', data).then(response => response.data);
    },
    getShopperOfferDetail(id: any) {
        return api.get(`/listeler/teklifMusterilerAyrinti/${id}`).then(response => response.data);
    },
    deleteShopperOffer(id: any) {
        return api.delete(`/listeler/setNewTeklifMusterilerSil/${id}`).then(response => response.data);
    },
    getShopperBgpList() {
        return api.get('/listeler/getBgpMusterilerList').then(response => response.data);
    },
    getShopperBgpModel() {
        return api.get('/listeler/bgp/model').then(response => response.data);
    },
    saveShopperBgp(data: any) {
        return api.post('/listeler/setNewBgpMusteriler', data).then(response => response.data);
    },
    updateShopperBgp(data: any) {
        return api.put('/listeler/setNewBgpMusteriler', data).then(response => response.data);
    },
    deleteShopperBgp(id: any) {
        return api.delete(`/listeler/setNewBgpMusterilerSil/${id}`).then(response => response.data);
    },
    getShopperBgpDetail(id: any) {
        return api.get(`/listeler/getBgpMusterilerAyrintiList/${id}`).then(response => response.data);
    },
    getShopperFairList() {
        return api.get('/listeler/getFuarMusterilerList').then(response => response.data);
    },
    getShopperFairModel() {
        return api.get('/listeler/fuar/model').then(response => response.data);
    },
    saveShopperFair(data:any) {
        return api.post('/listeler/setNewFuarMusteriler',data).then(response => response.data);
    },
    updateShopperFair(data:any) {
        return api.put('/listeler/setNewFuarMusteriler',data).then(response => response.data);
    },
    deleteShopperFair(id:any) {
        return api.delete(`/listeler/setNewFuarMusterilerSil/${id}`).then(response => response.data);
    },
    getShopperFairDetail(id: any) {
        return api.get(`/listeler/getFuarMusterilerAyrintiList/${id}`).then(response => response.data);
    },
    getShopperSelectionList(userId: any) {
        return api.get(`/listeler/musteriler/musteriSurfaceList/${userId}`).then(response => response.data);
    },
    getShopperSelectionModel(userId: any) {
        return api.get(`/listeler/musteriler/seleksiyon/model/${userId}`).then(response => response.data);
    },
    saveShopperSelection(data: any) {
        return api.post('/listeler/musteriler/musteriSurface', data).then(response => response.data);
    },
    updateShopperSelection(data: any) {
        return api.put('/listeler/musteriler/musteriSurface', data).then(response => response.data);
    },
    deleteShopperSelection(id: any,user_id:any) {
        return api.delete(`/listeler/musteriler/musteriSurface/delete/${id}/${user_id}`).then(response => response.data);  
    },
    getShopperSelectionDetail(userId: any, id: any) {
        return api.get(`/listeler/musteriler/seleksiyon/detail/${userId}/${id}`).then(response => response.data);
    }
}