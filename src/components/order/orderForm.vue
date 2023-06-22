<template>
    <div class="row">
        <div class="col-9">
            <TabView>
            <TabPanel header="Sipariş">
                <orderInformation/>
            </TabPanel>
            <TabPanel header="Proforma">
                <proformaInformation/>
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
            <productInformation/>
        </div>
    </div>
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

import { productionsService } from '../../services/productions';
import { useProductionsStore } from '../../stores/productions';
import { useLoadingStore } from '../../stores/loading';
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
        remainingInformation
    },
    computed: {
        ...mapState(useProductionsStore, [
            'getProductionsDetailModel',
            'getProductionsNewButton',
            'getProductsSaveButtonStatus'
      ])  
    },
    methods: {
        save() {
            useProductionsStore().products_save_button_status_load_act(true);
            this.getProductionsDetailModel.siparis.kullaniciId = localStorage.getItem('userId');
            this.getProductionsDetailModel.siparis.kayit_kisi = localStorage.getItem('userId');
            productionsService.saveProductions(this.getProductionsDetailModel).then(data => {

            if (data.status) {
                let productStatus;
                if (this.$router.currentRoute._value.fullPath == '/order/waiting') {
                    productStatus = {
                        status: 1,
                        year: new Date().getFullYear()
                    }
                } else if (this.$router.currentRoute._value.fullPath == '/order/product') {
                    productStatus = {
                        status: 2,
                        year: new Date().getFullYear()
                    }
                } else if (this.$router.currentRoute._value.fullPath == '/order/forwarding') {
                    productStatus = {
                        status: 3,
                        year: new Date().getFullYear()
                    }
                }
                socket.socketIO.emit('products_update_emit', productStatus)
                this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                useProductionsStore().products_save_button_status_load_act(false);

            } else {
                this.$toast.add({ severity: 'error', detail: 'Kayıt İşlemi Başarısız', life: 3000 });
                useProductionsStore().products_save_button_status_load_act(false);


            }
        })
        },
        update() {
            useProductionsStore().products_save_button_status_load_act(true);

            this.getProductionsDetailModel.degisimMasraflar = [];
            this.getProductionsDetailModel.siparis.kullaniciId = localStorage.getItem('userId');
            this.getProductionsDetailModel.siparis.kayit_kisi = localStorage.getItem('userId');
            productionsService.updateProductions(this.getProductionsDetailModel).then(data => {
                if (data.status) {
                    let productStatus;
                    if (this.$router.currentRoute._value.fullPath == '/order/waiting') {
                        productStatus = {
                            status: 1,
                            year: new Date().getFullYear()
                        }
                    } else if (this.$router.currentRoute._value.fullPath == '/order/product') {
                        productStatus = {
                            status: 2,
                            year: new Date().getFullYear()
                        }
                    } else if (this.$router.currentRoute._value.fullPath == '/order/forwarding') {
                        productStatus = {
                            status: 3,
                            year: new Date().getFullYear()
                        }
                    }

                    socket.socketIO.emit('products_update_emit', productStatus)
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
            useProductionsStore().products_save_button_status_load_act(false);

                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kayıt İşlemi Başarısız', life: 3000 });
            useProductionsStore().products_save_button_status_load_act(false);


                }
            })
        },
        saveProcess() {
            if (this.getProductionsNewButton) {
                this.save();
            } else {
                this.update()
            }
        }
    },
    created() {
    },
    mounted() {
        socket.socketIO.on('products_update_on', (productStatus) => {
            useLoadingStore().begin_loading_act()
            productionsService.getOrderList(productStatus.status, productStatus.year).then(data => {
                useProductionsStore().productions_list_load_act(data.products)
                useProductionsStore().productions_unit_list_load_act(data.productUnit)
                useProductionsStore().productions_supplier_list_load_act(data.supplier)
                useProductionsStore().productions_delivery_list_load_act(data.delivery)
                useProductionsStore().productions_payment_list_load_act(data.payment)
                useProductionsStore().productions_invoice_list_load_act(data.invoice)
                useProductionsStore().productions_country_list_load_act(data.country)
                useProductionsStore().productions_customers_list_load_act(data.customers)
                useProductionsStore().productions_users_list_load_act(data.users)
                useLoadingStore().end_loading_act()

            })
        })
    }
    
}
</script>
<style scoped>

</style>