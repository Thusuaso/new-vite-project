<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                v-model:value="getShopperFairList" 
                style="font-size:85%;"
                v-model:filters="filters"
                filterDisplay="row"
                paginator 
                :rows="15"
                v-model:selection="selectedShopperFair"
                selectionMode="single"
                @row-click="shopperFairSelected($event)"
            >
                <Column 
                    field="customer" 
                    header="Müşteri"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="company" 
                    header="Şirket"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                    </template>
                </Column>
                <Column field="email" header="Mail"></Column>
                <Column field="phone" header="Telefon"></Column>
                <Column field="adress" header="Adres"></Column>
                <Column 
                    field="country" 
                    header="Ülke"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                    </template>
                </Column>
                <Column 
                    field="satisci" 
                    header="Satışçı"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                    
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="shopper_fair_form" header="" modal :style="{ 'width': '100vw' }">
        <shopperFairForm/>
    </Dialog>   
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';

import shopperFairForm from '../components/shopper/shopperFairForm.vue';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperFairList'
        ])
    },
    components: {
        shopperFairForm
    },
    data() {
        return {
            filters: {
                customer: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                company: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                country: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                satisci: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            shopper_fair_form: false,
            selectedShopperFair: {},
        }
    },
    methods: {
        shopperFairSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperFairDetail(event.data.id).then(data => {
                useShopperStore().shopper_fair_model_load_act(data);
                useShopperStore().shopper_fair_new_button_load_act(false);
                this.shopper_fair_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        newForm() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperFairModel().then(data => {
                useShopperStore().shopper_fair_model_load_act(data);
                useShopperStore().shopper_fair_new_button_load_act(true);
                this.shopper_fair_form = true;
                useLoadingStore().end_loading_act();

            })
        }
    },
    mounted() {
        socket.socketIO.on('shopper_fair_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperFairList().then(data => {
                useShopperStore().shopper_fair_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        });
        this.emitter.on('close_fair_dialog', () => {
            this.shopper_fair_form = false;
        })
    }
}
</script>
<style scoped>

</style>