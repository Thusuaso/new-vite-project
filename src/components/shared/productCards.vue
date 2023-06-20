<template>
    <DataTable 
    :value="getCardList" 
    tableStyle="min-width: 50rem" 
    paginator 
    :rows="10" 
    :rowsPerPageOptions="[5, 10, 20, 50]"
    v-model:filters="filters"
    filterDisplay="row"
    @row-click="cardSelected($event)"
    :selection="selectCard"
    selectionMode="single"
    
    >
        <Column field="id" header="ID" :showFilterMenu="false"> 
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="kategoriAdi" header="Kategori" :showFilterMenu="false">
        <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
        </template>
        </Column>
        <Column field="urunAdi" header="Ürün" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_1" header="Y1" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_2" header="Y2" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="yuzey_3" header="Y3" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>

        <Column field="en" header="E" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="boy" header="B" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="kenar" header="K" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>


    </DataTable>
</template>
<script>
import { useCardStore } from '../../stores/cards';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';
export default {
    computed: {
        ...mapState(useCardStore,['getCardList'])
    },
    data() {
        return {
            filters: {
                id: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kategoriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yuzey_1: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yuzey_2: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yuzey_3: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            selectCard:{}
        }
    },
    created() {
    },
    methods: {
        cardSelected(event) {
            this.$emit('productCardSelected', event.data)
            this.emitter.emit('cardDialogClose')
        }
    }
}
</script>

<style scoped>

</style>