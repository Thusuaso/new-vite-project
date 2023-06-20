import { api } from "./customServices/doctorService";

export const financeService = {
    getFinanceList(year:any) {
        return api.get(`/finans/listeler/konteynerAnaListe/${year}`).then(response => response.data);
    },
    getFinanceCollectionList(year: any,month: any) {
        return api.get(`/finans/listeler/musteriOdemeListesi/${year}/${month}`).then(response => response.data);
    },
    getFinanceCollectionYearList() {
        return api.get('/finans/listeler/musteriOdemeYilListesi').then(response => response.data);
    },
    getFinanceCollectionMonthList(year: any) {
        return api.get(`/finans/listeler/musteriOdemeAyListesi/${year}`).then(response => response.data);
    },
    getAdvancedPaymentList() {
        return api.get('/finans/listeler/pesinatIslemListesi').then(response => response.data);
    },
    getCurrency(year: any, month: any, day: any) {
        return api.get(`/listeler/DovizListe/${year}/${month}/${day}`).then(response => response.data);
    },
    setCurrencySave(data:any) {
        return api.get('/finans/listeler/pesinatIslemListesi', data).then(response => response.data);
    },
    getFinanceDetailList(customerId:any) {
        return api.get(`/finans/listeler/konteynerAyrintiList/${customerId}`).then(response => response.data);
    },
    getFinanceDetailCollectionList(customerId:any, po:any) {
        return api.get(`/finans/listeler/musteriTahsilatListe/${customerId}/${po}`).then(response => response.data);
    },
    setFinanceDetailCollectionSave(data: any) {
        return api.post('/finans/islemler/tahsilatKayitDegistirme', data).then(response => response.data);
    },
    setFinanceDetailCollectionUpdate(data: any) {
        return api.put('/finans/islemler/tahsilatKayitDegistirme', data).then(response => response.data);
    },
    setFinanceDetailCollectionDelete(id: any) {
        return api.delete(`/finans/islemler/tahsilatKayitSilme/${id}`).then(response => response.data);
    },
    getFinanceDateDetailList(customer: any, date: any) {
        return api.get(`/finans/listeler/odemeSecimList/${customer}/${date}`).then(response => response.data);
    },
    getFinanceExcelList(data: any) {
        return api.post('/finans/dosyalar/konteynerExcelCikti', data).then(response => response.data);
    },
    getWarehouseExcelList(data: any) {
        return api.post('/finans/dosyalar/depoExcelCikti', data).then(response => response.data);
    }
}