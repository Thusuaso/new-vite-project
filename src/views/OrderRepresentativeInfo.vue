<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getOrderRepresentativeInfoList.infoList" 
                v-model:filters="filters"
                filterDisplay="row"
                v-model:selection="selectedInfo"
                selectionMode="single"
                @row-click="infoSelected($event)"
                style="font-size:85%;"
            >
                <Column 
                        field="po" 
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
                <Column 
                        field="satisci_adi" 
                        header="Salesman"
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
                        field="operasyon_adi" 
                        header="Operation"
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
        <div class="col">
            <DataTable 
                :value="getOrderRepresentativeInfoList.ssOzet" 
                sortField="adet"
                sortOrder="-1"
                style="font-size:85%;"
            >
                <template #header>
                    Salesman Summary ({{ getOrderRepresentativeInfoTotal.orderer }})
                </template>
                <Column 
                        field="ad" 
                        header="Salesman"
                    >
                </Column>
                <Column 
                        field="adet" 
                        header="Piece"
                    >
                </Column>
            </DataTable>
            <DataTable 
                :value="getOrderRepresentativeInfoList.opOzet" 
                sortField="adet"
                sortOrder="-1"
                class="mt-3"
                style="font-size:85%;"
            >
                <template #header>
                    Operation Summary ({{ getOrderRepresentativeInfoTotal.operation }})
                </template>
                <Column 
                        field="ad" 
                        header="Salesman"
                    >
                </Column>
                <Column 
                        field="adet" 
                        header="Piece"
                    >
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="info_visible_form" header="" modal :style="{ 'width': '100vw' }">
        <div v-if="!getMobile">
                    <div class="row m-auto mt-3">
                <div class="col-6">
                    <span class="p-float-label">
                        <Dropdown v-model="selectedOrderer" :options="getOrderRepresentativeInfoList.kullaniciList" optionLabel="kullaniciAdi" style="width:250px;" />
                        <label for="username">Salesman</label>
                    </span>
                </div>
                <div class="col-6">
                    <span class="p-float-label">
                        <Dropdown v-model="selectedOperation" :options="getOrderRepresentativeInfoList.kullaniciList" optionLabel="kullaniciAdi" style="width:250px;" />
                        <label for="username">Operation</label>
                    </span>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success" @click="save">Save</button>
                </div>
            </div>
        </div>
        <div v-if="getMobile">
                        <div class=" m-auto mt-3">
                    <div class="">
                        <span class="p-float-label">
                            <Dropdown v-model="selectedOrderer" :options="getOrderRepresentativeInfoList.kullaniciList" optionLabel="kullaniciAdi" class="w-100 mb-3"  />
                            <label for="username">Salesman</label>
                        </span>
                    </div>
                    <div class="">
                        <span class="p-float-label">
                            <Dropdown v-model="selectedOperation" :options="getOrderRepresentativeInfoList.kullaniciList" optionLabel="kullaniciAdi" class="w-100 mb-3" />
                            <label for="username">Operation</label>
                        </span>
                    </div>
                </div>
                <div class=" m-auto mt-3">
                    <div class=" ">
                        <button type="button" class="btn btn-success w-100 mb-3" @click="save">Save</button>
                    </div>
                </div>
            </div>

    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { reportsService } from '../services/reportsService';
import { socket } from '../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getOrderRepresentativeInfoList',
            'getOrderRepresentativeInfoTotal'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            filters: {
                po: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                satisci_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                operasyon_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedInfo: {},
            info_visible_form: false,
            selectedOrderer: {},
            selectedOperation: {},
        }
    },
    methods: {
        save() {
            useLoadingStore().begin_loading_act();
            reportsService.setOrderRepresentativeInfo(this.selectedInfo.po, this.selectedOrderer.id, this.selectedOperation.id).then(data => {
                if (data.status) {
                    useLoadingStore().end_loading_act();
                    socket.socketIO.emit('representative_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Değiştirildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Değiştirme Başarısız', life: 3000 });
                };
            });
        },
        infoSelected(event) {
            this.info_visible_form = true;
            this.selectedOrderer = this.getOrderRepresentativeInfoList.kullaniciList.find(x => x.id == event.data.satisci_id);
            this.selectedOperation = this.getOrderRepresentativeInfoList.kullaniciList.find(x => x.id == event.data.operasyon_id);

        }
    },
    mounted() {
        socket.socketIO.on('representative_list_on', () => {
            useLoadingStore().begin_loading_act();
            reportsService.getOrderRepresentativeInfo().then(data => {
                useReportsStore().order_representative_info_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>