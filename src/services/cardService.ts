import { api } from '@/services/customServices/doctorService';
export const cardService = {
    getCardList() {
        return api.get('/listeler/urunKartMenuList').then(response => response.data);
    },
    getNewCardForm() {
        return api.get('/islemler/urunKart/getUrunKartDetayListYeni').then(response => response.data);
    },
    getCardModelForm(productCardId:any) {
        return api.get(`/islemler/urunKart/getUrunKartDetayList/${productCardId}`).then(response => response.data);
    },
    save(data: any) {
        return api.post('/islemler/urunKart/kayit',data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/islemler/urunKart/kayit',data).then(response => response.data);
    },
    delete(productCardId: any, username: any) {
        return api.delete(`/islemler/urunKart/getUrunKartSil/${productCardId}/${username}`).then(response => response.data);
    }
}