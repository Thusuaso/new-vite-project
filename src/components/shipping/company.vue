<template>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Firma Adı</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.firma_adi">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Mail Adres</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.mail">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Telefon</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.telefon">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Not</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.aciklama">
            </div>
        </div>
    </div>
    <div class="row mb-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="save">Kaydet</button>
        </div>
    </div>
    <DataTable :value="getShippingCompanyListDetail" style="font-size:85%;">
        <Column field="id" header="#"></Column>
        <Column field="firma_adi" header="Firma"></Column>
        <Column field="mail" header="Mail"></Column>
        <Column field="telefon" header="Telefon"></Column>
        <Column field="not" header="Not"></Column>
    </DataTable>
</template>
<script>
import { useShippingStore } from '../../stores/shipping';
import { mapState } from 'pinia';

import { shippingService } from '../../services/shippingService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useShippingStore, [
            'getShippingCompanyListDetail'
        ])
    },
    data() {
        return {
            companyModel: {
                'firma_adi': '',
                'telefon': '',
                'mail': '',
                'aciklama': '',
            }
        }
    },
    created() {
        
    },
    methods: {
        save() {
            shippingService.companySave(this.companyModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('shipping_company_update_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        }    
    }
}
</script>
<style scoped>

</style>