<template>
    <div class="row" v-if="!getMobile">
        <div class="col-9">
            <TabView>
            <TabPanel header="Sipariş">
                <orderInformation/>
            </TabPanel>
            <TabPanel header="Proforma">
                <proformaInformation />
            </TabPanel>
            <TabPanel header="Masraf" v-if="!getProductionsNewButton">
                <costInformation/>
            </TabPanel>
            <TabPanel header="Tedarikçi" v-if="!getProductionsNewButton">
                <supplierInformation :po="po"/>
            </TabPanel>
            <TabPanel header="Evrak" v-if="!getProductionsNewButton">
                <documentInformation/>
            </TabPanel>
            <TabPanel header="Çeki" v-if="!getProductionsNewButton">
                <checkInformation/>
            </TabPanel>
            <TabPanel header="Chat" v-if="!getProductionsNewButton">
                <chatInformation :po="po"/>
            </TabPanel>
            <TabPanel header="Kalan" v-if="!getProductionsNewButton">
                <remainingInformation/>       
            </TabPanel>
        </TabView>
    
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-success w-100" @click="saveProcess" :disabled="getProductsSaveButtonStatus">Kaydet</button>
            <button type="button" class="btn btn-primary w-100" @click="orderDivide">Böl</button>
            <button type="button" class="btn btn-danger w-100" @click="closed">Çık</button>

            <productInformation/>
        </div>
    </div>

    <div class="" v-if="getMobile">
            <div class="">
                <TabView>
                <TabPanel header="Sipariş">
                    <orderInformation/>
                </TabPanel>
                <TabPanel header="Proforma">
                    <proformaInformation />
                </TabPanel>
                <TabPanel header="Masraf" v-if="!getProductionsNewButton">
                    <costInformation/>
                </TabPanel>
                <TabPanel header="Tedarikçi" v-if="!getProductionsNewButton">
                    <supplierInformation :po="po"/>
                </TabPanel>
                <TabPanel header="Evrak" v-if="!getProductionsNewButton">
                    <documentInformation/>
                </TabPanel>
                <TabPanel header="Çeki" v-if="!getProductionsNewButton">
                    <checkInformation/>
                </TabPanel>
                <TabPanel header="Chat" v-if="!getProductionsNewButton">
                    <chatInformation :po="po"/>
                </TabPanel>
                <TabPanel header="Kalan" v-if="!getProductionsNewButton">
                    <remainingInformation/>       
                </TabPanel>
            </TabView>
    
            </div>
            <div class="">
                <button type="button" class="btn btn-success w-100 mb-3" @click="saveProcess" :disabled="getProductsSaveButtonStatus">Kaydet</button>
                <button type="button" class="btn btn-primary w-100" @click="orderDivide">Böl</button>
                


                <productInformation/>
            </div>
        </div>
    
    <Dialog v-model:visible="order_divide_form" header="" modal :style="{ 'width': '100vw' }">
        <orderDivide :sipBilgiler="getProductionsDetailModel"/>
    </Dialog>
</template>
<script>
import orderInformation from './orderInformation.vue';
import proformaInformation from './proformaInformation.vue';
import productInformation from './productInformation.vue';
import costInformation from './costInformation.vue';
import documentInformation from './documentInformation.vue';
import checkInformation from './checkInformation.vue';
import chatInformation from './chatInformation.vue';
import supplierInformation from './supplierInformation.vue';
import remainingInformation from './remainingInformation.vue';
import orderDivide from './orderDivide.vue';

import { productionsService } from '../../services/productions';
import { useProductionsStore } from '../../stores/productions';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { useProductCostStore } from '../../stores/productcost';
import { mapState } from 'pinia';
import { socket } from '../../services/customServices/realTimeService';

export default {
    props:['po'],
    components: {
        orderInformation,
        proformaInformation,
        productInformation,
        costInformation,
        documentInformation,
        checkInformation,
        chatInformation,
        supplierInformation,
        remainingInformation,
        orderDivide
    },
    computed: {
        ...mapState(useProductionsStore, [
            'getProductionsDetailModel',
            'getProductionsNewButton',
            'getProductsSaveButtonStatus',
            'productionsDetailModel',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ]),
        ...mapState(useProductCostStore, [
            'getMasraflar'
        ])
    },
    data() {
        return {
            order_divide_form:false,
        }
    },
    methods: {
        closed() {
            if (!this.getProductsSaveButtonStatus) {
                if (confirm('Çıkmak istediğinize emin misiniz?')) {
                    this.emitter.emit('products_closed_dialog');
                }
            } else {
                this.emitter.emit('products_closed_dialog');
            }
            
        },
        orderDivide() {
            this.order_divide_form = true;
        },
        reset() {
            this.getProductionsDetailModel.urunlerDegisenler = [];
            this.getProductionsDetailModel.urunlerSilinenler = [];
            this.getProductionsDetailModel.urunlerYeni = [];
        },
        save() {
            useLoadingStore().begin_loading_act();
            useProductionsStore().products_save_button_status_load_act(true);
            this.getProductionsDetailModel.siparis.kullaniciId = localStorage.getItem('userId');
            this.getProductionsDetailModel.siparis.kayit_kisi = localStorage.getItem('username');
            productionsService.saveProductions(this.getProductionsDetailModel).then(data => {

            if (data.status) {
                let productStatus;
                if (this.$router.currentRoute._value.fullPath == '/order/waiting') {
                    productStatus = {
                        status: 1,
                        year: new Date().getFullYear()
                    }
                    socket.socketIO.emit('products_update_waiting_emit', productStatus);

                } else if (this.$router.currentRoute._value.fullPath == '/order/production') {
                    productStatus = {
                        status: 2,
                        year: new Date().getFullYear()
                    }
                    socket.socketIO.emit('products_update_products_emit', productStatus);

                } else if (this.$router.currentRoute._value.fullPath == '/order/shipped') {
                    productStatus = {
                        status: 3,
                        year: new Date().getFullYear()
                    }
                    socket.socketIO.emit('products_update_forwarding_emit', productStatus);

                }
                this.emitter.emit('products_closed_dialog');
                useLoadingStore().end_loading_act();
                this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                this.reset();

            } else {
                useLoadingStore().end_loading_act();
                this.$toast.add({ severity: 'error', detail: 'Kayıt İşlemi Başarısız', life: 3000 });


            }
        })
        },
        update() {
            useLoadingStore().begin_loading_act();
            useProductionsStore().products_save_button_status_load_act(true);

            this.getProductionsDetailModel.degisimMasraflar = this.getMasraflar;
            this.getProductionsDetailModel.siparis.kullaniciId = localStorage.getItem('userId');
            this.getProductionsDetailModel.siparis.kayit_kisi = localStorage.getItem('username');
            productionsService.updateProductions(this.getProductionsDetailModel).then(data => {
                if (data.status) {
                    let productStatus;
                    if (this.$router.currentRoute._value.fullPath == '/order/waiting') {
                        productStatus = {
                            status: 1,
                            year: new Date().getFullYear()
                        }
                        socket.socketIO.emit('products_update_waiting_emit', productStatus);

                    } else if (this.$router.currentRoute._value.fullPath == '/order/production') {
                        productStatus = {
                            status: 2,
                            year: new Date().getFullYear()
                        }
                        socket.socketIO.emit('products_update_products_emit', productStatus);

                    } else if (this.$router.currentRoute._value.fullPath == '/order/shipped') {
                        productStatus = {
                            status: 3,
                            year: new Date().getFullYear()
                        }
                        socket.socketIO.emit('products_update_forwarding_emit', productStatus);

                    }
                    // this.emitter.emit('products_closed_dialog');

                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                    this.reset();
                    

                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kayıt İşlemi Başarısız', life: 3000 });


                };
            });
        },
        saveProcess() {
            if (this.getProductionsNewButton) {
                useProductionsStore().products_save_button_status_load_act(true);
                if(!this.getProductionsDetailModel.siparis.odemeTurId){
                    alert('Ödeme Türü Seçilmedi...');
                } else if (!this.getProductionsDetailModel.siparis.teslimTurId){
                    alert('Teslim Türü Seçilmedi...');
                } else if(!this.getProductionsDetailModel.siparis.faturaKesimTurId){
                    alert('Fatura Türü Seçilmedi...');
                } else if(!this.productionsDetailModel.siparis.siparisNo){
                    alert('Sipariş No Girilmedi...')
                }
                else{
                    this.save();
                }

            } else {
                useProductionsStore().products_save_button_status_load_act(true);

                this.update();

            }
        }
    },
    created() {
    },
    mounted() {
        
    }
    
}
</script>
<style scoped>

</style>