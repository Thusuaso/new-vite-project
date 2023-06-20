<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <AutoComplete class="w-100" v-model="selectedCustomer" dropdown placeholder="Müşteri Giriniz" :suggestions="filteredCustomerList" optionLabel="firstName" @complete="searchCustomer($event)" @item-select="customerSelected($event)"/>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Mail</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperSelectionModel.email">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Phone</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getShopperSelectionModel.phone">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
            <div class="col">
                <div class="input-group mb-3">
                    <AutoComplete class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulkeAdi" placeholder="Ülke Seçiniz" @complete="searchCountry($event)" @item-select="countrySelected($event)" />
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <AutoComplete class="w-100" v-model="selectedSurface" dropdown :suggestions="filteredSurfaceList" optionLabel="surface" placeholder="Yüzey Giriniz" @complete="searchSurface($event)" @item-select="surfaceSelected($event)" />
                </div>
            </div>
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="getShopperSelectionModel.adress"></textarea>
                    <label for="floatingTextarea">Adres</label>
                </div>
            </div>
        </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="selectionProcess">Kaydet</button>
        </div>
        <div class="col" v-if="!getShopperSelectionNewButton">
            <button type="button" class="btn btn-danger w-100" @click="deleteForm">Sil</button>
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
            'getShopperSelectionModel',
            'getShopperSelectionCountryList',
            'getShopperSelectionSurfaceList',
            'getShopperSelectionCustomerList',
            'getShopperSelectionNewButton'
        ])
    },
    data() {
        return {
            selectedCountry: null,
            filteredCountryList: [],
            selectedCustomer:null,
            filteredCustomerList: [],
            selectedSurface: null,
            filteredSurfaceList: [],
            
        }
    },
    created() {
        if (!this.getShopperSelectionNewButton) {
            this.selectionCreatedProcess();
        };
    },
    methods: {
        selectionCreatedProcess() {
            this.selectedCustomer = this.getShopperSelectionCustomerList.find(x => x.firstName.toLowerCase() == this.getShopperSelectionModel.firstName.toLowerCase());
            this.selectedCountry = this.getShopperSelectionCountryList.find(x => x.ulkeAdi.toLowerCase().trim() == this.getShopperSelectionModel.city.toLowerCase().trim());
            this.selectedSurface = this.getShopperSelectionSurfaceList.find(x => x.id == this.getShopperSelectionModel.surfaceId);
            this.getShopperSelectionModel.oldSurface = this.selectedSurface.surface;
        },
        selectionProcess() {
            if (this.getShopperSelectionNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            if (this.selectedSurface.surface) {
                this.getShopperSelectionModel.surface = this.selectedSurface.surface;
            } else {
                this.getShopperSelectionModel.surface = this.selectedSurface;
            };
            if (this.selectedCustomer.firstName) {
                this.getShopperSelectionModel.name = this.selectedCustomer.firstName;
            } else {
                this.getShopperSelectionModel.name = this.selectedCustomer;
            }
            this.getShopperSelectionModel.user_id = localStorage.getItem('userId');
            this.getShopperSelectionModel.city = this.selectedCountry.ulkeAdi;
            useLoadingStore().begin_loading_act();
            shopperService.saveShopperSelection(this.getShopperSelectionModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shopper_selection_update_list_emit', localStorage.getItem('userId'));
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            if (this.selectedSurface.surface) {
                this.getShopperSelectionModel.surface = this.selectedSurface.surface;
            } else {
                this.getShopperSelectionModel.surface = this.selectedSurface;
            };
            if (this.selectedCustomer.firstName) {
                this.getShopperSelectionModel.name = this.selectedCustomer.firstName;
            } else {
                this.getShopperSelectionModel.name = this.selectedCustomer;
            }
            this.getShopperSelectionModel.user_id = localStorage.getItem('userId');
            this.getShopperSelectionModel.city = this.selectedCountry.ulkeAdi;
            useLoadingStore().begin_loading_act();
            shopperService.updateShopperSelection(this.getShopperSelectionModel).then(data => {
                if (data.status) {
                    this.emitter.emit('close_selection_dialog');
                    socket.socketIO.emit('shopper_selection_update_list_emit', localStorage.getItem('userId'));
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        },
        deleteForm() {
            useLoadingStore().begin_loading_act();
            shopperService.deleteShopperSelection(this.getShopperSelectionModel.id,this.getShopperSelectionModel.user_id).then(data => {
                if (data.status) {
                    this.emitter.emit('close_selection_dialog');
                    socket.socketIO.emit('shopper_selection_update_list_emit', localStorage.getItem('userId'));
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'danger', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        },
        surfaceSelected(event) {
            this.getShopperSelectionModel.surface = event.value.surface;
            this.getShopperSelectionModel.surfaceId = event.value.id;
        },
        searchSurface(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperSelectionSurfaceList;
            } else {
                result = this.getShopperSelectionSurfaceList.filter(x => {
                    return x.surface.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredSurfaceList = result;
        },
        searchCustomer(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperSelectionCustomerList;
            } else {
                result = this.getShopperSelectionCustomerList.filter(x => {
                    return x.firstName.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCustomerList = result;
        },
        customerSelected(event) {
            this.getShopperSelectionModel.firstName = event.value.firstName;
            this.getShopperSelectionModel.email = event.value.email;
            this.getShopperSelectionModel.phone = event.value.phone;
            this.getShopperSelectionModel.address = event.value.address;
            this.selectedCountry = this.getShopperSelectionCountryList.find(x => x.ulkeAdi.toLowerCase().trim() == event.value.city.toLowerCase().trim());
        },
        countrySelected(event) {
            this.getShopperSelectionModel.city = event.value.ulkeAdi;
        },
        searchCountry(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperSelectionCountryList;
            } else {
                result = this.getShopperSelectionCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        }
    }
}
</script>