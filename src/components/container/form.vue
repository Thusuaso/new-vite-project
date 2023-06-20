<template>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Konteynır No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerData.konteynerno">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Hat</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="containerData.line">
            </div>
        </div>
        <div class="col">
            <Calendar v-model="c_date" showIcon />
        </div>
        <div class="col">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="containerData.konsimento">
                <label class="form-check-label" for="flexCheckDefault" v-if="containerData.konsimento">
                    Gönderildi
                </label>
                <label class="form-check-label" for="flexCheckDefault" v-else>
                    Gönderilmedi
                </label>
            </div>
        </div>
        <div class="col">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="containerData.takip">
                <label class="form-check-label" for="flexCheckDefault">
                    Takip
                </label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="save">Kaydet</button>
        </div>
    </div>
</template>
<script>
import { containerService } from '../../services/containerService';
import { localDateService } from '../../services/localDateService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    props: ['value'],
    data() {
        return {
            c_date: null,
            containerData:{},
        }
    },
    created() {
        this.containerData = this.value;
    },
    methods: {
        save() {
            if (this.c_date) {
                this.containerData.eta = localDateService.getDateString(this.c_date);
            } else {
                this.containerData.eta = null;
            }
            containerService.followSave(this.containerData).then(data => {
                if (data.status) {
                    socket.socketIO.emit('container_update_follow_list_emit');
                    socket.socketIO.emit('container_update_unfollow_list_emit');
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