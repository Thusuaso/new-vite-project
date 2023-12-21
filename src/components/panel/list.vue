<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="success" class="btn btn-success w-100" @click="$emit('panelProductNewEmit')">Yeni</button>
        </div>
        <div class="col">
            <Dropdown v-model="selectedCategory" :options="categoryList" optionLabel="kategoriadi_en"
             @change="categorySelected($event)" class="w-100" />
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getPanelProductList" 
                    style="font-size:85%;" 
                    v-model:filters="filters"
                    filterDisplay="row"
                    v-model:selection="selectedPanelProduct"
                    selectionMode="single"
                    @row-click="panelProductSelected($event)"
                    sortField="sira"
                    sortOrder="1"
                    paginator :rows="15"
                    class="p-datatable-sm"
                >
                <Column 
                        field="sira" 
                        header="Sıra"
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
                        field="urunid" 
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
                        field="urunkod" 
                        header="Kod"
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
                
                        field="urunadi_en" 
                        header="Ürün Adı"
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
                <Column header="Fotolar" v-if="userId == 10">
                    <template #body="slotProps">
                        <img :src="item.imagePath" v-for="item of slotProps.data.fotolar" :key="item" width="30"
                            height="30" />
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { usePanelStore } from '../../stores/panel';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { panelService } from '../../services/panelService';
import { socket } from '../../services/customServices/realTimeService';

import { FilterMatchMode } from 'primevue/api';

export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProductList',
            'getPanelCategoryList',
        ])
    },
    data() {
        return {
            userId:null,
            selectedCategory: {},
            filters: {
                urunid: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                renk_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunkod: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunadi_en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                sira: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            selectedPanelProduct: {},
            categoryList:[],
        }
    },
    created() {
        this.selectedCategory = this.getPanelCategoryList[0];
        this.userId = localStorage.getItem('userId');
        this.categoryList = this.getPanelCategoryList.filter(x=> (x.kategoriadi_en != 'Basalt') && (x.kategoriadi_en != 'Granite') && (x.kategoriadi_en != 'Glass'));
    },
    methods: {
        panelProductSelected(event) {
            useLoadingStore().begin_loading_act();
            panelService.getPanelDetail(event.data.urunid).then(data=>{
                usePanelStore().panel_product_model_list_load_act(data);
                usePanelStore().panel_product_new_button_load_act(false);
                this.$emit('openPanelDetailForm', event.data);
                useLoadingStore().end_loading_act();
            })
        },
        categorySelected(event) {
            useLoadingStore().begin_loading_act();
            panelService.getPanelProductList(event.value.kategoriadi_en,this.$route.params.yayinla).then(data => {
                usePanelStore().panel_product_list_load_act(data);
                usePanelStore().panel_product_kategori_adi_load_act(event.value.kategoriadi_en);
                useLoadingStore().end_loading_act();
            });
        }
    },
    mounted() {
        socket.socketIO.on('panel_product_update_on', (product_id) => {
            panelService.getPanelDetail(product_id).then(data => {
                usePanelStore().panel_product_model_list_load_act(data);
                usePanelStore().panel_product_new_button_load_act(false);
                this.emitter.emit('fotografListUpdate');
                useLoadingStore().end_loading_act();
            })
        })

    }
}
</script>
<style scoped></style>