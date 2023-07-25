<template>
    <div class="row m-auto mt-4">
        <div class="col-3">
            <div class="row m-auto mt-4">
                <div class="col">
                    <span class="p-float-label">
                        <Calendar id="o_date" v-model="o_date" showIcon dateFormat="dd/mm/yy"/>
                        <label for="o_date">Tarih</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="source" v-model="selectedSource" :options="sources" optionLabel="source" class="w-100" @change="sourceSelected($event)"/>
                        <label for="source">Kaynak</label>
                    </span>
                </div>
            </div>
        <div class="row m-auto mt-4">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="shopper" v-model="selectedShopper" dropdown :suggestions="filteredOfferShopperList" optionLabel="musteriAdi" @complete="searchOfferShopper($event)" @item-select="offerShopperSelected($event)" @change="offerShopperChange($event)"/>
                    <label for="shopper">Müşteri</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Dropdown id="source" v-model="selectedOfferPlace" :options="offerPlaces" optionLabel="place" class="w-100" @change="offerPlaceSelected($event)"/>
                    <label for="source">Teklif Yeri</label>
                </span>
            </div>
        </div>
        <div class="row m-auto mt-4">
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="country" v-model="selectedCountry" dropdown :suggestions="filteredOfferCountryList" optionLabel="ulkeAdi" @complete="searchOfferCountry($event)" @item-select="offerCountrySelected($event)"/>
                    <label for="country">Ülke</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Dropdown id="source" v-model="selectedOfferPriority" :options="offerPriorities" optionLabel="priority" class="w-100" @change="offerPriorityChange($event)"/>
                    <label for="source">Teklif Öncelik</label>
                </span>
            </div>
        </div>
        </div>
        <div class="col-7">
            <TabView>
                <TabPanel header="Teklif Açıklama">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="getOfferModelList.aciklama"></textarea>
                        <label for="floatingTextarea2">Açıklama</label>
                    </div>
                </TabPanel>
                <TabPanel header="Hatırlatma Belge">
                    <div class="row m-auto mt-3">
                        <div class="col-3">
                            <Calendar v-model="r_date" showIcon @date-select="reminderDateSelected($event)" dateFormat="dd/mm/yy"/>
                        </div>
                        <div class="col-3">
                            <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" @select="onSelect($event)" :auto="true" chooseLabel="Gönder" />
                        </div>
                        <div class="col-3">
                            <a :href="offerFileLink">
                                <button type="button" class="pi pi-download w-25 h-100 btn btn-secondary" :disabled="offerFileDownloadDisable"></button>
                            </a>
                        </div>
                        <div class="col-3">
                                <button type="button" class="pi pi-trash w-25 h-100 btn btn-danger" @click="offerFileDelete" :disabled="offerFileDeleteDisable"></button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header="Proforma - Numune">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <button type="button" class="btn btn-primary" @click="offer_proforma_form = true" :disabled="offerProformaDisabled">Proforma</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-secondary" @click="offer_sample_form = true" :disabled="offerSampleDisabled">Numune</button>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>
        <div class="col-2">
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success" @click="offerProcess" :disabled="offer_save_disabled">Kaydet</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger" @click="deleteForm">Sil</button>
                </div>
            </div>
            <div class="row m-auto mt-3 ">
                <div class="col">
                    <div class="form-check ">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getOfferModelList.takipEt">
                        <label class="form-check-label" for="flexCheckDefault">
                            Takip Et
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <span class="p-float-label">
                <InputText id="username" v-model="getOfferModelList.company" @input="selectedShopper.company = $event.target.value"/>
                <label for="username">Şirket</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="username" v-model="getOfferModelList.email" @input="selectedShopper.email = $event.target.value"/>
                <label for="username">Mail</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="username" v-model="getOfferModelList.phone" @input="selectedShopper.phone = $event.target.value"/>
                <label for="username">Telefon</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <InputText id="username" v-model="getOfferModelList.adress" @input="selectedShopper.adress = $event.target.value"/>
                <label for="username">Adres</label>
            </span>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <offerProductForm/>
        </div>
    </div>
    <Dialog v-model:visible="offer_proforma_form" header="" modal>
        <offerProformaForm/>
    </Dialog>
    <Dialog v-model:visible="offer_sample_form" header="" modal> 
        <offerSampleForm/>
    </Dialog>
    
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { offerService } from '../../services/offerService';
import { fileService } from '../../services/fileService';
import { localDateService } from '../../services/localDateService';
import { socket } from '../../services/customServices/realTimeService';

import offerProformaForm from './offerProformaForm.vue';
import offerSampleForm from './offerSampleForm.vue';
import offerProductForm from './offerProductForm.vue';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferModelList',
            'getOfferProductModelList',
            'getOfferCategoryList',
            'getOfferProductList',
            'getOfferLengthList',
            'getOfferEdgeList',
            'getOfferSurfaceList',
            'getOfferShopperList',
            'getOfferCountryList',
            'getOfferNewButton',
            'getOfferProductsList',
            'getOfferDeletingProductsList',
            'getOfferAddingProductsList',
            'getOfferUpdatingProductsList',
            'getOfferAllButton'
        ])
    },
    components:{
        offerProformaForm,
        offerSampleForm,
        offerProductForm
    },
    data() {
        return {
            offer_save_disabled:false,
            o_date: new Date(),
            selectedSource: {},
            sources: [
                { id: 1, source: "Portföy" },
                { id: 2, source: "Site" },
                { id: 3, source: "Stone Contact" },
                { id: 4, source: "Fuar" },
                { id: 5, source: "Email" },
                { id: 6, source: "BGP Network" },
                { id: 7, source: "Ziyaret" },
                { id: 8, source: "Stone Add" },
            ],
            filteredOfferShopperList: [],
            selectedShopper: null,
            selectedOfferPlace: {},
            offerPlaces: [
                { id: 1, place: "Mail" },
                { id: 2, place: "WhatsApp" },
                { id: 3, place: "Mail-Efes" },
            ],
            filteredOfferCountryList: [],
            selectedCountry: null,
            selectedOfferPriority: {},
            offerPriorities: [
                { id: 1, priority: "A" },
                { id: 2, priority: "B" },
                { id: 3, priority: "C" },
                { id: 4, priority: "Toplantı" },
            ],
            r_date: null,
            offerFileLink: null,
            offerFileDownloadDisable: true,
            offerFileDeleteDisable: true,
            offer_proforma_form: false,
            offer_sample_form:false,
            offerProformaDisabled: true,
            offerSampleDisabled: true,
            customerUpdateList: [],
        }
    },
    created() {
        if (!this.getOfferNewButton) {
            this.offerCreatedProcess();
        }
    },
    methods: {
        dateControl(value) {
            if (value == null || value== "NaN-NaN-NaN" || value == "") {
                return null;
            } else {
                const date = localDateService.getDateString(value).split('-');
                return date[2] + '-' + date[1] + '-' + date[0];
            }
        },
        dateNullControl(value) {
            if (value == null || value == "" || value == "NaN-NaN-NaN") {
                return null;
            } else {
                return localDateService.getDateString(value);
            }
        },
        offerCreatedProcess() {
            this.offerProformaDisabled = false;
            this.offerSampleDisabled = false;
            this.o_date = localDateService.getStringDate(this.getOfferModelList.tarih);
            this.selectedSource = this.sources.find(x => x.source == this.getOfferModelList.kaynakYeri);
            this.selectedShopper = this.getOfferShopperList.find(x => x.id == this.getOfferModelList.musteriId);
            this.selectedOfferPlace = this.offerPlaces.find(x => x.place == this.getOfferModelList.teklifYeri);
            this.selectedCountry = this.getOfferCountryList.find(x => x.id == this.selectedShopper.ulkeId);
            this.selectedOfferPriority = this.offerPriorities.find(x => x.priority == this.getOfferModelList.teklifOncelik);
            if (this.getOfferModelList.hatirlatmaTarihi == null || this.getOfferModelList.hatirlatmaTarihi == 'NaN/NaN/NaN' || this.getOfferModelList.hatirlatmaTarihi == '' || this.getOfferModelList.hatirlatmaTarihi == ' ' || this.getOfferModelList.hatirlatmaTarihi == undefined) {
                this.r_date = null;
            } else {
                this.r_date = localDateService.getStringDate(this.getOfferModelList.hatirlatmaTarihi);
            };
            if (this.getOfferModelList.teklifCloud) {
            this.offerFileDownloadDisable = false;
            this.offerFileDeleteDisable = false;
            this.offerFileLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${this.getOfferModelList.id}/${this.getOfferModelList.teklifCloudDosya}`;

            };
        },
        offerFileDelete() {
            offerService.deleteOfferFile(this.getOfferModelList.id).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                };
            });
        },
        reminderDateSelected(event) {
            this.getOfferModelList.hatirlatmaTarihi = localDateService.getDateString(event);
            this.getOfferModelList.hatirlatmaDurum = 1;
        },
        onSelect(event) {

            fileService.offerFile(event.files[0], this.getOfferModelList.id).then((data) => {
                if (data.Status) {
                    this.getOfferModelList.teklifCloud = true;
                    this.getOfferModelList.teklifCloudDosya = data.dosyaAdi;

                    offerService.setOfferFile(this.getOfferModelList).then((veri) => {
                        if (veri.status) {
                            this.offerFileLink = `https://file-service.mekmar.com/file/download/teklif/teklifDosya/${this.getOfferModelList.id}/${this.getOfferModelList.teklifCloudDosya}`;
                            this.offerFileDownloadDisable = false;
                            this.offerFileDeleteDisable = false;
                        }
                    });
                };
            });

        },
        save() {
            useLoadingStore().begin_loading_act();
            this.offer_save_disabled = true;
            this.getOfferModelList.kullaniciAdi = localStorage.getItem('username');
            this.getOfferModelList.kullaniciId = localStorage.getItem('userId');
            this.getOfferModelList.tarih = this.dateNullControl(this.o_date);
            this.getOfferModelList.hatirlatmaTarihi = this.dateNullControl(this.r_date);
            this.getOfferModelList.numuneHatirlatmaTarihi = this.dateNullControl(this.getOfferModelList.numuneHatirlatmaTarihi);
            this.getOfferModelList.numuneGirisTarihi = this.dateNullControl(this.getOfferModelList.numuneGirisTarihi);
            this.getOfferModelList.hatirlatmaTarihi = this.dateNullControl(this.getOfferModelList.hatirlatmaTarihi);

            this.getOfferModelList.takipEt = 1;
            const data = {
                teklif: this.getOfferModelList,
                urunler: this.getOfferProductsList,
                hatirlatmaDurumu: true,
            };
            offerService.save(data).then(data => {
                if (data.status) {
                    socket.socketIO.emit('offer_list_emit');
                    socket.socketIO.emit('offer_detail_list_all_emit');


                    this.emitter.emit('offer_detail_dialog_close');
                    this.offer_save_disabled = false;
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.offer_save_disabled = false;
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            useLoadingStore().begin_loading_act();
            this.offer_save_disabled = true;
            this.customerControl(this.selectedShopper);
            this.getOfferModelList.tarih = this.dateNullControl(this.o_date);
            this.getOfferModelList.hatirlatmaTarihi = this.dateNullControl(this.r_date);
            this.getOfferModelList.numuneHatirlatmaTarihi = this.dateNullControl(this.getOfferModelList.numuneHatirlatmaTarihi);
            this.getOfferModelList.numuneGirisTarihi = this.dateNullControl(this.getOfferModelList.numuneGirisTarihi);
            this.getOfferModelList.hatirlatmaTarihi = this.dateNullControl(this.getOfferModelList.hatirlatmaTarihi);
            const data = {
                'teklif': this.getOfferModelList,
                'eklenenUrunler': this.getOfferAddingProductsList,
                'guncellenenUrunler': this.getOfferUpdatingProductsList,
                'silinenUrunler': this.getOfferDeletingProductsList,
                'guncellenenMusteri': this.customerUpdateList,
                'kullaniciAdi': localStorage.getItem('username'),
            };
            offerService.update(data).then(data => {
                if (data.status) {
                    socket.socketIO.emit('offer_list_emit');
                    socket.socketIO.emit('offer_detail_list_all_emit');
                    this.offer_save_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    this.offer_save_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                };
            });
        },
        deleteForm() {
            useLoadingStore().begin_loading_act();
            offerService.delete(this.getOfferModelList.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('offer_list_emit');
                    socket.socketIO.emit('offer_detail_list_emit');
                    this.emitter.emit('offer_detail_dialog_close');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    useLoadingStore().end_loading_act();
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                    useLoadingStore().end_loading_act();
                };
            });
        },
        offerProcess() {
            if (this.getOfferNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        offerPriorityChange(event) {
            this.getOfferModelList.teklifOncelik = event.value.priority;
        },
        offerCountrySelected(event) {
            this.getOfferModelList.ulkeId = event.value.id;
        },
        searchOfferCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferCountryList;
            } else {
                result = this.getOfferCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferCountryList = result;
        },
        offerPlaceSelected(event) {
            this.getOfferModelList.teklifYeri = event.value.place;
        },
        offerShopperChange(event) {
            let customer;
            if (Object.getPrototypeOf(event.value) === String.prototype) {
                customer = this.getOfferShopperList.find(x => x.musteriAdi == event.value);
            }else{
                customer = this.getOfferShopperList.find(x => x.musteriAdi == event.value.musteriAdi);
            }

            if (!customer) {
                this.getOfferModelList.musteriId = null;
                this.getOfferModelList.musteriAdi = event.value;
            } else {
                this.getOfferModelList.musteriAdi = event.value.musteriAdi;

            }
        },
        offerShopperSelected(event) {
            this.getOfferModelList.musteriId = event.value.id;
            this.getOfferModelList.ulkeId = event.value.ulkeId;
            this.selectedCountry = this.getOfferCountryList.find(x => x.id == event.value.ulkeId);
            this.getOfferModelList.company = event.value.company;
            this.getOfferModelList.email = event.value.email;
            this.getOfferModelList.phone = event.value.phone;
            this.getOfferModelList.adress = event.value.adress;
        },
        searchOfferShopper(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOfferShopperList;
            } else {
                result = this.getOfferShopperList.filter(x => {
                    return x.musteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredOfferShopperList = result;
        },
        sourceSelected(event) {
            this.getOfferModelList.kaynakYeri = event.value.source;
        },
        customerControl(customer) {
            this.customerUpdateList = [];
            this.customerUpdateList.push(customer);
        },
    }
}
</script>