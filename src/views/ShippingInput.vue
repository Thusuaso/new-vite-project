<template>
    <div v-if="!getMobile">
            <div class="row m-auto">
            <div class="col">
                <button type="button" class="btn btn-primary" @click="newCompanyList">Yeni Firma</button>
            </div>
        </div>
        <div class="row m-auto mt-5">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="company" v-model="selectedCompany" dropdown :suggestions="filteredCompanyList" optionLabel="firma_adi" @complete="searchCompany($event)" @item-select="companySelected($event)"/>
                    <label for="company">Firma Seç</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Calendar id="date" v-model="s_date" showIcon @date-select="shippingDateSelect($event)" dateFormat="dd/mm/yy"/>
                    <label for="date">Tarih</label>
                </span>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fatura No</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.faturaNo">
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="po" v-model="selectedPo" dropdown :suggestions="filteredPoList" optionLabel="siparisno" @complete="searchPo($event)" @item-select="poSelected($event)" :disabled="!is_company_selected"/>
                    <label for="po">Sipariş No</label>
                </span>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">₺</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.Tutar_tl" :disabled="!is_company_selected" @input="shippingTlInput($event)">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Kur</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.kur" disabled>
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">$</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.Tutar_dolar" disabled>
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3 text-center">
            <div class="col">
                <button type="button" class="btn btn-primary" @click="newForm">Yeni</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success" @click="save">Kaydet</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-warning" @click="update">Değiştir</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-danger" @click="deleteForm">Sil</button>
            </div>
        </div> 
        <div class="row m-auto mt-3">
            <div class="col">
                <DataTable 
                    :value="newShippingList" 
                    v-model:selection="selectedNewShipping"
                    selectionMode="single"
                    @row-click="newShippingSelected($event)"
                    sortField="siparisno"
                    :sortOrder="-1"
                    style="font-size:85%;"
                >
                    <Column field="siparisno" header="Po"></Column>
                    <Column field="Tutar_tl" header="₺">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.Tutar_tl) }}
                        </template>
                    </Column>
                    <Column field="Tutar_dolar" header="$">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.Tutar_dolar) }}
                        </template>
                    </Column>
                    <Column field="kur" header="Kur">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.kur) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="row m-auto mt-3 w-100">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="informationSave" :disabled="save_disabled_form">Kaydet</button>
            </div>
        </div>
        <div class="row m-auto mt-3 w-100">
            <div class="col">
                <FileUpload mode="basic" accept=".pdf" :maxFileSize="1000000" @select="uploadDocument($event)" chooseLabel="Evrak Yükle" class="bg-black bg-gradient" :disabled="file_disabled_form"/>
            </div>
        </div>
    </div>

        <div v-if="getMobile">
                <div class=" m-auto">
                <div class="">
                    <button type="button" class="btn btn-primary w-100 mb-3" @click="newCompanyList">Yeni Firma</button>
                </div>
            </div>
            <div class=" m-auto mt-5">
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="company" v-model="selectedCompany" dropdown :suggestions="filteredCompanyList" optionLabel="firma_adi" @complete="searchCompany($event)" @item-select="companySelected($event)"/>
                        <label for="company">Firma Seç</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label">
                        <Calendar id="date" class="w-100 mb-3" v-model="s_date" showIcon @date-select="shippingDateSelect($event)" dateFormat="dd/mm/yy"/>
                        <label for="date">Tarih</label>
                    </span>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Fatura No</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.faturaNo">
                    </div>
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <span class="p-float-label">
                        <AutoComplete class="w-100 mb-3" id="po" v-model="selectedPo" dropdown :suggestions="filteredPoList" optionLabel="siparisno" @complete="searchPo($event)" @item-select="poSelected($event)" :disabled="!is_company_selected"/>
                        <label for="po">Sipariş No</label>
                    </span>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">₺</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.Tutar_tl" :disabled="!is_company_selected" @input="shippingTlInput($event)">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Kur</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.kur" disabled>
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">$</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="shippingModel.Tutar_dolar" disabled>
                    </div>
                </div>
            </div>
            <div class=" m-auto mt-3 text-center">
                <div class="">
                    <button type="button" class="btn btn-primary w-100 mb-3" @click="newForm">Yeni</button>
                </div>
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="save">Kaydet</button>
                </div>
                <div class="">
                    <button type="button" class="btn btn-warning w-100 mb-3" @click="update">Değiştir</button>
                </div>
                <div class="">
                    <button type="button" class="btn btn-danger w-100 mb-3" @click="deleteForm">Sil</button>
                </div>
            </div> 
            <div class=" m-auto mt-3">
                <div class="">
                    <DataTable 
                        :value="newShippingList" 
                        v-model:selection="selectedNewShipping"
                        selectionMode="single"
                        @row-click="newShippingSelected($event)"
                        sortField="siparisno"
                        :sortOrder="-1"
                        style="font-size:85%;"
                    >
                        <Column field="siparisno" header="Po"></Column>
                        <Column field="Tutar_tl" header="₺">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.Tutar_tl) }}
                            </template>
                        </Column>
                        <Column field="Tutar_dolar" header="$">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.Tutar_dolar) }}
                            </template>
                        </Column>
                        <Column field="kur" header="Kur">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.kur) }}
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
            <div class=" m-auto mt-3 w-100">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="informationSave" :disabled="save_disabled_form">Kaydet</button>
                </div>
            </div>
            <div class=" m-auto mt-3 w-100">
                <div class="">
                    <FileUpload mode="basic" accept=".pdf" :maxFileSize="1000000" @select="uploadDocument($event)" chooseLabel="Evrak Yükle" class="bg-black bg-gradient w-100 mb-3" :disabled="file_disabled_form"/>
                </div>
            </div>
        </div>

    <Dialog v-model:visible="new_company_form" header="Yeni Firma Ekle" modal :style="{ 'width': '100vw' }">
        <company />
    </Dialog>
</template>
<script>
import { useShippingStore } from '../stores/shipping';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { localDateService } from '../services/localDateService';
import { shippingService } from '../services/shippingService';
import { fileService } from '../services/fileService';
import { socket } from '../services/customServices/realTimeService';

import company from '../components/shipping/company.vue';

export default {
    computed: {
        ...mapState(useShippingStore, [
            'getShippingCompanyList',
            'getShippingProductList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    components: {
        company,
    },
    data() {
        return {
            selectedCompany: null,
            filteredCompanyList: [],
            s_date: new Date(),
            shippingModel: {
                'Firma_id': 0,
                'tarih': "",
                'faturaNo': "",
                'Tutar_tl': 0,
                'kur': 0,
                'Tutar_dolar': 0,
                'siparisno':0
            },
            selectedPo: null,
            filteredPoList: [],
            is_company_selected: false,
            newShippingList: [],
            selectedNewShipping: {},
            invoiceId: 0,
            invoiceName: "",
            new_company_form: false,
            file_disabled_form: true,
            save_disabled_form: false,
            company_id:0,
        }
    },
    methods: {
        newCompanyList() {
            useLoadingStore().begin_loading_act();
            shippingService.getCompanyList().then(data => {
                useShippingStore().shipping_company_list_detail_load_act(data);
                this.new_company_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        uploadDocument(event) {
            fileService.sendInvoiceShipping(event.files[0], this.company_id, this.invoiceName + '.pdf').then(data => {
                console.log(data);
                this.newShippingList[0].kullaniciId = localStorage.getItem('userId');
                shippingService.invoiceFileSave(this.newShippingList).then(data => {
                    if (data.status) {
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız' });
                    }
                })
            })
        },
        informationSave() {
            shippingService.informationSave(this.newShippingList).then(data => {
                if (data.status) {
                    this.invoiceId = data.invoice_id;
                    this.invoiceName = data.invoice_name;
                    this.save_disabled_form = true;
                    this.file_disabled_form = false;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi, Lütfen Gerekli Evrağı Yüklemeyi Unutmayınız', life: 3000 });
                }else{
                    this.$toast.add({ severity: 'error', detail: 'Kayıt Başarısız', life: 3000 });
                }
            })
        },
        update() {
            const index = this.findIndex(this.newShippingList, this.selectedCompany.Firma_id, this.selectedPo.siparisno);
            this.newShippingList.splice(index, 1);
            this.shippingModel.tarih = localDateService.getDateString(this.s_date);
            this.shippingModel.Firma_id = this.selectedCompany.Firma_id;
            this.shippingModel.siparisno = this.selectedPo.siparisno;
            this.newShippingList.push(this.shippingModel);
            this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi, Bilgileri Kaydetmeyi Unutmayınız', life: 3000 });
            this.reset();

        },
        newShippingSelected(event) {
            this.shippingModel = event.data;
            this.s_date = localDateService.getStringDate(event.data.tarih);
            this.selectedCompany = this.getShippingCompanyList.find(x => x.Firma_id == event.data.Firma_id);
            this.selectedPo = this.getShippingProductList.find(x => x.siparisno == event.data.siparisno);
        },
        save() {
            this.shippingModel.tarih = localDateService.getDateString(this.s_date);
            this.newShippingList.push(this.shippingModel);
            this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi, Bilgileri Kaydetmeyi Unutmayınız', life: 3000 });
            this.reset();
        },
        reset() {
            this.shippingModel = {
                'Firma_id': 0,
                'tarih': "",
                'faturaNo': "",
                'Tutar_tl': 0,
                'kur': 0,
                'Tutar_dolar': 0,
                'siparisno': 0
            };
            this.selectedCompany = null;
            this.selectedPo = null;
        },
        shippingTlInput(event) {
            this.shippingModel.Tutar_tl = this.$filters.formatPoint(event.target.value);
            this.shippingModel.Tutar_dolar = (this.shippingModel.Tutar_tl / this.shippingModel.kur).toFixed(2);
        },
        shippingDateSelect(event) {
            shippingService.getCurrency(event.getFullYear(), event.getMonth() + 1, event.getDate()).then(data => {
                this.shippingModel.kur = data.result;
            })
        },
        poSelected(event) {
            this.shippingModel.siparisno = event.value.siparisno;
        },
        searchPo(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShippingProductList;
            } else {
                result = this.getShippingProductList.filter(x => {
                    return x.siparisno.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredPoList = result;
        },
        companySelected(event) {
            this.shippingModel.Firma_id = event.value.Firma_id;
            this.company_id = event.value.Firma_id;
            this.is_company_selected = true;
        },
        searchCompany(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShippingCompanyList;
            } else {
                result = this.getShippingCompanyList.filter(x => {
                    return x.firma_adi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredCompanyList = result;
        },
        findIndex(data,companyId,po) {
            let index = 0;
            for (let item of data) {
                if (item.Firma_id == companyId && item.siparisno == po) {
                    break;
                } else {
                    index++;
                };
            };
            return index;

        }

    },
    mounted() {
        socket.socketIO.on('shipping_company_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            shippingService.getCompanyList().then(data => {
                useShippingStore().shipping_company_list_detail_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })
        
    }
}
</script>
<style scoped>

</style>