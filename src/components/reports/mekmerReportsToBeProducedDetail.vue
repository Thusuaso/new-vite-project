<template>

            <DataTable :value="getMekmerToBeProducedDetailList" style="font-size:85%;">
                <Column field="siparisNo" header="Po"></Column>
                <Column field="kategori" header="Kategori"></Column>
                <Column field="urunAdi" header="Ürün"></Column>
                <Column field="yuzey" header="Yüzey"></Column>
                <Column field="en" header="En"></Column>
                <Column field="boy" header="Boy"></Column>
                <Column field="kenar" header="Kenar"></Column>
                <Column field="sipMiktari" header="Sipariş">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.sipMiktari) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerToBeProducedDetailTotalList.order) }}
                    </template>
                </Column>
            </DataTable>
</template>
<script>
import { useReportsStore } from '../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerToBeProducedDetailList',
            'getMekmerToBeProducedDetailTotalList'
        ])
    }
}
</script>