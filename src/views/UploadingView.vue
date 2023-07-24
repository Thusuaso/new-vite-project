<template>
    <div class="row m-auto mt-3">
        <div class="col-6">
            <div class="row mb-5">
                <div class="col">
                    <AutoComplete v-model="selectedUploadingProduct" dropdown :suggestions="filteredUploadingProductList" optionLabel="siparisno" @complete="searchUploadingProduct($event)" @item-select="uploadingProductSelected($event)" />
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Müşteri Adı</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.customer" disabled>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Mail</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.email" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Not</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.line" disabled>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Teslim</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.delivery" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Ödeme</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.payment" disabled>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Navlun A.</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.freightIn" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text" id="addon-wrapping">Navlun S.</span>
                        <input type="text" class="form-control" aria-describedby="addon-wrapping" v-model="uploadingProductInfo.freightOut" disabled>
                    </div>
                </div>
            </div>
            
            <FileUpload class="w-100" v-if="uploadButtonForm" mode="basic" accept=".pdf" :maxFileSize="1000000" @select="uploadingFolders($event)" multiple chooseLabel="Evrak Yükleme" showUploadButton/>
        </div>
        <div class="col-6">
            <DataTable 
                :value="getUploadingFolderList" 
                tableStyle="min-width: 50rem" 
                v-model:selection="selectedUploadingFolder" 
                selectionMode="single" 
                @row-click="uploadingFolderSelected($event)"
            >
                <Column field="Faturaid" header="#"></Column>
                <Column field="faturaadi" header="Fatura Adı">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.renk,'color':'white'}">
                            {{ slotProps.data.faturaadi }}
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="is_form" :header="folderName" modal>
        <invoiceForm :id="invoiceId" :po="po"/>
    </Dialog>
    <Dialog v-model:visible="is_form2" header="" modal>
        <supplierForm :po="selectedUploadingProduct.siparisno"/>
    </Dialog>
    <Dialog v-model:visible="is_form3" header modal>
        <workermanForm :po="selectedUploadingProduct.siparisno"/>
    </Dialog>
</template>
<script>
import { useUploadingStore } from '../stores/uploading';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { fileService } from '../services/fileService';
import { uploadingService } from '../services/uploadingService';
import { socket } from '../services/customServices/realTimeService';

import form from '../components/uploading/form.vue';
import supplierForm from '../components/uploading/supplierForm.vue';
import workermanForm from '../components/uploading/workermanForm.vue';
export default {
    computed: {
        ...mapState(useUploadingStore, [
            'getUploadingProductList',
            'getUploadingFolderList',
            'getUploadingProductFolderList'
        ])
    },
    components: {
        invoiceForm: form,
        supplierForm,
        workermanForm
    },
    data() {
        return {
            is_form3:false,
            selectedUploadingProduct: null,
            filteredUploadingProductList: [],
            uploadingProductInfo: {
                customer: "",
                email: "",
                line: "",
                delivery: "",
                payment: "",
                freightIn: 0,
                freightOut: 0,                
            },
            selectedUploadingFolder: {},
            uploadButtonForm: false,
            folderProductInfo: {
                'id': 0,
                'siparisno': "",
                'kullaniciId': "",
            },
            is_form: false,
            invoiceId: 0,
            po: "",
            folderName: "",
            is_form2:false,
        }
    },
    methods: {
        uploadingFolders(event) {
            let index = 0;
            for (const item of event.files) {
                this.folderProductInfo = {
                    'id': 0,
                    'siparisno': "",
                    'kullaniciId': "",
                };
                if (item.name == 'Purchase Order.pdf') this.folderProductInfo.id = 1;
                else if (item.name == 'Proforma Invoice.pdf') this.folderProductInfo.id = 2;
                else if (item.name == 'İç Sipariş.pdf') this.folderProductInfo.id = 3;
                else if (item.name == 'Çeki Listesi.pdf') this.folderProductInfo.id = 4;
                else if (item.name == 'Yükleme Notası.pdf') this.folderProductInfo.id = 5;
                else if (item.name == 'Mekmar-Efes Gümrük Faturası.pdf') this.folderProductInfo.id = 6;
                else if (item.name == 'Gümrük Notası.pdf') this.folderProductInfo.id = 7;
                else if (item.name == 'ISF vb Formlar.pdf') this.folderProductInfo.id = 8;
                else if (item.name == 'Konşimento.pdf') this.folderProductInfo.id = 9;
                else if (item.name == 'İlaçlama Belgesi.pdf') this.folderProductInfo.id = 10;
                else if (item.name == 'Dolaşım Belgeleri.pdf') this.folderProductInfo.id = 11;
                else if (item.name == 'Gçb Beyannamesi.pdf') this.folderProductInfo.id = 12;
                else if (item.name == 'Packing Declarition.pdf') this.folderProductInfo.id = 14;
                else if (item.name == 'L-C Metin.pdf') this.folderProductInfo.id = 15;
                else if (item.name == 'Commer Invoice.pdf') this.folderProductInfo.id = 16;
                else if (item.name == 'Packing List.pdf') this.folderProductInfo.id = 17;
                else if (item.name == 'Booking.pdf') this.folderProductInfo.id = 20;
                else if (item.name == 'İlaçlama Notası.pdf') this.folderProductInfo.id = 71;
                else if (item.name == 'Fotolar.pdf') this.folderProductInfo.id = 72;
                else if (item.name == 'Draft.pdf') this.folderProductInfo.id = 99;
                else if (item.name == 'Özel İşçilik Faturaları.pdf') this.folderProductInfo.id = 40;
                this.folderProductInfo.siparisno = this.selectedUploadingProduct.siparisno;
                this.folderProductInfo.kullaniciId = localStorage.getItem('userId');
                index += 1;
                this.uploadService(item, this.folderProductInfo.id, this.selectedUploadingProduct.siparisno);
                this.uploadServer(this.folderProductInfo);
                if (index == event.files.length) {
                    socket.socketIO.emit('uploading_folder_update_list_emit', this.selectedUploadingProduct.siparisno)
                }
            };
            

        },
        uploadService(item,id,po) {
            fileService.sendInvoice(item, id, po).then(data => {
                if (!data) {
                    this.$toast.add({ severity: 'error', detail: 'Yükleme Başarısız', life: 3000 });
                }

            });
        },
        uploadServer(event) {
            uploadingService.save(event).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                };
            });
        },
        uploadingFolderSelected(event) {
            this.invoiceId = event.data.Faturaid;
            this.po = this.selectedUploadingProduct.siparisno;
            this.folderName = event.data.faturaadi;
            if (
                event.data.Faturaid != 30 &&
                event.data.Faturaid != 40 &&
                event.data.Faturaid != 13 &&
                event.data.Faturaid != 73 &&
                event.data.Faturaid != 50 &&
                event.data.Faturaid != 3
            ) {
                this.is_form = true;
            }   else if (event.data.Faturaid == 40) {
                this.is_form3 = true;
            }   

            else {
                this.is_form2 = true;
            }
        },
        uploadingProductSelected(event) {
            this.uploadButtonForm = true;
            this.uploadingProductInfo.customer = event.value.musteriAdi;
            this.uploadingProductInfo.email = event.value.mail;
            this.uploadingProductInfo.line = event.value.line;
            this.uploadingProductInfo.delivery = event.value.teslim;
            this.uploadingProductInfo.payment = event.value.odeme;
            this.uploadingProductInfo.freightIn = event.value.navlunAlis;
            this.uploadingProductInfo.freightOut = event.value.navlunSatis;
            useLoadingStore().begin_loading_act();
            uploadingService.getUploadingFolderList(event.value.siparisno).then(data => {
                useUploadingStore().uploading_product_folder_list_load_act(data.fatura_listesi);
                useUploadingStore().uploading_folder_list_load_act(data.color_listesi);
                useLoadingStore().end_loading_act();
            })

        },
        searchUploadingProduct(event) {
            let result;
            if (event.query.length === 0) {
                result = [...this.getUploadingProductList];
            } else {
                result = this.getUploadingProductList.filter((x) => {
                    return x.siparisno.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredUploadingProductList = result;
        }
    },
    mounted() {
        socket.socketIO.on('uploading_folder_update_list_on', (po) => {
            useLoadingStore().begin_loading_act();
            uploadingService.getUploadingFolderList(po).then(data => {
                useUploadingStore().uploading_product_folder_list_load_act(data.fatura_listesi);
                useUploadingStore().uploading_folder_list_load_act(data.color_listesi);
                useLoadingStore().end_loading_act();
            })
        })
    }
} 
</script>
<style scoped>

</style>