<template >
    <DataTable 
            :value="getUsaList" 
            sortField="skuno"
            :sortOrder="1"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedUsaList"
            selectionMode="single"
            @row-click="usaListSelected($event)"
            style="font-size:85%;"
        >
        <Column 
            field="skuno" 
            header="Sku" 
            style="width:15px;"
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
            field="urunadi" 
            header="Ürün" 
            style="width:15px;"
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
            field="size" 
            header="Ebat" 
            style="width:15px;"
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
            field="renk" 
            header="Renk" 
            style="width:15px;"
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
        <Column field="dtpfiyat" header="D.Fiyat" style="width:15px;">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.dtpfiyat) }}
            </template>
        </Column>
        <Column field="fiyat" header="Ö.Fiyat" style="width:15px;">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.fiyat) }}
            </template>
        </Column>
        <Column header="Fotolar">
            <template #body="slotProps">
                <img v-for="item of slotProps.data.fotolar" :key="item" :src="item.link" width="50" height="50"/>
            </template>
        </Column>

    </DataTable>
    <Dialog v-model:visible="usa_products_detail_form" modal header="" :style="{ 'width': '100vw' }">
        <detailForm/>
    </Dialog>
</template>
<script>
import { useUsaStore } from '../../stores/usa';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { usaService } from '../../services/usaService';

import form from '../../components/usa/form.vue';

export default {
    computed: {
        ...mapState(useUsaStore, [
            'getUsaList',
            'getUsaSkuList'
        ])
    },
    components: {
        detailForm: form,
    },
    data() {
        return {
            filters: {
                skuno:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                size: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                renk: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedUsaList: {},
            usa_products_detail_form:false,
        }
    },
    methods: {
        usaListSelected(event) {
            useLoadingStore().begin_loading_act();
            usaService.getUsaSkuList().then(data => {
                useUsaStore().usa_sku_list_load_act(data);
                const result = data.find(x => x.skuNo == event.data.skuno);
                useUsaStore().usa_product_detail_list_load_act(result);
                this.usa_products_detail_form = true;
                useUsaStore().usa_new_button_load_act(false);
                useLoadingStore().end_loading_act();
            });
            

        }
    }
}
</script>