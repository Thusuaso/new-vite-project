<template>
    <div class="row">
        <div class="col">
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Müşteri</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getFinanceDetailCollectionModel.musteriadi">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Po</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getFinanceDetailCollectionModel.siparisno">
                    </div>
                </div>
            </div>
            <div class="row">
                    <div class="col">
                        <Calendar v-model="f_c_date" showIcon @date-select="financeCollectionDateSelected($event)"/>
                    </div>
                    <div class="col">
                        
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Kalan</span>
                            <input type="text" class="form-control" disabled aria-label="Username" aria-describedby="basic-addon1" v-model="reminder">
                        </div>
                    </div>
                    
            </div>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Gelen</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getFinanceDetailCollectionModel.tutar" @input="getFinanceDetailCollectionModel.tutar = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Masraf</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getFinanceDetailCollectionModel.masraf" @input="getFinanceDetailCollectionModel.masraf = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Kur</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getFinanceDetailCollectionModel.kur" @input="getFinanceDetailCollectionModel.kur = $filters.formatPoint($event.target.value)">
                    </div>
                </div>
                <div class="col">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="getFinanceDetailCollectionModel.aciklama" ></textarea>
                        <label for="floatingTextarea2">Açıklama</label>
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success" @click="save" :disabled="finance_detail_collection_save_button">Kaydet</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-warning" @click="update" :disabled="finance_detail_collection_update_button">Değiştir</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger" @click="deleteCollection" :disabled="finance_detail_collection_delete_button">Sil</button>
                </div>
            </div>
        </div>
        <div class="col">
            <DataTable 
                v-model:value="getFinanceDetailCollectionList" 
                v-model:selection="selectedFinanceDetailCollection"
                selectionMode="single"
                @row-click="financeDetailCollectionSelected($event)"
                :loading="financeDetailCollectionLoading"
            >
                <Column field="tarih" header="Tarih"></Column>
                <Column field="siparisno" header="Po"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(financeCollectionTotal.total) }}
                    </template>
                </Column>
                <Column field="masraf" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(financeCollectionTotal.cost) }}
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
</template>
<script>
import { mapState } from 'pinia';
import { useFinanceStore } from '../../stores/finance';
import { useLoadingStore } from '../../stores/loading';

import { localDateService } from '../../services/localDateService';
import { financeService } from '../../services/financeService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useFinanceStore, [
            'getFinanceDetailCollectionList',
            'getFinanceDetailCollectionModel'
        ])
    },
    props: ['collectionReminder'],
    data() {
        return {
            reminder: 0,
            f_c_date: new Date(),
            financeCollectionTotal: {
                total: 0,
                cost: 0,
            },
            finance_detail_collection_save_button: false,
            finance_detail_collection_update_button: true,
            finance_detail_collection_delete_button: true,
            financeDetailCollectionLoading:false,
        }
    },
    created() {
        this.reminder = this.collectionReminder;
        this.financeCollectionListSum(this.getFinanceDetailCollectionList);
    },
    methods: {
        save() {
            this.getFinanceDetailCollectionModel.tarih = localDateService.getDateString(this.f_c_date);
            this.getFinanceDetailCollectionModel.kullaniciid = localStorage.getItem('userId');
            useLoadingStore().begin_loading_act();
            financeService.setFinanceDetailCollectionSave(this.getFinanceDetailCollectionModel).then(data => {
                if (data.status) {
                    this.$toast.add({ severity: 'success', detail: 'Tahsilat Kaydı Başarıyla Yapıldı', life: 3000 });
                    socket.socketIO.emit('finance_main_list_update_emit');
                    socket.socketIO.emit('finance_detail_list_update_emit', this.getFinanceDetailCollectionModel.musteri_id);
                    const value = {
                        'musteri_id': this.getFinanceDetailCollectionModel.musteri_id,
                        'siparisno': this.getFinanceDetailCollectionModel.siparisno,
                    };
                    socket.socketIO.emit('finance_detail_collection_list_update_emit', value);
                    useLoadingStore().end_loading_act();
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Tahsilat Kaydı Yapılamadı.', life: 3000 });
                    useLoadingStore().begin_loading_act();
                };
            });
        },
        update() {
            this.getFinanceDetailCollectionModel.tarih = localDateService.getDateString(this.f_c_date);
            this.getFinanceDetailCollectionModel.kullaniciid = localStorage.getItem('userId');
            useLoadingStore().begin_loading_act();
            financeService.setFinanceDetailCollectionUpdate(this.getFinanceDetailCollectionModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('finance_main_list_update_emit');
                    socket.socketIO.emit('finance_detail_list_update_emit', this.getFinanceDetailCollectionModel.musteri_id);
                    const value = {
                        'musteri_id': this.getFinanceDetailCollectionModel.musteri_id,
                        'siparisno': this.getFinanceDetailCollectionModel.siparisno,
                    };
                    socket.socketIO.emit('finance_detail_collection_list_update_emit', value);
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Tahsilat Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Tahsilat Güncelleme Başarısız', life: 3000 });
                };
            });
        },
        deleteCollection() {
            useLoadingStore().begin_loading_act();
            financeService.setFinanceDetailCollectionDelete(this.getFinanceDetailCollectionModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('finance_main_list_update_emit');
                    socket.socketIO.emit('finance_detail_list_update_emit', this.getFinanceDetailCollectionModel.musteri_id);
                    const value = {
                        'musteri_id': this.getFinanceDetailCollectionModel.musteri_id,
                        'siparisno': this.getFinanceDetailCollectionModel.siparisno,
                    };
                    socket.socketIO.emit('finance_detail_collection_list_update_emit', value);
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi.', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                };
            });
        },
        financeDetailCollectionSelected(event) {
            this.finance_detail_collection_save_button = true;
            this.finance_detail_collection_update_button = false;
            this.finance_detail_collection_delete_button = false;
            this.f_c_date = localDateService.getStringDate(event.data.tarih);
            this.getFinanceDetailCollectionModel.tutar = event.data.tutar;
            this.getFinanceDetailCollectionModel.kur = event.data.kur;
            this.getFinanceDetailCollectionModel.masraf = event.data.masraf;
            this.getFinanceDetailCollectionModel.aciklama = event.data.aciklama;
            this.getFinanceDetailCollectionModel.id = event.data.id;

        },
        financeCollectionDateSelected(event) {
            financeService.getCurrency(event.getFullYear(), event.getMonth() + 1, event.getDate()).then(data => {
                this.getFinanceDetailCollectionModel.kur = data.result;
            })
        },
        financeCollectionListSum(data) {
            this.financeCollectionTotal = {
                total: 0,
                cost: 0,
            };
            for (const item of data) {
                this.financeCollectionTotal.total += item.tutar;
                this.financeCollectionTotal.cost += item.masraf;
            };
        }
    },
    mounted() {
        socket.socketIO.on('finance_detail_collection_list_update_on', (data) => {
            this.financeDetailCollectionLoading = true;
            financeService.getFinanceDetailCollectionList(data.musteri_id, data.siparisno).then(data => {
                useFinanceStore().finance_detail_collection_list_load_act(data);
                this.financeCollectionListSum(data.musteri_list);
                this.financeDetailCollectionLoading = false;
            })
        })
    }

}
</script>
<style scoped>

</style>