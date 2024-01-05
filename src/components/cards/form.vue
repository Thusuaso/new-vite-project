<template>
    <br/>
    <div v-if="!getMobile">
            <div class="row">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="category" v-model="selectedCategory" dropdown :suggestions="filteredCategoryList" optionLabel="kategoriAdi" @complete="searchCategory($event)" @item-select="categorySelect($event)"/>
                    <label for="category">Kategori</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="product" v-model="selectedProduct" dropdown :suggestions="filteredProductList" optionLabel="urunAdi" @complete="searchProduct($event)" @item-select="productSelect($event)"/>
                    <label for="product">Ürün</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="surface" v-model="selectedSurface" dropdown :suggestions="filteredSurfaceList" optionLabel="yuzeyIslemAdi" @complete="searchSurface($event)" @item-select="surfaceSelect($event)"/>
                    <label for="surface">Yüzey</label>
                </span>
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="width" v-model="selectedWidth" dropdown :suggestions="filteredWidthList" optionLabel="en" @complete="searchWidth($event)" @item-select="widthSelect($event)"/>
                    <label for="width">En</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="height" v-model="selectedHeight" dropdown :suggestions="filteredHeightList" optionLabel="boy" @complete="searchHeight($event)" @item-select="heightSelect($event)"/>
                    <label for="height">Boy</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="edge" v-model="selectedEdge" dropdown :suggestions="filteredEdgeList" optionLabel="kenar" @complete="searchEdge($event)" @item-select="edgeSelect($event)"/>
                    <label for="edge">Kenar</label>
                </span>
            </div>

        </div>
        <br/>
        <div class="row">
            <div class="col">
                <span class="p-float-label">
        <InputText id="kod" v-model="code" />
        <label for="kod">Kod</label>
    </span>
            </div>
        </div>
        <br/>
        <div class="row m-auto text-center">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="process">Kaydet</button>
            </div>
            <div class="col" v-if="!getCardNewButton">
                <button type="button" class="btn btn-danger w-100" @click="deleteCard" >Sil</button>
            </div>
        </div>
        <div class="row" v-if="getCardCustomerSalesList.length > 0">
            <div class="col">
                <DataTable :value="getCardCustomerSalesList" style="font-size:85%;">
                    <Column field="musteriAdi" header="Müşteri"></Column>
                    <Column field="siparisNo" header="Po"></Column>
                    <Column field="satisFiyati" header="Fiyat">
                        <template #body="slotProps"> 
                            {{ $filters.formatPrice(slotProps.data.satisFiyati) }}
                        </template>
                    </Column>
                    <Column field="miktar" header="Miktar">
                        <template #body="slotProps"> 
                            {{ $filters.formatDecimal(slotProps.data.miktar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatDecimal(cardCustomerTotal) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
        <div v-if="getMobile">
                <div class="">
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="category" v-model="selectedCategory" dropdown :suggestions="filteredCategoryList" optionLabel="kategoriAdi" @complete="searchCategory($event)" @item-select="categorySelect($event)"/>
                        <label for="category">Kategori</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="product" v-model="selectedProduct" dropdown :suggestions="filteredProductList" optionLabel="urunAdi" @complete="searchProduct($event)" @item-select="productSelect($event)"/>
                        <label for="product">Ürün</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="surface" v-model="selectedSurface" dropdown :suggestions="filteredSurfaceList" optionLabel="yuzeyIslemAdi" @complete="searchSurface($event)" @item-select="surfaceSelect($event)"/>
                        <label for="surface">Yüzey</label>
                    </span>
                </div>
            </div>
            <br/>
            <div class="">
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="width" v-model="selectedWidth" dropdown :suggestions="filteredWidthList" optionLabel="en" @complete="searchWidth($event)" @item-select="widthSelect($event)"/>
                        <label for="width">En</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="height" v-model="selectedHeight" dropdown :suggestions="filteredHeightList" optionLabel="boy" @complete="searchHeight($event)" @item-select="heightSelect($event)"/>
                        <label for="height">Boy</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="edge" v-model="selectedEdge" dropdown :suggestions="filteredEdgeList" optionLabel="kenar" @complete="searchEdge($event)" @item-select="edgeSelect($event)"/>
                        <label for="edge">Kenar</label>
                    </span>
                </div>

            </div>
                    <br/>
            <div class="">
                <div class="">
                    <span class="p-float-label">
            <InputText id="kod" v-model="code" />
            <label for="kod">Kod</label>
        </span>
                </div>
            </div>
            <br/>
            <div class=" m-auto text-center">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="process">Kaydet</button>
                </div>
                <div class="" v-if="!getCardNewButton">
                    <button type="button" class="btn btn-danger w-100 mb-3" @click="deleteCard" >Sil</button>
                </div>
            </div>
            <div class="" v-if="getCardCustomerSalesList.length > 0">
                <div class="">
                    <DataTable :value="getCardCustomerSalesList" style="font-size:85%;">
                        <Column field="musteriAdi" header="Müşteri"></Column>
                        <Column field="siparisNo" header="Po"></Column>
                        <Column field="satisFiyati" header="Fiyat">
                            <template #body="slotProps"> 
                                {{ $filters.formatPrice(slotProps.data.satisFiyati) }}
                            </template>
                        </Column>
                        <Column field="miktar" header="Miktar">
                            <template #body="slotProps"> 
                                {{ $filters.formatDecimal(slotProps.data.miktar) }}
                            </template>
                            <template #footer>
                                {{ $filters.formatDecimal(cardCustomerTotal) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>

</template>
<script>
import { useCardStore } from '../../stores/cards';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { cardService } from '../../services/cardService';
import { socket } from '../../services/customServices/realTimeService';

export default {
    props:['selectedCard'],
    computed: {
        ...mapState(useCardStore, [
            'getCardCategoryList',
            'getCardProductList',
            'getCardSizeList',
            'getCardSurfaceList',
            'getCardCustomerSalesList',
            'getCardNewButton',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            code:null,
            selectedCategory: null,
            selectedProduct: null,
            selectedSurface: null,
            selectedWidth: null,
            selectedHeight: null,
            selectedEdge: null,
            filteredCategoryList: [],
            filteredProductList: [],
            filteredSurfaceList: [],
            filteredWidthList: [],
            filteredHeightList: [],
            filteredEdgeList: [],
            cardModel: {
                'id':null,
                'username':null,
                'urunKartId':null,
                'urunId': null,
                'olcuId': null,
                'kategoriId': null,
                'yuzeyId': null,
                'urunAdi': null,
                'kategoriAdi': null,
                'yuzeyIslem': null,
                'en': null,
                'boy': null,
                'kenar': null,
                'kod':null,
            },
            cardCustomerTotal:0,
            
        }
    },
    created() {
        if (!this.getCardNewButton) {
            this.cardCreatedProcess();
            this.cardCustomerSalesSum(this.getCardCustomerSalesList);
        }
    },
    methods: {
        cardCustomerSalesSum(data) {
            this.cardCustomerTotal = 0;
            for (const item of data) {
                this.cardCustomerTotal += item.miktar;
            }
        },
        cardCreatedProcess() {
            this.selectedCategory = this.getCardCategoryList.find(x => x.kategoriAdi == this.selectedCard.kategoriAdi);
            this.selectedProduct = this.getCardProductList.find(x => x.urunAdi == this.selectedCard.urunAdi);
            this.selectedSurface = this.getCardSurfaceList.find(x => x.yuzeyIslemAdi == this.selectedCard.yuzeyIslem);
            this.selectedWidth = this.getCardSizeList.find(x => x.en == this.selectedCard.en);
            this.selectedHeight = this.getCardSizeList.find(x => x.boy == this.selectedCard.boy);
            this.selectedEdge = this.getCardSizeList.find(x => x.kenar == this.selectedCard.kenar);
            this.code = this.selectedCard.kod;
            this.cardModel.username = localStorage.getItem("username");
            this.cardModel.id = this.selectedCard.id;
            this.cardModel.kategoriId = this.selectedCategory.id;
            this.cardModel.urunId = this.selectedProduct.id;
            this.cardModel.yuzeyId = this.selectedSurface.id;
            this.cardModel.kategoriAdi = this.selectedCard.kategoriAdi;
            this.cardModel.urunAdi = this.selectedCard.urunAdi;
            this.cardModel.yuzeyIslem = this.selectedCard.yuzeyIslem;
            this.cardModel.en = this.selectedCard.en;
            this.cardModel.boy = this.selectedCard.boy;
            this.cardModel.kenar = this.selectedCard.kenar;
            this.cardModel.kod = this.code;

        },
        edgeSelect(event) {
            this.cardModel.kenar = event.value.kenar;
        },
        heightSelect(event) {
            this.cardModel.boy = event.value.boy;
        },
        widthSelect(event) {
            this.cardModel.en = event.value.en;
        },
        surfaceSelect(event) {
            this.cardModel.yuzeyId = event.value.id;
            this.cardModel.yuzeyIslem = event.value.yuzeyIslemAdi;
        },
        productSelect(event) {
            this.cardModel.urunId = event.value.id;
            this.cardModel.urunAdi = event.value.urunAdi;
        },
        categorySelect(event) {
            this.cardModel.kategoriId = event.value.id;
            this.cardModel.kategoriAdi = event.value.kategoriAdi;
        },
        process() {
            this.cardModel.kategoriAdi = this.selectedCategory.kategoriAdi ? this.selectedCategory.kategoriAdi : this.selectedCategory;
            this.cardModel.urunAdi = this.selectedProduct.urunAdi ? this.selectedProduct.urunAdi : this.selectedProduct;
            this.cardModel.yuzeyIslem = this.selectedSurface.yuzeyIslemAdi ? this.selectedSurface.yuzeyIslemAdi : this.selectedSurface;
            this.cardModel.en = this.selectedWidth.en ? this.selectedWidth.en : this.selectedWidth;
            this.cardModel.boy = this.selectedHeight.boy ? this.selectedHeight.boy : this.selectedHeight;
            this.cardModel.kenar = this.selectedEdge.kenar ? this.selectedEdge.kenar : this.selectedEdge;
            this.cardModel.kod = this.code;

            if (this.getCardNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.cardModel.username = localStorage.getItem('username');
            useLoadingStore().begin_loading_act();
            cardService.save(this.cardModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('cards_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Kayıt Başarılı', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: data.errorMessage, life: 3000 });
                }
            })
        },
        update() {
            useLoadingStore().begin_loading_act();
            cardService.update(this.cardModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('cards_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.emitter.emit('close_card_form');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız ' + data.errorMessage, life: 3000 });
                } 
            })
        },
        deleteCard() {
            useLoadingStore().begin_loading_act();
            cardService.delete(this.selectedCard.id,localStorage.getItem('username')).then(data => {
                if (data.status) {
                    socket.socketIO.emit('cards_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.emitter.emit('close_card_form');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                }
            })
        },
        searchEdge(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardSizeList;
            }
            else {
                result = this.getCardSizeList.filter((x) => {
                    return x.kenar.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredEdgeList = result;
        },
        searchHeight(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardSizeList;
            }
            else {
                result = this.getCardSizeList.filter((x) => {
                    return x.boy.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredHeightList = result;
        },
        searchWidth(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardSizeList;
            }
            else {
                result = this.getCardSizeList.filter((x) => {
                    return x.en.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredWidthList = result;
        },
        searchCategory(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardCategoryList;
            }
            else {
                result = this.getCardCategoryList.filter((x) => {
                    return x.kategoriAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredCategoryList = result;
        },
        searchProduct(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardProductList;
            }
            else {
                result = this.getCardProductList.filter((x) => {
                    return x.urunAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredProductList = result;
        },
        searchSurface(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getCardSurfaceList;
            }
            else {
                result = this.getCardSurfaceList.filter((x) => {
                    return x.yuzeyIslemAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredSurfaceList = result;
        }
    }
}
</script>

<style scoped>

</style>