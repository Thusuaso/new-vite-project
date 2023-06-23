<template>
    <DataTable 
        :value="getSelectionList" 
        v-model:selection="selectedProduct" 
        selectionMode="single" 
        @row-select="selectedDetailCrate($event)" 
        class="p-datatable-sm" 
        tableStyle="min-width: 50rem"
         paginator 
         :rows="15" 
         v-model:filters="filters" 
         filterDisplay="row"
         @filter="selectionFiltered($event)"
         >
        <Column field="kasa_no" header="Kasa No"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showFilterMenu="false"
            :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
            
        </Column>
        <Column field="tarih" header="Tarih"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="kategori" header="Kategori"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="ocak" header="Ocak"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
            </template>
        </Column>
        <Column field="urunadi" header="Ürün"
        >
            <template #footer>
                {{ $filters.formatDecimal(getSelectionSum.crate) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" style="width:100px;"/>
            </template>
        </Column>
        <Column field="kenarislem" header="İşlem"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="en" header="E"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="boy" header="B"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="kenar" header="K"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >   
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>

        <Column 
            field="kasaadet" 
            header="K.Adet"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showFilterMenu="false"
            :showFilterOperator="false"
        >
            <template #footer>
                {{ $filters.formatDecimal(getSelectionSum.cratePiece) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column 
            field="kutuadet" 
            header="Kutu"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showFilterMenu="false"
            :showFilterOperator="false"
        >
            <template #footer>
                {{ $filters.formatDecimal(getSelectionSum.boxPiece) }}
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="m2" header="M2">
            <template #footer>
                {{ $filters.formatDecimal(getSelectionSum.m2) }}
            </template>
        </Column>
        <Column field="kutu" header="K">
            <template #body="slotProps">
                <div v-if="slotProps.data.kutu">
                    *
                </div>
                <div v-else>
                    x
                </div>
            </template>
        </Column>
        <Column field="bagli" header="B">
            <template #body="slotProps">
                <div v-if="slotProps.data.bagli">
                    *
                </div>
                <div v-else>
                    x
                </div>
            </template>
        </Column>
        <Column field="siparisaciklama" header="Po"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="aciklama" header="Not"
            :showClearButton="false"
                :showFilterMatchModes="false"
                :showFilterMenu="false"
                :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
        </Column>
    </DataTable>
</template>
<script>
import { useCardStore } from '../../stores/cards';
import { useLoadingStore } from '../../stores/loading';
import { useSelectionStore } from '../../stores/selection';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import { selectionService } from '../../services/selectionService';
import { cardService } from '../../services/cardService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useSelectionStore, [
            'getSelectionList',
            'getBtnFormMekmer',
            'getBtnFormOuter',
            'getBtnFormMekmerOuter',
            'getBtnFormNotFound',
            'getSelectionSum'
        ])
    },
    data() {
        return {
            filters: {
                'kasa_no': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'tarih': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kategori': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'ocak': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'urunadi': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kenarislem': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'en': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'boy': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kenar': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'siparisaciklama': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'aciklama': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kutuadet': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                'kasaadet': { value: null, matchMode: FilterMatchMode.STARTS_WITH },









            },
            selectedProduct:{},
        }
    },
    methods: {
        selectionFiltered(event) {
            useSelectionStore().selection_total_sum_load_act(event.filteredValue);
            useSelectionStore().selection_filtered_list_load_act(event.filteredValue);
        },
        selectedDetailCrate(event) {
            useSelectionStore().selection_new_button_load_act(false);
            selectionService.getSelectionDetail(event.data.kasa_no).then(data => {
                useSelectionStore().selection_model_list_load_act(data);
                let values = {
                    'status': true,
                    'crateNo': event.data.kasa_no
                };
                this.$emit('formDialogFunc', values);
            })
        }
    },
    mounted() {
        socket.socketIO.on('selection_update_on', () => {
            useLoadingStore().end_loading_act();
            selectionService.getSelectionList().then(data => {
                useSelectionStore().selection_list_load_act(data);
                if (this.getBtnFormMekmer) useSelectionStore().btn_form_mekmer_load_act();
                else if (this.getBtnFormOuter) useSelectionStore().btn_form_outer_load_act();
                else if (this.getBtnFormMekmerOuter) useSelectionStore().btn_form_mekmer_outer_load_act();
                else if (this.getBtnFormNotFound) useSelectionStore().btn_form_not_found_load_act();

                
                cardService.getCardList().then(data => {
                    useCardStore().card_list_load_act(data);
                    useLoadingStore().end_loading_act();


                })

            })

        })
    }
}
</script>
<style scoped>

</style>