<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getSampleFinanceSampleDetailList" style="font-size:85%;">
                <Column field="orderno" header="Po"></Column>
                <Column field="numune_tarihi" header="G.Tarihi"></Column>
                <Column field="sevktarihi" header="S.Tarihi"></Column>
                <Column field="odeme" header="Ödeme"></Column>
                <Column field="banka" header="Banka"></Column>
                <Column field="kuryeAlis" header="Alış($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kuryeAlis) }}
                    </template>
                </Column>
                <Column field="kuryeSatis" header="Satış($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kuryeSatis) }}
                    </template>
                </Column>
                <Column field="Euro_Alis" header="Alış(€)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceEuro(slotProps.data.Euro_Alis) }}
                    </template>
                </Column>
                <Column field="Euro_Satis" header="Satış(€)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceEuro(slotProps.data.Euro_Satis) }}
                    </template>
                </Column>
                <Column field="TL_Alis" header="Alış(₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.TL_Alis) }}
                    </template>
                </Column>
                <Column field="TL_Satis" header="Satış(₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.TL_Satis) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useSampleStore } from '../../../stores/sample';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useSampleStore, [
            'getSampleFinanceSampleDetailList'
        ])
    },
    
}
</script>
<style scoped>

</style>