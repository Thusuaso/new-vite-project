<template>
    <div v-if="!getMobile">
        <div class="row m-auto mt-5 mb-5" >
            <div class="col">
                <span class="p-float-label">
                    <AutoComplete id="orders" v-model="selectedOrder" dropdown :suggestions="filterOrderList" optionLabel="siparisno" @complete="searchOrder($event)" @item-select="orderSelected($event)"/>
                    <label for="orders">Siparişler</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <Calendar id="f_date" v-model="f_date" showIcon dateFormat="dd/mm/yy"/>
                    <label for="f_date">Sevk Tarihi</label>
                </span>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Fatura No</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getModel.faturano">
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getModel.takip">
                    <label class="form-check-label" for="flexCheckDefault">
                        Takip
                    </label>
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="normal" checked v-model="forwardingStatus" @change="forwardingStatusChange($event)">
                    <label class="form-check-label" for="flexRadioDefault1">
                        Normal Sevk
                    </label>
                    </div>
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="fast" v-model="forwardingStatus" @change="forwardingStatusChange($event)">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Hızlı Sevk
                    </label>
                </div>
            </div>
            <div class="col"></div>

        </div>
        <div class="row m-auto mb-5">
            <div class="col">
                <Dropdown v-model="selectedOrderProduct" :options="getProductList" optionLabel="icerik" placeholder="Kalem Seçiniz" class="w-full md:w-14rem" @change="orderProductSelected($event)"/>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Sipariş</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="selectedOrderProduct.siparis">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Giden</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="selectedOrderProduct.uretim">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Kalan</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="remainder">
                </div>
            </div>
            <div class="col">
                <button type="button" class="btn btn-success" @click="save" :disabled="forwarding_form">Sevk Et</button>
            </div>
        </div>
        <div class="row m-auto">
            <div class="col">
                <div class="row">
                    <div class="col">
                        <DataTable :value="forwardingCrateList" dataKey="kasano" ref="forwardingCrate" style="font-size:85%;">
                            <Column headerStyle="width: 3rem" field="kasa_secim">
                                <template #body="slotProps">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.kasa_secim">
                                    </div>
                                </template>
                            </Column>
                            <Column field="kasano" header="No"></Column>
                            <Column field="miktar" header="M">
                            <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.miktar) }}
                                </template>
                            </Column>
                            <Column field="birimadi" header="B"></Column>
                        </DataTable>
                    </div>
                    <div class="col">
                        <button type="button" class="btn btn-primary mb-3" @click="sendCrate" :disabled="send_crate_disabled">Kasa Çık</button>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="allCrate" @click="allCrateSelected($event)">
                            <label class="form-check-label" for="flexCheckDefault">
                                Hepsi
                            </label>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="col">
                <DataTable  :value="getModel.kasalistesi" style="font-size:85%;">
                    <Column field="kasano" header="Kasa No"></Column>
                    <Column field="urunadi" header="Ürün"></Column>
                    <Column field="yuzeyislem" header="Yüzey"></Column>
                    <Column field="ebat" header="Ebat"></Column>
                    <Column field="miktar" header="M">
                        <template #body="slotProps">
                            {{ $filters.formatDecimal(slotProps.data.miktar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatDecimal(crateTotal.amount) }}
                        </template>
                    </Column>
                    <Column field="birimadi" header="B"></Column>
                    <Column header="Toplam">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.birimfiyat * slotProps.data.miktar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(crateTotal.totalPrice) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <div v-if="getMobile">
        <div class=" m-auto mt-5 mb-5" >
            <div class="">
                <span class="p-float-label">
                    <AutoComplete class="w-100 mb-3" id="orders" v-model="selectedOrder" dropdown :suggestions="filterOrderList" optionLabel="siparisno" @complete="searchOrder($event)" @item-select="orderSelected($event)"/>
                    <label for="orders">Siparişler</label>
                </span>
            </div>
            <div class="">
                <span class="p-float-label">
                    <Calendar id="f_date" class="w-100 mb-3" v-model="f_date" showIcon dateFormat="dd/mm/yy"/>
                    <label for="f_date">Sevk Tarihi</label>
                </span>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text"  id="basic-addon1">Fatura No</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getModel.faturano">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getModel.takip">
                        <label class="form-check-label" for="flexCheckDefault">
                            Takip
                        </label>
                    </div>
                </div>
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="normal" checked v-model="forwardingStatus" @change="forwardingStatusChange($event)">
                        <label class="form-check-label" for="flexRadioDefault1">
                            Normal Sevk
                        </label>
                        </div>
                </div>
                <div class="col">
                    <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="fast" v-model="forwardingStatus" @change="forwardingStatusChange($event)">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Hızlı Sevk
                    </label>
                </div>  
                
                    
                </div>
            </div>

        </div>
        <div class=" m-auto mb-5">
            <div class="">
                <Dropdown class="w-100 mb-3" v-model="selectedOrderProduct" :options="getProductList" optionLabel="icerik" placeholder="Kalem Seçiniz" @change="orderProductSelected($event)"/>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Sipariş</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="selectedOrderProduct.siparis">
                </div>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Giden</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="selectedOrderProduct.uretim">
                </div>
            </div>
            <div class="">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Kalan</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" disabled v-model="remainder">
                </div>
            </div>
            
        </div>
        <div class=" m-auto">
            <div class="">
                <div class="">
                    <div class="">
                        <DataTable :value="forwardingCrateList" dataKey="kasano" ref="forwardingCrate" style="font-size:85%;">
                            <Column headerStyle="width: 3rem" field="kasa_secim">
                                <template #body="slotProps">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.kasa_secim">
                                    </div>
                                </template>
                            </Column>
                            <Column field="kasano" header="No"></Column>
                            <Column field="miktar" header="M">
                            <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.miktar) }}
                                </template>
                            </Column>
                            <Column field="birimadi" header="B"></Column>
                        </DataTable>
                    </div>
                    <div class="">
                        <button type="button" class="btn btn-primary mb-3 w-100" @click="sendCrate" :disabled="send_crate_disabled">Kasa Çık</button>
                        <div class="form-check m-auto">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="allCrate" @click="allCrateSelected($event)">
                            <label class="form-check-label" for="flexCheckDefault">
                                Hepsi
                            </label>
                        </div>
                    </div>
                </div>
            
            </div>
            <div class="">
                <DataTable  :value="getModel.kasalistesi" style="font-size:85%;">
                    <Column field="kasano" header="Kasa No"></Column>
                    <Column field="urunadi" header="Ürün"></Column>
                    <Column field="yuzeyislem" header="Yüzey"></Column>
                    <Column field="ebat" header="Ebat"></Column>
                    <Column field="miktar" header="M">
                        <template #body="slotProps">
                            {{ $filters.formatDecimal(slotProps.data.miktar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatDecimal(crateTotal.amount) }}
                        </template>
                    </Column>
                    <Column field="birimadi" header="B"></Column>
                    <Column header="Toplam">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.birimfiyat * slotProps.data.miktar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(crateTotal.totalPrice) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="">
                    <button type="button" class="btn btn-success w-100 mt-3 mb-5" @click="save" :disabled="forwarding_form">Sevk Et</button>
                </div>
    </div>


</template>
<script>
import { useForwardingStore } from '../stores/forwarding';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { forwardingService } from '../services/forwardingService';
import { localDateService } from '../services/localDateService';
export default {
    computed: {
        ...mapState(useForwardingStore, [
            'getModel',
            'getOrderList',
            'getProductList',
            'getCrateList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            forwarding_form:false,
            filterOrderList: [],
            selectedOrder: null,
            f_date: new Date(),
            forwardingStatus: 'normal',
            selectedOrderProduct: {},
            remainder: 0,
            selectedForwardingCrate: [],
            forwardingCrateList: [],
            crateTotal: {
                amount: 0,
                totalPrice:0,
            },
            allCrate: false,
            send_crate_disabled: true,
        }
    },
    crated() {
    },
    methods: {
        save() {
            useLoadingStore().begin_loading_act();
            this.forwarding_form = true;
            this.getModel.sevk_tarihi = localDateService.getDateString(this.f_date);
            this.getModel.hatirlatma_sure = this.normal_sevk ? 5 : 3;

            this.getModel.sevkEden = localStorage.getItem('username');
            forwardingService.save(this.getModel).then(data => {
                if (data) {
                    useLoadingStore().end_loading_act();
                    this.reset();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Sevk Edildi', life: 3000 });
                    this.forwarding_form = false;
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Sevk Etme Başarısız', life: 3000 });
                    this.forwarding_form = false;
                };
            })
        },
        sendCrate() {
            for (const item of this.forwardingCrateList) {
                if (item.kasa_secim) {
                    this.getModel.kasalistesi.push(item);
                };
            };
            let index = this.findIndex(this.selectedOrderProduct.urunkartid, this.getProductList);
            this.getProductList.splice(index, 1);
            this.forwardingCrateSum(this.getModel.kasalistesi);
            this.forwardingCrateList = [];
            this.allCrate = false;
            this.send_crate_disabled = true;
        },
        findIndex(value,data) {
            let index = 0;
            for (const item of data) {
                if (item.urunkartid == value) {
                    return index;
                } else {
                    index += 1;
                };
            };
        },
        orderProductSelected(event) {
            this.forwardingCrateList = [];
            this.selectedForwardingCrate = [];
            this.forwardingCrateList = this.getCrateList.filter(x => x.id == event.value.urunkartid);
            this.remainder = (event.value.siparis - event.value.uretim).toFixed(2);
        },
        forwardingStatusChange(event) {
            if (event.target.value == 'normal') {
                this.getModel.normal_sevk = true;
                this.getModel.hizli_sevk = false;
            } else {
                this.getModel.normal_sevk = false;
                this.getModel.hizli_sevk = true;
            }
        },
        orderSelected(event) {
            this.getModel.siparisno = event.value.siparisno;
            this.getModel.musteriid = event.value.musteriid;
            useLoadingStore().begin_loading_act();
            forwardingService.getForwardingProductList(event.value.siparisno).then(data => {
                useForwardingStore().forwarding_product_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        },
        searchOrder(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOrderList;
            } else {
                result = this.getOrderList.filter((x) => {
                    return x.siparisno.toLowerCase().startsWith(event.query.toLowerCase());
                })
            }
            this.filterOrderList = result;
        },
        forwardingCrateSum(data) {
            this.crateTotal = {
                amount: 0,
                totalPrice: 0,
            };
            for (const item of data) {
                this.crateTotal.amount += item.miktar;
                this.crateTotal.totalPrice += (item.birimfiyat * item.miktar);
            };
        },
        allCrateSelected(event) {
            this.send_crate_disabled = !this.send_crate_disabled;
            for (const item of this.forwardingCrateList) {
                if (item.kasa_secim == false) {
                    item.kasa_secim = true;
                };
                if (event.target._modelValue) {
                    item.kasa_secim = false;
                };
            };
        },
        reset() {
            this.selectedOrder = null;
            this.f_date = new Date();
            this.selectedOrderProduct = [];
            this.selectedOrderProduct.siparis = 0;
            this.selectedOrderProduct.uretim = 0;
            this.remainder = 0;
            this.forwardingCrateList = [];
            this.send_crate_disabled = false;
            this.allCrate = false;
            useLoadingStore().begin_loading_act();
            forwardingService.getForwardingModel().then(data => {
                useForwardingStore().forwarding_load_act(data);
                useLoadingStore().end_loading_act();
            });
        }
    }
}
</script>

<style scoped>

</style>