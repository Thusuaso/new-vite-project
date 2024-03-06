<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarGuLogsList"
                v-model:filters="filters"
                filterDisplay="row"
                style="font-size:85%;"
                :rowStyle="rowStyle"
            >
                <Column 
                    field="kayit_tarihi" 
                    header="Kayıt Tarihi"
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
                    field="kayit_kisi" 
                    header="Değişim Yapan"
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
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="info" header="Bilgi"></Column>

            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuLogsList',
        ])
    },
    data() {
        return {
            filters: {
                kayit_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kayit_kisi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods:{
        rowStyle(event) {
            return { 'backgroundColor': event.renk };
        }
    }
}
</script>