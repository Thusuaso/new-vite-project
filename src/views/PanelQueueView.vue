<template>
    <div class="container">
        <Dropdown v-model="selectedCategory" :options="getPanelCategoryList" optionLabel="kategoriadi_en"  @change="categorySelected($event)"/>
        <button type="button" class="btn btn-success w-100" @click="saveQueue" :disabled="save_button_disabled">Kaydet</button>
        <queue :queueList="getProductQueueProducts"/>
    
    </div>
</template>
<script>
import queue from '../components/panel/queue.vue';
import {mapState} from 'pinia';
import { usePanelStore } from '../stores/panel';
import { panelService } from '../services/panelService';
import { useLoadingStore } from '../stores/loading';
export default {
    computed:{
        ...mapState(usePanelStore, [
            'getPanelCategoryList',
            'getProductQueueProducts'
        ]),

    },
    components:{
        queue
    },
    data(){
        return{
            save_button_disabled:false,
            categories:[],
            selectedCategory: { "foto_en": "", "foto_es": "", "foto_fr": "", "foto_link_en": "", "foto_web_en": "", "foto_web_es": "", "foto_web_fr": "", "kategori_id": 1, "kategoriadi_en": "Marble", "kategoriadi_es": "Mármol", "kategoriadi_fr": "Marbre", "link": "", "sira": null, "urunSayisi": 0 },
        }
    },
    methods:{
        saveQueue(){
        
            this.save_button_disabled = true;
            useLoadingStore().begin_loading_act();
            panelService.setQueueProducts(this.getProductQueueProducts)
          .then(response=>{
                if(response.status){
                    this.save_button_disabled = false;
                    useLoadingStore().end_loading_act();

                  this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});  
                }else{
                  this.save_button_disabled = false;
                  useLoadingStore().end_loading_act();

                  this.$toast.add({severity:'error',detail:'Kayıt Başarısız',life:3000});  
                }
            })
        },
        categorySelected(event){
            useLoadingStore().begin_loading_act();
            panelService.getQueueProductsList(event.value.kategori_id)
            .then(response=>{
                usePanelStore().panel_queue_products_load_act(response.products);
                useLoadingStore().end_loading_act();
            });
        }
    }
}
</script>