<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Müşteri</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperOfferModel.customer" @input="isShopperOfferControl(getShopperOfferModel.customer)">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Şirket</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperOfferModel.company">
            </div>
        </div>
        <div class="col">
            <AutoComplete class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulkeAdi" placeholder="Ülke Seçiniz" @complete="searchCountry($event)" @item-select="countrySelected($event)" />
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Email</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperOfferModel.email">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Telefon</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperOfferModel.phone">
            </div>
        </div>
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control h-100" placeholder="Leave a comment here" id="floatingTextarea" v-model="getShopperOfferModel.adress"></textarea>
                <label for="floatingTextarea">Adres</label>
            </div>
        </div>
            
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="offerProcess" :disabled="offer_save_button">Kaydet</button>

        </div>
        <div class="col" v-if="!getShopperOfferNewButton">
            <button type="button"  class="btn btn-danger w-100" @click="deleteOffer">Sil</button>
        </div>
    </div>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { mapState } from 'pinia';

import { shopperService } from '../../services/shopperService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperOfferList',
            'getShopperOfferModel',
            'getShopperOfferCountryList',
            'getShopperOfferNewButton'
        ])
    },
    data() {
        return {
            selectedCountry: null,
            filteredCountryList: [],
            offer_save_button:false,
        }
    },
    created() {
        if (!this.getShopperOfferNewButton) {
            this.offerCreatedProcess();
        }
    },
    methods: {
        deleteOffer() {
            shopperService.deleteShopperOffer(this.getShopperOfferModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_offer_update_list_emit');
                    this.emitter.emit('close_shopper_offer_dialog');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        },
        isShopperOfferControl(event) {
            if (event.length == 1) {
                event = event.toUpperCase()
            }
            const istheremusteri = this.getShopperOfferList.filter(x => x.customer.toLowerCase() == event.toLowerCase())
            if (istheremusteri.length > 0) {
                alert("Bu müşteri zaten mevcut!")
            }
            this.getShopperOfferModel.customer = event
        },
        offerCreatedProcess() {
            this.selectedCountry = this.getShopperOfferCountryList.find(x => x.id == this.getShopperOfferModel.country);
        },
        save() {
            this.offer_save_button = true;
            this.getShopperOfferModel.user = localStorage.getItem('userId');
            this.getShopperOfferModel.username = localStorage.getItem('username');
            shopperService.saveShopperOffer(this.getShopperOfferModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_offer_update_list_emit');
                    this.offer_save_button = false;
                    this.emitter.emit('close_shopper_offer_dialog');

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.offer_save_button = false;
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })

        },
        update() {
            this.offer_save_button = true;
            this.getShopperOfferModel.user = localStorage.getItem('userId');
            this.getShopperOfferModel.username = localStorage.getItem('username');
            this.getShopperOfferModel.country = this.selectedCountry.id;
            this.getShopperOfferModel.countryName = this.selectedCountry.ulkeAdi;
            shopperService.updateShopperOffer(this.getShopperOfferModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_offer_update_list_emit');
                    this.emitter.emit('close_shopper_offer_dialog');
                    this.offer_save_button = false;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    this.offer_save_button = false;
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        },
        offerProcess() {
            if (this.getShopperOfferNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        countrySelected(event) {
            this.getShopperOfferModel.country = event.value.id;
            this.getShopperOfferModel.countryName = event.value.ulkeAdi;
        },
        searchCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperOfferCountryList;
            } else {
                result = this.getShopperOfferCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        }
    }
    
    
}
</script>
<style scoped>

</style>