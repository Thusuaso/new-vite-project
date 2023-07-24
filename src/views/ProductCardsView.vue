<template>
    <div class="row m-auto">
        <div class="col">
            <button type="text" class="btn btn-primary" @click="newForm">Yeni</button>
        </div>
        <div class="col">

        </div>
    </div>
    <br/>
    <DataTable 
    :value="getCardList" 
    paginator :rows="15" 
    :rowsPerPageOptions="[5, 10, 20, 50]"
    sortField="sira"
    :sortOrder="-1"
    v-model:filters="filters"
    filterDisplay="row"
    v-model:selection="selectedCard"
    selectionMode="single"
    @row-click="cardSelected($event)"
    style="font-size:85%;"
    >
        <Column field="sira" header="#"></Column>
        <Column field="id" header="Id"></Column>
        <Column field="kategoriAdi" header="Kategori"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="urunAdi" header="Ürün"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_1" header="Y1"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_2" header="Y2"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_3" header="Y3"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="en" header="En"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="boy" header="Boy"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="kenar" header="Kenar"
            :showFilterMenu="false"
            :showFilterOperator="false"
            :showClearButton="false"
            :showApplyButton="false"
            :showFilterMatchModes="false"
            :showAddButton="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="new_card_form" header="Yeni Kart" modal>
        <newForm :selectedCard="selectedCard"/>
    </Dialog>
</template>
<script>
import { useCardStore } from '../stores/cards';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { cardService } from '../services/cardService';
import { socket } from '../services/customServices/realTimeService';

import form from '../components/cards/form.vue';

export default {
    computed: {
        ...mapState(useCardStore, [
            'getCardList'
        ]),
    },
    components: {
        newForm:form,
    },
    data() {
        return {
            filters: {
                'kategoriAdi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'urunAdi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'yuzey_1': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'yuzey_2': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'yuzey_3': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'en': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'boy': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kenar': { value: null, matchMode: FilterMatchMode.STARTS_WITH },


                
            },
            new_card_form: false,
            selectedCard: {},
        }
    },
    methods: {
        newForm() { 
            useCardStore().card_new_button_load_act(true);
            useLoadingStore().begin_loading_act();
            cardService.getNewCardForm().then(data => {
                useCardStore().card_model_list_load_act(data);
                this.new_card_form = true;
                useLoadingStore().end_loading_act();
            });
        },
        cardSelected(event) {
            this.selectedCard = event.data;
            useCardStore().card_new_button_load_act(false);
            useLoadingStore().begin_loading_act();
            cardService.getCardModelForm(event.data.id).then(data => {
                useCardStore().card_model_list_load_act(data);
                this.new_card_form = true;
                useLoadingStore().end_loading_act();

            })
        },
    },
    mounted() {
        socket.socketIO.on('cards_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            cardService.getCardList().then(data => {
                useCardStore().card_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        }),
            this.emitter.on('close_card_form', () => {
                this.new_card_form = false;
            })
    }
    
}
</script>
<style scoped>

</style>