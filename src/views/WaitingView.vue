<template>
    <div>
        <productions :title="'Bekleyen Listesi'" @changeYearProductions="changeYearProductions($event)"/>
    </div>
</template>
<script>
import productions from '../components/order/productions.vue';
import { productionsService } from '../services/productions';
import { useLoadingStore } from '../stores/loading';
import { useProductionsStore } from '../stores/productions';
export default {
    components: {
        productions
    },
    methods: {
        changeYearProductions(event) {
            useLoadingStore().begin_loading_act();
            productionsService.getOrderList(1, event).then(data => {
                useProductionsStore().productions_list_load_act(data.products);
                useProductionsStore().productions_list_filter_load_act(data.products);
                useProductionsStore().productions_unit_list_load_act(data.productUnit);
                useProductionsStore().productions_supplier_list_load_act(data.supplier);
                useProductionsStore().productions_delivery_list_load_act(data.delivery);
                useProductionsStore().productions_payment_list_load_act(data.payment);
                useProductionsStore().productions_invoice_list_load_act(data.invoice);
                useProductionsStore().productions_country_list_load_act(data.country);
                useProductionsStore().productions_customers_list_load_act(data.customers);
                useProductionsStore().productions_users_list_load_act(data.users);
                useProductionsStore().productions_status_id_load_act(1);
                useProductionsStore().products_total_datatable_load_act(data.products);
                useLoadingStore().end_loading_act();

            })
        }
    }
}
</script>