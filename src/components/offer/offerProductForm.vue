<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <span class="p-float-label">
                    <Calendar id="p_date" v-model="p_date" showIcon @date-select="productDateSelected($event)" dateFormat="dd/mm/yy"/>
                    <label for="p_date">Tarih</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedCategory" :suggestions="filteredOfferCategoryList" optionLabel="name" @complete="offerCategorySearch($event)" @item-select="offerCategorySelected($event)" @input="offerCategoryInput($event)"/>
                    <label for="category">Kategori</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedProduct" :suggestions="filteredOfferProductList" optionLabel="name" @complete="offerProductSearch($event)" @item-select="offerProductSelected($event)" @input="offerProductInput($event)"/>
                    <label for="category">Ürün</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedSize" :suggestions="filteredOfferSizeList" optionLabel="name" @complete="offerSizeSearch($event)" @item-select="offerSizeSelected($event)" />
                    <label for="category">EnxBoy</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedEdge" :suggestions="filteredOfferEdgeList" optionLabel="name" @complete="offerEdgeSearch($event)" @item-select="offerEdgeSelected($event)" @input="offerEdgeInput($event)"/>
                    <label for="category">Kalınlık</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedSurface" :suggestions="filteredOfferSurfaceList" optionLabel="name" @complete="offerSurfaceSearch($event)" @item-select="offerSurfaceSelected($event)" @input="offerSurfaceInput($event)"/>
                    <label for="category">Yüzey</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Dropdown id="unit" v-model="selectedUnit" :options="units" optionLabel="name" class="w-full md:w-14rem" @change="unitSelected($event)"/>
                    <label for="unit">Birim</label>
                </span>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fob</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.fobFiyat" @input="product.fobFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fca</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.fcaFiyat" @input="product.fcaFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">C</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.cFiyat" @input="product.cFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">D</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.dFiyat" @input="product.dFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <button type="button" class="btn btn-success" @click="add">Ekle</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-warning" @click="update">Güncelle</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-danger" @click="deleteForm">Sil</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-secondary" @click="cancel">Vazgeç</button>
            </div>
            <div class="col">
              <button type="button" @click="addEnBoy" class="btn btn-primary">EnxBoy Ekle</button>
              <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" :dismissable="true" style="width: 500px">
                <div class="grid" style="text-align:center;">
                  <div class="col">
                  <InputText v-model="en" placeholder="En" @input="isEn"></InputText>

                  </div>
                  <div class="col"> 
                  <InputText v-model="boy" placeholder="Boy" @input="isBoy"></InputText>

                  </div>
                  <div class="col">
                  <button type="button" class="btn btn-success" @click="addEbat" :disabled="isEnBoyButton">Kaydet</button>

                  </div>
                </div>
              </OverlayPanel>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col-9">
                <DataTable 
                        :value="getOfferProductsList" 
                        style="font-size:85%;"
                        v-model:selection="selectedProductList"
                        selectionMode="single"
                        @row-click="productListSelected($event)"
                    >
                    <Column field="tarih" header="Tarih"></Column>
                    <Column field="kategoriAdi" header="Kategori"></Column>
                    <Column field="urunAdi" header="Ürün"></Column>
                    <Column field="yuzeyIslem" header="Yüzey"></Column>
                    <Column field="enBoy" header="EnxBoy"></Column>
                    <Column field="kalinlik" header="Kalınlık"></Column>
                    <Column field="fobFiyat" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fobFiyat) }}
                        </template>
                    </Column>
                    <Column field="fcaFiyat" header="Fca">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fcaFiyat) }}
                        </template>
                    </Column>
                    <Column field="cFiyat" header="C">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.cFiyat) }}
                        </template>
                    </Column>
                    <Column field="dFiyat" header="D">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.dFiyat) }}
                        </template>
                    </Column>
                    <Column field="birim" header="Birim"></Column>
                </DataTable>
            </div>
            <div class="col-3">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getOfferModelList.goruldu">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Görüldü
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getOfferModelList.blist">
                                <label class="form-check-label" for="flexCheckDefault">
                                    B Liste
                                </label>
                            </div>
                        </div>

                    </div>
            
            
            </div>
        </div>
    </div>
    <div v-if="getMobile">
            <div class=" m-auto mt-3">
            <div class="">
                <span class="p-float-label w-100">
                    <Calendar class="w-100 mb-3"  id="p_date" v-model="p_date" showIcon @date-select="productDateSelected($event)" dateFormat="dd/mm/yy"/>
                    <label for="p_date">Tarih</label>
                </span>
            </div>
            <div class="w-100" style="width:100%;">
                <span class="p-float-label w-100" style="width:100%;">
                    <AutoComplete class="w-100 mb-3" id="category" style="width:100%;" v-model="selectedCategory" :suggestions="filteredOfferCategoryList" optionLabel="name" @complete="offerCategorySearch($event)" @item-select="offerCategorySelected($event)" />
                    <label for="category">Kategori</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <AutoComplete class="w-100 mb-3" id="category" v-model="selectedProduct" :suggestions="filteredOfferProductList" optionLabel="name" @complete="offerProductSearch($event)" @item-select="offerProductSelected($event)" />
                    <label for="category">Ürün</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <AutoComplete class="w-100 mb-3" id="category" v-model="selectedSize" :suggestions="filteredOfferSizeList" optionLabel="name" @complete="offerSizeSearch($event)" @item-select="offerSizeSelected($event)" />
                    <label for="category">EnxBoy</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <AutoComplete class="w-100 mb-3" id="category" v-model="selectedEdge" :suggestions="filteredOfferEdgeList" optionLabel="name" @complete="offerEdgeSearch($event)" @item-select="offerEdgeSelected($event)" />
                    <label for="category">Kalınlık</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <AutoComplete class="w-100 mb-3" id="category" v-model="selectedSurface" :suggestions="filteredOfferSurfaceList" optionLabel="name" @complete="offerSurfaceSearch($event)" @item-select="offerSurfaceSelected($event)" />
                    <label for="category">Yüzey</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <Dropdown  id="unit" v-model="selectedUnit" :options="units" optionLabel="name" class="w-100 mb-3" @change="unitSelected($event)"/>
                    <label for="unit">Birim</label>
                </span>
            </div>
        </div>
        <div class=" m-auto mt-3">
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fob</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.fobFiyat" @input="product.fobFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fca</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.fcaFiyat" @input="product.fcaFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">C</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.cFiyat" @input="product.cFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">D</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="product.dFiyat" @input="product.dFiyat = $filters.formatPoint($event.target.value)">
                </div>
            </div>
        </div>
        <div class=" m-auto mt-3">
            <div class="mb-3">
                <button type="button" class="btn btn-success w-100" @click="add">Ekle</button>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-warning w-100" @click="update">Güncelle</button>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-danger w-100" @click="deleteForm">Sil</button>
            </div>
            <div class="mb-3">
                <button type="button" class="btn btn-secondary w-100" @click="cancel">Vazgeç</button>
            </div>
            <div class="">
              <button type="button" @click="addEnBoy" class="btn btn-primary w-100">EnxBoy Ekle</button>
              <OverlayPanel ref="op" appendTo="body" :showCloseIcon="true" :dismissable="true" style="width: 500px">
                <div class="" style="text-align:center;">
                  <div class="">
                  <InputText v-model="en" placeholder="En" @input="isEn"></InputText>

                  </div>
                  <div class=""> 
                  <InputText v-model="boy" placeholder="Boy" @input="isBoy"></InputText>

                  </div>
                  <div class="">
                  <button type="button" class="btn btn-success" @click="addEbat" :disabled="isEnBoyButton">Kaydet</button>

                  </div>
                </div>
              </OverlayPanel>
            </div>
        </div>
        <div class=" m-auto mt-3">
            <div class="">
                <DataTable 
                        :value="getOfferProductsList" 
                        style="font-size:85%;"
                        v-model:selection="selectedProductList"
                        selectionMode="single"
                        @row-click="productListSelected($event)"
                    >
                    <Column field="tarih" header="Tarih"></Column>
                    <Column field="kategoriAdi" header="Kategori"></Column>
                    <Column field="urunAdi" header="Ürün"></Column>
                    <Column field="yuzeyIslem" header="Yüzey"></Column>
                    <Column field="enBoy" header="EnxBoy"></Column>
                    <Column field="kalinlik" header="Kalınlık"></Column>
                    <Column field="fobFiyat" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fobFiyat) }}
                        </template>
                    </Column>
                    <Column field="fcaFiyat" header="Fca">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fcaFiyat) }}
                        </template>
                    </Column>
                    <Column field="cFiyat" header="C">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.cFiyat) }}
                        </template>
                    </Column>
                    <Column field="dFiyat" header="D">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.dFiyat) }}
                        </template>
                    </Column>
                    <Column field="birim" header="Birim"></Column>
                </DataTable>
            </div>
            <div class="">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getOfferModelList.goruldu">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Görüldü
                                </label>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getOfferModelList.blist">
                                <label class="form-check-label" for="flexCheckDefault">
                                    B Liste
                                </label>
                            </div>
                        </div>

                    </div>
            
            
            </div>
        </div>
    </div>

    
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { offerService } from '../../services/offerService';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferCategoryList',
            'getOfferProductList',
            'getOfferLengthList',
            'getOfferEdgeList',
            'getOfferSurfaceList',
            'getOfferProductsList',
            'getOfferModelList',
            'getOfferNewButton',
            'getOfferUpdatingProductsList'

        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            isEnBoyButton: false,
            en: "",
            boy:"",
            selectedProductList:{},
            selectedCategory: null,
            filteredOfferCategoryList: [],
            selectedProduct: null,
            filteredOfferProductList: [],
            selectedSize: null,
            filteredOfferSizeList: [],
            selectedEdge: null,
            filteredOfferEdgeList: [],
            selectedSurface: null,
            filteredOfferSurfaceList: [],
            p_date: new Date(),
            selectedUnit: null,
            filteredOfferUnitList: [],
            units: [
                { id: 1, name: "Sqm" },
                { id: 2, name: "Lmt" },
                { id: 3, name: "Pcs" },
                { id: 4, name: "Ton" },
            ],
            productsList: [],
            product: {
                fobFiyat: 0,
                fcaFiyat: 0,
                cFiyat: 0,
                dFiyat: 0,
                tarih: 0,
                kategoriAdi: "",
                kategoriId: 0,
                urunAdi: "",
                urunId: 0,
                enBoy: "",
                enBoyId: 0,
                kalinlik: "",
                kalinlikId: 0,
                yuzeyIslem: "",
                yuzeyIslemId: 0,
                birim: "",
                id: 0,
                teklifFiyat: 0,
                teklifId: 0, 
            }

        }
    },
    created() {

    },
    methods: {
        offerSurfaceInput(event) {
            this.product.yuzeyIslem = event.target._value;
        },
        offerEdgeInput(event) {
            this.product.kalinlik = event.target._value;
        },
        offerCategoryInput(event){
            this.product.kategoriAdi = event.target._value;
        },
        offerProductInput(event) {
            this.product.urunAdi = event.target._value;
        },
        addEbat() {
            this.isEnBoyButton = true;
            this.$refs.op.hide();
            const datas = {
                olcu: this.en + "x" + this.boy,
            };

            offerService.setEnBoy(datas).then((data) => {
                if (data.status) {
                    this.$toast.add({
                        severity: "success",
                        summary: "Success Message",
                        detail: "Başarıyla Kaydedildi",
                        life: 3000,
                    });
                    useOfferStore().offer_length_list_load_act(data.datas);
                    this.isEnBoyButton = false
                } else {
                    this.$toast.add({
                        severity: "error",
                        summary: "Error Message",
                        detail: "Kaydetme Başarısız",
                        life: 3000,
                    });
                }
            });
        },
        isEn(event) {
            this.en = event.replace(".", ",");
            this.isEnBoyButton = false;
        },
        isBoy(event) {
            this.boy = event.replace(".", ",");
            this.isEnBoyButton = false;
        },
        addEnBoy(event){
            this.$refs.op.toggle(event);
        },
        stringToDateNullControl(value) {
            if (value == null || value == "" || value == "NaN-NaN-NaN") {
                return null;
            } else {
                return localDateService.getStringDate(value);
            }
        },
        productListSelected(event) {
            this.p_date = this.stringToDateNullControl(event.data.tarih);
            this.selectedCategory = this.getOfferCategoryList.find(x => x.id == event.data.kategoriId);
            this.selectedProduct = this.getOfferProductList.find(x => x.id == event.data.urunId);
            this.selectedSize = this.getOfferLengthList.find(x => x.id == event.data.enBoyId);
            this.selectedEdge = this.getOfferEdgeList.find(x => x.id == event.data.kalinlikId);
            this.selectedSurface = this.getOfferSurfaceList.find(x => x.id == event.data.yuzeyIslemId);
            this.selectedUnit = this.units.find(x => x.name == event.data.birim);
            this.product.fobFiyat = event.data.fobFiyat;
            this.product.fcaFiyat = event.data.fcaFiyat;
            this.product.cFiyat = event.data.cFiyat;
            this.product.dFiyat = event.data.dFiyat;


        },
        deleteForm() {
            const index = this.findIndex(this.selectedProductList.id, this.getOfferProductsList);
            useOfferStore().offer_products_deleting_list_load_act(this.getOfferProductsList[index]);

            this.getOfferProductsList.splice(index, 1);
            this.selectedProductList = {};
            this.reset();
        },
        add() {
            this.product.id = this.productsList.length;
            if (this.productsList.length == 0) {
                this.product.id = 1;
            } else {
                const productsLenght = this.productsList.length + 1;
                this.product.id = productsLenght;
            };
            this.product.tarih = localDateService.getDateString(this.p_date);
            this.productsList.push(this.product);
            useOfferStore().offer_products_list_load_act(this.product);
            useOfferStore().offer_products_adding_list_load_act(this.product);

            this.reset();
            
        },
        cancel() {
            this.reset();
            this.selectedProductList = {};
        },
        update() {
            const index = this.findIndex(this.selectedProductList.id, this.getOfferProductsList);
            this.getOfferProductsList[index].tarih = localDateService.getDateString(this.p_date);
            this.getOfferProductsList[index].kategoriId = this.selectedCategory.id;
            this.getOfferProductsList[index].kategoriAdi = this.selectedCategory.name;
            if (this.selectedProduct) {
                this.getOfferProductsList[index].urunId = this.selectedProduct.id;
                this.getOfferProductsList[index].urunAdi = this.selectedProduct.name;
            } else {
                this.getOfferProductsList[index].urunId = 0;
                this.getOfferProductsList[index].urunAdi = "";
            }

            this.getOfferProductsList[index].enBoyId = this.selectedSize.id;
            this.getOfferProductsList[index].enBoy = this.selectedSize.name;
            this.getOfferProductsList[index].kalinlikId = this.selectedEdge.id;
            this.getOfferProductsList[index].kalinlik = this.selectedEdge.name;
            this.getOfferProductsList[index].yuzeyIslemId = this.selectedSurface.id;
            this.getOfferProductsList[index].yuzeyIslem = this.selectedSurface.name;
            this.getOfferProductsList[index].birim = this.selectedUnit.name;
            this.getOfferProductsList[index].fobFiyat = this.product.fobFiyat;
            this.getOfferProductsList[index].fcaFiyat = this.product.fcaFiyat;
            this.getOfferProductsList[index].cFiyat = this.product.cFiyat;
            this.getOfferProductsList[index].dFiyat = this.product.dFiyat;
            useOfferStore().offer_products_updating_list_load_act(this.getOfferProductsList[index]);
            this.reset();
            this.selectedProductList = {};
        },
        reset() {
            this.product = {
                fobFiyat: 0,
                fcaFiyat: 0,
                cFiyat: 0,
                dFiyat: 0,
                tarih: 0,
                kategoriAdi: "",
                kategoriId: 0,
                urunAdi: "",
                urunId: 0,
                enBoy: "",
                enBoyId: 0,
                kalinlik: "",
                kalinlikId: 0,
                yuzeyIslem: "",
                yuzeyIslemId: 0,
                birim: "",
                id: 0,
                teklifFiyat: 0,
                teklifId: 0,
            };
            this.selectedCategory= null;
            this.selectedProduct= null;
            this.selectedSize= null;
            this.selectedEdge= null;
            this.selectedSurface= null;
            this.p_date= new Date();
            this.selectedUnit= null;
        },
        findIndex(value, data) {
            let index = 0;
            for (const item of data) {
                if (item.id == value) {
                    return index;
                } else {
                    index += 1;
                }
            }
        },
        unitSelected(event) {
            this.product.birim = event.value.name;
        },
        productDateSelected(event) {
            this.product.tarih = localDateService.getDateString(event);
        },
        offerSurfaceSelected(event) {
            this.product.yuzeyIslemId = event.value.id;
            this.product.yuzeyIslem = event.value.name;
        },
        offerSurfaceSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferSurfaceList;
            } else {
                result = this.getOfferSurfaceList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferSurfaceList = result;
        },
        offerEdgeSelected(event) {
            this.product.kalinlikId = event.value.id;
            this.product.kalinlik = event.value.name;
        },
        offerEdgeSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferEdgeList;
            } else {
                result = this.getOfferEdgeList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferEdgeList = result;
        },
        offerSizeSelected(event) {
            this.product.enBoyId = event.value.id;
            this.product.enBoy = event.value.name;
        },
        offerSizeSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferLengthList;
            } else {
                result = this.getOfferLengthList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferSizeList = result;
        },
        offerProductSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferProductList;
            } else {
                result = this.getOfferProductList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferProductList = result;
        },
        offerProductSelected(event) {
            this.product.urunId = event.value.id;
            this.product.urunAdi = event.value.name;
        },
        offerCategorySearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferCategoryList;
            } else {
                result = this.getOfferCategoryList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferCategoryList = result;
        },
        offerCategorySelected(event) {
            this.product.kategoriId = event.value.id;
            this.product.kategoriAdi = event.value.name;

        }
    }
}
</script>
<style scoped>

</style>