<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getModel.hata"></textarea>
                    <label for="floatingTextarea2">Points to Consider</label>
                </div>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <button type="button" class="btn btn-success" @click="process">Save</button>
            </div>
        </div>
    </div>
        <div v-if="getMobile">
                <div class=" m-auto mt-3">
                <div class="mb-3">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px;padding-top:35px;" v-model="getModel.hata"></textarea>
                        <label for="floatingTextarea2">Points to Consider </label>
                    </div>
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="process">Save</button>
                </div>
            </div>
        </div>

</template>
<script>
import { useCostStore } from '../../stores/cost';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { costService } from '../../services/costService';
import { socket } from '../../services/customServices/realTimeService';
import { localDateService } from '../../services/localDateService';
export default {
    computed: {
        ...mapState(useCostStore, [
            'getModel',
            'getNewButton',
            'getUsers'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    data() {
        return {
            c_m_date: new Date(),
            selectedUser: {},
        }
    },
    created() {

    },
    methods: {
        userSelected(event) {
            this.getModel.kullanici_id = event.value.id;
            this.getModel.kullanici_adi = event.value.name;
        },
        process() {
            if (this.getNewButton) {
                this.save();
            } else {
                this.update()
            };
        },
        save() {
            useLoadingStore().begin_loading_act();
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