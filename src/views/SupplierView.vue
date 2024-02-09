<template>
    <div class="row m-auto">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
        </div>
    </div>
    <br/>
    <DataTable 
        :value="getSupplierList" 
        style="font-size:85%;"
        v-model:selection="selectedSupplier"
        selectionMode="single"
        @row-click="supplierSelected($event)"
        v-model:filters="filters"
        filterDisplay="row"
        scrollable 
        scrollHeight="600px"
    >
        <Column field="tedarikciadi" header="Supplier"
            :showClearButton="false"
            :showFilterMatchModes="false"
            :showFilterMenu="false"
            :showFilterOperator="false"
        >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
            </template>
        </Column>
        <Column field="siparis_sayisi" header="Total Order"></Column>
    </DataTable>
    <Dialog v-model:visible="supplier_form" :header="supplier_form_header" modal :style="{ 'width': '100vw' }">
        <supplierForm :selectedSupplier="selectedSupplier"/>
    </Dialog>   
</template>
<script>
import { useSupplierStore } from '../stores/supplier';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import form from '../components/supplier/form.vue';

import { supplierService } from '../services/supplierService';
import { socket } from '../services/customServices/realTimeService';

import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useSupplierStore, [
            'getSupplierList'
        ])
    },
    components: {
        supplierForm:form,
    },
    data() {
        return {
            supplier_form: false,
            supplier_form_header:'',
            filters: {
                'tedarikciadi':{value:null,matchMode:FilterMatchMode.STARTS_WITH}
            },
            selectedSupplier: {},
        }
    },
    methods: {
        supplierSelected(event) {
            this.supplier_form_header = event.data.tedarikciadi;
            useSupplierStore().supplier_new_button_load_act(false);
            this.supplier_form = true;
        },
        newForm() {
            this.supplier_form_header = 'Yeni Tedarikçi Form';
            useSupplierStore().supplier_new_button_load_act(true);
            this.supplier_form = true;
        }
    },
    mounted() {
        socket.socketIO.on('supplier_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            supplierService.getSupplierList().then(data => {
                useSupplierStore().supplier_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>
<style scoped>

</style>