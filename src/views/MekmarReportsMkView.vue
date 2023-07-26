<template>
    <div class="row m-auto mt-3" v-if="!getMobile">
        <div class="col-2">
            <Dropdown v-model="selectedYear" :options="getMekmarMkYearsList" optionLabel="yil" class="w-full md:w-14rem w-100" @change="yearSelected($event)"/>
        </div>
        <div class="col-1">
            <button type="button" class="btn btn-secondary" @click="excel_output_mk">Excel</button>
        </div>
    </div>
    <div class=" m-auto mt-3" v-if="getMobile">
            <div class="">
                <Dropdown v-model="selectedYear" :options="getMekmarMkYearsList" optionLabel="yil" class="w-100 mb-3" @change="yearSelected($event)"/>
            </div>
            <div class="">
                <button type="button" class="btn btn-secondary w-100 " @click="excel_output_mk">Excel</button>
            </div>
        </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <TabView>
                <TabPanel header="Yıllık Po Bazında Siparişler">
                    <byPoProductionYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Güncel Üretim Sipariş Raporu">
                    <byCustomerProductionYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Yükleme Raporu">
                    <byMarketingForwardingYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Sipariş ve Yüklemeler">
                    <productionAndForwardingYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Müşteri Raporları">
                    <byCustomerOrder />
                </TabPanel>
            </TabView>
        </div>
    </div>
    
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import byPoProductionYear from '../components/reports/mkreports/byPoProductionYear.vue';
import byCustomerProductionYear from '../components/reports/mkreports/byCustomerProductionYear.vue';
import byMarketingForwardingYear from '../components/reports/mkreports/byMarketingForwardingYear.vue';
import productionAndForwardingYear from '../components/reports/mkreports/productionAndForwardingYear.vue';
import byCustomerOrder from '../components/reports/mkreports/byCustomerOrder.vue';
export default {
    components: {
        byPoProductionYear,
        byCustomerProductionYear,
        byMarketingForwardingYear,
        productionAndForwardingYear,
        byCustomerOrder
    },
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarMkYearsList',
            'getMekmarMkList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            selectedYear: {},
        }
    },
    created() {
        this.selectedYear = this.getMekmarMkYearsList[0];
    },
    methods: {
        yearSelected(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarMkList(event.value.yil).then(data => {
                useReportsStore().mekmar_mk_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        },
        excel_output_mk() {
            reportsService.getMekmarMkExcelList(this.getMekmarMkList).then(data => {
                if (data.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalServiceUrl + "/raporlar/listeler/mkraporlari/excel";
                    link.setAttribute("download", "mkRaporlari.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            })
        }
    }
}
</script>
<style scoped>
    
</style>