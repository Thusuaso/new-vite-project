<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
            :value="getShopperOfferList" 
            style="font-size:85%;"
            paginator 
            :rows="15"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedShopperOffer"
            selectionMode="single"
            @row-click="shopperOfferSelected($event)"

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
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
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
                field="countryName" 
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
                field="username" 
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
    <Dialog v-model:visible="shopper_offer_form" header="" modal :style="{ 'width': '100vw' }">
        <shopperOfferForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';
import shopperOfferForm from '../components/shopper/shopperOfferForm.vue';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperOfferList'
        ])
    },
    components: {
        shopperOfferForm
    },
    data() {
        return {
            filters: {
                customer: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                company: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                countryName: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                username: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
            },
            shopper_offer_form: false,
            selectedShopperOffer: {},
        }
    },
    methods: {
        shopperOfferSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperOfferDetail(event.data.id).then(data => {
                useShopperStore().shopper_offer_model_load_act(data);
                useShopperStore().shopper_offer_new_button_load_act(false);
                this.shopper_offer_form = true;
                useLoadingStore().end_loading_act();
            })
            
        },
        newForm() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperOfferModel().then(data => {
                useShopperStore().shopper_offer_model_load_act(data);
                useShopperStore().shopper_offer_new_button_load_act(true);
                this.shopper_offer_form = true;
                useLoadingStore().end_loading_act();
            })

        }
    },
    mounted() {
        socket.socketIO.on('shopper_offer_update_list_on', () => {
            shopperService.getShopperOfferList().then(data => {
                useLoadingStore().begin_loading_act();
                useShopperStore().shopper_offer_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        });
        this.emitter.on('close_shopper_offer_dialog', () => {
            this.shopper_offer_form = false;
        })
    }
}
</script>
<style scoped>

</style>