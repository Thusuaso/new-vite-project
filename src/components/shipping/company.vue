<template>
    <br/>
    <div v-if="!getMobile">
            <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Company</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.firma_adi">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Mail</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.mail">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Phone</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.telefon">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Description</span>
                    <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.aciklama">
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="save">Save</button>
            </div>
        </div>
    </div>

        <div v-if="getMobile">
                <div class="">
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Company</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.firma_adi">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Mail</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.mail">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Phone</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.telefon">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Description</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="companyModel.aciklama">
                    </div>
                </div>
            </div>
            <div class=" mb-3">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="save">Save</button>
                </div>
            </div>
        </div>

    <DataTable :value="getShippingCompanyListDetail" style="font-size:85%;">
        <Column field="id" header="#"></Column>
        <Column field="firma_adi" header="Company"></Column>
        <Column field="mail" header="Mail"></Column>
        <Column field="telefon" header="Phone"></Column>
        <Column field="not" header="Description"></Column>
    </DataTable>
</template>
<script>
import { useShippingStore } from '../../stores/shipping';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { shippingService } from '../../services/shippingService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useShippingStore, [
            'getShippingCompanyListDetail'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
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