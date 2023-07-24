<template>
    <div class="row">
        <div class="col-2">
            <Calendar v-model="a_date" showIcon @date-select="advancedDateSelect($event)" :disabled="a_date_form"/>
        </div>
        <div class="col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Po</span>
                <input type="text" class="form-control" disabled v-model="advancedPaymentModel.siparis_no"  aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Tutar</span>
                <input type="text" class="form-control" v-model="advancedPaymentModel.tutar" @input="advancedPaymentModel.tutar = $filters.formatPoint($event.target.value)" aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Kur</span>
                <input type="text" class="form-control" v-model="advancedPaymentModel.kur" @input="advancedPaymentModel.kur = $filters.formatPoint($event.target.value)" aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Masraf</span>
                <input type="text" class="form-control" v-model="advancedPaymentModel.masraf" @input="advancedPaymentModel.masraf = $filters.formatPoint($event.target.value)" aria-describedby="basic-addon1">
            </div>
        </div>
        <div class="col-2">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="advancedPaymentModel.aciklama" ></textarea>
                <label for="floatingTextarea2">Açıklama</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-success" @click="save" :disabled="save_button_form">Kaydet</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-primary" @click="cancel">Vazgeç</button>
        </div>
    </div>
    <br/>
    <DataTable 
    :value="getAdvancedPaymentList" 
    style="font-size:85%;" 
    v-model:selection="selectedAdvancedPayment" 
    selectionMode="single"
    @row-click="advancedPaymentClick($event)"
    >
        <Column field="musteri_adi" header="Müşteri"></Column>
        <Column field="siparis_no" header="Po"></Column>
        <Column field="tutar" header="Tutar">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(total) }}
            </template>
        </Column>
    </DataTable>
</template>
<script>
import { useFinanceStore } from '../../stores/finance';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { financeService } from '../../services/financeService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useFinanceStore, [
            'getAdvancedPaymentList'
        ])
    },
    data() {
        return {
            total: 0,
            selectedAdvancedPayment: {},
            advancedPaymentModel: {
                'aciklama': "",
                'id': 0,
                'kur':0,
                'marketing': "",
                'masraf': 0,
                'musteri_adi': "",
                'musteri_id': 0,
                'siparis_no': "",
                'tarih': new Date(),
                'temsilci_mail': "",
                'tutar': 0,
            },
            a_date: new Date(),
            a_date_form: true,
            save_button_form:true,
        }
    },
    created() {
        this.advancedPaymentTotalSum(this.getAdvancedPaymentList);
    },
    methods: {
        save() {
            useLoadingStore().begin_loading_act();
            this.save_button_form = true;
            this.advancedPaymentModel.kullanici_id = localStorage.getItem('userId');
            this.advancedPaymentModel.kullaniciadi = localStorage.getItem('username');

            financeService.setCurrencySave(this.advancedPaymentModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('finance_test_list_emit');
                    socket.socketIO.emit('finance_test_advanced_payment_list_emit');
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'success', detail: 'Peşinat Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Peşinat Kaydetme Başarısız', life: 3000 });
                }
            })
            this.reset();
        },
        cancel() {
            this.reset();
            this.save_button_form = true;
        },
        advancedDateSelect(event) {
            useLoadingStore().begin_loading_act();
            this.advancedPaymentModel.tarih = localDateService.getDateString(event);
            financeService.getCurrency(event.getFullYear(), event.getMonth() + 1 , event.getDate()).then(data => {
                this.advancedPaymentModel.kur = data.result;
                useLoadingStore().end_loading_act();

            });
        },
        advancedPaymentTotalSum(data) {
            this.total = 0;
            for (const item of data) {
                this.total += item.tutar;
            }
        },
        advancedPaymentClick(event) {
            this.advancedPaymentModel = event.data;
            this.advancedPaymentModel.tarih = localDateService.getDateString(new Date());
            this.a_date_form = false;
            this.save_button_form = false;

        },
        reset() {
            this.advancedPaymentModel = {
                'aciklama': "",
                'id': 0,
                'kur': 0,
                'marketing': "",
                'masraf': 0,
                'musteri_adi': "",
                'musteri_id': 0,
                'siparis_no': "",
                'tarih': new Date(),
                'temsilci_mail': "",
                'tutar': 0,
            };
            this.a_date_form = true;
            this.selectedAdvancedPayment = {};
        }
    }

}
</script>
<style scoped>


</style>