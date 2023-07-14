import { api } from '../services/customServices/doctorService';

export const reportsService = {

    getMekmerProductionsListYear(year:any) {
        return api.get(`/raporlar/listeler/uretim/yil/${year}`).then(response => response.data);
    },
    getMekmerProductionsDateRange(first: any, last: any) {
        return api.get(`/raporlar/listeler/uretimRaporIkiTarih/${first}/${last}`).then(response => response.data);
    },
    getMekmerProductionsExcelList(data: any) {
        return api.post('/raporlar/dosyalar/uretimRaporExcelListe',data).then(response => response.data);
    },
    getMekmerStockList() {
        return api.get('/raporlar/listeler/stokRaporuAnaListe').then(response => response.data);
    },
    getMekmerStockListMekmer(supplier: any) {
        return api.get(`/raporlar/listeler/stokRaporuAnaListeFilter/${supplier}`).then(response => response.data);
    },
    getMekmerStockListMekmoz(supplier: any) {
        return api.get(`/raporlar/listeler/stokRaporuAnaListeFilter/${supplier}`).then(response => response.data);
    },
    getMekmerStockListOnlyStock() {
        return api.get('/raporlar/listeler/stokRaporuOnlyMekmer').then(response => response.data);
    },
    getMekmerStockListDetail(data:any) {
        return api.get(`/raporlar/listeler/stokRaporAyrintiHepsi/${data.value.en}/${data.value.boy}/${data.value.kenar}/${data.value.yuzeyIslem}/${data.value.urunAdi}/${data.listStatus}`).then(response => response.data);
    },
    getMekmerStockPricesList() {
        return api.get('/raporlar/listeler/stokRaporuMekmerMekmoz').then(response => response.data);
    },
    getMekmerStockPricesDetailList(product_id:any) {
        return api.get(`/raporlar/listeler/stokRaporuMekmerMekmozAyrinti/${product_id}`).then(response => response.data);
    },
    getMekmerStockPricesOutside() {
        return api.get('/raporlar/listeler/stokRaporuDis').then(response => response.data);
    },
    getMekmerStockPricesOutsideDetail(product_id:any) {
        return api.get(`/raporlar/listeler/stokRaporuDisAyrinti/${product_id}`).then(response => response.data);
    },
    getMekmerStockPricesMekmerOutside() {
        return api.get('/raporlar/listeler/stokRaporuDisMekmardaOlanlar').then(response => response.data);
    },
    getMekmerStockPricesMekmerOutsideDetail(product_id: any) {
        return api.get(`/raporlar/listeler/stokRaporuDisMekmardaOlanAyrinti/${product_id}`).then(response => response.data);
    },
    getMekmerStockPricesExcelOutput(data: any) {
        return api.post('/raporlar/listeler/stokRaporuFiyatli', data).then(response => response.data);
    },
    setMekmerStockPrice(data: any) {
        return api.post('/raporlar/listeler/setAddPrice',data).then(response => response.data);
    },
    getMekmerMineList() {
        return api.get('/raporlar/listeler/ocakListesiRapor').then(response => response.data);
    },
    getMekmerMineExcelOutput(data: any) {
        return api.post('/raporlar/listeler/ocakListesiRaporExcell', data).then(response => response.data);
    },
    getMekmerToBeProducedList() {
        return api.get('/raporlar/listeler/urunlerUretimListesi').then(response => response.data);
    },
    getMekmerToBeProducedDetailList(product_id:any) {
        return api.get(`/raporlar/listeler/urunlerUretimAyrintiListesi/${product_id}`).then(response => response.data);
    },
    getMekmerToBeProducedExcelOutput(data: any) {
        return api.post('/raporlar/listeler/uretilenSipExcelListe', data).then(response => response.data);
    },
    getMekmerAtlantaStockList() {
        return api.get('/raporlar/listeler/atlanta/stoklistesi').then(response => response.data);
    },
    getMekmerAtlantaStockDetailList(sku:any) {
        return api.get(`/raporlar/listeler/atlanta/ayrinti/stoklistesi/${sku}`).then(response => response.data);
    },
    getMekmarAyoYearList() {
        return api.get('/maliyet/listeler/maliyetYilListesi').then(response=>response.data);
    },
    getMekmarAyoMonthList(year:any) {
        return api.get(`/maliyet/listeler/maliyetAyListesi/${year}`).then(response => response.data);
    },
    getMekmarAyoList(year: any, month: any) {
        return api.get(`/maliyet/listeler/maliyetListesi/${year}/${month}`).then(response => response.data);
    },
    getMekmarAyoListAll(year: any) {
        return api.get(`/maliyet/listeler/maliyetListesi/${year}`).then(response => response.data);
    },
    getMekmarAyoDetailList(po: any) {
        return api.get(`/maliyet/ayrinti/listeler/maliyetListesi/${po}`).then(response => response.data);
    },
    getMekmarAyoExcelOutput(data: any) {
        return api.post('/maliyet/dosyalar/maliyetRaporExcelListe', data).then(response => response.data);
    },
    getMekmarLoadingList(year: any, month: any) {
        return api.get(`/raporlar/listeler/yukleme/${year}/${month}`).then(response => response.data);
    },
    getMekmarLoadingYearList() {
        return api.get('/raporlar/listeler/yuklemeYilListesi').then(response => response.data);
    },
    getMekmarLoadingMonthList(year:any) {
        return api.get(`/raporlar/listeler/yuklemeAyListesi/${year}`).then(response => response.data);
    },
    getMekmarLoadingMonthListExcelOutput(data: any) {
        return api.post('/raporlar/listeler/yuklememusExcelCikti', data).then(response => response.data);
    },
    getMekmarLoadingYearListExcelOutput(data: any) {
        return api.post('/raporlar/listeler/yuklemeYilExcelCikti', data).then(response => response.data);
    },
    getMekmarForwardingList(year: any) {
        return api.get(`/raporlar/listeler/sevkiyatRaporHepsiAll/${year}`).then(response => response.data);
    },
    getMekmarForwardingListDate(yearOne: any, yearTwo: any) {
        return api.get(`/raporlar/listeler/sevkiyatRaporIkiTarihAll/${yearOne}/${yearTwo}`).then(response => response.data);
    },
    getMekmarForwardingExcel(data: any) {
        return api.post('/raporlar/dosyalar/sevkiyatRaporExcelListe',data).then(response => response.data);  
    },
    getMekmarOrderSummaryList(username:any) {
        return api.get(`/raporlar/siparis/siparisOzetRaporlar/${username}`).then(response => response.data);
    },
    getMekmarOrderSummaryProductionDetailListNow(month: any) {
        return api.get(`/raporlar/listeler/siparisBuyilAyrinti/${month}`).then(response => response.data);
    },
    getMekmarOrderSummaryProductionDetailListLast(month: any) {
        return api.get(`/raporlar/listeler/siparisGecenAyrinti/${month}`).then(response => response.data);
    },
    getMekmarOrderSummaryProductionDetailListPrevious(month: any) {
        return api.get(`/raporlar/listeler/siparisOncekiyilAyrinti/${month}`).then(response => response.data);
    },
    getMekmarOrderSummaryForwardingDetailListNow(month: any) {
        return api.get(`/raporlar/listeler/sevkiyatBuyilAyrinti/${month}`).then(response => response.data);
    },
    getMekmarOrderSummaryForwardingDetailListLast(month: any) {
        return api.get(`/raporlar/listeler/sevkiyatGecenAyrinti/${month}`).then(response => response.data);
    },
    getMekmarOrderSummaryForwardingDetailListPrevious(month: any) {
        return api.get(`/raporlar/listeler/sevkiyatOncekiyilAyrinti/${month}`).then(response => response.data);
    },
    getMekmarMkList(year: any) {
        return api.get(`raporlar/listeler/mkraporlari/${year}`).then(response => response.data);
    },
    getMekmarMkYearList() {
        return api.get('/raporlar/listeler/yuklemeYilListesi').then(response => response.data);
    },
    getMekmarMkExcelList(data:any) {
        return api.post('/raporlar/listeler/mkraporlari/excel', data).then(response => response.data);
    },
    getMekmarGuList(year: any) {
        return api.get(`/raporlar/listeler/guraporlari/${year}`).then(response => response.data);  
    },
    getMekmarGuYearList() {
        return api.get('/maliyet/listeler/maliyetYilListesi').then(response => response.data);
    },
    getMekmarGuContainerByCountryDetailList(id: any, year: any) {
        return api.get(`/raporlar/mekmarraporlari/ulke/ayrinti/${id}/${year}`).then(response => response.data);
    },
    getMekmarGuContainerByCustomerDetailList(id: any, year: any) {
        return api.get(`/raporlar/mekmarraporlari/musteri/ayrinti/${id}/${year}`).then(response => response.data);
    },
    getMekmarGuContainerBySupplierDetailList(id: any, year:any) {
        return api.get(`/raporlar/mekmarraporlari/tedarikci/ayrinti/${id}/${year}`).then(response => response.data);
    },
    getMekmarToDoList() {
        return api.get('/raporlar/yapilacaklar/list').then(response => response.data);
    },
    getOrderRepresentativeInfo() {
        return api.get('/uretim/satisci/info').then(response => response.data);
    },
    setOrderRepresentativeInfo(po:any,ss:any,op:any) {
        return api.get(`/uretim/satisci/change/${po}/${ss}/${op}`).then(response => response.data);
    }
}