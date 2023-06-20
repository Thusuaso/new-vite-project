<template>
    <div class="row m-auto">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newCustomer">Yeni</button>
        </div>
        <div class="col">

        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
            :value="getShopperList" 
            tableStyle="min-width: 50rem" 
            paginator 
            :rows="15"
            sortField="sira"
            :sortOrder="-1"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedShopper"
            selectionMode="single"
            @row-click="shopperSelected($event)"
            >
            <Column field="sira" header="#"></Column>
            <Column 
                field="id" 
                header="Id"
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
                field="musteriadi" 
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
                field="unvan" 
                header="Firma"
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
            <Column field="adres" header="Adres"></Column>
            <Column 
                field="marketing" 
                header="Marketing"
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
                field="ulkeadi" 
                header="Ülke"
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
            <Column field="logo" header="Logo">
                <template #body="slotProps">
                    <img :src="slotProps.data.logo"/>
                </template>
            </Column>
            <Column 
                field="temsilci" 
                header="Temsilci"
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
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="devir" header="Devir">
                <template #body="slotProps">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.devir" disabled>
                </template>
            </Column>
            <Column field="ozel" header="Özel">
                <template #body="slotProps">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.ozel" disabled>
                </template>
            </Column>


            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="is_shopper_form" header="" modal>
        <shopperForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';

import form from '../components/shopper/form.vue';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperList',
        ])
    },
    components: {
        shopperForm:form,
    },
    data() {
        return {
            filters: {
                id: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                musteriadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                unvan: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                marketing: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                ulkeadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                temsilci: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                satisci: { value: null, matchmode: FilterMatchMode.STARTS_WITH }, 
            },
            is_shopper_form: false,
            selectedShopper: {},
        }
    },
    methods: {
        shopperSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperDetail(event.data.id).then(data => {
                useShopperStore().shopper_new_button_load_act(false);
                useShopperStore().shopper_model_load_act(data);
                useLoadingStore().end_loading_act();
                this.is_shopper_form = true;
            })
            
        },
        newCustomer() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperModel().then(data => {
                useShopperStore().shopper_model_load_act(data);
                this.is_shopper_form = true;
                useShopperStore().shopper_new_button_load_act(true);
                useLoadingStore().end_loading_act();
            })
        }
    },
    mounted() {
        socket.socketIO.on('shopper_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperList().then(data => {
                useShopperStore().shopper_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        }),
            this.emitter.on('close_dialog', () => {
                this.is_shopper_form = false;
            })
    }
}
</script>
<style scoped>

</style>