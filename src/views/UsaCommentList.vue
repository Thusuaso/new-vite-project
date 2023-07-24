<template>
    <div class="row m-auto mt-3 mb-3">
        <div class="col">
            <button type="button" class="btn btn-primary" @click="comment_status = true" :disabled="comment_status">Hepsi</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="comment_status = false" :disabled="!comment_status">Pasif Yorumlar</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-success"  :disabled="active_button_disabled">Aktif Yap</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-warning" @click="cancel" :disabled="cancel_button_disabled">Vazgeç</button>
        </div>
    </div>
    <DataTable 
    :value="comment_status ? getUsaCommentActiveList: getUsaCommentPassiveList "
    v-model:selection="selectedComment"
    selectionMode="single" 
    @row-click="commentSelected($event)"
    
    style="font-size:85%;">
        <Column field="skuno" header="Sku"></Column>
        <Column field="name" header="Müşteri"></Column>
        <Column field="date" header="Tarih"></Column>
        <Column field="rate" header="Müşteri">
            <template #body="slotProps">
                <Rating v-model="slotProps.data.rate" />
            </template>
        </Column>
        <Column field="email" header="Mail"></Column>
        <Column field="review" header="Yorum"></Column>
    </DataTable>
</template>

<script>
import { useUsaStore } from '../stores/usa';
import { mapState } from 'pinia';
import { usaService } from '../services/usaService';
import { socket } from '../services/customServices/realTimeService';

export default {
    computed: {
        ...mapState(useUsaStore, [
            'getUsaCommentActiveList',
            'getUsaCommentPassiveList'
        ])
    },
    data() {
        return {
            comment_status: true,
            selectedComment: {},
            active_button_disabled: true,
            cancel_button_disabled:true,
        }
    },
    methods: {
        cancel() {
            this.active_button_disabled = true;
            this.cancel_button_disabled = true;
            this.selectedComment = {};


        },
        changeCommentStatus() {

        },
        commentSelected(event) {
            this.active_button_disabled = false;
            this.cancel_button_disabled = false;
            const data = event.data;
            data.show = true;
            usaService.setActivePassive(data).then(data => {
                if (data) {
                    socket.socketIO.emit('usa_comment_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })

        }
    },
    mounted() {
        socket.socketIO.on('usa_comment_list_on', () => {
            useLoadingStore().begin_loading_act();
            usaService.getCommentList().then(data => {
                useUsaStore().usa_comment_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        })
    }

}
</script>
<style scoped>

</style>
