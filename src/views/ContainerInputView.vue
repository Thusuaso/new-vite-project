<template>
    <div class="row m-auto">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="newCompany">Yeni Firma</button>
        </div>
    </div>
    <div class="row m-auto mt-5">
        <div class="col">
            <span class="p-float-label">
                <AutoComplete id="company" v-model="selectedContainerCompany" dropdown :suggestions="filteredContainerInputCompanyList" optionLabel="firma_adi" @complete="searchContainerCompany($event)" @item-select="containerCompanySelected($event)"/>
                <label for="company">Firma Seç</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                    <AutoComplete id="product" v-model="selectedContainerProduct" dropdown :suggestions="filteredContainerInputProductList" optionLabel="siparisno" @complete="searchContainerProduct($event)" @item-select="containerProductSelected($event)"/>
                    <label for="product">Po Seç</label>
                </span>
        </div>
        <div class="col">
            <Dropdown v-model="selectedInvoice" :options="invoiceKindList" optionLabel="name" placeholder="Fatura Tür Seç" class="w-full md:w-14rem" />
        </div>
        <div class="col">
            <Calendar v-model="c_date" showIcon  @date-select="containerDateSelect($event)" dateFormat="dd/mm/yy"/>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Fatura No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerModel.faturaNo">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">₺</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerModel.Tutar_tl" @input="containerTlInput($event)">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Kur</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerModel.kur">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">$</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerModel.Tutar_dolar" @input="containerUsdInput($event)">
            </div>
        </div>
    </div>
       <div class="row m-auto mt-3">
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="containerModel.aciklama"></textarea>
                    <label for="floatingTextarea2">Açıklama</label>
                </div>
            </div>
        </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-primary w-100" @click="newForm" :disabled="new_disabled_form">Yeni Kayıt</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="save" :disabled="save_disabled_form">Kaydet</button>
        </div>
        
    </div>
 

    <div class="row m-auto mt-3">
        <div class="col">
            <FileUpload mode="basic" accept=".pdf" chooseLabel="Evrak Yükle" :maxFileSize="1000000" @select="uploadContainerFile($event)" class="bg-black bg-gradient" :disabled="file_disabled_form" />
        </div>
    </div>

    <Dialog v-model:visible="new_company_form" header="Yeni Firma" modal>
        <company />
    </Dialog>
</template>
<script>

import { useContainerStore } from '../stores/container';
import { useShippingStore } from '../stores/shipping';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { containerService } from '../services/containerService';
import { localDateService } from '../services/localDateService';
import { shippingService } from '../services/shippingService';
import { fileService } from '../services/fileService';
import company from '../components/shipping/company.vue';

export default {
    computed: {
        ...mapState(useContainerStore, [
            'getContainerInputCompanyList',
            'getContainerInputProductList'
        ])
    },
    components: {
        company
    },
    data() {
        return {
            selectedContainerCompany: null,
            filteredContainerInputCompanyList: [],
            selectedContainerProduct: null,
            filteredContainerInputProductList: [],
            invoiceKindList: [
                { id: 73, name: "İlaçlama" },
                { id: 7, name: "Gümrük" },
                { id: 13, name: "Navlun" },
                { id: 9, name: "Liman" },
                { id: 100, name: "Lashing" },
                { id: 101, name: "Booking" },
                { id: 102, name: "Spanzet" }

            ],
            selectedInvoice: {},
            c_date: new Date(),
            containerModel: {
                'tarih': '',
                'Firma_id': 0,
                'faturano': '',
                'kur': 0,
                'siparisno': '',
                'Tutar_dolar': 0,
                'fatura_tur_list': {},
                'Tutar_tl': 0,
                'urunID': 0,
                'kullaniciid': 0,
                'aciklama':''
            },
            new_company_form: false,
            file_disabled_form: true,
            save_disabled_form: false,
            new_disabled_form:true,
            invoiceId: 0,
            invoiceNo: 0,
            companyId: 0,
            
        }
    },
    methods: {
        newForm() {
            this.reset();
            this.save_disabled_form = true;
            this.save_disabled_form = false;
        },
        uploadContainerFile(event) {
            useLoadingStore().begin_loading_act();
            this.containerModel.urunID = this.invoiceId;
            this.containerModel.kullaniciid = localStorage.getItem('userId');
            fileService.sendInvoiceShipping(event.files[0],this.companyId,this.invoiceNo + '.pdf').then(data => {
                if (data) {
                    containerService.informationSave(this.containerModel).then(data => {
                        if (data.status) {
                            this.reset();
                            useLoadingStore().end_loading_act();

                            this.$toast.add({ severity: 'success', detail: 'Başarıyla Yüklendi', life: 3000 });
                        } else {
                            useLoadingStore().end_loading_act();
                            this.$toast.add({ severity: 'error', detail: 'Yükleme Başarısız', life: 3000 });
                        };
                    });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Yükleme Başarısız', life: 3000 });
                };
            })
        },
        newCompany() {
            useLoadingStore().begin_loading_act();
            shippingService.getCompanyList().then(data => {
                useShippingStore().shipping_company_list_detail_load_act(data);
                this.new_company_form = true;
                useLoadingStore().end_loading_act();
            })
        },  
        save() {
            useLoadingStore().begin_loading_act();
            this.containerModel.fatura_tur_list = this.selectedInvoice;
            containerService.save(this.containerModel).then(data => {
                if (data.status) {
                    this.invoiceId = data.invoiceId;
                    this.companyId = data.companyId;
                    this.invoiceNo = data.invoiceNo;
                    this.file_disabled_form = false;
                    this.save_disabled_form = true;
                    this.new_disabled_form = false;
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi, Lütfen Gerekli Evrağı Yükleyiniz', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        },
        containerUsdInput(event) {
            this.containerModel.Tutar_tl = (event.target.value * this.containerModel.kur).toFixed(2);
        },
        containerTlInput(event) {
            this.containerModel.Tutar_dolar = (event.target.value / this.containerModel.kur).toFixed(2);
        },
        containerDateSelect(event) {
            useLoadingStore().begin_loading_act();
            this.containerModel.tarih = localDateService.getDateString(event);
            containerService.getCurrency(event.getFullYear(), event.getMonth() + 1, event.getDate()).then(data => {
                this.containerModel.kur = data.result;
                useLoadingStore().end_loading_act();
            });
        },
        containerProductSelected(event) {
            this.containerModel.siparisno = event.value.siparisno;
        },
        searchContainerProduct(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getContainerInputProductList;
            } else {
                result = this.getContainerInputProductList.filter(x => {
                    return x.siparisno.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredContainerInputProductList = result;
        },
        containerCompanySelected(event) {
            this.containerModel.Firma_id = event.value.Firma_id;
        },
        searchContainerCompany(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getContainerInputCompanyList;
            } else {
                result = this.getContainerInputCompanyList.filter(x => {
                    return x.firma_adi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredContainerInputCompanyList = result;
        },
        reset() {
            this.containerModel = {
                'tarih': '',
                'Firma_id': 0,
                'faturano': '',
                'kur': 0,
                'siparisno': '',
                'Tutar_dolar': 0,
                'fatura_tur_list': {},
                'Tutar_tl': 0,
                'urunID': 0,
                'kullaniciid': 0,
            };
        }
    }

}  
</script>
<style scoped>

</style>