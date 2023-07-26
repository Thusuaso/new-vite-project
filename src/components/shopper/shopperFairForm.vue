<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Müşteri</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperFairModel.customer">
            </div>

        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Şirket</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperFairModel.company">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Mail</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperFairModel.email">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Telefon</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperFairModel.phone">
                </div>

            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Satışçı</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperFairModel.satisci">
                </div>
            </div>
            <div class="col">
                <AutoComplete class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulkeAdi" placeholder="Ülke Seçiniz" @complete="searchCountry($event)" @item-select="countrySelected($event)" />
            </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control h-100" placeholder="Leave a comment here" id="floatingTextarea" v-model="getShopperFairModel.adress" style="padding-top:35px;"></textarea>
                <label for="floatingTextarea">Adres</label>
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="fairProcess" >Kaydet</button>
        </div>
        <div class="col" v-if="!getShopperFairNewButton">
            <button type="button" class="btn btn-danger w-100" @click="deleteForm" >Sil</button>
        </div>
    </div>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { shopperService } from '../../services/shopperService';
import { socket } from '../../services/customServices/realTimeService';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperFairModel',
            'getShopperFairCountryList',
            'getShopperFairNewButton',
        ])
    },
    data() {
        return {
            selectedCountry: null,
            filteredCountryList: [],
        }
    },
    created() {
        if (!this.getShopperFairNewButton) {
            this.fairCreatedProcess();
        }
    },
    methods: {
        fairCreatedProcess() {
            this.selectedCountry = this.getShopperFairCountryList.find(x => x.id == this.getShopperFairModel.country);
        },
        fairProcess() {
            if (this.getShopperFairNewButton) {
                this.save();
            } else {
                this.update();
            };
        },
        save() {
            this.getShopperFairModel.user = localStorage.getItem('userId');
            useLoadingStore().begin_loading_act();
            shopperService.saveShopperFair(this.getShopperFairModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_fair_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            this.getShopperFairModel.user = localStorage.getItem('userId');
            useLoadingStore().begin_loading_act();
            shopperService.updateShopperFair(this.getShopperFairModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_fair_update_list_emit');
                    this.emitter.emit('close_fair_dialog');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                };
            });
        },
        deleteForm() {
            useLoadingStore().begin_loading_act();
            shopperService.deleteShopperFair(this.getShopperFairModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_fair_update_list_emit');
                    this.emitter.emit('close_fair_dialog');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                };
            });
        },
        searchCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperFairCountryList;
            } else {
                result = this.getShopperFairCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        },
        countrySelected(event) {
            this.getShopperFairModel.country = event.value.id;
            this.getShopperFairModel.countryName = event.value.ulkeAdi;
        },
    }
}
</script>
<style scoped>

</style>