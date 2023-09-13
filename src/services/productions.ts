import { api } from '@/services/customServices/doctorService';

export const productionsService = {

    saveProductions(data:any) {
        return api.post('/siparis/kayitIslem', data).then(response => response.data);
    },
    updateProductions(data: any) {
        return api.put('/siparis/kayitIslem', data).then(response => response.data);
    },
    getOrderList(orderStatus: any, orderYear: any) {
        return api.get(`/siparisler/${orderStatus}/${orderYear}`).then(response => response.data);
    },
    getOrderListOther() {
        return api.get('/siparisler/sevk/diger').then(response => response.data);  
    },
    getOrderDetail(po: any) {
        return api.get(`/siparis/siparisGirisModel/${po}`).then(response => response.data);
    },
    getOrderDetailModel() {
        return api.get('/siparis/siparisGirisModel').then(response => response.data);
    },
    saveProforma(data:any) {
        return api.post('/islemler/evrak/evrakFaturaModel',data).then(response=>response.data)
    },
    getWorkmanshipList(orderNo: any, productId: any) {
        return api.get(`/raporlar/iscilikList/${orderNo}/${productId}`).then(response => response.data);
    },
    getWorkmanshipModel() {
        return api.get('/siparis/iscilikIslem').then(response => response.data);
    },
    workmanshipSave(data:any) {
        return api.post('/siparis/iscilikIslem',data).then(response => response.data);
    },
    workmanshipUpdate(data:any) {
        return api.put('/siparis/iscilikIslem',data).then(response => response.data);
    },
    workmanshipDelete(id: any) {
        return api.delete(`/siparis/iscilikIslem/kayitSil/${id}`).then(response => response.data);
    },
    getProductExcelList(data: any) {
        return api.post('/siparisler/dosyalar/uretimExcelCikti', data).then(response => response.data);
    },
    getCheckExcellist(data: any) {
        return api.post('/excel/listeler/siparisCekiListesi', data).then(response => response.data);
    },
    getSupplierIsfExcelList(data: any) {
        return api.post('/siparisler/dosyalar/IcSiparisExcelCikti', data).then(response => response.data);
    },
    getProductRemainingExcelList(data: any) {
        return api.post('/raporlar/listeler/sipKalanListesiExcell', data).then(response => response.data);
    },
    sendChatsMail(data: any) {
        return api.post('/kontroller/chatIslem', data).then(response => response.data);
    },
    setIcSiparisDosyaKayit(icsiparis:any) {
        return api
        .post("/islemler/tedarikci/icsiparis/IcSiparisDosyaKaydet", icsiparis)
        .then((response) => response.data);
    },
    setIcSiparisKayit(item:any) {
    return api
      .post("/islemler/tedarikci/icsiparisKaydet", item)
      .then((response) => response.data);
    },
getIcSiparisExcelListesi(data_list:any) {
    return api
      .post("/siparisler/dosyalar/IcSiparisExcelCikti", data_list)
      .then(response=>response.data);
    },
  getTedarikciPDFCikti(data_list:any) {
    return api
      .post("/islemler/dosyalar/pdfciktim", data_list)
      .then(response=>response.data);
    },
    getTedarikciUrunAyrintiListYukle(po:any) {
    return api
      .get("tedarikci/listeler/tedarikciurun/" + po)
      .then((res) => res.data);
    },
      getSiparicIcSiparis() {
    return api
      .get("tedarikci/icsiparisformu/listeler")
      .then((res) => res.data);
    },
    getProformaControl(po: any) {
        return api.get(`/controls/proforma/${po}`).then(response => response.data);
    },
    getIsfControl(supplier_id: any,po:any) {
        return api.get(`/listeler/tedarikciDeleteFormKontrol/${supplier_id}/${po}`).then(response => response.data);
    },
    setDivideProduction(data: any) {
        return api.post('/siparis/siparisBolmeGuncelleme', data).then(response => response.data);
    },
    getUsersList() {
        return api.get('/listeler/kullaniciList').then(response => response.data);
    },
    deleteProforma(po: any) {
        return api.get(`/siparis/delete/proforma/${po}`).then(response => response.data);
    },
    getSupplierList() {
        return api.get('/siparis/supplier/list').then(response => response.data);
    }
}