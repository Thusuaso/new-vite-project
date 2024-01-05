import { api } from '@/services/customServices/doctorService';

export const sampleService = {
    getSampleList(year:any) {
        return api.get(`/numuneler/numunelist/${year}`).then(response => response.data);
    },
    getModelList() {
        return api.get('/listeler/numune/numuneFormListeler').then(response => response.data);
    },
    getSampleListDetail(po: any) {
        return api.get(`/numuneler/numunelist/ayrinti/${po}`).then(response => response.data);
    },
    save(data:any) {
        return api.post('/islemler/numune/numuneModel', data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/islemler/numune/numuneModel', data).then(response => response.data);
    },
    sampleExcelOutput(data: any) {
        return api.post('/raporlar/listeler/numuneler/numunePoExcellCikti', data).then(response => response.data);
    },
    financeSave(data: any) {
        return api.post('/numune/finans/islemler/tahsilatKayitDegistirme', data).then(response => response.data);
    },
    setSampleFileSaveFirst(data: any) {
        return api.post('/islemler/numune/numuneDosyaKaydet', data).then(response => response.data);
    },
    setSampleFileSaveSecond(data: any) {
        return api.post('/islemler/numune/numuneDosyaKaydet/arka', data).then(response => response.data);
    },
    getSampleFinanceList(year: any) {
        return api.get(`/numunefinans/listeler/NumuneFinansAnaListe/${year}`).then(response => response.data);
    },
    getSampleFinanceSampleDetailList(customer: any,year:any) {
        return api.get(`/numunefinans/listeler/numuneAyrintiListesi/${customer}/${year}`).then(response => response.data);
    },
    getSampleFinanceBankDetailList(bank: any, year: any) {
        return api.get(`/islemler/numune/bankayagelen/${bank}/${year}`).then(response => response.data);
    },
    getSampleFinanceYearList() {
        return api.get('/islemler/numune/numuneYilListesi').then(response => response.data);
    }

}
