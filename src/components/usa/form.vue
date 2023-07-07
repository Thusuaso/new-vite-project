<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <TabView>
                <TabPanel header="Ürün Bilgileri(En)">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <span class="p-float-label">
                                <AutoComplete id="sku" v-model="selectedSku" :suggestions="filteredUsaSkuList" optionLabel="skuNo" @complete="searchSku($event)" @item-select="skuSelected($event)"/>
                                <label for="sku">Sku</label>
                            </span>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ürün Id</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.id">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ürün Tanım</span>
                                <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="getUsaProductList.product_definition">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating">
                                <textarea class="form-control"  id="floatingTextarea2" style="height: 100px" v-model="getUsaProductList.product_description"></textarea>
                                <label for="floatingTextarea2">Ürün Açıklama</label>
                            </div>
                        </div>
                    </div>
                    <div class="row m-auto mt-2">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kategori</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_category">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kod</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_mekmar_code">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Anahtarlar</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_page_keys">
                            </div>
                        </div>

                    </div>
                    <div class="row m-auto mt-2">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Fiyat</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_mk_price" @input="getUsaProductList.product_mk_price = $filters.formatPoint($event.target.value)">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Yüzey</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_surface">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kenar İşlem</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_edge">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Renk</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_mk_color">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ebat</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_usa_dimension">
                            </div>
                        </div>

                    </div>
                    <div class="row m-auto mt-2">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa Kutu</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_box">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa İçi Adet</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_amount">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa Miktar (sqft)</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_sqft">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa Miktar (M2)</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_m2">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa Detay *</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_detail">
                            </div>
                        </div>

                    </div>
                    <div class="row m-auto mt-2">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kutu Adet</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_amount">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kutu Miktar (sqft)</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_sqft">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kutu Miktar (m2)</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_m2">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kutu Detay *</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_detail">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Max Stock</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_max_stock">
                            </div>
                        </div>
                        <div class="col">
                                    <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getUsaProductList.product_publish">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Yayınla
                                    </label>
                                    </div>
                                </div>

                    </div>
                </TabPanel>
                <TabPanel header="Ürün Bilgileri(Fr)">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_definition_fr">
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-floating">
                                <textarea class="form-control"  id="floatingTextarea2" style="height: 100px" v-model="getUsaProductList.product_description_fr"></textarea>
                                <label for="floatingTextarea2">Ürün Açıklama</label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Yüzey</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_surface_fr">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kenar</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_edge_fr">
                            </div>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Renk</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_color_fr">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Anahtar</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_page_keys_fr">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kasa Detay</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_detail_fr">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kutu Detay</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_detail_fr">
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Ürün Bilgileri(Es)">
                    <div class="row m-auto mt-3">
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_definition_es">
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-floating">
                                    <textarea class="form-control"  id="floatingTextarea2" style="height: 100px" v-model="getUsaProductList.product_description_es"></textarea>
                                    <label for="floatingTextarea2">Ürün Açıklama</label>
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Yüzey</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_surface_es">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Kenar</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_edge_es">
                                </div>
                            </div>
                        </div>
                        <div class="row m-auto mt-3">
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Renk</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_color_es">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Anahtar</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_page_keys_es">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Kasa Detay</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_crate_detail_es">
                                </div>
                            </div>
                            <div class="col">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Kutu Detay</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getUsaProductList.product_box_detail_es">
                                </div>
                            </div>
                            
                        </div>
                </TabPanel>
                <TabPanel header="Ürün Fotoğrafı Ekleme">
                    <FileUpload mode="basic" @select="sendPhoto($event)" v-model="file" :maxFileSize="5000000" :multiple="true" />
                    
                </TabPanel>
                <TabPanel header="Kullanım Alanı">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                        officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="process">Kaydet</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-danger" @click="deleteForm">Sil</button>
        </div>
    </div>
</template>
<script>
import { useUsaStore } from '../../stores/usa';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { usaService } from '../../services/usaService';

import { digitalOceanService } from '../../services/digitalOceanService';


// import { digitalOceanService } from '../../services/digitalOceanService';
export default {
    computed: {
        ...mapState(useUsaStore, [
            'getUsaSkuList',
            'getUsaProductList',
            'getUsaNewButton'
        ])
    },
    data() {
        return {
            selectedSku: null,
            filteredUsaSkuList: [],
            fileControl:false,
        }
    },
    created() {
        if (!this.getUsaNewButton) {
            this.createdProcess();
        }
    },
    methods: {
        update() {
            if (this.getUsaProductList.product_publish == null) {
                this.getUsaProductList.product_publish = 0;
            }
            useLoadingStore().begin_loading_act();
            usaService.update(this.getUsaProductList).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                    useLoadingStore().end_loading_act();
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                    useLoadingStore().end_loading_act();
                }
            })
        },
        save() {
            useLoadingStore().begin_loading_act();
            usaService.save(this.getUsaProductList).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                    useLoadingStore().end_loading_act();
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                    useLoadingStore().end_loading_act();
                }
            })
        },
        process() {
            if (this.getUsaNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        createdProcess() {
            this.selectedSku = this.getUsaSkuList.find(x => x.skuNo == this.getUsaProductList.skuNo);
        },
        sendPhoto(event) {
            let fotoList = [];
            for (let key in event.files) {
                if (event.files[key].name.split('.')[1] != 'jpg') {
                    this.fileControl = true
                    this.$toast.add({ severity: 'error', summary: 'Fotoğraf Kayıt', detail: 'Lütfen dosya uzantısını .jpg olarak değiştirerek deneyiniz.', life: 3000 })
                    break;
                };
            };
            if (!this.fileControl) {
                for (let key in event.files) {
                    fotoList.push({ 'productId': this.getUsaProductList.id, 'image': event.files[key].name, 'webp': event.files[key].name });
                };
            };
            if (!this.fileControl) {
                useLoadingStore().begin_loading_act();

                usaService.addUsaPhotos(fotoList).then((res) => {
                    if (res) {
                        for (let key in event.files) {
                            digitalOceanService.usaSendPhoto(event.files[key]);

                        }
                        useLoadingStore().end_loading_act();

                        this.$toast.add({ severity: 'success', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar başarıyla kaydedildi.', life: 3000 })
                    } else {
                        useLoadingStore().end_loading_act();

                        this.$toast.add({ severity: 'error', summary: 'Fotoğraf Kayıt', detail: 'Fotoğraflar kaydederken hata meydana geldi.', life: 3000 })
                    }
                });
            }
        },
        skuSelected(event) {
            useUsaStore().usa_product_detail_list_load_act(event.data);
        },
        searchSku(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getUsaSkuList;
            } else {
                result = this.getUsaSkuList.filter(x => {
                    return x.skuNo.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredUsaSkuList = result;
        }
    }
}
</script>
<style scoped>

</style>