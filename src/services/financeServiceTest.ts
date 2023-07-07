import { api } from "./customServices/doctorService";

export const financeServiceTest = {
    getList() {
        return api.get(`/finance/reports/test`).then(response=>response.data);
    },
    getDetailList(customer_id:any){
        return api.get(`/finance/reports/test/detail/${customer_id}`).then(response=>response.data);
    },
    getPaidDetailList(customer_id:any,date:any){
        return api.get(`/finans/listeler/odemeSecimList/${customer_id}/${date}`).then(response=>response.data);
    },
    getPaymentDetail(customer_id:any,po:any){
        return api.get(`/finans/listeler/musteriTahsilatListe/${customer_id}/${po}`).then(response=>response.data);
    },
    getCurrency(year:any,month:any,day:any){
        return api.get(`/listeler/DovizListe/${year}/${month}/${day}`).then(response=>response.data);
    },
    savePayment(data:any){
        return api.post('/finans/islemler/tahsilatKayitDegistirme',data).then(response=>response.data);
    },
    updatePaymet(data:any){
        return api.put('/finans/islemler/tahsilatKayitDegistirme',data).then(response=>response.data);
    },
    deletePayment(id:any){
        return api.delete(`/finans/islemler/tahsilatKayitSilme/${id}`).then(response=>response.data);
    },
    getExcelList(data:any){
        return api.post('/finance/reports/test/excel',data).then(response=>response.data);
    }
}