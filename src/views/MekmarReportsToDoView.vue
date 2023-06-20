<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getMekmarToDoListToDo" 
                    rowGroupMode="rowspan"
                    groupRowsBy="giris_tarihi" 
                    scrollable 
                    scrollHeight="500px"
                    v-model:filters="filters"
                    filterDisplay="row"
                >
                <template #header>
                    Yapılacaklar
                </template>
                <Column 
                        field="giris_tarihi" 
                        header="G.Tarihi"
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
                    field="gorev_veren" 
                    header="G.Veren"
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
                    field="gorev_sahibi" 
                    header="G.Sahibi"
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
                <Column field="gorev" header="Görev"></Column>
                <Column 
                    field="gorev_oncelik" 
                    header="Öncelik"
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
            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-5 mb-5">
            <div class="col">
                <DataTable 
                        :value="getMekmarToDoListDone" 
                        rowGroupMode="rowspan"
                        groupRowsBy="giris_tarihi" 
                        scrollable 
                        scrollHeight="500px"
                        v-model:filters="filters2"
                        filterDisplay="row"
                    >
                    <template #header>
                        Yapılanlar
                    </template>
                    <Column 
                            field="giris_tarihi" 
                            header="G.Tarihi"
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
                                field="yapildi_tarihi" 
                                header="Y.Tarihi"
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
                        field="gorev_veren" 
                        header="G.Veren"
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
                        field="gorev_sahibi" 
                        header="G.Sahibi"
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
                    <Column field="gorev" header="Görev"></Column>
                    <Column 
                        field="gorev_oncelik" 
                        header="Öncelik"
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
                </DataTable>
            </div>
        </div>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarToDoListDone',
            'getMekmarToDoListToDo'
        ])
    },
    data() {
        return {
            filters: {
                giris_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            filters2: {
                giris_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yapildi_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            }
        }
    }
}
</script>
<style scoped>

</style>