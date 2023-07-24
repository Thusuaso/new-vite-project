<template>

    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmarOrderSummaryDetailList" style="font-size:85%;">
                <Column field="tarih" header="Tarih"></Column>
                <Column field="musteri" header="Müşteri"></Column>
                <Column field="siparisnumarasi" header="Po"></Column>
                <Column field="teslim" header="Teslim"></Column>
                <Column field="satistoplam" header="Satış">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.satistoplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.fob) }}
                    </template>
                </Column>
                <Column field="navlun" header="Satış">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.navlun) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.freight) }}
                    </template>
                </Column>
                <Column field="detay1" header="Detay 1">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay1) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.detail1) }}
                    </template>
                </Column>
                <Column field="detay2" header="Detay 2">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.detail2) }}
                    </template>
                </Column>
                <Column field="detay3" header="Detay 3">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay3) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.detail3) }}
                    </template>
                </Column>
                <Column field="detay4" header="Detay 4">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay4) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.detail4) }}
                    </template>
                </Column>
                <Column  header="Ddp">
                    <template #body="slotProps">
                        {{ $filters.formatPrice
                            (
                                slotProps.data.satistoplam + slotProps.data.navlun + slotProps.data.detay1 + slotProps.data.detay2 + slotProps.data.detay3 + slotProps.data.detay4
                            ) 
                        }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarOrderSummaryDetailTotalList.ddp) }}
                    </template>
                </Column>


            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarOrderSummaryDetailList',
            'getMekmarOrderSummaryDetailTotalList'
        ])
    }
}
</script>
<style scoped>

</style>