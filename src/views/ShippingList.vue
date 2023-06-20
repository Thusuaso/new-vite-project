<template>
    <DataTable 
        v-model:value="getShippingInvoiceList" 
        v-model:filters="filters"
        filterDisplay="row"
        paginator :rows="12"
    >
        <Column field="tarih" header="Tarih"></Column>
        <Column field="siparis_no" header="Po"
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
        <Column field="firma_adi" header="Firma"></Column>
        <Column field="faturaNo" header="Fatura No"></Column>
        <Column field="Tutar_tl" header="₺">
            <template #body="slotProps">
                {{ $filters.formatPriceTl(slotProps.data.Tutar_tl) }}
            </template>
        </Column>
        <Column field="kur" header="Kur">
            <template #body="slotProps">
                {{ $filters.formatPriceTl(slotProps.data.kur) }}
            </template>
        </Column>
        <Column field="Tutar_dolar" header="$">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.Tutar_dolar) }}
            </template>
        </Column>
        <Column field="link" header="Link">
            <template #body="slotProps">
                <a :href="slotProps.data.link">
                    <button type="button" class="btn btn-success pi pi-download"></button>
                </a>
            </template>
        </Column>
    </DataTable>
</template>
<script>
import { useShippingStore } from '../stores/shipping';
import { mapState } from 'pinia'

import { FilterMatchMode } from 'primevue/api';

export default {
    computed: {
        ...mapState(useShippingStore, [
            'getShippingInvoiceList',
        ])
    },
    data() {
        return {
            filters: {
                siparis_no:{value:null,matchmode:FilterMatchMode.STARTSWITH}
            }
        }
    }
}
</script>
<style scoped>

</style>