<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col-9">
                <div class="row m-auto mt-3">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Müşteri</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.musteri_adi">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Mail</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.mail_adresi">
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-3">
                    <div class="col">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getShopperModel.unvan"></textarea>
                            <label for="floatingTextarea2">Firma</label>
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-3">
                    <div class="col">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getShopperModel.adres"></textarea>
                            <label for="floatingTextarea2">Adres</label>
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-4">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Pazarlama</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.marketing">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Telefon</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.telefon">
                        </div>
                    </div>
                    <div class="col">
                        <span class="p-float-label">
                            <AutoComplete v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulke_adi" @complete="searchCountry($event)" @item-select="countrySelected($event)"/>
                            <label for="username">Ülke</label>
                        </span>
                    </div>
                
                </div>
                <div class="row m-auto mt-4">
                    <div class="col">
                        <span class="p-float-label">
                            <AutoComplete v-model="selectedRepresentative" dropdown :suggestions="filteredRepresentativeList" optionLabel="kullanici_adi" @complete="searchRepresentative($event)" @item-select="representativeSelected($event)"/>
                            <label for="username">Temsilci</label>
                        </span>
                    </div>
                    <div class="col">
                        <span class="p-float-label">
                            <AutoComplete v-model="selectedSeller" dropdown :suggestions="filteredSellerList" optionLabel="kullanici_adi" @complete="searchSeller($event)" @item-select="sellerSelected($event)"/>
                            <label for="username">Satışçı</label>
                        </span>
                    </div>
                    <div class="col">
                        <Dropdown v-model="selectedPriority" :options="priorityList" optionLabel="priority" placeholder="Öncelik Seç" @change="prioritySelected($event)" class="w-full md:w-14rem" />
                    </div>
                    <div class="col">
                        <span class="p-float-label">
                            <Dropdown id="source" v-model="selectedCustomerPlace" :options="sources" optionLabel="source" class="w-100"/>
                            <label for="source">Müşteri Yeri</label>
                        </span>
                    </div>
                </div>
                <div class="row m-auto mt-4 ">
                    <div class="col">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:100px;padding-top:35px;" v-model="getShopperModel.notlar"></textarea>
                            <label for="floatingTextarea">Not</label>
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-4">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.devir">
                            <label class="form-check-label" for="flexCheckDefault">
                                Devir
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.ozel">
                            <label class="form-check-label" for="flexCheckDefault">
                                Özel
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.takip">
                            <label class="form-check-label" for="flexCheckDefault">
                                Takip
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.sonkullanici">
                            <label class="form-check-label" for="flexCheckDefault">
                                Son Kullanıcı
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="row m-auto">
                    <div class="col">
                        <DataTable 
                        :value="getShopperBuyingList"
                        v-model:selection="selectedBuying"
                        selectionMode="single"
                        @row-click="buyingSelected($event)"
                        style="font-size:85%;"
                    >
                        <Column field="Yil" header="Yıl"></Column>
                        <Column field="Total" header="Toplam">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.Total) }}
                            </template>
                        </Column>
                    </DataTable>
                    </div>
                </div>
            
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="shopperProcess">Kaydet</button>
            </div>
            <div class="col" v-if="!getShopperNewButton">
                <button type="button" class="btn btn-danger w-100" @click="deleteShopper">Sil</button>
            </div>
        </div>
    </div>
    <div v-if="getMobile">
            <div class=" m-auto mt-3">
            <div class="">
                <div class=" m-auto mt-3">
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Müşteri</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.musteri_adi">
                        </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Mail</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.mail_adresi">
                        </div>
                    </div>
                </div>
                <div class=" m-auto mt-3">
                    <div class="">
                        <div class="form-floating">
                            <textarea class="form-control w-100" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getShopperModel.unvan"></textarea>
                            <label for="floatingTextarea2">Firma</label>
                        </div>
                    </div>
                </div>
                <div class=" m-auto mt-3">
                    <div class="">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getShopperModel.adres"></textarea>
                            <label for="floatingTextarea2">Adres</label>
                        </div>
                    </div>
                </div>
                <div class=" m-auto mt-4">
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Pazarlama</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.marketing">
                        </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Telefon</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperModel.telefon">
                        </div>
                    </div>
                    <div class="">
                        <span class="p-float-label">
                            <AutoComplete class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulke_adi" @complete="searchCountry($event)" @item-select="countrySelected($event)"/>
                            <label for="username">Ülke</label>
                        </span>
                    </div>
                
                </div>
                <div class=" m-auto mt-4">
                    <div class="">
                        <span class="p-float-label">
                            <AutoComplete class="w-100 mb-3" v-model="selectedRepresentative" dropdown :suggestions="filteredRepresentativeList" optionLabel="kullanici_adi" @complete="searchRepresentative($event)" @item-select="representativeSelected($event)"/>
                            <label for="username">Temsilci</label>
                        </span>
                    </div>
                    <div class="">
                        <span class="p-float-label">
                            <AutoComplete class="w-100 mb-3" v-model="selectedSeller" dropdown :suggestions="filteredSellerList" optionLabel="kullanici_adi" @complete="searchSeller($event)" @item-select="sellerSelected($event)"/>
                            <label for="username">Satışçı</label>
                        </span>
                    </div>
                    <div class="">
                        <Dropdown v-model="selectedPriority" :options="priorityList" optionLabel="priority" placeholder="Öncelik Seç" @change="prioritySelected($event)" class="w-100" />
                    </div>
                </div>
                <div class=" m-auto mt-4 ">
                    <div class="">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:100px;padding-top:35px;" v-model="getShopperModel.notlar"></textarea>
                            <label for="floatingTextarea">Not</label>
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-4">
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.devir">
                            <label class="form-check-label" for="flexCheckDefault">
                                Devir
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.ozel">
                            <label class="form-check-label" for="flexCheckDefault">
                                Özel
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.takip">
                            <label class="form-check-label" for="flexCheckDefault">
                                Takip
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getShopperModel.sonkullanici">
                            <label class="form-check-label" for="flexCheckDefault">
                                Son Kullanıcı
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class=" m-auto mt-3 mb-3">
            <div class="">
                <button type="button" class="btn btn-success w-100 mb-3" @click="shopperProcess">Kaydet</button>
            </div>
            <div class="" v-if="!getShopperNewButton">
                <button type="button" class="btn btn-danger w-100" @click="deleteShopper">Sil</button>
            </div>
        </div>
                    <div class="mb-5">
                    <div class=" m-auto">
                        <div class="">
                            <DataTable 
                            :value="getShopperBuyingList"
                            v-model:selection="selectedBuying"
                            selectionMode="single"
                            @row-click="buyingSelected($event)"
                            style="font-size:85%;"
                        >
                            <Column field="Yil" header="Yıl"></Column>
                            <Column field="Total" header="Toplam">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.Total) }}
                                </template>
                            </Column>
                        </DataTable>
                        </div>
                    </div>
            
                </div>
    </div>



    <Dialog v-model:visible="is_seller_form" header="" modal :style="{'width':'100vw'}"> 
        <shopperSellerForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { shopperService } from '../../services/shopperService';
import { socket } from '../../services/customServices/realTimeService';

import shopperSellerForm from '../../components/shopper/shopperSellerForm.vue';
import {localDateService} from '../../services/localDateService';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperModel',
            'getShopperRepresentativeList',
            'getShopperCountryList',
            'getShopperNewButton',
            'getShopperBuyingList',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    components: {
        shopperSellerForm
    },
    data() {
        return {
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
            selectedCustomerPlace:null,
            selectedCountry: null,
            filteredCountryList: [],
            selectedRepresentative: null,
            filteredRepresentativeList: [],
            selectedSeller: null,
            filteredSellerList: [],
            priorityList: [
                { 'priority': 'A' },
                { 'priority': 'B' },
                { 'priority': 'C' },

            ],
            selectedPriority: null,
            selectedBuying: {},
            is_seller_form:false
        }
    },
    created() {
        if (!this.getShopperNewButton) {
            this.shopperCreatedProcess();
        }
    },
    methods: {
        buyingSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperSellerList(event.data.Yil, this.getShopperModel.id).then(data => {
                useShopperStore().shopper_seller_list_load_act(data.data.siparis_detay);
                this.is_seller_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        shopperCreatedProcess() {
            this.selectedRepresentative = this.getShopperRepresentativeList.find(x => x.id == this.getShopperModel.musteri_temsilci_id);
            this.selectedSeller = this.getShopperRepresentativeList.find(x => x.id == this.getShopperModel.satisci);
            this.selectedPriority = this.priorityList.find(x => x.priority == this.getShopperModel.selectOncelik);
            this.selectedCountry = this.getShopperCountryList.find(x => x.id == this.getShopperModel.ulke_id);
            this.selectedCustomerPlace = this.sources.find(x=>x.source == this.getShopperModel.musteri_yeri);
        },
        __control(val){
          if(val == null || val == '' || val == ' '){
            return true
          }  else{
            return false
        }
        },
        update() {
            this.getShopperModel.kullanici_id = localStorage.getItem('userId');
            if(this.selectedCustomerPlace){
            this.getShopperModel.musteri_yeri = this.selectedCustomerPlace.source;


            }

            shopperService.update(this.getShopperModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_update_list_emit');
                    this.emitter.emit('close_dialog');

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                };
            })
        },
        save() {
            
            this.getShopperModel.kullanici_id = localStorage.getItem('userId');
            this.getShopperModel.kayit_tarihi = localDateService.getDateString(new Date());
            if (this.selectedCustomerPlace) {
                            this.getShopperModel.musteri_yeri = this.selectedCustomerPlace.source;

            }
            shopperService.save(this.getShopperModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_update_list_emit');
                    this.emitter.emit('close_dialog');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        },  
        deleteShopper() {
            shopperService.delete(this.getShopperModel.id).then(data => {
                if (data.status) {
                    this.emitter.emit('close_dialog');
                    socket.socketIO.emit('shopper_update_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                }
            })
        },
        shopperProcess() {
            if (this.getShopperNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        prioritySelected(event) {
            this.getShopperModel.selectOncelik = event.value.priority;
        },
        sellerSelected(event) {
            this.getShopperModel.satisci = event.value.id;
        },
        searchSeller(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperRepresentativeList;
            } else {
                result = this.getShopperRepresentativeList.filter(x => {
                    return x.kullanici_adi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredSellerList = result;
            
        },
        representativeSelected(event) {
            this.getShopperModel.musteri_temsilci_id = event.value.id;
        },
        searchRepresentative(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperRepresentativeList;
            } else {
                result = this.getShopperRepresentativeList.filter(x => {
                    return x.kullanici_adi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredRepresentativeList = result;
        },
        countrySelected(event) {
            this.getShopperModel.ulke_adi = event.value.ulke_adi;
            this.getShopperModel.ulke_id = event.value.id;
        },
        searchCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperCountryList;
            } else {
                result = this.getShopperCountryList.filter(x => {
                    return x.ulke_adi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        }
    }
}
</script>
<style scoped>

</style>