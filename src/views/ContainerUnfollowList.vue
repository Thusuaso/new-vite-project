<template>
    <DataTable 
            :value="getUnfollowContainerList"
            v-model:selection="selectedContainer"
            selectionMode="single"
            @row-click="containerSelected($event)"
            v-model:filters="filters"
            filterDisplay="row"
            style="font-size:85%;"
        >
            <Column field="sira" header="#"></Column>
            <Column 
                        field="musteriadi" 
                        header="Customer"
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
                    field="siparisno" 
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
            <Column field="sevk_tarihi" header="Shipped Date"></Column>
            <Column field="konteynerno" header="Container No"></Column>
            <Column field="line" header="Line"></Column>
            <Column field="eta" header="Eta Date"></Column>
            <Column field="kalan_sure" header="Remaining Date"></Column>
            <Column field="konsimento" header="Status">
                <template #body="slotProps">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.konsimento" disabled>
                        <label class="form-check-label" for="flexCheckDefault" v-if="slotProps.data.konsimento">
                            Sent
                        </label>
                        <label class="form-check-label" for="flexCheckDefault" v-else>
                            Not Sent
                        </label>
                    </div>
                </template>
            </Column>
            <Column field="liman" header="Port"></Column>
            <Column field="sorumlusu" header="Responsible"></Column>
            <Column field="pesinat" header="Prepayment">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.pesinat) }}
                </template>
            </Column>
            <Column field="kalan_alacak" header="Remaining">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kalan_alacak) }}
                </template>
            </Column>

    </DataTable>
    <Dialog v-model:visible="is_container_form" :header="header" modal :style="{ 'width': '100vw' }">
        <unfollowForm :value="selectedContainer"/>
    </Dialog>
</template>
<script>
import { useContainerStore } from '../stores/container';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { socket } from '../services/customServices/realTimeService';
import { containerService } from '../services/containerService';

import { FilterMatchMode } from 'primevue/api';

import form from '../components/container/form.vue';

export default {
    computed: {
        ...mapState(useContainerStore, [
            'getUnfollowContainerList'
        ])
    },
    components: {
        unfollowForm:form,
    },
    data() {
        return {
            selectedContainer: {},
            is_container_form: false,
            header: '',
            filters: {
                musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparisno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            }
        }
    },
    methods: {
        containerSelected(event) {
            this.header = event.data.musteriadi + '/' + event.data.siparisno;
            this.is_container_form = true;
        }
    },
    mounted() {
        socket.socketIO.on('container_update_unfollow_list_on', () => {
            useLoadingStore().begin_loading_act();
            containerService.getUnfollowList().then(data => {
                useContainerStore().unfollow_container_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>
<style scoped>

</style>