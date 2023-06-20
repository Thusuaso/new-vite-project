<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <Dropdown v-model="selectedYear" :options="getMekmarGuYearList" optionLabel="yil"  class="w-full md:w-14rem" @change="mekmarGuSelectedYear($event)"/>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <TabView>
                <TabPanel header="Ayo Maliyet">
                    <ayoCostYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Konteynır (Mekmar)">
                    <containerYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Mekus">
                    <mekusYear :year="selectedYear.yil"/>
                </TabPanel>
                <TabPanel header="Logs">
                    <logsYear :year="selectedYear.yil"/>
                </TabPanel>
            </TabView>
        </div>
    </div>
</template>
<script>

import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import ayoCostYear from '../components/reports/gureports/ayoCostYear.vue';
import containerYear from '../components/reports/gureports/containerYear.vue';
import mekusYear from '../components/reports/gureports/mekusYear.vue';
import logsYear from '../components/reports/gureports/logsYear.vue';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuYearList'
        ])
    },
    components: {
        ayoCostYear,
        containerYear,
        mekusYear,
        logsYear
    },
    data() {
        return {
            selectedYear:null
        }
    },
    created() {
        this.selectedYear = this.getMekmarGuYearList[0];
    },
    methods: {
        mekmarGuSelectedYear(event) {
            useLoadingStore().begin_loading_act();
             reportsService.getMekmarGuList(event.value.yil).then(data => {
                useReportsStore().mekmar_gu_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        }
    }
}
</script>