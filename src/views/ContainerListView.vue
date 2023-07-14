<template>
    <div class="row">
        <div class="col">
            <DataTable 
                    v-model:value="getContainerList" 
                    tableStyle="min-width: 50rem" 
                    paginator 
                    :rows="15"
                    v-model:filters="filters"
                    filterDisplay="row"
                >
                <Column 
                    field="yukleme_tarihi" 
                    header="Yükleme Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                    field="firma_adi" 
                    header="Firma Adı"
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
                    field="siparis_no" 
                    header="Po"
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
                    field="fatura_no" 
                    header="Fatura No"
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
                    field="tur" 
                    header="Tür"
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
                    field="kur"
                    header="Kur"
                >
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.kur) }}
                    </template>
                </Column>
                <Column field="tutar" header="$">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                </Column>
                <Column  header="₺">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.tutar * slotProps.data.kur) }}
                    </template>
                </Column>
                <Column field="aciklama" header="Açıklama">
                </Column>
                <Column field="genel_link" header="Link">
                    <template #body="slotProps">
                        <a :href="slotProps.data.genel_link">
                            <button type="button" class="btn btn-success pi pi-download"></button>
                        </a>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
</template>
<script>
import { useContainerStore } from '../stores/container';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useContainerStore, [
            'getContainerList',
        ])
    },
    data(){
        return {
            filters: {
                yukleme_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                firma_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                fatura_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                tur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            }
        }
    }
}
</script>
<style scoped>

</style>