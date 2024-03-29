import { api } from '../services/customServices/doctorService';

export const reportsService = {
    getMekmarNewList(year:any){
      return api.get(`/raporlar/listeler/yukleme/yeni/${year}`).then(response=>response.data);
    },
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
    },
    //Panel Project
    getProjectList() {
        return api.get('/mekmarcom/project/list').then(response => response.data);
    },
    getProjectDetail(id: any) {
        return api.get(`/mekmarcom/project/detail/${id}`).then(response => response.data);
    },
    getNewProjectModel() {
        return api.get('/mekmarcom/project/model').then(response => response.data);
    },
    setNewProject(data: any) {
        return api.post('/mekmarcom/projec/save',data).then(response => response.data);
    },
    deleteProjectPhotos(data: any) {
        return api.post('/mekmarcom/project/delete', data).then(response => response.data);
    },
    addProjectPhotosServer(data: any) {
        return api.post('/mekmarcom/project/addPhotos', data).then(response => response.data);
    },
    addVideo(data: any) {
        return api.post('/mekmarcom/project/addVideo', data).then(response => response.data);
    },
    addInformation(data: any) {
        return api.post('/mekmarcom/project/information', data).then(response => response.data);
    },
    updateInformation(data: any) {
        return api.put('/mekmarcom/project/information', data).then(response => response.data);
    },
    getSuggestedProjects(id:any) {
        return api.get(`/mekmarcom/project/list/all/${id}`).then(response => response.data);
    },
    setSuggestedProjects(data: any) {
        return api.post('/mekmarcom/project/suggested/send', data).then(response => response.data);
    },
    setProjectQueue(data: any) {
        return api.post('/mekmarcom/project/queue', data).then(response => response.data);
    },
    getMekmarComCustomersList() {
        return api.get('/mekmarcom/listeler/musteriListesi').then(response => response.data);
    },
    getYeniMusteriDetay() {
        return api.get('/mekmarcom/listeler/yeniMusteriDetayModel').then(response => response.data);
    },
    musteriSil(id:any) {
        return api.delete(`/mekmarcom/islemler/musteriSil/${id}`).then(response => response.data);
    },
    yeniMusteriKaydet(data: any) {
        return api.post('/mekmarcom/islemler/musteriIslem', data).then(response => response.data);
    },
    musteriGuncelle(data: any) {
        return api.put('mekmarcom/islemler/musteriIslem', data).then(response => response.data);
    },
    setProjectPhotosPython(data: any) {
        return api.post('/panel/project/python/photos/upload', data).then(response => response.data);
    },
    setProjectMainPhotos(data:any){
        return api.post('/panel/projec/main/photos',data).then(response=>response.data);
    },
    setProjectMainPhotosChange(data:any){
        return api.post('/panel/project/main/photos/change',data).then(response=>response.data);
    },
    getCreateSizeList(){
        return api.get('/seleksiyon/islemler/kasa/olculer').then(response=>response.data);
    },
    setCreateSizeSave(data:any){
        return api.post('/seleksiyon/islemler/kasa/olculer/save',data).then(response=>response.data);
    },
    setCreateSizeUpdate(data:any){
        return api.put('/seleksiyon/islemler/kasa/olculer/save',data).then(response=>response.data);
    },
    setCreateSizeDelete(id:any){
        return api.delete(`/seleksiyon/islemler/kasa/olculer/delete/${id}`).then(response=>response.data);
    },
    getStokExcelList(data:any){
        return api.post('/raporlar/listeler/stokRaporExcelListe',data).then(response=>response.data);
    },
    setProjectPhotosQueueChange(data:any){
        return api.post('/panel/project/photos/queue/change',data).then(response=>response.data);
    },
    setProjectProductName(data:any){
        return api.post('/panel/project/product/name/change',data).then(response=>response.data);
    },
    getMekmarNewListDetail(customer_id:any,year:any){
        return api.get(`panel/raporlar/mekmar/new/list/detail/${customer_id}/${year}`).then(response=>response.data);
    },
    getMekmarLoadingNewCustomerExcelOutput(data:any){
        return api.post('/raporlar/loading/new/customer/excel',data).then(response=>response.data);
    },
    getMekmarLoadingNewCustomerDetailExcelOutput(data:any){
        return api.post('/raporlar/loading/new/customer/detail/excel',data).then(response=>response.data);
    },
    getMekmarForwardingReportsQuarter(year:any,year2:any){
        return api.get(`/raporlar/forwarding/reports/quarter/${year}/${year2}`).then(response=>response.data);
    }


}