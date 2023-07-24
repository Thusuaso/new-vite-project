<template>
    <div class="row">
        <div class="col">
            <span class="p-float-label">
                <Calendar v-model="w_date" inputId="w_date" @date-select="selectWorkmanshipDate($event)" :disabled="!disabled_new_button"/>
                <label for="w_date">Tarih</label>
            </span>
        </div>
        <div class="col">
            <Dropdown v-model="selectedSupplier" filter   :options="getProductSupplierList" @change="changeSupplier($event)" :disabled="!disabled_new_button" aria-describedby="basic-addon1" optionLabel="firmaAdi" placeholder="Tedarikçi" class="w-full md:w-14rem" style="width:100%;" />
        </div>
        <div class="col">
                <div class="input-group mb-3" style="height:50px;">
                    <span class="input-group-text" id="basic-addon1">Tutar</span>
                    <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" :disabled="!disabled_new_button" v-model="getWorkmanshipModel.tutar">
                </div>
            </div>
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="getWorkmanshipModel.aciklama" :disabled="!disabled_new_button" style="height:150px;"></textarea>
                <label for="floatingTextarea">Açıklama</label>
            </div>
        </div>
        
    </div>
    <br/>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="newWorkmanship" :disabled="disabled_new_button">Yeni</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-warning" @click="cancel" :disabled="disabled_button">İptal</button>

        </div>
        <div class="col">
            <button type="button" class="btn btn-success" @click="save" :disabled="disabled_button">Kaydet</button>

        </div>
        <div class="col">
            <button type="button" class="btn btn-danger" @click="deleteWorkmanship" :disabled="disabled_button">Sil</button>

        </div>
    </div>
    



    <DataTable 
    :value="getWorkmanshipList" 
    style="font-size:85%;"
    v-model:selection="workmanshipSelected" 
    selectionMode="single" 
    @row-click="workmanshipSelectedList($event)"
    sortField="tedarikciAdi"
    sortOrder="1"
    
    >
        <Column field="tarih" header="Tarih"></Column>
        <Column field="tedarikciAdi" header="Tedarikçi"></Column>
        <Column field="aciklama" header="Açıklama"></Column>
        <Column field="tutar" header="Tutar">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.tutar) }}
            </template>
        </Column>
    </DataTable>

</template>
<script>
import { localDateService } from '../../../services/localDateService';
import { productionsService } from '../../../services/productions';
import { useProductionsStore } from '../../../stores/productions';
import { mapState } from 'pinia';
import { socket } from '../../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getWorkmanshipModel',
            'getWorkmanshipList',
            'getProductSupplierList'
        ])
    },
    props: [
        'orderNo',
        'productId'
    ],
    beforeCreate() {
        productionsService.getWorkmanshipList(this.orderNo, this.productId).then(data => {
            useProductionsStore().product_workmanship_list_load(data);
        }),
        productionsService.getWorkmanshipModel().then(data => {
            useProductionsStore().product_workmanship_model_load(data);
        })
    },
    data() {
        return {
            w_date: '',
            workmanshipSelected: null,
            selectedSupplier: {},
            disabled_button: true,
            disabled_new_button:false,
        }
    },
    methods: {
        getModel() {
            productionsService.getWorkmanshipModel().then(data => {
                useProductionsStore().product_workmanship_model_load(data);
            });
            this.selectedSupplier = {};
            this.w_date = new Date();
            this.workmanshipSelected = null;
        },
        selectWorkmanshipDate(event) {
            this.getWorkmanshipModel.tarih = localDateService.getDateString(event);
        },
        workmanshipSelectedList(event) {
            this.disabled_button = false;
            this.disabled_new_button = true;
            this.getWorkmanshipModel.aciklama = event.data.aciklama;
            this.getWorkmanshipModel.tutar = event.data.tutar;
            this.getWorkmanshipModel.id = event.data.id;
            this.selectedSupplier = this.getProductSupplierList.find(x => x.id == event.data.tedarikciId);
            this.w_date = localDateService.getStringDate(event.data.tarih);
        },
        changeSupplier(event) {
            this.getWorkmanshipModel.tedarikciId = event.value.id;
            this.getWorkmanshipModel.tedarikciAdi = event.value.firmaAdi;
        },
        newWorkmanship() {
            this.disabled_button = false;
            this.disabled_new_button = true;
        },
        cancel() {
            this.selectedSupplier = {};
            this.w_date = new Date();
            this.workmanshipSelected = null;
            this.resetButton();
            this.getModel();
        },
        save() {
            if (this.workmanshipSelected) {
                this.getWorkmanshipModel.tedarikciId = this.selectedSupplier.id;
                this.getWorkmanshipModel.tedarikciAdi = this.selectedSupplier.firmaAdi;
                this.getWorkmanshipModel.tarih = localDateService.getDateString(this.w_date);
                this.getWorkmanshipModel.siparisEkstraGiderTurId = 1;
                this.getWorkmanshipModel.urunKartId = this.productId;
                
                productionsService.workmanshipUpdate(this.getWorkmanshipModel).then(data => {
                    if (data.status) {
                        const value = {
                            'po': this.orderNo,
                            'product_id':this.productId
                        }
                        socket.socketIO.emit('workmanship_update_emit', value);
                        this.resetButton();
                        this.getModel();
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                    }
                })
                
            } else {
                this.getWorkmanshipModel.siparisEkstraGiderTurId = 1;
                this.getWorkmanshipModel.urunKartId = this.productId;
                this.getWorkmanshipModel.siparisNo = this.orderNo;
                productionsService.workmanshipSave(this.getWorkmanshipModel).then(data => {
                    if (data.status) {
                        const value = {
                            'po': this.orderNo,
                            'product_id': this.productId
                        }
                        socket.socketIO.emit('workmanship_update_emit', value);
                        this.resetButton();
                        this.getModel();
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });

                    }
                })
            }
            
        },
        deleteWorkmanship() {
            const value = {
                'po': this.orderNo,
                'product_id': this.productId
            }
            productionsService.workmanshipDelete(this.getWorkmanshipModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('workmanship_update_emit', value);
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                }
            })
            this.resetButton();
            this.getModel();

        },
        resetButton() {
            this.disabled_button = true;
            this.disabled_new_button = false;
        },
        
    },
    mounted() {
        socket.socketIO.on('workmanship_update_on', (value) => {
            productionsService.getWorkmanshipList(value.po, value.product_id).then(data => {
                useProductionsStore().product_workmanship_list_load(data);
            })
        })
    }
}
</script>
<style scoped>

</style>