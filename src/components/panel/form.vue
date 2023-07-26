<template>
    <TabView>
        <TabPanel header="Ürün">
            <div class="row m-auto mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_en">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Kod</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                    </div>
                </div>
                
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getProductModel.yayinla">
                        <label class="form-check-label" for="flexCheckDefault">
                            Yayınla
                        </label>
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col-6">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_en"></textarea>
                        <label for="floatingTextarea2">Açıklama</label>
                    </div>
                </div>
                <div class="col-6">
                    <span class="p-float-label">
                        <Chips id="aciklama" v-model="keyListEn" style="width:350px;height:100px;" />
                        <label for="aciklama">Anahtarlar</label>
                    </span>
                </div>
            </div>
            <div class="row m-auto mt-4">
                
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Sıra</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.sira">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Birim</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Tedarikçi</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.tedarikciadi">
                    </div>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="category" v-model="selectedCategoryEn" :options="getProductCategoryList" optionLabel="kategoriadi_en" class="w-100" @change="categoryEnSelected($event)"/>
                        <label for="category">Kategori</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="color" v-model="selectedColorEn" :options="getProductColorEnList" optionLabel="name" class="w-100" @change="colorEnSelected($event)"/>
                        <label for="color">Renk</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="stoneType" v-model="selectedStoneType" :options="getProductCategoryList" optionLabel="kategoriadi_en" class="w-100" @change="stoneTypeSelected($event)"/>
                        <label for="stoneType">Taş Türü</label>
                    </span>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Ürün (Fr)">
                <div class="row m-auto mt-3">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_fr">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Kod</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-3">
                    <div class="col-6">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_fr"></textarea>
                            <label for="floatingTextarea2">Açıklama</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <span class="p-float-label">
                            <Chips id="aciklama" v-model="keyListFr" style="width:350px;height:100px;" />
                            <label for="aciklama">Anahtarlar</label>
                        </span>
                    </div>
                </div>
                <div class="row m-auto mt-4">
                
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Sıra</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.sira">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Birim</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tedarikçi</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.tedarikciadi">
                        </div>
                    </div>
                    <div class="col">
                        <span class="p-float-label">
                            <Dropdown id="color" v-model="selectedColorFr" :options="getProductColorFrList" optionLabel="name" class="w-100" @change="colorFrSelected($event)"/>
                            <label for="color">Renk</label>
                        </span>
                    </div>
                </div>
        </TabPanel>
        <TabPanel header="Ürün (Es)">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_es">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kod</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                            </div>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col-6">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_es"></textarea>
                                <label for="floatingTextarea2">Açıklama</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <span class="p-float-label">
                                <Chips id="aciklama" v-model="keyListEs" style="width:350px;height:100px;" />
                                <label for="aciklama">Anahtarlar</label>
                            </span>
                        </div>
                    </div>
                    <div class="row m-auto mt-4">
                
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Sıra</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.sira">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Birim</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Tedarikçi</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.tedarikciadi">
                            </div>
                        </div>
                        <div class="col">
                            <span class="p-float-label">
                                <Dropdown id="color" v-model="selectedColorEs" :options="getProductColorEsList" optionLabel="name" class="w-100" @change="colorEsSelected($event)"/>
                                <label for="color">Renk</label>
                            </span>
                        </div>
                    </div>
        </TabPanel>
        <TabPanel header="Diğer">
            <div class="row m-auto mt-3">
                <div class="col-6">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <span class="p-float-label">
                                <AutoComplete id="finish" v-model="selectedFinish" dropdown :suggestions="filteredProductFinishList" optionLabel="name" @complete="searchFinish($event)" />
                                <label for="finish">Yüzey</label>
                            </span>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success" @click="addFinish">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" @click="deleteFinish">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable 
                                :value="surfaceProductList" 
                                v-model:selection="selectedSurfaceProduct"
                                selectionMode="single"
                                style="font-size:85%;"
                            >
                                <Column field="name" header="Yüzey"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <span class="p-float-label">
                                <AutoComplete id="size" v-model="selectedSize" dropdown :suggestions="filteredProductSizeList" optionLabel="name" @complete="searchSize($event)" />
                                <label for="size">Ebat</label>
                            </span>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Fiyat</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="sizePrice" @input="sizePrice = $filters.formatPoint($event.target.value)">
                            </div>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success" @click="addSize" :disabled="edge_add_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger" @click="deleteSize" :disabled="edge_delete_disabled">Sil</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-warning" @click="newSize" :disabled="edge_new_disabled">Yeni</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="sizeProductList"
                                v-model:selection="selectedSizeProduct"
                                selectionMode="single"
                                style="font-size:85%;"
                            >
                                <Column field="ebat" header="Ebat"></Column>
                                <Column field="fiyat" header="Fiyat"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            

        </TabPanel>
        <TabPanel header="Suggested" v-if="!getPanelProductNewButton">
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-primary" @click="addSuggested">Ekle</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger" @click="deleteSuggested">Sil</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-success" @click="saveSuggested">Kaydet</button>
                </div>
            </div>
            <div class="row m-auto mt-3"  >
                <div class="col">
                    <DataTable 
                            :value="notSuggestedList" 
                            v-model:selection="selectedNotSuggested"
                            selectionMode="single"
                            style="font-size:85%;"
                        >
                        <Column field="id" header="Id"></Column>
                        <Column field="urunadi_en" header="Ürün"></Column>
                        <Column header="Foto">
                            <template #body="slotProps">
                                <img :href="slotProps.data.foto" width="100" height="100"/>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <div class="col">
                    <DataTable 
                            :value="suggestedList" 
                            v-model:selection="selectedSuggested"
                            selectionMode="single"
                            style="font-size:85%;"
                        >
                        <Column field="code" header="Code"></Column>
                        <Column field="name" header="Name"></Column>
                        <Column field="category" header="Category"></Column>
                    </DataTable>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Fotolar">
            <div class="row m-auto mt-3">
                <div class="col" >
                    <div class="containerRestriction" style="text-align:center;margin-left:80px;">
                        <Galleria :value="getProductPhotoList" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px"
                            :circular="true" :autoPlay="true" :transitionInterval="2000">
                            <template #item="slotProps">
                            <img :src="slotProps.item.nocdn" style="width: 100%;height:350px; display: block;" />
                            </template>
                            <template #thumbnail="slotProps">
                            <img :src="slotProps.item.nocdn" style="display: block;" />
                            </template>
                        </Galleria>
                    </div>
                </div>
                <div class="col">
                    <FileUpload mode="basic" @select="sendPhotos($event)" v-model="file" :maxFileSize="5000000" :multiple="true"  />
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Test Raporu">
            <div class="row m-auto mt-3">
                <div class="col">
                    <FileUpload mode="basic" :multiple="true" v-model="testfile" chooseLabel="Test Rapor Gönder" @select="sendTestReport" />
                </div>
                <div class="col">
                    <a ref="testRapor" style="display:none;" class="p-button-primary" :disabled="!getProductModel.testrapor" :href="this.getProductModel.testrapor"
                        target="_blank">Görüntüle</a>
                    <button type=button class="btn btn-primary" @click="this.$refs.testRapor.click()">Test Rapor Görüntüle</button>
                </div>
            </div>
        </TabPanel>
    </TabView>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="process">Kaydet</button>
        </div>
    </div>
</template>
<script>
import { usePanelStore } from '../../stores/panel';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { panelService } from '../../services/panelService';
import { spaceService } from '../../services/spaceService';
export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProductNewButton',
            'getProductModel',
            'getProductCategoryList',
            'getProductFinishList',
            'getProductSizeList',
            'getProductSuggestedProductList',
            'getProductSuggestedProductsList',
            'getProductPhotoList',
            'getProductColorEnList',
            'getProductColorFrList',
            'getProductColorEsList',
        ])
    },
    data() {
        return {
            responsiveOptions: [
                {
                    breakpoint: '1024px',
                    numVisible: 3,
                    numScroll: 3
                },
                {
                    breakpoint: '600px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '480px',
                    numVisible: 1,
                    numScroll: 1
                }
            ],
            keyListEn: [],
            keyListFr: [],
            keyListEs: [],
            selectedCategoryEn: {},
            selectedColorEn: {},
            selectedColorFr: {},
            selectedColorEs: {},
            selectedStoneType: {},
            selectedFinish: null,
            filteredProductFinishList: [],
            surfaceProductList: [],
            selectedSurfaceProduct: {},
            selectedSize: null,
            filteredProductSizeList: [],
            sizePrice: 0,
            edge_add_disabled: false,
            edge_delete_disabled: true,
            edge_new_disabled: true,
            sizeProductList: [],
            selectedSizeProduct: {},
            notSuggestedList: [],
            suggestedList: [],
            selectedNotSuggested: {},
            selectedSuggested: {},
            
        }
    },
    created() {
        if (!this.getPanelProductNewButton) {
            this.panelCreatedProcess();
        };
        this.notSuggestedList = this.getProductSuggestedProductsList;
    },
    methods: {
        sendTestReport(){
            if (!this.testfile) {
                alert("Rapor seçmeniz gerekiyor.");
                return;
            };
            let formData = new FormData();
            formData.append("file", this.testfile);
            spaceService.sendTestReport(formData).then((res) => {
                if (res.status) {
                    const product = {
                        urunid: this.urunDetay.urunid,
                        testrapor:
                            "https://mekmar-image.fra1.digitaloceanspaces.com/test-reports/" +
                            this.testfile.name
                    };
                    mekmarService.testRaporDataGuncelle(product).then((data) => {
                        if (data.status) {
                            this.getProductModel.testrapor = product.testrapor;
                        };
                    });
                }
            });
        },
        sendPhotos(event) {
            let photos = [];
            for (let key in event.files) {
                photos.push(event.files[key].name);
            };
            panelService.setPhotosAdd(photos).then((res) => {
                if (res) {
                    for (let key in event.files) {
                        digitalOceanService.fotoGonder(event.files[key]);
                    }
                    this.$toast.add({ severity: 'success', detail: 'Fotoğraflar başarıyla kaydedildi.', life: 3000 })
                };
            });
        },
        findIndex(value, data) {
            let index = 0;
            for (const item of data) {
                if (item.id == value) {
                    return index;
                } else {
                    index += 1;
                };
            };
        },
        deleteSuggested() {
            const index = this.findIndex(this.selectedSuggested.urunid, this.suggestedList);
            this.selectedNotSuggested.push(this.selectedSuggested);
            this.suggestedList.splice(index, 1);
        },
        addSuggested() {
            const index = this.findIndex(this.selectedNotSuggested.urunid, this.notSuggestedList);
            this.suggestedList.push(this.selectedNotSuggested);
            this.notSuggestedList.splice(index, 1);
        },
        deleteSize() {
            const sizeData = {
                urunid: this.getProductModel.urunid,
                id: this.selectedSizeProduct.id,
            };
            panelService.setSizeDelete(sizeData).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        },
        newSize() {
            this.edge_add_disabled = false;
            this.edge_new_disabled = true;
        },
        addSize() {
            const sizeData = {
                urunid: this.getProductModel.urunid,
                ebat: this.selectedSize.name,
                fiyat: this.sizePrice,
                birim: this.getProductModel.birim,
            };
            panelService.setSizeAdd(sizeData).then(data => {
                if (data.status) {
                    this.edge_add_disabled = true;
                    this.edge_new_disabled = false;
                    this.sizePrice = 0;
                    this.selectedSize = null;
                    this.sizeProductList = data.ebatlist;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'danger', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            });
            
        },
        searchSize(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getProductSizeList;
            } else {
                result = this.getProductSizeList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.length);
                });
            };
            this.filteredProductSizeList = result;
        },
        deleteFinish() {
            const finishData = {
                'id': this.selectedSurfaceProduct.id,
                'urunid': this.getProductModel.urunid,
            };
            panelService.setFinishDelete(finishData).then(data => {
                if (data.status) {
                    this.surfaceProductList = data.finishlist;
                    this.selectedFinish = null;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 300 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 300 });
                };
            });
        },
        addFinish() {
            const finishData = {
                'islemadi': this.selectedFinish.name,
                'dil': "en",
                'kategori_id': this.getProductModel.kategori_id,
                'urunid': this.getProductModel.urunid,
            };
            useLoadingStore().begin_loading_act();
            panelService.setFinishAdd(finishData).then(data => {
                if (data.status) {
                    this.surfaceProductList = data.finishlist;
                    this.selectedFinish = null;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 300 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 300 });
                }
                
            })
        },
        searchFinish(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getProductFinishList;
            } else {
                result = this.getProductFinishList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredProductFinishList = result;
        },
        stoneTypeSelected(event) {
            this.getProductModel.stonetype = event.value.kategori_id;
        },
        colorEsSelected(event) {
            this.getProductModel.renk_es = event.value.name;
        },
        colorFrSelected(event) {
            this.getProductModel.renk_fr = event.value.name;
        },
        colorEnSelected(event) {
            this.getProductModel.renk_en = event.value.name;
        },
        categoryEnSelected(event) {
            this.getProductModel.kategori_id = event.value.kategori_id;
            this.getProductModel.kategoriadi = event.value.kategoriadi_en;

        },
        panelCreatedProcess() {
            this.keyListEn = this.__noneControl(this.getProductModel.anahtarlar_en);   
            this.keyListFr = this.__noneControl(this.getProductModel.anahtarlar_fr);
            this.keyListEs = this.__noneControl(this.getProductModel.anahtarlar_es);
            this.selectedCategoryEn = this.getProductCategoryList.find(x => x.kategori_id == this.getProductModel.kategori_id);
            this.selectedColorEn = this.getProductColorEnList.find(x => x.name == this.getProductModel.renk_en);
            this.selectedStoneType = this.getProductCategoryList.find(x => x.kategori_id == this.getProductModel.stonetype);
        },
        __noneControl(value){
            if (value == null || value == '' || value == ' ') {
                console.log('1');
            } else {
                return value.split(',');
            }
        },
        update() {

        },
        save() {
            this.getProductModel.anahtarlar_en = this.keyListEn.join();
            this.getProductModel.anahtarlar_fr = this.keyListFr.join();
            this.getProductModel.anahtarlar_es = this.keyListEs.join();
        },
        process() {
            if (this.getPanelProductNewButton) {
                this.save();
            } else {
                this.update();
            }
        }
    }
}
</script>
<style scoped>

</style>