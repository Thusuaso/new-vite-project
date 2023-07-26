<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Ürün Bilgileri</h5>
                    <p class="card-text">
                        <div class="row m-auto mt-3">
                            <div class="col">
                                <span class="p-float-label mb-4 mt-4">
                                    <AutoComplete id="category" class="w-100" v-model="selectedCategory" dropdown :suggestions="filteredCategoryList" optionLabel="name" @complete="categorySearch($event)" @item-select="categorySelected($event)"/>
                                    <label for="category">Kategori</label>
                                </span>
                            </div>
                            <div class="col">
                                <span class="p-float-label mb-4 mt-4">
                                    <AutoComplete id="category" class="w-100" v-model="selectedUnit" dropdown :suggestions="filteredUnitList" optionLabel="name" @complete="unitSearch($event)" @item-select="unitSelected($event)"/>
                                    <label for="category">Birim</label>
                                </span>
                            </div>
                            <div class="col">
                                <div class="input-group mb-4 mt-4" >
                                    <span class="input-group-text" id="basic-addon1">Miktar</span>
                                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getSampleModel.Miktar" >
                                </div>
                            </div>
                        </div>
                    </p>
                </div>
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Ödeme Bilgileri</h5>
                            <p class="card-text">
                                <div class="row m-auto mt-3">
                                    <div class="col-3">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Gönderi Tipi
                                                </div>
                                                <div class="card-text">
                                                    <div class="form-check mb-3" v-for="item of bankSendList" :key="item">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="item" v-model="selectedBankSend" @input="bankSendSelected($event)" >
                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                            {{ item.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div class="col-2">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Banka Seçimi
                                                </div>
                                                <div class="card-text">
                                                    <div class="form-check mb-3" v-for="item of bankList" :key="item">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" :value="item" v-model="selectedBank" @input="bankSelected($event)" :disabled="bank_disabled">
                                                        <label class="form-check-label" for="flexRadioDefault2">
                                                            {{ item.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Kurye Detay
                                                </div>
                                                <div class="card-text">
                                                    <div class="row m-auto mt-3">
                                                        <div class="col-6">
                                                            <div class="card">
                                                                <div class="card-body">
                                                                    <div class="card-title">
                                                                        Kurye Alış
                                                                    </div>
                                                                    <div class="card-text">
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="usd" v-model="getSampleModel.kuryeAlis" @input="getSampleModel.kuryeAlis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="usd">$</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="eur" v-model="getSampleModel.Euro_Alis" @input="getSampleModel.Euro_Alis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="eur">€</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="tl" v-model="getSampleModel.TL_Alis" @input="getSampleModel.TL_Alis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="tl">₺</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        </div>
                                                        <div class="col-6">
                                                            <div class="card">
                                                                <div class="card-body">
                                                                    <div class="card-title">
                                                                        Kurye Satış
                                                                    </div>
                                                                    <div class="card-text">
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="usd" v-model="getSampleModel.kuryeSatis" @input="getSampleModel.kuryeSatis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="usd">$</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="eur" v-model="getSampleModel.Euro_Satis" @input="getSampleModel.Euro_Satis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="eur">€</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="tl" v-model="getSampleModel.TL_Satis" @input="getSampleModel.TL_Satis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="tl">₺</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getSampleModel.aciklama"></textarea>
                    <label for="floatingTextarea2">Not</label>
                </div>
            </div>
        </div>
    </div>
    <div v-if="getMobile">
        <h4>Ödeme Bilgileri</h4>
        <span class="p-float-label mb-4 mt-4">
            <AutoComplete id="category" class="w-100" v-model="selectedCategory" dropdown :suggestions="filteredCategoryList" optionLabel="name" @complete="categorySearch($event)" @item-select="categorySelected($event)"/>
            <label for="category">Kategori</label>
        </span>
        <span class="p-float-label mb-4 mt-4">
            <AutoComplete id="category" class="w-100" v-model="selectedUnit" dropdown :suggestions="filteredUnitList" optionLabel="name" @complete="unitSearch($event)" @item-select="unitSelected($event)"/>
            <label for="category">Birim</label>
        </span>
        <div class="input-group mb-4 mt-4" >
            <span class="input-group-text" id="basic-addon1">Miktar</span>
            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getSampleModel.Miktar" >
        </div>
        
        <div class="row m-auto mt-3">
                <div class="">
                    <div class="">
                        <div class="card-body">
                            <h5 class="card-title">Ödeme Bilgileri</h5>
                            <p class="card-text">
                                <div class="m-auto mt-3">
                                    <div class="">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Gönderi Tipi
                                                </div>
                                                <div class="card-text">
                                                    <div class="form-check mb-3" v-for="item of bankSendList" :key="item">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" :value="item" v-model="selectedBankSend" @input="bankSendSelected($event)" >
                                                        <label class="form-check-label" for="flexRadioDefault1">
                                                            {{ item.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div class="">
                                        <div class="card h-100">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Banka Seçimi
                                                </div>
                                                <div class="card-text">
                                                    <div class="form-check mb-3" v-for="item of bankList" :key="item">
                                                        <input class="form-check-input" type="radio" name="flexRadioDefault1" id="flexRadioDefault2" :value="item" v-model="selectedBank" @input="bankSelected($event)" :disabled="bank_disabled">
                                                        <label class="form-check-label" for="flexRadioDefault2">
                                                            {{ item.name }}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="card-title fw-bold">
                                                    Kurye Detay
                                                </div>
                                                <div class="card-text">
                                                    <div class=" m-auto mt-3">
                                                        <div class="">
                                                            <div class="card">
                                                                <div class="card-body">
                                                                    <div class="card-title">
                                                                        Kurye Alış
                                                                    </div>
                                                                    <div class="card-text">
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="usd" v-model="getSampleModel.kuryeAlis" @input="getSampleModel.kuryeAlis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="usd">$</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="eur" v-model="getSampleModel.Euro_Alis" @input="getSampleModel.Euro_Alis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="eur">€</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="tl" v-model="getSampleModel.TL_Alis" @input="getSampleModel.TL_Alis = $filters.formatPoint($event.target.value)" :disabled="courier_purchase"/>
                                                                            <label for="tl">₺</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        
                                                        </div>
                                                        <div class="">
                                                            <div class="card">
                                                                <div class="card-body">
                                                                    <div class="card-title">
                                                                        Kurye Satış
                                                                    </div>
                                                                    <div class="card-text">
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="usd" v-model="getSampleModel.kuryeSatis" @input="getSampleModel.kuryeSatis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="usd">$</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="eur" v-model="getSampleModel.Euro_Satis" @input="getSampleModel.Euro_Satis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="eur">€</label>
                                                                        </span>
                                                                        <span class="p-float-label mt-4 mb-4">
                                                                            <InputText id="tl" v-model="getSampleModel.TL_Satis" @input="getSampleModel.TL_Satis = $filters.formatPoint($event.target.value)" :disabled="courier_sales"/>
                                                                            <label for="tl">₺</label>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
        </div>
        <div class="m-auto mt-3">
            <div class="">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getSampleModel.aciklama"></textarea>
                    <label for="floatingTextarea2">Not</label>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import { useSampleStore } from '../../../stores/sample';
import { useMobilStore } from '../../../stores/mobil';
import { mapState } from 'pinia';
export default {
    props:['model'],
    computed: {
        ...mapState(useSampleStore, [
            'getSampleCategoryList',
            'getSampleUnitList',
            'getSampleModel',
            'getSampleNewButton'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            selectedCategory: null,
            filteredCategoryList: [],
            selectedUnit: null,
            filteredUnitList: [],
            bankSendList: [
                { 'id': 1, 'name': 'Customer Account' },
                { 'id': 2, 'name': 'Customer Paid to Mekmar' },
                { 'id': 3, 'name': 'Mekmar Paid' },
            ],
            selectedBankSend: {},
            bankList: [
                { 'id': 1, 'name': 'Maya Paypal' },
                { 'id': 2, 'name': 'Maya Bank' },
                { 'id': 3, 'name': 'Mekmar Bank' },
            ],
            selectedBank: {},
            bank_disabled: true,
            courier_purchase: true,
            courier_sales: true,
        }
    },
    created() {
        if (!this.getSampleNewButton) {
            this.infoCreatedProcess();
        }
    },
    methods: {
        infoCreatedProcess() {
            this.selectedCategory = this.getSampleCategoryList.find(x => x.id == this.getSampleModel.kategoriId);
            this.selectedUnit = this.getSampleUnitList.find(x => x.name == this.getSampleModel.urunBirim);
            this.selectedBankSend = this.bankSendList.find(x => x.id == this.getSampleModel.gonderiId);
            this.selectedBank = this.bankList.find(x => x.id == this.getSampleModel.bankaId);
            if (this.getSampleModel.gonderiId == 2) {
                this.bank_disabled = false;
                this.courier_purchase = false;
                this.courier_sales = false;

            } else if (this.getSampleModel.gonderiId == 3) {
                this.courier_purchase = false;
                this.courier_sales = true;
            } else if (this.getSampleModel.gonderiId == 1){
                this.courier_purchase = true;
                this.courier_sales = true;
            }

        },
        bankSelected(event) {
            this.getSampleModel.bankaAdi = event.target._value.name;
            this.getSampleModel.bankaId = event.target._value.id;

        },
        bankSendSelected(event) {
            this.getSampleModel.gonderiId = event.target._value.id;
            this.getSampleModel.gonderiAdi = event.target._value.name;
            if (event.target._value.id == 1) {
                this.bank_disabled = true;
                this.courier_purchase = true;
                this.courier_sales = true;
            } else if (event.target._value.id == 2) {
                this.bank_disabled = false;
                this.courier_purchase = false;
                this.courier_sales = false;
            } else if (event.target._value.id == 3) {
                this.bank_disabled = false;
                this.courier_purchase = false;
                this.courier_sales = true;
            }
        },
        unitSelected(event) {
            this.getSampleModel.urunBirim = event.value.name;
            this.getSampleModel.urunBirimId = event.value.id;
        },
        unitSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSampleUnitList;
            } else {
                result = this.getSampleUnitList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredUnitList = result;
        },
        categorySelected(event) {
            this.getSampleModel.kategoriAdi = event.value.name;
            this.getSampleModel.kategoriId = event.value.id;
        },
        categorySearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSampleCategoryList;
            } else {
                result = this.getSampleCategoryList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCategoryList = result;
        }
    }
}
</script>
<style scoped>

</style>