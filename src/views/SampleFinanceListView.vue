<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <Dropdown v-model="selectedYear" :options="getSampleFinanceYearList" optionLabel="yil" class="w-full md:w-14rem" @change="sampleFinanceYearSelected($event)"/>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col-9">
            <DataTable 
                    :value="getSampleFinanceListSample" 
                    tableStyle="min-width: 50rem"
                    v-model:selection="selectedFinanceSample"
                    selectionMode="single"
                    @row-click="financeSampleSelected($event)"
                >
                <template #header>
                    Numune Finans Alacak Listesi
                </template>
                <Column field="musteriadi" header="Müşteri"></Column>
                <Column field="kuryeAlis" header="Alış($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kuryeAlis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getSampleFinanceListSampleTotal.buyingUsd) }}
                    </template>
                </Column>
                <Column field="kuryeSatis" header="Satış($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kuryeSatis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getSampleFinanceListSampleTotal.sellingUsd) }}
                    </template>
                </Column>
                <Column field="Euro_Alis" header="Alış(€)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceEuro(slotProps.data.Euro_Alis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceEuro(getSampleFinanceListSampleTotal.buyingEuro) }}
                    </template>
                </Column>
                <Column field="Euro_Satis" header="Satış(€)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceEuro(slotProps.data.Euro_Satis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceEuro(getSampleFinanceListSampleTotal.sellingEuro) }}
                    </template>
                </Column>
                <Column field="TL_Alis" header="Alış(₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.TL_Alis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceTl(getSampleFinanceListSampleTotal.buyingTl) }}
                    </template>
                </Column>
                <Column field="TL_Satis" header="Satış(₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.TL_Satis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceTl(getSampleFinanceListSampleTotal.sellingTl) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3">
            <DataTable 
                :value="getSampleFinanceListBank" 
                tableStyle="mb-4"
                v-model:selection="selectedFinanceBank"
                selectionMode="single"
                @row-click="financeBankSelected($event)"
            >
                    <template #header>
                        Banka Gelen
                    </template>
                    <Column field="banka" header="Banka"></Column>
                    <Column field="bedel" header="Gelen($)">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.bedel) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getSampleFinanceListBankTotal.usd) }}
                        </template>
                    </Column>
            </DataTable>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Kar($)</th>
                    <th scope="col">Kar(€)</th>
                    <th scope="col">Kar(₺)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $filters.formatPrice(getSampleFinanceListSampleTotal.sellingUsd - getSampleFinanceListSampleTotal.buyingUsd) }}</td>
                        <td>{{ $filters.formatPriceEuro(getSampleFinanceListSampleTotal.sellingEuro - getSampleFinanceListSampleTotal.buyingEuro) }}</td>
                        <td>{{ $filters.formatPriceTl(getSampleFinanceListSampleTotal.sellingTl - getSampleFinanceListSampleTotal.buyingTl) }}</td>
                    </tr>
                </tbody>
                </table>

        </div>  
    </div>
    <Dialog v-model:visible="finance_sample_detail_form" header="" modal>
        <sampleFinanceDetail />
    </Dialog>
    <Dialog v-model:visible="finance_bank_detail_form" header="" modal>
        <bankFinanceDetail/>
    </Dialog>
</template>
<script>
import { useSampleStore } from '../stores/sample';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { sampleService } from '../services/sampleService';

import sampleFinanceDetail from '../components/sample/financeDetail/sampleFinanceDetail.vue';
import bankFinanceDetail from '../components/sample/financeDetail/bankFinanceDetail.vue';
export default {
    computed: {
        ...mapState(useSampleStore, [
            'getSampleFinanceListBank',
            'getSampleFinanceListSample',
            'getSampleFinanceListSampleTotal',
            'getSampleFinanceYearList',
            'getSampleFinanceListBankTotal'
        ])
    },
    components: {
        sampleFinanceDetail,
        bankFinanceDetail
    },
    data() {
        return {
            selectedYear: {},
            selectedFinanceSample: {},
            finance_sample_detail_form: false,
            selectedFinanceBank: {},
            finance_bank_detail_form:false,
        }
    },
    created() {
        this.selectedYear = this.getSampleFinanceYearList[0];
    },
    methods: {
        financeBankSelected(event) {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleFinanceBankDetailList(event.data.banka, this.selectedYear.yil).then(data => {
                useSampleStore().sample_finance_bank_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.finance_bank_detail_form = true;
            });
        },
        financeSampleSelected(event) {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleFinanceSampleDetailList(event.data.id, this.selectedYear.yil).then(data => {
                useSampleStore().sample_finance_sample_detail_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.finance_sample_detail_form = true;

            });
        },
        sampleFinanceYearSelected(event) {
            useLoadingStore().begin_loading_act();
            sampleService.getSampleFinanceList(event.value.yil).then(data => {
                useSampleStore().sample_finance_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        }
    }
}
</script>
<style scoped>

</style>