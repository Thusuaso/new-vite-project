<template>
    <DataTable 
        v-model:value="getShopperSellerList" 
        style="font-size:85%;"
        v-model:selection="selectedShopperSeller"
        selectionMode="single"
        @row-click="shopperSellerSelected($event)"
    >
        <Column field="SiparisNo" header="Po"></Column>
        <Column field="Satisci" header="Satışçı"></Column>
        <Column field="Operasyon" header="Operasyon"></Column>
    </DataTable>
    <Dialog v-model:visible="is_seller_product_form" header modal>
        <shopperSellerProductForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';
import { shopperService } from '../../services/shopperService';

import shopperSellerProductForm from '../../components/shopper/shopperSellerProductForm.vue';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperSellerList'
        ])
    },
    components: {
        shopperSellerProductForm
    },
    data() {
        return {
            selectedShopperSeller: {},
            is_seller_product_form:false,
        }
    },
    methods: {
        shopperSellerSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperSellerProductList(event.data.SiparisNo).then(data => {
                useShopperStore().shopper_seller_product_list_load_act(data);
                this.is_seller_product_form = true;
                useLoadingStore().end_loading_act();
            })
        }
    }
}
</script>