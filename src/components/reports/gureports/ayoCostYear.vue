<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarGuAyoCostList" 
                v-model:filters="filters"
                filterDisplay="row"
                @filter="mekmarGuAyoCostFiltered($event)"
                sortField="kalan_bedel"
                sortOrder="-1"
                v-model:selection="selectedAyoDetail"
                selectionMode="single"
                @row-click="ayoDetailSelected($event)"
                style="font-size:85%;"
                >
                <Column 
                        field="musteri_adi" 
                        header="Müşteri"
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
                <Column field="toplam_bedel" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplam_bedel) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuAyoTotalList.total) }}
                    </template>
                </Column>
                <Column field="masraf_toplam" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuAyoTotalList.cost) }}
                    </template>
                </Column>
                <Column field="odenen_usd_tutar" header="Ödenen">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.odenen_usd_tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuAyoTotalList.getPaidUsd) }}
                    </template>
                </Column>
                <Column field="kalan_bedel" header="Kalan">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kalan_bedel) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuAyoTotalList.remainder) }}
                    </template>
                </Column>
                <Column field="kar_zarar" header="Profit($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kar_zarar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuAyoTotalList.profitUsd) }}
                    </template>
                </Column>
                <Column field="kar_zarar_tl" header="Profit(₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.kar_zarar_tl) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceTl(getMekmarGuAyoTotalList.profitTl) }}
                    </template>
                </Column>
                <Column field="kar_zarar_orani" header="Oran(%)">
                    <template #body="slotProps">
                        %{{ slotProps.data.kar_zarar_orani }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="ayo_detail_form" header="" modal :style="{ 'width': '100vw' }">
        <ayoDetailCost :ayo_detail_list="ayo_detail_list"/>
    </Dialog>
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';

import ayoDetailCost from './ayoDetailCost.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuAyoCostList',
            'getMekmarGuAyoTotalList',
            'getMekmarGuAyoDetailList'
        ])
    },
    components: {
        ayoDetailCost
    },
    data() {
        return {
            filters: {
                musteri_adi:{value:null,matchMode:FilterMatchMode.STARTS_WITH}
            },
            selectedAyoDetail: {},
            ayo_detail_form: false,
            ayo_detail_list: {},
        }
    },
    methods: {
        ayoDetailSelected(event) {
            this.ayo_detail_list = this.getMekmarGuAyoDetailList.filter(x => x.musteri_id == event.data.musteri_id);
            useReportsStore().mekmar_gu_ayo_detail_total_list_load_act(this.ayo_detail_list);
            this.ayo_detail_form = true;
            
        },
        mekmarGuAyoCostFiltered(event) {
            useReportsStore().mekmar_gu_ayo_cost_total_list_load_act(event.filteredValue);
        }
    }
}
</script>