<template>
    <div class="row m-auto mt-3" v-if="!getMobile">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">New</button>
        </div>
    </div>
    <div class="row m-auto mt-3" v-if="getMobile">
        <div class="col">
            <button type="button" class="btn btn-success w-100 mb-3" @click="newForm">New</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getShopperBgpList" 
                style="font-size:85%;"
                v-model:filters="filters"
                filterDisplay="row"
                v-model:selection="selectedShopperBgp"
                selectionMode="single"
                @row-click="shopperBgpSelected($event)"
                paginator 
                :rows="15"

            >
                <Column 
                    field="customer" 
                    header="Customer"
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
                    field="company" 
                    header="Company"
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
                <Column field="phone" header="Phone"></Column>
                <Column field="email" header="Mail"></Column>
                <Column field="adress" header="Adress"></Column>
                <Column 
                    field="country" 
                    header="Country"
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
                    header="Salesman"
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
    <Dialog v-model:visible="shopper_bgp_from" header="" modal :style="{ 'width': '100vw' }">
        <shopperBgpForm />
    </Dialog>   
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';


import shopperBgpForm from '../components/shopper/shopperBgpForm.vue';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperBgpList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    components: {
        shopperBgpForm,
    },
    data() {
        return {
            filters: {
                customer: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                company: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                satisci: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                country: { value: null, matchmode: FilterMatchMode.STARTS_WITH },


            },
            shopper_bgp_from: false,
            selectedShopperBgp: {},
        }
    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperBgpModel().then(data => {
                useShopperStore().shopper_bgp_model_load_act(data);
                useShopperStore().shopper_bgp_new_button_load_act(true);
                this.shopper_bgp_from = true;
                useLoadingStore().end_loading_act();

            })
        },
        shopperBgpSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperBgpDetail(event.data.id).then(data => {
                useShopperStore().shopper_bgp_model_load_act(data);
                useShopperStore().shopper_bgp_new_button_load_act(false);
                this.shopper_bgp_from = true;
                useLoadingStore().end_loading_act();
            });
        }
    },
    mounted() {
        socket.socketIO.on('shopper_bgp_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperBgpList().then(data => {
                useShopperStore().shopper_bgp_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        });
        this.emitter.on('close_bgp_dialog', () => {
            this.shopper_bgp_from = false;
        })

        
    }
}
</script>
<style scoped>

</style>