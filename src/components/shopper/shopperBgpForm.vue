<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span span class="input-group-text" id="basic-addon1">Müşteri</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.customer">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span span class="input-group-text" id="basic-addon1">Şirket</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.company">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span span class="input-group-text" id="basic-addon1">Mail</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.email">
                </div>
            </div>
        </div>
        <div class="row m-auto mt3">
            <div class="col">
                <AutoComplete class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" placeholder="Ülke Seçiniz" optionLabel="ulkeAdi" @complete="searchCountry($event)" @item-select="countrySelected($event)" />
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span span class="input-group-text" id="basic-addon1">Telefon</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.phone">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span span class="input-group-text" id="basic-addon1">Satışçı</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.satisci">
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control w-100 h-100" placeholder="Leave a comment here" id="floatingTextarea" v-model="getShopperBgpModel.adress" style="padding-top:35px;"></textarea>
                    <label for="floatingTextarea">Adres</label>
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="bgpProcess">Kaydet</button>
            </div>
            <div class="col" v-if="!getShopperBgpNewButton">
                <button type="button" class="btn btn-danger w-100" @click="deleteForm">Sil</button>
            </div>
        </div>
    </div>

        <div v-if="getMobile">
                <div class=" m-auto mt-3">
                <div class="">
                    <div class="input-group mb-3">
                        <span span class="input-group-text" id="basic-addon1">Müşteri</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.customer">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span span class="input-group-text" id="basic-addon1">Şirket</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.company">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span span class="input-group-text" id="basic-addon1">Mail</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.email">
                    </div>
                </div>
            </div>
            <div class=" m-auto mt3">
                <div class="">
                    <AutoComplete class="w-100 mb-3" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" placeholder="Ülke Seçiniz" optionLabel="ulkeAdi" @complete="searchCountry($event)" @item-select="countrySelected($event)" />
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span span class="input-group-text" id="basic-addon1">Telefon</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.phone">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span span class="input-group-text" id="basic-addon1">Satışçı</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperBgpModel.satisci">
                    </div>
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <div class="form-floating">
                        <textarea class="form-control w-100 h-100 mb-3" placeholder="Leave a comment here" id="floatingTextarea" v-model="getShopperBgpModel.adress"></textarea>
                        <label for="floatingTextarea">Adres</label>
                    </div>
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="bgpProcess">Kaydet</button>
                </div>
                <div class="" v-if="!getShopperBgpNewButton">
                    <button type="button" class="btn btn-danger w-100 mb-3" @click="deleteForm">Sil</button>
                </div>
            </div>
        </div>

</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { shopperService } from '../../services/shopperService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperBgpModel',
            'getShopperBgpCountryList',
            'getShopperBgpNewButton'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])

    },
    data() {
        return {
            filteredCountryList: [],
            selectedCountry: null,
        }
    },
    created() {
        if (!this.getShopperBgpNewButton) {
            this.bgpCreatedProcess();
        }
    },
    methods: {
        bgpCreatedProcess() {
            this.selectedCountry = this.getShopperBgpCountryList.find(x => x.ulkeAdi == this.getShopperBgpModel.country);
        },
        bgpProcess() {
            if (this.getShopperBgpNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.getShopperBgpModel.kullanici = localStorage.getItem("userId");
            this.getShopperBgpModel.user = localStorage.getItem("userId");
            useLoadingStore().begin_loading_act();
            shopperService.saveShopperBgp(this.getShopperBgpModel).then(data => {
                if (data.status) {
                    useLoadingStore().end_loading_act();
                    socket.socketIO.emit('shopper_bgp_update_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            this.getShopperBgpModel.kullanici = localStorage.getItem("userId");
            this.getShopperBgpModel.user = localStorage.getItem("userId");
            this.getShopperBgpModel.country = this.selectedCountry.ulkeAdi;
            useLoadingStore().begin_loading_act();
            shopperService.updateShopperBgp(this.getShopperBgpModel).then(data => {
                if (data.status) {
                    useLoadingStore().end_loading_act();
                    socket.socketIO.emit('shopper_bgp_update_list_emit');
                    this.emitter.emit('close_bgp_dialog');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                };
            });
        },
        deleteForm() {
            useLoadingStore().begin_loading_act();
            shopperService.deleteShopperBgp(this.getShopperBgpModel.id).then(data => {
                if (data.status) {
                    useLoadingStore().end_loading_act();
                    socket.socketIO.emit('shopper_bgp_update_list_emit');
                    this.emitter.emit('close_bgp_dialog');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                };
            });
        },
        countrySelected(event) {
            this.getShopperBgpModel.country = event.value.ulkeAdi;
        },
        searchCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperBgpCountryList;
            } else {
                result = this.getShopperBgpCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        }
    }
}
</script>