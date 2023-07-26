<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryProduction" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryProductionPrevious"
                selectionMode="single"
                @row-click="summarySelected($event,date - 2 , 2)"
                >
                <template #header>
                    {{ date - 2 }} Sipariş Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="oncekiyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.oncekiyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.previousYearFob) }}
                    </template>
                </Column>
                <Column field="oncekiyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.oncekiyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.previousYearDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryProduction" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryProductionLast"
                selectionMode="single"
                @row-click="summarySelected($event, date - 1 , 2)"
                
                >
                <template #header>
                    {{ date - 1  }} Sipariş Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="gecenyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.lastYearFob) }}
                    </template>
                </Column>
                <Column field="gecenyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.lastYearDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryProduction" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryProductionNow"
                selectionMode="single"
                @row-click="summarySelected($event, date , 2)"
                >
                <template #header>
                    {{ date }} Sipariş Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="buyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.thisYearFob) }}
                    </template>
                </Column>
                <Column field="buyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionTotal.thisYearDdp) }}
                    </template>
                </Column>
                <Column field="fark" header="Fark(DDP)">
                    <template #body="slotProps">
                        %{{ $filters.formatDecimal(slotProps.data.fark) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryProductionUserThen" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%">
                    <template #header>
                        {{ date - 1 }} Satışçı Sipariş 
                    </template>
                    <Column field="ay_adi" header="Ay"></Column>
                    <Column field="buyil_mal_bedeli" header="FOB">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarOrderSummaryProductionUserThenTotal.fob) }}
                        </template>
                    </Column>
                    <Column field="buyil_toplam" header="DDP">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.gecenyil_toplam) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarOrderSummaryProductionUserThenTotal.ddp) }}
                        </template>
                    </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryProductionUserNow" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%">
                <template #header>
                    {{ date }} Satışçı Sipariş 
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="buyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionUserNowTotal.fob) }}
                    </template>
                </Column>
                <Column field="buyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryProductionUserNowTotal.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryForwarding" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryForwardingPrevious"
                selectionMode="single"
                @row-click="summarySelected($event, date - 2 , 3)"
                
                
                >
                <template #header>
                    {{ date - 2 }} Yüklenen Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="oncekiyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.oncekiyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.previousYearFob) }}
                    </template>
                </Column>
                <Column field="oncekiyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.oncekiyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.previousYearDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryForwarding" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryForwardingThen"
                selectionMode="single"
                @row-click="summarySelected($event, date - 1, 3)"
                >
                <template #header>
                    {{ date - 1 }} Yüklenen Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="gecenyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.lastYearFob) }}
                    </template>
                </Column>
                <Column field="gecenyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.lastYearDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryForwarding" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%"
                v-model:selection="selectedSummaryForwardingNow"
                selectionMode="single"
                @row-click="summarySelected($event, date, 3)"
                >
                <template #header>
                    {{ date }} Yüklenen Özet
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="buyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.thisYearFob) }}
                    </template>
                </Column>
                <Column field="buyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingTotal.thisYearDdp) }}
                    </template>
                </Column>
                <Column field="fark" header="Fark(DDP)">
                    <template #body="slotProps">
                        %{{ $filters.formatDecimal(slotProps.data.fark) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryForwardingUserThen" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%">
                <template #header>
                    {{ date - 1 }} Satışçı Yüklenen
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="gecenyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingUserThenTotal.fob) }}
                    </template>
                </Column>
                <Column field="gecenyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gecenyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingUserThenTotal.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable 
                :value="getMekmarOrderSummaryForwardingUserNow" 
                class="p-datatable-sm" 
                tableStyle="font-size:60%">
                <template #header>
                    {{ date }} Satışçı Yüklenen
                </template>
                <Column field="ay_adi" header="Ay"></Column>
                <Column field="gecenyil_mal_bedeli" header="FOB">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_mal_bedeli) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingUserNowTotal.fob) }}
                    </template>
                </Column>
                <Column field="gecenyil_toplam" header="DDP">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.buyil_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryForwardingUserNowTotal.ddp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="order_summary_form" header="" modal :style="{'width':'100vw'}">
        <mekmarReportsOrderSummaryDetail />
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import mekmarReportsOrderSummaryDetail from '../components/reports/mekmarReportsOrderSummaryDetail.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarOrderSummaryProduction',
            'getMekmarOrderSummaryProductionTotal',

            'getMekmarOrderSummaryForwarding',
            'getMekmarOrderSummaryForwardingTotal',

            'getMekmarOrderSummaryProductionUserThen',
            'getMekmarOrderSummaryProductionUserThenTotal',

            'getMekmarOrderSummaryForwardingUserThen',
            'getMekmarOrderSummaryForwardingUserThenTotal',

            'getMekmarOrderSummaryProductionUserNow',
            'getMekmarOrderSummaryProductionUserNowTotal',

            'getMekmarOrderSummaryForwardingUserNow',
            'getMekmarOrderSummaryForwardingUserNowTotal',
        ])
    },
    components: {
        mekmarReportsOrderSummaryDetail,
    },
    data() {
        return {
            date: new Date().getFullYear(),
            selectedSummaryProductionPrevious: {},
            selectedSummaryProductionLast: {},
            selectedSummaryProductionNow: {},
            selectedSummaryForwardingPrevious: {},
            selectedSummaryForwardingThen: {},
            selectedSummaryForwardingNow: {},
            order_summary_form: false,
        }
    },
    methods: {
        summarySelected(event, year,status) {
            const date = new Date().getFullYear()
            if (status == 2) {
                if (year == date) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryProductionDetailListNow(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                } else if (year == (date - 1)) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryProductionDetailListLast(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                } else if (year == (date - 2)) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryProductionDetailListPrevious(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                };
            } else {
                if (year == date) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryForwardingDetailListNow(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                } else if (year == (date - 1)) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryForwardingDetailListLast(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                } else if (year == (date - 2)) {
                    useLoadingStore().begin_loading_act();
                    reportsService.getMekmarOrderSummaryForwardingDetailListPrevious(event.data.ay).then(data => {
                        useReportsStore().mekmar_order_summary_detail_list(data);
                        this.order_summary_form = true;
                        useLoadingStore().end_loading_act();
                    });
                };
            }
            

        }
    }
}
</script>
<style scoped>

</style>