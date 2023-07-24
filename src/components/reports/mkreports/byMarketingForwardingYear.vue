<template>
    <div class="row m-auto mt-3">
            <div class="col">
                <DataTable 
                        :value="getmekmarMkByMarketingForwardingList" 
                        style="font-size:85%;"
                    >
                    <template #header>
                        {{ year }} Marketinge Göre Yüklemeler
                    </template>
                    <Column field="marketing" header="Marketing"></Column>
                    <Column field="fobToplam" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fobToplam) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingTotalList.fob) }}
                        </template>
                    </Column>
                    <Column field="cfrToplam" header="Ddp">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.cfrToplam) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingTotalList.ddp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
    </div>
    <div class="row m-auto mt-3">
            <div class="col" v-if="getMekmarMkByMarketingForwardingDetailMekmarList.length > 0">
                <DataTable 
                        :value="getMekmarMkByMarketingForwardingDetailMekmarList" 
                        style="font-size:85%;"
                    >
                    <template #header>
                        {{ year }} Mekmar Yüklemeler
                    </template>
                    <Column field="musteri" header="Müşteri"></Column>
                    <Column field="toplamFob" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamFob) }}
                        </template>
                         <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.mekmarFob) }}
                         </template>
                    </Column>
                    <Column field="toplamCfr" header="Ddp">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.mekmarDdp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col" v-if="getMekmarMkByMarketingForwardingDetailMekmerList.length > 0">
                <DataTable 
                        :value="getMekmarMkByMarketingForwardingDetailMekmerList" 
                        style="font-size:85%;"
                    >
                    <template #header>
                        {{ year }} Mekmer Yüklemeler
                    </template>
                    <Column field="musteri" header="Müşteri"></Column>
                    <Column field="toplamFob" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamFob) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.mekmerFob) }}
                        </template>
                    </Column>
                    <Column field="toplamCfr" header="Ddp">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.mekmerDdp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col" v-if="getMekmarMkByMarketingForwardingDetailIcPiyasaList.length > 0">
                <DataTable 
                        :value="getMekmarMkByMarketingForwardingDetailIcPiyasaList" 
                        style="font-size:85%;"
                    >
                    <template #header>
                        {{ year }} İç Piyasa Yüklemeler
                    </template>
                    <Column field="musteri" header="Müşteri"></Column>
                    <Column field="toplamFob" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamFob) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.domesticMarketFob) }}
                        </template>
                    </Column>
                    <Column field="toplamCfr" header="Ddp">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.domesticMarketDdp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="col" v-if="getMekmarMkByMarketingForwardingDetailImperialHomesList.length > 0">
                <DataTable 
                        :value="getMekmarMkByMarketingForwardingDetailImperialHomesList" 
                        style="font-size:85%;"
                    >
                    <template #header>
                        {{ year }} Imperial Homes Yüklemeler
                    </template>
                    <Column field="musteri" header="Müşteri"></Column>
                    <Column field="toplamFob" header="Fob">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamFob) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.imperialHomesFob) }}
                        </template>
                    </Column>
                    <Column field="toplamCfr" header="Ddp">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.toplamCfr) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarMkByMarketingForwardingDetailFilteredTotalList.imperialHomesDdp) }}
                        </template>
                    </Column>
                </DataTable>
            </div>
    </div>

</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';
export default {
    props:['year'],
    computed: {
        ...mapState(useReportsStore, [
            'getmekmarMkByMarketingForwardingList',
            'getMekmarMkByMarketingForwardingTotalList',
            'getMekmarMkByMarketingForwardingDetailMekmarList',
            'getMekmarMkByMarketingForwardingDetailMekmerList',
            'getMekmarMkByMarketingForwardingDetailIcPiyasaList',
            'getMekmarMkByMarketingForwardingDetailImperialHomesList',
            'getMekmarMkByMarketingForwardingDetailFilteredTotalList'
        ])
    }
}
</script>
<style scoped></style>