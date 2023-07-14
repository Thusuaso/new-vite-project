<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="row m-auto mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Müşteri</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" disabled v-model="getFinanceTestDetailPaymentList.musteri_model.musteriadi">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Po</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" disabled v-model="getFinanceTestDetailPaymentList.musteri_model.siparisno">
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <Calendar v-model="p_date" @date-select="paymentDateSelected($event)"/>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Bakiye</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" disabled v-model="balanced">
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Bakiye</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getFinanceTestDetailPaymentList.musteri_model.tutar" @input="getFinanceTestDetailPaymentList.musteri_model.tutar = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Masraf</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getFinanceTestDetailPaymentList.musteri_model.masraf" @input="getFinanceTestDetailPaymentList.musteri_model.masraf = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Kur</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getFinanceTestDetailPaymentList.musteri_model.kur" @input="getFinanceTestDetailPaymentList.musteri_model.kur = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="getFinanceTestDetailPaymentList.musteri_model.aciklama"></textarea>
                        <label for="floatingTextarea2">Açıklama</label>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <DataTable :value="getFinanceTestDetailPaymentList.musteri_list" 
                v-model:selection="selectedPayment"
                selectionMode="single"
                @row-click="paymentSelected($event)"
            >
                <Column field="tarih" header="Tarih"></Column>
                <Column field="siparisno" header="Po"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                </Column>
                <Column field="masraf" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf) }}
                    </template>
                </Column>
                <Column field="kur" header="Kur">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kur) }}
                    </template>
                </Column>
            </DataTable>
        </div>

    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="save" :disabled="save_form_disabled">Kaydet</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-warning" @click="update" :disabled="form_disabled">Güncelle</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-danger" @click="deleteForm" :disabled="form_disabled">Sil</button>
        </div>
    </div>
</template>
<script>
import {useFinanceTestStore} from '../../stores/financetest';
import {useLoadingStore} from '../../stores/loading';
import {mapState} from 'pinia';

import {financeServiceTest} from '../../services/financeServiceTest';
import {localDateService} from '../../services/localDateService';
import {socket} from '../../services/customServices/realTimeService';
export default {
    props:['balance','customer_id2','po'],
    computed:{
        ...mapState(useFinanceTestStore,[
            'getFinanceTestDetailPaymentList',
        ])
    },
    data(){
        return{
            p_date:new Date(),
            balanced:0,
            form_disabled:true,
            save_form_disabled:false,
            selectedPayment:[],
        }
    },
    created(){
      this.balanced = this.balance  
    },
    methods:{
        reset(){
            financeServiceTest.getPaymentDetail(this.customer_id2,this.po).then(data=>{
                useFinanceTestStore().finance_test_detail_payment_list_load_act(data);
                this.selectedPayment = []
            }); 

        },
        paymentSelected(event){
            useLoadingStore().begin_loading_act();
            this.save_form_disabled = true;
            this.form_disabled = false;
            this.getFinanceTestDetailPaymentList.musteri_model = event.data;
            useLoadingStore().end_loading_act();

        },
        deleteForm(){
            useLoadingStore().begin_loading_act();
            this.form_disabled = true;
            financeServiceTest.deletePayment(this.getFinanceTestDetailPaymentList.musteri_model.id).then(data=>{
                if(data.status){
                    const data = {
                            'customer_id':this.getFinanceTestDetailPaymentList.musteri_model.musteri_id,
                            'po':this.getFinanceTestDetailPaymentList.musteri_model.siparisno,
                        }
                    socket.socketIO.emit('finance_test_detail_payment_emit',data);
                    socket.socketIO.emit('finance_test_detail_emit',data);
                    socket.socketIO.emit('finance_test_list_emit');
                    this.form_disabled = false;
                    this.reset();
                    useLoadingStore().end_loading_act();
                    this.form_disabled = true;
                    this.save_form_disabled = false;
                    this.$toast.add({severity:'success',detail:'Başarıyla Silindi',life:3000});
                }else{
                    this.form_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({severity:'danger',detail:'Silme Başarısız',life:3000});
                };
            });
        },
        update(){
            useLoadingStore().begin_loading_act();
            this.form_disabled = true;
            this.getFinanceTestDetailPaymentList.musteri_model.tarih = localDateService.getDateString(this.p_date);
            this.getFinanceTestDetailPaymentList.musteri_model.kullaniciadi = localStorage.getItem('username');
            this.getFinanceTestDetailPaymentList.musteri_model.kullaniciid = localStorage.getItem('userId');

            financeServiceTest.updatePaymet(this.getFinanceTestDetailPaymentList.musteri_model).then(data=>{
                if(data.status){
                    const data = {
                            'customer_id':this.getFinanceTestDetailPaymentList.musteri_model.musteri_id,
                            'po':this.getFinanceTestDetailPaymentList.musteri_model.siparisno,
                        }
                    socket.socketIO.emit('finance_test_detail_payment_emit',data);
                    socket.socketIO.emit('finance_test_detail_emit',data);
                    socket.socketIO.emit('finance_test_list_emit');
                    this.form_disabled = false;
                    useLoadingStore().end_loading_act();
                    
                    this.$toast.add({severity:'success',detail:'Başarıyla Güncellendi',life:3000});
                }else{
                    this.form_disabled = false;
                    useLoadingStore().end_loading_act();

                    this.$toast.add({severity:'danger',detail:'Güncelleme Başarısız',life:3000});
                };
            });
        },
        save(){
            useLoadingStore().begin_loading_act();
            this.save_form_disabled = true;
            this.getFinanceTestDetailPaymentList.musteri_model.tarih = localDateService.getDateString(this.p_date);
            this.getFinanceTestDetailPaymentList.musteri_model.kullaniciadi = localStorage.getItem('username');
            this.getFinanceTestDetailPaymentList.musteri_model.kullaniciid = localStorage.getItem('userId');

            financeServiceTest.savePayment(this.getFinanceTestDetailPaymentList.musteri_model).then(data=>{
                if(data.status){
                       const data = {
                            'customer_id':this.getFinanceTestDetailPaymentList.musteri_model.musteri_id,
                            'po':this.getFinanceTestDetailPaymentList.musteri_model.siparisno,
                        }
                    socket.socketIO.emit('finance_test_detail_payment_emit',data);
                    socket.socketIO.emit('finance_test_detail_emit',data);
                    socket.socketIO.emit('finance_test_list_emit');
                    this.save_form_disabled = false;
                    this.reset();
                    useLoadingStore().end_loading_act();
                    
                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.save_form_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({severity:'danger',detail:'Kaydetme Başarısız',life:3000});
                };
            });
            
        
        },
        paymentDateSelected(event){
            useLoadingStore().begin_loading_act();
            financeServiceTest.getCurrency(event.getFullYear(),event.getMonth() + 1, event.getDate()).then(data=>{
                this.getFinanceTestDetailPaymentList.musteri_model.kur = data.result;
                useLoadingStore().end_loading_act();
            });

        }
    }
}
</script>
<style scoped>

</style>