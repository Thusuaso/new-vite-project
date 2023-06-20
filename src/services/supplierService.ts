import { api } from '../services/customServices/doctorService';

export const supplierService = {
    getSupplierList() {
        return api.get('/tedarikci/listeler/tedarikciListesi').then(response => response.data);
    },
    save(data:any) {
        return api.post('/tedarikci/kayitIslem/tedarikciKaydet', data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/tedarikci/kayitIslem/tedarikciKaydet', data).then(response => response.data);
    },
    delete(supplierId: any) {
        return api.delete(`/tedarikci/kayitIslem/tedarikciSil/${supplierId}`).then(response => response.data);
    }

}