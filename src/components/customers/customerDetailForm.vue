<template>
    <div class="container text-center" v-if="!getMobile">
        <div class="row">
            <div class="col-6">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Date of Entry</span>
                    <Calendar v-model="gTarih" showIcon dateFormat="dd/mm/yy" />
                </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Customer</span>
                <input v-model="getCustomerModel.musteriadi" type="text" :disabled="true" class="form-control" placeholder="Customer" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            
            <div class="form-floating">
            <textarea v-model="getCustomerModel.aciklama" class="form-control" placeholder="Description" id="floatingTextarea"  style="height: 100px;padding-top:35px;"></textarea>
            <label for="floatingTextarea">Description</label>
            </div>
            </div>
            <div class="col-6">
                <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Reminder Date</span>
                        <Calendar v-model="hTarih" showIcon dateFormat="dd/mm/yy" />
                </div>
                <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Title</span>
                        <input v-model="getCustomerModel.baslik" type="text" class="form-control" placeholder="Title" aria-label="Title" aria-describedby="basic-addon1">
                </div>
                <div class="form-floating">
                <textarea v-model="getCustomerModel.hatirlatma_notu" class="form-control" placeholder="Reminder Description" id="floatingTextarea"  style="height: 100px;padding-top:35px;"></textarea>
                <label for="floatingTextarea">Reminder Description</label>
                </div>
            </div>

        </div>
        <br/>
        
        <button type="button" class="btn btn-success" @click="save" v-if="getCustomerNewButtonStatus">Save</button>
        <button type="button" class="btn btn-warning" @click="update" v-if="!getCustomerNewButtonStatus">Update</button>
        <button type="button" class="btn btn-danger" @click="deleted" v-if="!getCustomerNewButtonStatus">Delete</button>

    </div>

        <div class="container " v-if="getMobile">
            <div class="">
                <div class="mt-3 mb-3">
                    <span class="p-float-label">
                        <Calendar class="w-100" v-model="gTarih" dateFormat="dd/mm/yy" inputId="save_date" />
                        <label for="save_date">Date of Entry</label>
                    </span>
                <div class="input-group mb-3 mt-3">
                    <span class="input-group-text" id="basic-addon1">Customer</span>
                    <input v-model="getCustomerModel.musteriadi" type="text" :disabled="true" class="form-control" placeholder="Müşteri Adı" aria-label="Username" aria-describedby="basic-addon1">
                </div>
            
                <div class="form-floating">
                <textarea v-model="getCustomerModel.aciklama" class="form-control" placeholder="Description" id="floatingTextarea"  style="height: 100px;padding-top:35px;"></textarea>
                <label for="floatingTextarea">Description</label>
                </div>
                </div>
                <div class="">
                    <span class="p-float-label mb-3">
                            <Calendar class="w-100" v-model="hTarih" dateFormat="dd/mm/yy" inputId="rem_date" />
                            <label for="rem_date">Reminder Date</label>
                        </span>
                    <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Title</span>
                            <input v-model="getCustomerModel.baslik" type="text" class="form-control" placeholder="Title" aria-label="Username" aria-describedby="basic-addon1">
                    </div>
                    <div class="form-floating">
                    <textarea v-model="getCustomerModel.hatirlatma_notu" class="form-control" placeholder="Reminder Description" id="floatingTextarea"  style="height: 100px;padding-top:35px;"></textarea>
                    <label for="floatingTextarea">Reminder Description</label>
                    </div>
                </div>

            </div>
            <br/>
        
            <button type="button" class="btn btn-success w-100 mb-3" @click="save" v-if="getCustomerNewButtonStatus">Save</button>
            <button type="button" class="btn btn-warning w-100 mb-3" @click="update" v-if="!getCustomerNewButtonStatus">Update</button>
            <button type="button" class="btn btn-danger w-100" @click="deleted" v-if="!getCustomerNewButtonStatus">Delete</button>

        </div>

    
</template>
<script>
import { useCustomerStore } from '../../stores/customers';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { customerService } from '../../services/customerService';
import { localDateService } from '../../services/localDateService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    props:['customerName'],
    date() {
        return {
            gTarih: new Date(),
            hTarih:new Date()
        }
    },
    computed: {
        ...mapState(useCustomerStore, ['getCustomerModel', 'getCustomerNewButtonStatus']),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    methods: {
        deleted() {
            customerService.customerDelete(this.getCustomerModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('customer_detail_update_emit', this.getCustomerModel.musteriadi)
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.emitter.emit('customerDetailDialogClose')
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({severity:'error',detail:'Silme İşlemi Başarısız',life:3000})
                 }
          })  
        },
        save() {
            if (!this.getCustomerModel.tarih_giris) {
                alert("Tarih Seçiniz..");
                return;
            }

            this.getCustomerModel.tarih_giris =  localDateService.getDateString(this.gTarih);
            this.getCustomerModel.hatirlatmaTarihi = localDateService.getDateString(
                this.hTarih
            );
            this.getCustomerModel.temsilci = localStorage.getItem('userId');
            customerService.customerSave(this.getCustomerModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('customer_detail_update_emit', this.getCustomerModel.musteriadi)
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.resetData()
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi.', life: 3000 })
                } else {
                    socket.socketIO.emit('customer_detail_update_emit', this.getCustomerModel.musteriadi)
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 })
                }
                
            })

        },
        update() {
            this.getCustomerModel.tarih_giris = localDateService.getDateString(this.gTarih);
            this.getCustomerModel.hatirlatmaTarihi = localDateService.getDateString(
                this.hTarih
            );
            this.getCustomerModel.temsilci = localStorage.getItem('userId');
            customerService.customerUpdate(this.getCustomerModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('customer_detail_update_emit', this.getCustomerModel.musteriadi)
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.$toast.add({severity:'success',detail:'Başarıyla Güncellendi',life:3000})
                } else {
                    socket.socketIO.emit('customer_detail_update_emit', this.getCustomerModel.musteriadi)
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 })

                }
            })
        },

        resetData() {
            customerService.customerModel().then(data => {
                data.musteriadi = this.customerName
                useCustomerStore().customer_model_load_act(data)
                this.gTarih  = new Date()
                this.hTarih = new Date()


            })
        }
    },
    created() {
        this.getCustomerModel.musteriadi = this.customerName
        if (this.getCustomerNewButtonStatus) {
            this.gTarih = new Date()
            this.hTarih = new Date()
        } else {
            console.log(this.getCustomerModel.tarih_giris)
            this.gTarih = localDateService.getStringDate2(this.getCustomerModel.tarih_giris);
            this.hTarih = localDateService.getStringDate2(this.getCustomerModel.hatirlatmaTarihi);
        };
        

    }
    
}
</script>