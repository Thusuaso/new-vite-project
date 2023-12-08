import { api } from '../services/customServices/mekmarWebSiteService';

export const panelService = {
    getNewQueue(category_id:any){
      return api.get(`/panel/mekmarcom/products/new/queue/${category_id}`).then(response=>response.data);  
    },
    getPanelCategoryList() {
        return api.get('/panel/mekmarcom/kategoriList').then(response => response.data);
    },
    getQueueProductsList(category_id:any){
      return api.get(`/panel/mekmarcom/products/queue/${category_id}`).then(response=>response.data);  
    },
    setQueueProducts(data:any){
      return api.post('/panel/mekmarcom/products/queue/save',data).then(response=>response.data);  
    },
    getPanelProductList(category:any) {
        return api.get(`/panelProductList/productKategoriList/${category}`).then(response => response.data);
    },
    getPanelModel() {
        return api.get('/panel/mekmarcom/productDetail/newProduct').then(response => response.data);
    },
    setFinishAdd(data:any) {
        return api.post('/panel/mekmarcom/productDetail/finishDataIslem', data).then(response => response.data);
    },
    setFinishDelete(data: any) {
        return api.put('/panel/mekmarcom/productDetail/finishDataIslem', data).then(response => response.data);
    },
    setSizeAdd(data: any) {
        return api.post('/panel/mekmarcom/productDetail/ebatDataIslem',data).then(response => response.data);
    },
    setSizeDelete(data: any) {
        return api.put('/panel/mekmarcom/productDetail/ebatDataSil', data).then(response => response.data);
    },
    setPhotosAdd(data: any) {
        return api.put('/panel/mekmarcom/fotoEkle', data);
    },
    getPanelDetail(product_id:any){
        return api.get(`/panel/mekmarcom/productDetail/${product_id}`).then(response=>response.data);
    },
    setPanelSave(data: any) {
        return api.post('/panel/mekmarcom/productDetail/VeriKayıt', data).then(response => response.data);
    },
    setPanelUpdate(data: any) {
        return api.put('/panel/mekmarcom/productDetail/VeriKayıt', data).then(response => response.data);
    },
    setPanelDelete(product_id: any) {
        return api.delete(`/panel/mekmarcom/urunSilme/${product_id}`).then(response => response.data);
    },
    deletePanelPhotos(data:any) {
        return api.put('/panel/mekmarcom/fotoIslem/fotoDegisim', data).then(response => response.data);
    },
    setPanelProductChangeQueue(data: any) {
        return api.put('/panel/makmarcom/fotosiradegisim', data).then(response => response.data);
    },
    setSuggestedProducts(data:any){
        return api.post('/panel/mekmarcom/suggested',data).then(response=>response.data);
    },
    setAreasProducts(areaid:any,productid:any,areaname:any){
    
        return api.get(`/panel/mekmarcom/areas/${areaid}/${productid}/${areaname}`).then(response=>response.data);
    },
    setAreasDelete(id:any){
        return api.get(`/panel/mekmarcom/areas/delete/${id}`).then(response=>response.data);
    },
    setFilterSurfaceSave(data:any){
        return api.post('/panel/mekmarcom/surface/filter/save',data).then(response=>response.data);
    },
    setFilterSurfaceDelete(id:any){
        return api.delete(`/panel/mekmarcom/surface/filter/delete/${id}`).then(response=>response.data);
    },

    setFilterStyleSave(data:any){
        return api.post('/panel/mekmarcom/style/filter/save',data).then(response=>response.data);
    },
    setFilterStyleDelete(id:any){
        return api.delete(`/panel/mekmarcom/style/filter/delete/${id}`).then(response=>response.data);
    },

    setFilterEdgeSave(data:any){
        return api.post('/panel/mekmarcom/edge/filter/save',data).then(response=>response.data);
    },
    setFilterEdgeDelete(id:any){
        return api.delete(`/panel/mekmarcom/edge/filter/delete/${id}`).then(response=>response.data);
    },

    setFilterMaterialSave(data:any){
        return api.post('/panel/mekmarcom/material/filter/save',data).then(response=>response.data);
    },
    setFilterMaterialDelete(id:any){
        return api.delete(`/panel/mekmarcom/material/filter/delete/${id}`).then(response=>response.data);
    },

    
    setFilterTypeSave(data:any){
        return api.post('/panel/mekmarcom/type/filter/save',data).then(response=>response.data);
    },
    setFilterTypeDelete(id:any){
        return api.delete(`/panel/mekmarcom/type/filter/delete/${id}`).then(response=>response.data);
    }









}