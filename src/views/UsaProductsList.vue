<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <list/>
        </div>
    </div>
    <Dialog v-model:visible="usa_products_new_form" header="" modal>
        <newForm/>
    </Dialog>
</template>
<script>
import { useUsaStore } from '../stores/usa';
import { useLoadingStore } from '../stores/loading';

import { usaService } from '../services/usaService';

import list from '../components/usa/list.vue';
import form from '../components/usa/form.vue';
export default {
    components: {
        list,
        newForm:form,
    },
    data() {
        return {
            usa_products_new_form:false,
        }
    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            usaService.getUsaSkuList().then(data => {
                useUsaStore().usa_sku_list_load_act(data);
                this.usa_products_new_form = true;
                useUsaStore().usa_new_button_load_act(true);
                useLoadingStore().end_loading_act();

            })
            
        }
    }
}
</script>