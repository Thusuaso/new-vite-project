<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <div class="row m-auto mt-3 mb-3">
        <div class="col-6 mb-3" v-for="item of getShopperSelectionCustomerListGroups" :key="item">
            <shopperSelectionList   :item="item"/>
        </div>
    </div>
    <Dialog v-model:visible="shopper_selection_form" header="" modal :style="{ 'width': '100vw' }">
        <shopperSelectionForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';

import shopperSelectionForm from '../components/shopper/shopperSelectionForm.vue';
import shopperSelectionList from '../components/shopper/shopperSelectionList.vue';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperSelectionSurfaceList',
            'getShopperSelectionCustomerList',
            'getShopperSelectionCustomerListGroups'
        ])
    },
    components: {
        shopperSelectionForm,
        shopperSelectionList
    },
    data() {
        return {
            shopper_selection_form: false,

        }
    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperSelectionModel(localStorage.getItem('userId')).then(data => {
                useShopperStore().shopper_selection_new_button_load_act(true);
                useShopperStore().shopper_selection_model_load_act(data);
                useLoadingStore().end_loading_act();
            })
            this.shopper_selection_form = true;
        }
    },
    mounted() {
        socket.socketIO.on('shopper_selection_update_list_on', (userId) => {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperSelectionList(userId).then(data => {
                useShopperStore().shopper_selection_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        });
        this.emitter.on('open_selection_form', () => {
            this.shopper_selection_form = true;
        });
        this.emitter.on('close_selection_dialog', () => {
            this.shopper_selection_form = false;
        })

    }
}
</script>

<style scoped>

</style>