<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getSampleFinanceBankDetailList" tableStyle="min-width: 50rem">
                <Column field="bankaya_gelen_tarih" header="Gelen Tarih"></Column>
                <Column field="numune_tarihi" header="Numune Tarihi"></Column>
                <Column field="banka_adi" header="Banka"></Column>
                <Column field="musteri_adi" header="Müşteri"></Column>
                <Column field="numune_no" header="Po"></Column>
                <Column field="bedel_dolar" header="$">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.bedel_dolar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getSampleFinanceBankDetailTotalList.usd) }}
                    </template>
                </Column>
                <Column field="bedel_euro" header="€">
                    <template #body="slotProps">
                        {{ $filters.formatPriceEuro(slotProps.data.bedel_euro) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getSampleFinanceBankDetailTotalList.euro) }}
                    </template>
                </Column>
                <Column field="bedel_tl" header="₺">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.bedel_tl) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getSampleFinanceBankDetailTotalList.tl) }}
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
            'getSampleFinanceBankDetailList',
            'getSampleFinanceBankDetailTotalList'
        ])
    }
}
</script>
<style scoped>

</style>