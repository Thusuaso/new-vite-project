<template>
    <div v-if="!getMobile">
            <div class="row">
            <div class="col-12">
                <div class="row">
                    <div class="col-5">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1" style="width:30%;">Kod</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.urunKartId">
                            <button class="btn btn-secondary" @click="showProductCard" :disabled="form_status">@</button>
                        </div>
                        <div class="input-group mb-3">
                                <span class="input-group-text " id="basic-addon1" style="width:30%;">Kategori</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.kategoriAdi">
                            </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1" style="width:30%;">Ürün</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.urunAdi">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1" style="width:30%;">Yüzey</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.yuzeyIslem">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1" style="width:30%;">Ebat</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.ebat">
                        </div>
                        <div class="row">
                            <div class="col">
                                <Dropdown v-model="selectedSupplier"  :options="getProductSupplierList" filter :disabled="form_status" aria-describedby="basic-addon1" optionLabel="firmaAdi" placeholder="Tedarikçi" class="w-full md:w-14rem" style="width:100%;" />
                            </div>
                            <div class="col">
                                <div class="input-group mb-3 ">
                                    <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Alış $</span>
                                    <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.alisFiyati" @input="products.alisFiyati = $filters.formatPoint($event.target.value)">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                                <div class="col">
                                    <div class="input-group mb-3 ">
                                            <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Alış ₺</span>
                                            <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.alisFiyati_Tl">
                                    </div>
                                </div>
                    
                                <div class="col">
                                    <div class="input-group mb-3 ">
                                        <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Satış $</span>
                                        <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1"  v-model="products.satisFiyati" @input="products.satisFiyati = $filters.formatPoint($event.target.value)">
                                    </div>
                                </div>
                        </div>
                        <div class="row mb-3 mt-3">
                            <div class="col-4">
                                  <Dropdown v-model="selectedUnit"  :options="getProductUnitList" :disabled="form_status" aria-describedby="basic-addon1" optionLabel="birimAdi" placeholder="Birim" class="w-full md:w-14rem" style="width:100%;" />
                            </div>
                            <div class="col-4">
                                <span class="p-float-label">
                                    <InputText  class="w-75" id="amount" :disabled="form_status" v-model="products.miktar" @input="products.miktar = $filters.formatPoint($event.target.value)"/>
                                    <label for="amount">Miktar</label>
                                </span>
   
                            </div>
                            <div class="col-4">
                                    <span class="p-float-label">
                                        <InputText class="w-75" id="crate" :disabled="form_status"  v-model="products.kasaAdet" @input="products.kasaAdet = $filters.formatPoint($event.target.value)"/>
                                        <label for="crate">Kasa</label>
                                    </span>
                            </div>
                            
                        </div>
                        <div class="row mb-3">
                            <div class="col-4">
                                    <span class="p-float-label">
                                        <InputText class="w-75" id="sira" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.siraNo" @input="products.siraNo = $filters.formatPoint($event.target.value)"/>
                                        <label for="sira">Sıra</label>
                                    </span>
                                </div>
                                <div class="col-4">
                                    <span class="p-float-label">
                                        <InputText class="w-75" id="m2" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.ozelMiktar" @input="products.ozelMiktar = $filters.formatPoint($event.target.value)"/>
                                        <label for="m2">Örnek M2</label>
                                    </span>
                                </div>
                                <div class="col-4">

                                    <span class="p-float-label">
                                            <InputText class="w-75" id="ton" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.ton" @input="products.ton = $filters.formatPoint($event.target.value)"/>
                                            <label for="ton">Ton</label>
                                        </span>
                                </div>
                        </div>
                        <button type="button" class="btn btn-secondary w-100" @click="workmanship_form = true" v-if="workmanshipButton" :disabled="workmanship_disabled">İşçilik</button>
                    </div>
                    <div class="col-7">
                        <div class="row">
                            <div class="col-6">
                                <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" :disabled="form_status" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="products.musteriAciklama"></textarea>
                                <label for="floatingTextarea" :disabled="form_status">En</label>
                            </div>
                            </div>
                            <div class="col-6">
                                <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" :disabled="form_status" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="products.uretimAciklama"></textarea>
                                <label for="floatingTextarea" :disabled="form_status">Tr</label>
                            </div>
                                </div>
                        </div>
                        <div class="h-50">

                        </div>

                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-primary w-75" @click="newForm" :disabled="new_form_status">Yeni</button>
                            </div>
                            <div class="col">
                                    <button type="button" class="btn btn-secondary w-75" :disabled="form_status" @click="cancelForm">Vazgeç</button>

                                    </div>
                            <div class="col">
                                <button type="button" class="btn btn-success w-75" :disabled="form_status_add" @click="addForm">Ekle</button>

                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-warning w-75" :disabled="form_status" @click="updateForm">Değiştir</button>

                                </div>
                                <div class="col">
                                <button type="button" class="btn btn-danger w-75" :disabled="form_status" @click="deleteForm">Sil</button>

                                </div>
                        </div>
                    
                    </div>
                </div>
            </div>

        </div>
        <br/>
        <DataTable 
            :value="getProductionsDetailModel.siparisUrunler" 
            style="font-size:85%;"
            v-model:selection="productSelected"
            selectionMode="single"
            @row-click="product_select_item($event)"
            sortField="siraNo" 
            :sortOrder="1"
        >
            <Column field="siraNo" header="S"></Column>
            <Column field="tedarikciAdi" header="Kimden"></Column>
            <Column field="iscilik" header="İşçilik"></Column>
            <Column field="urunAdi" header="Ürün"></Column>
            <Column field="en" header="E"></Column>
            <Column field="boy" header="B"></Column>
            <Column field="kenar" header="K"></Column>
            <Column field="yuzeyIslem" header="İşlem"></Column>
            <Column field="m2" header="M2">
                <template #body="slotProps">
                    {{ $filters.formatDecimal(slotProps.data.m2) }}
                </template>
                <template #footer>
                    {{ $filters.formatDecimal(productsSum.m2) }}
                </template>
            </Column>
            <Column field="adet" header="Adet">
                <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.adet) }}
                    </template>
                <template #footer>
                        {{ $filters.formatDecimal(productsSum.piece) }}
                    </template>
            </Column>
            <Column field="mt" header="Mt">
                <template #body="slotProps">
                            {{ $filters.formatDecimal(slotProps.data.mt) }}
                        </template>
                <template #footer>
                            {{ $filters.formatDecimal(productsSum.piece) }}
                </template>
            </Column>
            <Column field="ton" header="Ton">
                <template #body="slotProps">
                                {{ $filters.formatDecimal(slotProps.data.ton) }}
                            </template>
                <template #footer>
                                {{ $filters.formatDecimal(productsSum.ton) }}
                    </template>
            </Column>
            <Column field="kasaAdet" header="Kasa">
                <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.kasaAdet) }}
                                </template>
                <template #footer>
                                {{ $filters.formatDecimal(productsSum.crate) }}
                    </template>
            </Column>
            <Column field="satisToplam" header="Toplam">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.satisToplam) }}
                </template>
                <template #footer>
                                {{ $filters.formatPrice(productsSum.salesTotal) }}
                    </template>
            </Column>
        </DataTable>
    </div>
        <div v-if="getMobile">
            <div class="row">
                <div class="col-12">
                    <div class="">
                        <div class="">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1" style="width:30%;">Kod</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.urunKartId">
                                <button class="btn btn-secondary" @click="showProductCard" :disabled="form_status">@</button>
                            </div>
                            <div class="input-group mb-3">
                                    <span class="input-group-text " id="basic-addon1" style="width:30%;">Kategori</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.kategoriAdi">
                                </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1" style="width:30%;">Ürün</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.urunAdi">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1" style="width:30%;">Yüzey</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.yuzeyIslem">
                            </div>
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1" style="width:30%;">Ebat</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="products.ebat">
                            </div>
                            <div class="">
                                <div class=" mb-3">
                                    <Dropdown v-model="selectedSupplier"  :options="getProductSupplierList" filter :disabled="form_status" aria-describedby="basic-addon1" optionLabel="firmaAdi" placeholder="Tedarikçi" class="w-full md:w-14rem" style="width:100%;" />
                                </div>
                                <div class="">
                                    <div class="input-group mb-3 ">
                                        <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Alış $</span>
                                        <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.alisFiyati" @input="products.alisFiyati = $filters.formatPoint($event.target.value)">
                                    </div>
                                </div>
                            </div>
                            <div class="">                    
                                    <div class="">
                                        <div class="input-group mb-3 ">
                                            <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Satış $</span>
                                            <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1"  v-model="products.satisFiyati" @input="products.satisFiyati = $filters.formatPoint($event.target.value)">
                                        </div>
                                    </div>
                            </div>
                            <div class="">
                                <div class="mb-3">
                                    <Dropdown v-model="selectedUnit"  :options="getProductUnitList" :disabled="form_status" aria-describedby="basic-addon1" optionLabel="birimAdi" placeholder="Birim" class="w-full md:w-14rem" style="width:100%;" />
                                </div>
                                <div class="">
                                    <div class="input-group mb-3 ">
                                            <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">M</span>
                                            <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.miktar" @input="products.miktar = $filters.formatPoint($event.target.value)">
                                        </div>
                                </div>
                                <div class="">
                                    <div class="input-group mb-3 ">
                                            <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">K</span>
                                            <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.kasaAdet">
                                        </div>
                                </div>
                                <div class="">
                                    <div class="input-group mb-3 ">
                                            <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">S</span>
                                            <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.siraNo">
                                        </div>
                                </div>
                            </div>
                            <div class="">
                                    <div class="">
                                        <div class="input-group mb-3 ">
                                                <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">Ö.M</span>
                                                <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.ozelMiktar" @input="products.ozelMiktar = $filters.formatPoint($event.target.value)">
                                            </div>
                                    </div>
                                    <div class="">
                                        <div class="input-group mb-3 ">
                                                <span class="input-group-text" id="basic-addon1" style="width:40%;height:50px;">T</span>
                                                <input type="text" class="form-control" aria-label="Username" :disabled="form_status" aria-describedby="basic-addon1" v-model="products.ton" @input="products.ton = $filters.formatPoint($event.target.value)">
                                            </div>
                                    </div>
                            </div>
                            <button type="button" class="btn btn-secondary w-100" @click="workmanship_form = true" v-if="workmanshipButton" :disabled="workmanship_disabled">İşçilik</button>
                        </div>
                        <div class="">
                            <div class="">
                                <div class="mb-3">
                                    <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" :disabled="form_status" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="products.musteriAciklama"></textarea>
                                    <label for="floatingTextarea" :disabled="form_status">En</label>
                                </div>
                                </div>
                                <div class="mb-3">
                                    <div class="form-floating">
                                    <textarea class="form-control" placeholder="Leave a comment here" :disabled="form_status" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="products.uretimAciklama"></textarea>
                                    <label for="floatingTextarea" :disabled="form_status">Tr</label>
                                </div>
                                    </div>
                            </div>
                            <div class="h-50">

                            </div>

                            <div class="">
                                <div class="">
                                    <button type="button" class="btn btn-primary w-100 mb-3" @click="newForm" :disabled="new_form_status">Yeni</button>
                                </div>
                                <div class="">
                                        <button type="button" class="btn btn-secondary w-100 mb-3" :disabled="form_status" @click="cancelForm">Vazgeç</button>

                                        </div>
                                <div class="">
                                    <button type="button" class="btn btn-success w-100 mb-3" :disabled="form_status_add" @click="addForm">Ekle</button>

                                </div>
                                <div class="">
                                    <button type="button" class="btn btn-warning w-100 mb-3" :disabled="form_status" @click="updateForm">Değiştir</button>

                                    </div>
                                    <div class="">
                                    <button type="button" class="btn btn-danger w-100 mb-3" :disabled="form_status" @click="deleteForm">Sil</button>

                                    </div>
                            </div>
                    
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <DataTable 
                :value="getProductionsDetailModel.siparisUrunler" 
                style="font-size:85%;"
                v-model:selection="productSelected"
                selectionMode="single"
                @row-click="product_select_item($event)"
                sortField="siraNo" 
                :sortOrder="1"
            >
                <Column field="siraNo" header="S"></Column>
                <Column field="tedarikciAdi" header="Kimden"></Column>
                <Column field="iscilik" header="İşçilik"></Column>
                <Column field="urunAdi" header="Ürün"></Column>
                <Column field="en" header="E"></Column>
                <Column field="boy" header="B"></Column>
                <Column field="kenar" header="K"></Column>
                <Column field="yuzeyIslem" header="İşlem"></Column>
                <Column field="m2" header="M2">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.m2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(productsSum.m2) }}
                    </template>
                </Column>
                <Column field="adet" header="Adet">
                    <template #body="slotProps">
                            {{ $filters.formatDecimal(slotProps.data.adet) }}
                        </template>
                    <template #footer>
                            {{ $filters.formatDecimal(productsSum.piece) }}
                        </template>
                </Column>
                <Column field="mt" header="Mt">
                    <template #body="slotProps">
                                {{ $filters.formatDecimal(slotProps.data.mt) }}
                            </template>
                    <template #footer>
                                {{ $filters.formatDecimal(productsSum.piece) }}
                    </template>
                </Column>
                <Column field="ton" header="Ton">
                    <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.ton) }}
                                </template>
                    <template #footer>
                                    {{ $filters.formatDecimal(productsSum.ton) }}
                        </template>
                </Column>
                <Column field="kasaAdet" header="Kasa">
                    <template #body="slotProps">
                                        {{ $filters.formatDecimal(slotProps.data.kasaAdet) }}
                                    </template>
                    <template #footer>
                                    {{ $filters.formatDecimal(productsSum.crate) }}
                        </template>
                </Column>
                <Column field="satisToplam" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.satisToplam) }}
                    </template>
                    <template #footer>
                                    {{ $filters.formatPrice(productsSum.salesTotal) }}
                        </template>
                </Column>
            </DataTable>
        </div>








    <Dialog v-model:visible="product_card_form" header="Ürünler" modal :closeOnEscape="false" :style="{ 'width': '100vw' }">
        <cards @productCardSelected="productCardSelected($event)"/>
    </Dialog>
    <Dialog v-model:visible="workmanship_form" header="İşçilik" modal :closeOnEscape="false" :style="{ 'width': '100vw' }">
        <workmanship :orderNo="getProductionsDetailModel.siparis.siparisNo" :productId="products.urunKartId"/>
    </Dialog>
</template>
<script>
import cards from '../shared/productCards.vue';
import workmanship from './forms/workmanship.vue';

import { useProductionsStore } from '../../stores/productions';
import { mapState } from 'pinia';
import { useCardStore } from '../../stores/cards';
import { useMobilStore } from '../../stores/mobil';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductionsDetailModel',
            'getProductSupplierList',
            'getProductUnitList',
            'getProductionsNewButton',
            'getProductTotal'
            

        ]),
        ...mapState(useCardStore, [
            'getCardList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])

    },
    components: {
        cards,
        workmanship
    },
    data() {
        return {
            workmanship_disabled:true,
            workmanshipButton:false,
            workmanship_form:false,
            productsSum: {
                m2: 0,
                piece: 0,
                mt: 0,
                ton: 0,
                crate: 0,
                salesTotal:0
            },
            productSelected:{},
            productsUpdateList:[],
            productsNewList: [],
            productsDeleteList:[],
            product_card_form: false,
            productCard: {
            },
            selectedSupplier: {},
            selectedUnit: {},
            products: {
                
            },
            form_status: true,
            form_status_add:true,
            new_form_status:false,
      }  
    },
    methods: {
        product_select_item(event) {
            // @ts-ignore
            this.products = this.getProductionsDetailModel.siparisUrunler.find(x => x.id == event.data.id);
            this.productCardSelected(this.getCardList.find(x => x.id == event.data.urunKartId));
            this.selectedSupplier = this.getProductSupplierList.find(x => x.id == event.data.tedarikciId);
            this.selectedUnit = this.getProductUnitList.find(x => x.id == event.data.urunBirimId);
            this.new_form_status = true;
            this.form_status = false;
            this.form_status_add = true;
            this.workmanship_disabled = false;
        },
        showProductCard() {
            this.product_card_form = true
        },
        productCardSelected(event) {
            this.productCard = {
            
            }
            this.productCard = event
            this.products.urunKartId = this.productCard.id
             this.products.kategoriAdi = this.productCard.kategoriAdi
            this.products.urunAdi = this.productCard.urunAdi
            this.products.en = this.productCard.en
            this.products.boy = this.productCard.boy
            this.products.kenar = this.productCard.kenar
            this.products.yuzeyIslem = this.productCard.yuzeyIslem
            this.products.ebat = this.productCard.ebat
        },
        newForm() {
            this.new_form_status = true;
            this.form_status = false;
            this.form_status_add = false;
            this.workmanship_disabled = true;
            this.resetData()
            // @ts-ignore
            if (this.getProductionsDetailModel.siparisUrunler.length > 0) {
                // @ts-ignore
                this.products.siraNo = this.getProductionsDetailModel.siparisUrunler.length + 1
            } else {
                this.products.siraNo = 1
            }
        },
        buttonReset() {
            this.new_form_status = false;
            this.form_status = true;
            this.form_status_add = true;
            this.workmanship_disabled = true
        },
        cancelForm() {
            this.buttonReset()
            this.resetData()
        },
        updateForm() {
            // @ts-ignore
            const index = this.findIndex(this.products.id, this.getProductionsDetailModel.siparisUrunler);
            // @ts-ignore
            this.getProductionsDetailModel.siparisUrunler.splice(index, 1);
            this.products.tedarikciId = this.selectedSupplier.id;
            this.products.tedarikciAdi = this.selectedSupplier.firmaAdi;

            this.products.urunBirimId = this.selectedUnit.id;
            if (!this.products.id) {
                this.products.id = this.createId()

            };
            if (this.selectedUnit.id == 1) {
                this.products.m2 = this.products.miktar
                this.products.adet = 0
                this.products.mt = 0

            } else if (this.selectedUnit.id == 2) {
                this.products.adet = this.products.miktar
                this.products.m2 = 0
                this.products.mt = 0
            } else if (this.selectedUnit.id == 3) {
                this.products.mt = this.products.miktar
                this.products.adet = 0
                this.products.m2 = 0
            };
            this.products.satisToplam = parseFloat(this.products.miktar) * parseFloat(this.products.satisFiyati);
            this.products.alisToplam = parseFloat(this.products.miktar) * parseFloat(this.products.alisFiyati);

            // @ts-ignore
            this.getProductionsDetailModel.siparisUrunler.push(this.products);
            if (!this.getProductionsNewButton) {
                // @ts-ignore
                this.getProductionsDetailModel.urunlerDegisenler.push(this.products);
            };
            useProductionsStore().product_total_load_act(this.getProductionsDetailModel);
            useProductionsStore().products_save_button_status_load_act(false);
            // @ts-ignore
            this.sumProducts(this.getProductionsDetailModel.siparisUrunler);
            this.buttonReset();
            this.resetData();
            this.emitter.emit("suppliers", this.getProductionsDetailModel.siparisUrunler);

        },
        deleteForm() {
            // @ts-ignore
            this.getProductionsDetailModel.urunlerSilinenler.push(this.products);
            // @ts-ignore
            const index = this.findIndex(this.products.id, this.getProductionsDetailModel.siparisUrunler);
            // @ts-ignore
            this.getProductionsDetailModel.siparisUrunler.splice(index, 1);
            useProductionsStore().product_total_load_act(this.getProductionsDetailModel);
            useProductionsStore().products_save_button_status_load_act(false);
            // @ts-ignore
            this.sumProducts(this.getProductionsDetailModel.siparisUrunler);
            this.buttonReset();
            this.resetData();
        },
        findIndex(id, productsList) {
            let index;
            for (let i = 0; i < productsList.length; i++){
                if (productsList[i].id == id) {
                    index = i;
                    break;
                }
            }
            return index
        },
        createId() {
          let result = "";
            let characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let charactersLength = characters.length;
            for (var i = 0; i < 8; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;  
        },
        addForm() {
            this.products.tedarikciId = this.selectedSupplier.id;
            this.products.tedarikciAdi = this.selectedSupplier.firmaAdi;
           
            this.products.urunBirimId = this.selectedUnit.id;
            this.products.urunbirimAdi = this.selectedUnit.birimAdi
            if (!this.products.id) {
                this.products.id = this.createId()

            };
            if (this.selectedUnit.id == 1) {
                this.products.m2 = this.products.miktar
                this.products.adet = 0
                this.products.mt = 0

            } else if (this.selectedUnit.id == 2) {
                this.products.adet = this.products.miktar
                this.products.m2 = 0
                this.products.mt = 0
            } else if (this.selectedUnit.id == 3) {
                this.products.mt = this.products.miktar
                this.products.adet = 0
                this.products.m2 = 0
            };
            this.products.satisToplam = parseFloat(this.products.miktar) * parseFloat(this.products.satisFiyati);
            // @ts-ignore
            this.getProductionsDetailModel.siparisUrunler.push(this.products);
            if (!this.getProductionsNewButton) {
                // @ts-ignore
                this.getProductionsDetailModel.urunlerYeni.push(this.products);
            };
            useProductionsStore().product_total_load_act(this.getProductionsDetailModel);
            useProductionsStore().products_save_button_status_load_act(false);
            // @ts-ignore
            this.sumProducts(this.getProductionsDetailModel.siparisUrunler);
            this.buttonReset();
            this.resetData();
        },
        resetData() {
            this.products = {
                miktar: 0,
                kasaAdet: 0,
                ozelMiktar: 0,
                satisFiyati: 0,
                alisFiyati_Tl: 0,
                alisFiyati: 0,
                ton:0,
                
            }
            this.productCard = {

            }
            this.selectedSupplier = {};
            this.selectedUnit = {};
            
        },
        sumProducts(list) {
            this.productsSum = {
                m2: 0,
                piece: 0,
                mt: 0,
                ton: 0,
                crate: 0,
                salesTotal: 0
            }
            for (let i of list) {
                this.productsSum.m2 += parseFloat(i.m2);
                this.productsSum.piece += parseFloat(i.adet);
                this.productsSum.mt += parseFloat(i.mt);
                this.productsSum.ton += parseFloat(i.ton);
                this.productsSum.crate += parseFloat(i.kasaAdet);
                this.productsSum.salesTotal += parseFloat(i.satisToplam);
            }
        }
    },
    mounted() {
        // @ts-ignore
        this.emitter.on('cardDialogClose', () => {
            this.product_card_form = false
        })
    },
    created() {
        if (!this.getProductionsNewButton) {
            this.workmanshipButton = true;
            // @ts-ignore
            this.sumProducts(this.getProductionsDetailModel.siparisUrunler);
        };
    },
}
</script>

<style scoped>

</style>