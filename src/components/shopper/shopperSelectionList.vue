<!-- eslint-disable vue/no-mutating-props -->
<template>
    <DataTable 
            v-model:value="item.dataList"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedSelection"
            selectionMode="single"
            @row-click="selectionSelected($event)"
            style="font-size:85%;"
        >
            <template #header>
                {{ item.surfaceName }}
            </template>
            <Column 
                field="firstName" 
                header="Müşteri"
                :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
            >
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="city" header="Şehir"></Column>
            <Column field="phone" header="Telefon"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="adress" header="Adres"></Column>

    </DataTable>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { useLoadingStore } from '../../stores/loading';

import { FilterMatchMode } from 'primevue/api';
import { shopperService } from '../../services/shopperService';
export default {
    props: ['item'],
    data() {
        return {
            filters: {
                firstName:{value:null,matchmode:FilterMatchMode.STARTS_WITH},
            },
            selectedSelection: null,
        }
    },
    methods: {
        selectionSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperSelectionDetail(localStorage.getItem('userId'), event.data.id).then(data => {
                useShopperStore().shopper_selection_new_button_load_act(false);
                useShopperStore().shopper_selection_model_load_act(data);
                this.emitter.emit('open_selection_form');
                useLoadingStore().end_loading_act();
            });
        }
    }
}
</script>