<template>
    <DataTable :value="getExpirtyList" style="font-size:85%;">
            <template #header>
                Vadeli Alacak Listesi
            </template>
            <Column field="firmaAdi" header="Müşteri"></Column>
            <Column field="siparis_no" header="Po"></Column>
            <Column field="vade_tarih" header="Vade Tarihi"></Column>
            <Column field="tutar" header="Tutar">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.tutar) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(this.total) }}
                </template>
            </Column>
        </DataTable>
</template>
<script>
import { useFinanceStore } from '../../stores/finance';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useFinanceStore, [
                'getExpirtyList'
            ])
    },
    data() {
        return {
            total:0,
        }
    },
    created() {
        this.expiryTotalSum(this.getExpirtyList);
    },
    methods: {
        expiryTotalSum(data) {
            this.total = 0;
            for (const item of data) {
                this.total += item.tutar;
            }
        }
    }
}
</script>
<style scoped>

</style>