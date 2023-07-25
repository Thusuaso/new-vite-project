<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmerStockDetailList" style="font-size:85%;">
                <Column field="sira" header="#"></Column>
                <Column field="tarihtop" header="Tarih">
                    <template #body="slotProps">
                        {{ $filters.formatDate(slotProps.data.tarihtop) }}
                    </template>
                </Column>
                <Column field="kasanotop" header="Kasa"></Column>
                <Column field="tedarikci_aditop" header="Tedarikçi"></Column>
                <Column field="kategoritop" header="Kategori"></Column>
                <Column field="urunaditop" header="Ürün"></Column>
                <Column field="yuzeyislemtop" header="Yüzey"></Column>
                <Column field="entop" header="En"></Column>
                <Column field="boytop" header="Boy"></Column>
                <Column field="kenartop" header="Kenar"></Column>
                <Column field="adettop" header="Adet">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.adettop) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerStockDetailListTotal.piece) }}
                    </template>
                </Column>
                <Column field="miktartop" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktartop) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerStockDetailListTotal.amount) }}
                    </template>
                </Column>
                <Column field="birimaditop" header="Birim"></Column>
                <Column field="durum" header="Status"></Column>
                <Column field="aciklama" header="Not"></Column>
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
            'getMekmerStockDetailList',
            'getMekmerStockDetailListTotal'
        ])
    },
    
}
</script>
<style scoped>

</style>