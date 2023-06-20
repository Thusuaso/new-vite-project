<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="success" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <list @openPanelDetailForm="panel_products_form = true"/>
    <Dialog v-model:visible="panel_products_form" header="" modal>
        <panelForm/>
    </Dialog>
</template>
<script>
import { usePanelStore } from '../stores/panel';
import { useLoadingStore } from '../stores/loading';

import { panelService } from '../services/panelService';

import list from '../components/panel/list.vue';
import form from '../components/panel/form.vue';
export default {
    components: {
        list,
        panelForm:form,
    },
    data() {
        return {
            panel_products_form:false,
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
        }
    }

}
</script>