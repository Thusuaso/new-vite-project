<template>
    <list @openPanelDetailForm="openPanelDetailForm($event)" @panelProductNewEmit="newForm"/>
    
    <Dialog v-model:visible="panel_products_form" :header="urunadi + ' - ' + urunid" modal :style="{ 'width': '100vw' }" :closeOnEscape="false">
        <panelForm  @product_id_emit="productIdEmit($event)" :urunid="urunid" @panel_dialog_closed="panel_products_form = false"/>
    </Dialog>
</template>
<script>
import { usePanelStore } from '../stores/panel';
import { useLoadingStore } from '../stores/loading';

import { panelService } from '../services/panelService';

import list from '../components/panel/list.vue';
import form from '../components/panel/form.vue';
import {mapState} from 'pinia';
export default {
    computed:{
      ...mapState(usePanelStore,['getProductModel'])  
    },
    components: {
        list,
        panelForm:form,
    
    },
    data() {
        return {
            panel_products_form: false,
            urunid:0,
            urunadi:null,
        }
    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            panelService.getPanelModel().then(data => {
                usePanelStore().panel_product_model_list_load_act(data);
                usePanelStore().panel_product_new_button_load_act(true);
                this.panel_products_form = true;
                useLoadingStore().end_loading_act();
          
            });
        },
        productIdEmit(event){
          this.urunid = event.urunid;
          // @ts-ignore
          this.getProductModel.urunid = event.urunid;
          this.urunadi = event.urunadi_en;

        },
        openPanelDetailForm(event) {
            this.panel_products_form = true;
            this.urunid = event.urunid;
            this.urunadi = event.urunadi_en;


        }
    }

}
</script>