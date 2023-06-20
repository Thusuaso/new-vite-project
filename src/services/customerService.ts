import { api } from './customServices/doctorService';

export const customerService = {
    customerList(userId:any) {
        return api.get(`/listeler/customers/customersList/${userId}`).then(response=>response.data)
    },
    customerListDetail(musteri_adi:String) {
        return api.get(`/listeler/customers/customersDetay/${musteri_adi}`).then(response=>response.data)
    },
    customerModel() {
        return api.get('/satisci/customers/satisciModel').then(response=>response.data)
    },
    customerSave(customer:any) {
        return api.post('/satisci/customers/islemler/satisciKayitDegistirme',customer).then(response=>response.data)
    },
    customerUpdate(customer: any) {
      return api.put('/satisci/customers/islemler/satisciKayitDegistirme',customer).then(response=>response.data)
    },
    customerDelete(id: any) {
        return api.delete(`/satisci/customers/islemler/satisciKayitSilme/${id}`).then(response=>response.data)
    },
    setCustomerPriority(customerName: any, priority: any) {
        return api.get(`/satisci/customers/changePriority/${customerName}/${priority}`).then(response=>response.data)
    },
    setCustomerFollowing(customerName: any, status:any) {
        return api.get(`/satisci/customers/Following/${customerName}/${status}`).then(response=>response.data)
    }
}