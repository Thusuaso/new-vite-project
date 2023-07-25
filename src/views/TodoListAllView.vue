<template>
    <div class="row m-auto mt-5">
        <div class="col">
            <DataTable 
                    :value="getTodoListAll.yapilmadi" 
                    style="font-size:85%;"
                    v-model:filters="filtersNotTodo"
                    filterDisplay="row"
                    scrollable scrollHeight="550px"
                >
                <template #header>
                    Yapılacaklar
                </template>
                <Column 
                    field="girisTarihi" 
                    header="Giriş Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                
                >
                    <template #body="slotProps">
                        {{ $filters.formatDate(slotProps.data.girisTarihi) }}
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                        field="gorev_sahibi_adi" 
                        header="Görev Sahibi"
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
                        field="gorev_veren_adi" 
                        header="Görev Veren"
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
                <Column field="yapilacak" header="Görev"></Column>
                <Column 
                    field="oncelik" 
                    header="Öncelik"
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
            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-5 mb-5">
        <div class="col">
            <DataTable 
                    :value="getTodoListAll.yapildi" 
                    style="font-size:85%;"
                    v-model:filters="filtersTodo"
                    filterDisplay="row"
                    scrollable scrollHeight="550px"
                >
                <template #header>
                    Yapılanlar
                </template>
                <Column 
                    field="girisTarihi" 
                    header="Giriş Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                
                >
                <template #body="slotProps">
                            {{ $filters.formatDate(slotProps.data.girisTarihi) }}
                        </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                    field="yapildiTarihi" 
                    header="Yapıldı Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                <template #body="slotProps">
                            {{ $filters.formatDate(slotProps.data.yapildiTarihi) }}
                        </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                        field="gorev_sahibi_adi"
                        header="Görev Sahibi"
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
                        field="gorev_veren_adi" 
                        header="Görev Veren"
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
                <Column field="yapilacak" header="Görev"></Column>
                <Column 
                    field="oncelik" 
                    header="Öncelik"
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
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useTodoStore } from '../stores/todo';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useTodoStore, [
            'getTodoListAll'
        ])
    },
    data() {
        return {
            filtersNotTodo: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            filtersTodo: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yapildiTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_sahibi_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                gorev_veren_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    }
}
</script>