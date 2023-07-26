// eslint-disable-next-line vue/multi-word-component-names
<template>
    <br/>
    <div class="row">
        <div class="col-4">
            <Dropdown class="w-100" v-model="selectedSavedKind" :options="saveKindList" optionLabel="kayitTur" placeholder="Kayıt Tür"  @change="productSavedKindSelected($event)" :disabled="form.kind"/>
            <br/>
            <br/>
            <AutoComplete placeholder="Po" class="w-100" v-model="searchProduct" :suggestions="productList" @complete="productSearch($event)" optionLabel="name" :disabled="form.po" @item-select="productItemSelected($event)" />
            <br/>
            <br/>
            <Dropdown class="w-100" v-model="selectedProductDetail" :options="selectionProductDetail" optionLabel="tanim" placeholder="Sipariş Detay" :disabled="form.product" @change="productItemDetailSelected($event)"/>
            <br/>
            <br/>
            <InputText class="w-100" v-model="getSelectionModelList.tanim" placeholder="Sipariş Ürün Kart" disabled/>
            <br/>
            <br/>
            <div class="row">
                    <div class="col">
                        <input type="text" class="form-control" v-model="getSelectionModelList.urunkartid" disabled />
                    </div>
                    <div class="col">
                        <button class="btn btn-secondary" @click="selection_card_form = !selection_card_form" :disabled="selectedSavedKind.id == 1 ? false : true">@</button>
                    </div>
            </div>
            <br/>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3 w-100">
                        <span class="input-group-text" id="basic-addon1">Kasa No</span>
                        <input type="text" class="form-control" v-model="getSelectionModelList.kasano" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                </div>
                <div class="col">
                    <AutoComplete  class="" v-model="searchMine" placeholder="Ocak" :suggestions="mineList" @complete="mineSearch($event)" optionLabel="name"  @item-select="productMineSelected($event)" :disabled="form.mine"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3 w-100">
                        <span class="input-group-text" id="basic-addon1">Düzenleyen</span>
                        <input type="text" class="form-control" v-model="getSelectionModelList.duzenleyen" aria-label="Username" aria-describedby="basic-addon1" :disabled="form.worker1">
                    </div>
                    </div>
                <div class="col">
                    <div class="input-group mb-3 w-100">
                        <span class="input-group-text" id="basic-addon1">Kasalayan</span>
                        <input type="text" class="form-control" v-model="getSelectionModelList.kasalayan" aria-label="Username" aria-describedby="basic-addon1" :disabled="form.worker2">
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <span class="p-float-label">
                <AutoComplete class="w-100" inputId="ac" v-model="searchSupplier" :suggestions="supplierList" @complete="supplierSearch($event)" optionLabel="name" @item-select="supplierItemSelected($event)" :disabled="form.supplier"/>

                <label for="ac">Tedarikçi</label>
            </span>
            <br/>
            <br/>
            <Calendar v-model="p_date" @date-select="dateSelected($event)" :disabled="form.date" dateFormat="dd/mm/yy"/>
            <br/>
            <br/>
            <div class="row">
                <div class="col" v-for="item of getProductUnitList" :key="item">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="selectedProductUnit" :value="item" @change="changeProductUnit($event)">
                        <label class="form-check-label" for="flexRadioDefault1">
                            {{ item.name }}
                        </label>
                    </div>
                </div>  
            </div>
            <br/>
            <br/>
            <div class="row">
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="kutusayisi" class="form-control" aria-describedby="basic-addon1" v-model="getSelectionModelList.kutuadet" @input="calculateAmount($event)" :disabled="form.amountincreate"/>
                        <label for="kutusayisi">Kutu Sayısı</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="kutuiciadet" class="form-control" aria-describedby="basic-addon1" v-model="getSelectionModelList.kutuiciadet" @input="inBoxPiece" :disabled="form.amountinbox"/>
                        <label for="kutuiciadet">Kutu İçi</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="kutuiciadet" class="form-control" aria-describedby="basic-addon1" v-model="getSelectionModelList.adet" @input="calculateAmount($event)" :disabled="form.totalAmount"/>
                        <label for="kutuiciadet">Toplam</label>
                    </span>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="miktar" class="form-control" aria-describedby="basic-addon1" v-model="getSelectionModelList.miktar" @input="getSelectionModelList.miktar = $filters.formatPoint($event.target.value)" :disabled="form.amount"/>
                        <label for="miktar">Miktar</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="miktar" class="form-control" aria-describedby="basic-addon1" v-model="getSelectionModelList.ozelmiktar" @input="getSelectionModelList.ozelmiktar = $filters.formatPoint($event.target.value)" :disabled="form.speacial"/>
                        <label for="miktar">Sqm</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <InputText id="miktar" class="form-control" aria-describedby="basic-addon1" v-model="cratePiece" :disabled="form.createpiece"/>
                        <label for="miktar">Kasa</label>
                    </span>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getSelectionModelList.kutu">
                        <label class="form-check-label" for="flexCheckDefault">
                            Kutu
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" v-model="getSelectionModelList.bagli">
                        <label class="form-check-label" for="flexCheckDefault2">
                            Bağlı
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" v-model="getSelectionModelList.disarda">
                        <label class="form-check-label" for="flexCheckDefault3">
                            Dışarda
                        </label>
                    </div>
                </div>
                <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3" v-model="getSelectionModelList.bulunamayan">
                            <label class="form-check-label" for="flexCheckDefault3">
                                Bulunamadı
                            </label>
                        </div>
                </div>
            </div>
            <br/>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="getSelectionModelList.aciklama" style="padding-top:35px;"></textarea>
                <label for="floatingTextarea">Notlar</label>
            </div>
            
        </div>
        <div class="col-4">
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" v-model="getSelectionModelList.kategoriadi" disabled/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" v-model="getSelectionModelList.urunadi" disabled/>
                </div>
            </div>
            <br/>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" v-model="getSelectionModelList.kenarislem" disabled/>
                </div>
                <div class="col">
                    <input type="text" class="form-control" v-model="getSelectionModelList.ebat" disabled/>
                </div>
            </div>
        </div>
    </div>
    <br/>    
    <div class="row m-auto">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="newForm" :disabled="new_button_form">Yeni</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="cancelForm" :disabled="cancel_button_form">Vazgeç</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-success" @click="saveForm" :disabled="save_button_form">Kaydet</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-warning" @click="updateForm" :disabled="update_button_form">Güncelle</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-danger" @click="deleteForm" :disabled="delete_button_form">Sil</button>
        </div>
    </div>
    <Dialog v-model:visible="selection_card_form" header="Ürünler" modal>
        <card @productCardSelected="selectionCardSelected($event)"/>
    </Dialog>
</template>
<script>
import { useSelectionStore } from '../../stores/selection';
import { useCardStore } from '../../stores/cards';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { selectionService } from '../../services/selectionService';
import { localDateService } from '../../services/localDateService';
import { socket } from '../../services/customServices/realTimeService';

import card from '../shared/productCards.vue';
export default {
    components: {
        card
    },
    computed: {
        ...mapState(useSelectionStore,[
            'getSelectionModelList',
            'getOrderList',
            'getOrderDetailList',
            'getMineList',
            'getSupplierList',
            'getProductUnitList',
            'getSelectionNewButton',
        ]),
        ...mapState(useCardStore, [
            'getCardList'
        ]),

    },
    data() {
        return {
            searchMine:"",
            cratePiece:1,
            kutuadet:0,
            saveKindList: [
                { id: 1, kayitTur: "Stok" },
                { id: 2, kayitTur: "Sipariş" },
            ],
            selectionProductDetail: [],
            selectedProductDetail: {},
            selectedSavedKind: {},
            mineList:[],
            searchProduct: "",
            productList: [],
            searchSupplier: "",
            supplierList: [],
            p_date: new Date(),
            selectedProductUnit: {},
            selection_card_form: false,
            orderProductCard: "",
            new_button_form: true,
            cancel_button_form: false,
            save_button_form: false,
            update_button_form: true,
            delete_button_form: true,
            form: {
                kind: false,
                po: false,
                product: false,
                mine: false,
                worker1: false,
                worker2: false,
                supplier: false,
                amountincreate: false,
                amountinbox: false,
                totalAmount: false,
                amount: false,
                speacial: false,
                createpiece: false,
            }
        }
    },
    created() {
        if (!this.getSelectionNewButton) {
            this.selectionCreated();
        };
    },
    methods: {
        
        calculateAmount(event) {
            const size = this.getSelectionModelList.ebat.split('X');
            const width = size[0];
            const height = size[1];
            if (this.getSelectionModelList.urunbirimid == 1) {
                if (width == 'ANT' && height == 'PAT') {
                    this.getSelectionModelList.miktar = this.formatRound(this.getSelectionModelList.kutuadet * 0.74338688);
                    this.getSelectionModelList.ozelmiktar = this.getSelectionModelList.miktar;

                } else if (width == '20,3' && height == 'SET') {
                    this.getSelectionModelList.miktar = this.formatRound(this.getSelectionModelList.kutuadet * 0.494914);
                    this.getSelectionModelList.ozelmiktar = this.getSelectionModelList.miktar;
                } else if (
                    this.boy == "FREE" ||
                    this.boy == "SLAB" ||
                    this.boy == "VAR" ||
                    this.boy == "Free" ||
                    this.boy == "Various" ||
                    this.boy == "Random"
                ) {
                    this.getSelectionModelList.miktar = 0;
                    this.getSelectionModelList.ozelmiktar = 0;
                } else {
                    if (this.getSelectionModelList.kategoriadi == 'Travertine Mosaic' || this.getSelectionModelList.kategoriadi == 'Travertine Mosaics') {
                        this.getSelectionModelList.miktar = this.formatRound(this.getSelectionModelList.adet * 0.093025);
                    } else {
                        this.getSelectionModelList.miktar = this.formatRound((this.$filters.formatPoint(width) * this.$filters.formatPoint(height) * this.getSelectionModelList.adet) / 10000);
                        this.getSelectionModelList.ozelmiktar = this.getSelectionModelList.miktar;
                    }
                    
                };
            }else if (this.getSelectionModelList.urunbirimid) {
                if (width == 'ANT' && height == 'PAT') {
                    this.getSelectionModelList.miktar = this.getSelectionModelList.adet;
                    this.getSelectionModelList.ozelmiktar = this.formatRound(this.getSelectionModelList.kutuadet * 0.74338688);
                }
            }

        },
        formatRound(value) {
            return (value / 1).toFixed(2).replace(",", ".");
        },
        resetForm() {
            selectionService.getSelectionModel().then(data => {
                useSelectionStore().selection_model_list_load_act(data);
            });
            this.selectedSavedKind = {};
            this.searchProduct = "";
            this.selectedProductDetail = {};
            this.orderProductCard = "";
            this.searchMine = "";
            this.searchSupplier = "";
            this.p_date = new Date();
            this.selectedProductUnit = {};
            this.cratePiece = 0;
        },
        newForm() {
            this.resetForm();
            this.disabledForm();
            
            this.new_button_form = true;
            this.cancel_button_form = false;
            this.save_button_form = false;
            this.update_button_form = true;
            this.delete_button_form = true;
        },
        cancelForm() {
            this.resetForm();
            this.enabledForm();
            this.new_button_form = false;
            this.cancel_button_form= true;
            this.save_button_form= true;
            this.update_button_form= true;
            this.delete_button_form= true;

        },
        saveForm() {
            this.new_button_form = false;
            this.cancel_button_form = true;
            this.save_button_form = true;
            this.update_button_form = true;
            this.delete_button_form = true;
            this.getSelectionModelList.kayit_sayisi = this.cratePiece;
            this.getSelectionModelList.urundurumid = 1;
            this.getSelectionModelList.tarih = localDateService.getDateString(this.p_date);
            this.enabledForm();
            useLoadingStore().begin_loading_act();
            selectionService.save(this.getSelectionModelList).then(data => {
                if (!data.kasa_kontrol) {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Bu kasa no zaten mevcut.', life: 3000 });
                    this.disabledForm();
                    return;
                }
                if (data.kayit_durum) {
                    socket.socketIO.emit('selection_update_emit');
                    const data = {
                        'status': 2,
                        'year': 'Hepsi'
                    }
                    socket.socketIO.emit('products_update_emit', data);
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi.', life: 3000 });
                    this.resetForm();


                }
                else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kayıt Başarısız.', life: 3000 });
                    this.disabledForm();
                };
            })


            this.resetForm();
        },
        disabledForm(){
            this.form = {
                kind: false,
                po: false,
                product: false,
                mine: false,
                worker1: false,
                worker2: false,
                supplier: false,
                amountincreate: false,
                amountinbox: false,
                totalAmount: false,
                amount: false,
                speacial: false,
                createpiece: false,
            };
        },
        enabledForm() {
            this.form = {
                kind: true,
                po: true,
                product: true,
                mine: true,
                worker1: true,
                worker2: true,
                supplier: true,
                amountincreate: true,
                amountinbox: true,
                totalAmount: true,
                amount: true,
                speacial: true,
                createpiece: true,
            };
        },
        updateForm() {
            this.getSelectionModelList.tarih = localDateService.getDateString(this.p_date);
            useLoadingStore().begin_loading_act();
            selectionService.update(this.getSelectionModelList).then(data => {
                if (data) {
                    socket.socketIO.emit('selection_update_emit');
                    const data = {
                        'status': 2,
                        'year':'Hepsi',
                    }
                    socket.socketIO.emit('products_update_emit', data);

                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi.', life: 3000 });
                    this.$emit('formDialogClose');
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme İşlemi Başarısız.', life: 3000 });
                };
            })
        },
        deleteForm() {
            this.delete_button_form = true;
            useLoadingStore().begin_loading_act();
            selectionService.delete(this.getSelectionModelList.kasano).then(data => {
                if (data) {
                    socket.socketIO.emit('selection_update_emit');
                    const data = {
                        'status': 2,
                        'year': 'Hepsi',
                    }
                    socket.socketIO.emit('products_update_emit', data);

                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    this.$emit('formDialogClose');
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                };
            })
        },
        selectionCreated() {
            this.selectionProductDetail = [];
            this.new_button_form = true;
            this.cancel_button_form = true;
            this.save_button_form = true;
            this.update_button_form = false;
            this.delete_button_form = false;
            this.p_date = localDateService.getStringDate(this.getSelectionModelList.tarih);
            this.searchProduct = this.getOrderList.find(x => x.name == this.getSelectionModelList.siparisaciklama);
            this.selectedProductDetail = this.getOrderDetailList.find(x => x.urunkart_id == this.getSelectionModelList.urunkartid && x.siparisno == this.getSelectionModelList.siparisaciklama);
            this.selectionProductDetail.push(this.selectedProductDetail);
            this.selectedSavedKind = this.saveKindList.find(x => x.id == parseInt(this.getSelectionModelList.uretimturid));
            this.searchSupplier = this.getSupplierList.find(x => x.id == this.getSelectionModelList.tedarikciid);
            this.searchMine = this.getMineList.find(x => x.id == this.getSelectionModelList.urunocakid);
            this.selectedProductUnit = this.getProductUnitList.find(x => x.id == this.getSelectionModelList.urunbirimid);
            this.cratePiece = 1;
        },
        inBoxPiece() {
            this.getSelectionModelList.adet = parseInt(this.getSelectionModelList.kutuadet) * parseInt(this.getSelectionModelList.kutuiciadet);
        },
        changeProductUnit(event) {
            this.getSelectionModelList.urunbirimid = event.target._value.id;
        },
        productItemDetailSelected(event) {
            this.orderProductCard = event.value.tanim;
            this.selectedProductUnit = this.getProductUnitList.find(x => x.id == event.value.urunbirimid);
            this.searchSupplier = this.getSupplierList.find(x => x.name == event.value.tedarikci);
            this.getSelectionModelList.tedarikciid = this.getSupplierList.find(x => x.name == event.value.tedarikci).id;
            this.getSelectionModelList.urunbirimid = this.getProductUnitList.find(x => x.id == event.value.urunbirimid).id;
            this.getSelectionModelList.uretimturid = 2;
            this.getSelectionModelList.urunkartid = event.value.urunkart_id;
            this.getSelectionModelList.kategoriadi = this.getCardList.find(x => x.id == event.value.urunkart_id).kategoriAdi;
            this.getSelectionModelList.urunadi = this.getCardList.find(x => x.id == event.value.urunkart_id).urunAdi;
            this.getSelectionModelList.kenarislem = this.getCardList.find(x => x.id == event.value.urunkart_id).yuzeyIslem;
            this.getSelectionModelList.ebat = this.getCardList.find(x => x.id == event.value.urunkart_id).ebat;
            this.getSelectionModelList.aciklama = event.value.siparisno;
            this.getCrateNo(this.getSelectionModelList.tedarikciid);


        },
        productSavedKindSelected(event) {
            if(event.value.id == 1){
                this.form.po = true;
                this.form.product = true;
            }else{
                this.form.po = false;
                this.form.product = false;
            };
            this.getSelectionModelList.kayit_tur = event.value.kayitTur;
            this.cratePiece = 1;
            this.getSelectionModelList.duzenleyen = 'Muhsin';
            if (event.value.kayitTur == 'Stok') {
                this.searchProduct = "";
                this.selectedProductDetail = {};
                this.getSelectionModelList.siparisaciklama = 'Stok';
                this.getSelectionModelList.aciklama = 'Stok';
                if (this.getSelectionNewButton) {
                    this.getSelectionModelList.urunbirimid = 1;
                    this.getSelectionModelList.tedarikciid = 1;
                    this.selectedProductUnit = { 'id': 1, 'name': "M2" };
                    this.searchSupplier = { 'id': 1, 'name': 'Mekmer' };
                    this.getSelectionModelList.uretimturid = 1;
                }
                this.getCrateNo(this.getSelectionModelList.tedarikciid);

            }
        },
        productItemSelected(event) {
            this.getSelectionModelList.siparisaciklama = event.value.name;
            selectionService.getSelectionProductDetail(event.value.name).then(data => {
                this.selectionProductDetail = data;
            });
        },
        productMineSelected(event) {
            this.getSelectionModelList.urunocakid = event.value.id;
        },
        mineSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getMineList;
            }
            else {
                result = this.getMineList.filter((x) => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.mineList = result;
        },
        productSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOrderList;
            }
            else {
                result = this.getOrderList.filter((x) => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.productList = result;
        },
        supplierSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSupplierList;
            }
            else {
                result = this.getSupplierList.filter((x) => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.supplierList = result;
        },
        supplierItemSelected(event) {
            this.getSelectionModelList.tedarikciid = event.value.id;
            this.getCrateNo(event.value.id);
        },
        selectionCardSelected(event) {
            this.getSelectionModelList.urunkartid = event.id;
            this.getSelectionModelList.urunadi = event.urunAdi;
            this.getSelectionModelList.kategoriadi = event.kategoriAdi;
            this.getSelectionModelList.kenarislem = event.yuzeyIslem;
            this.getSelectionModelList.ebat = event.ebat;
        },
        dateSelected(event){
            this.getSelectionModelList.tarih = localDateService.getDateString(event);

        },
        getCrateNo(id) {
            if (id == 1 || id == 123) {
                if (!this.getSelectionModelList.kasano || this.getSelectionModelList.kasano.toString().length == 6) {
                    selectionService.getSelectionCrateNo().then(data => {
                        this.getSelectionModelList.kasano = data.kasano;
                    })
                }

            } else {
                if (!this.getSelectionModelList.kasano || this.getSelectionModelList.kasano.toString().length == 5) {
                    selectionService.getSelectionOuterCrateNo().then(data => {
                        this.getSelectionModelList.kasano = data.kasano;
                    })
                }
            }
        }
    },
    mounted() {
        this.emitter.on('cardDialogClose', () => {
            this.selection_card_form = false;
        })
    }
}
</script>
<style scoped>

</style>