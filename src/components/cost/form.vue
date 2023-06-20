<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px" v-model="getModel.hata"></textarea>
                <label for="floatingTextarea2">Hata</label>
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Masraf</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getModel.maliyet" @input="getModel.maliyet = $filters.formatPoint($event.target.value)">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="process">Kaydet</button>
        </div>
    </div>
</template>
<script>
import { useCostStore } from '../../stores/cost';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { costService } from '../../services/costService';
import { socket } from '../../services/customServices/realTimeService';
import { localDateService } from '../../services/localDateService';
export default {
    computed: {
        ...mapState(useCostStore, [
            'getModel',
            'getNewButton'
        ])
    },
    methods: {
        process() {
            if (this.getNewButton) {
                this.save();
            } else {
                this.update()
            };
        },
        save() {
            useLoadingStore().begin_loading_act();
            this.getModel.kullanici_id = localStorage.getItem('userId');
            this.getModel.kullanici_adi = localStorage.getItem('username');
            this.getModel.tarih = localDateService.getDateString(new Date());
            costService.save(this.getModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('cost_error_list_emit');
                    this.reset();
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 })
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'danger', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            useLoadingStore().begin_loading_act();
            costService.update(this.getModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('cost_error_list_emit');
                    this.emitter.emit('cost_dialog_status', false);
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 })
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'danger', detail: 'Güncelleme Başarısız', life: 3000 });
                };
            });
        },
        reset() {
            costService.getModel().then(data => {
                useCostStore().cost_error_model_load_act(data);
                useCostStore().cost_error_new_button_load_act(true);
            })
        }
    }
}
</script>