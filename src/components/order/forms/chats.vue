<template>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-2">
          <img :src="chatsData.image" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ chatsData.kullaniciAdi }}</h5>
            <p class="card-text">
                <div class="form-floating">
                    <textarea  class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="message" style="padding-top:35px;"></textarea>
                    <label for="floatingTextarea">Mesajınızı buraya yazınız...</label>
                </div>
            </p>
            <p class="card-text">
            <small class="text-body-secondary">
                <button type="button" class="btn btn-success" @click="send" :disabled="chat_button_disabled">Gönder</button>
            </small></p>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
import { useProductionsStore } from '../../../stores/productions';
import { useLoadingStore } from '../../../stores/loading';
import { mapState } from 'pinia';

import { productionsService } from '../../../services/productions';

export default {
    props: ['chatsData', 'po','chatList'],
    computed: {
        ...mapState(useProductionsStore, [
            'getProductChatWhoSend'
        ])
    },
    data() {
        return {
            message: "",
            chat_button_disabled:false,
        }
    },
    created() {
        if (this.chatList) {
            this.message = this.chatList.mesaj;
        };
    },
    methods: {
        send() {
            this.chat_button_disabled = true;
            useLoadingStore().begin_loading_act();
            const datas = {
                'po': this.po,
                'gonderen': this.getProductChatWhoSend.kullaniciAdi + ' ' + this.getProductChatWhoSend.kullaniciSoyAd,
                'alici': this.chatsData.mailAdres,
                'metin': this.message,
                'bugun': new Date(),
            };
            productionsService.sendChatsMail(datas).then(data => {
                if (data) {
                    useLoadingStore().end_loading_act();
                    this.chat_button_disabled = false;
                    this.$toast.add({ severity: 'success', detail: 'Mesajınız başarıyla iletildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.chat_button_disabled = false;
                    this.$toast.add({ severity: 'error', detail: 'Mesaj gönderimi başarısız', life: 3000 });
                };
            });
        },
        
    }
}
</script>

<style scoped>
</style>