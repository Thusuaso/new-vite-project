<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="excel_stock_output">Excel</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmerMineList" style="font-size:85%;">
                <Column field="ocakAdi" header="Ocak"></Column>
                <Column field="mt2" header="M2"></Column>
                <Column field="mt" header="Mt"></Column>
                <Column field="adet" header="Adet"></Column>
                <Column field="kasaSayisi" header="Kasa Adet"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerMineList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    methods: {
        excel_stock_output() {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmerMineExcelOutput(this.getMekmerMineList).then((responce) => {
                if (responce.status) {
                    const link = document.createElement("a");
                    link.href =
                        this.getLocalServiceUrl + "raporlar/listeler/ocakListesiRaporExcell";
                    link.setAttribute("download", "ocak_listesi_raporu.xlsx");
                    document.body.appendChild(link);
                    link.click();
                    useLoadingStore().end_loading_act();

                }
            });
        }
    }
}
</script>
<style scoped>

</style>