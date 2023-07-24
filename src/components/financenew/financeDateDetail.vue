<template>
    <DataTable :value="getFinanceDateDetailList" style="font-size:85%;">
        <Column field="sira" header="#"></Column>
        <Column field="siparisno" header="Po"></Column>
        <Column field="faturatur" header="Tür"></Column>
        <Column field="tutar" header="Tutar">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(financeDateDetailTotal.total) }}
            </template>
        </Column>
        <Column field="masraf" header="Masraf">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.masraf) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(financeDateDetailTotal.cost) }}
            </template>
        </Column>
        <Column field="kur" header="Kur">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.kur) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(financeDateDetailTotal.currency) }}
            </template>
        </Column>

    </DataTable>

</template>
<script>
import { mapState } from 'pinia';
import { useFinanceStore } from '../../stores/finance';
export default {
    computed: {
        ...mapState(useFinanceStore, [
            'getFinanceDateDetailList',
        ])
    },
    data() {
        return {
            financeDateDetailTotal: {
                'total': 0,
                'cost': 0,
                'currency': 0,
            }
        }
    },
    created() {
        this.financeDateDetailSum(this.getFinanceDateDetailList);
    },
    methods: {
        financeDateDetailSum(data) {
            this.financeDateDetailTotal= {
                'total': 0,
                'cost': 0,
                'currency': 0,
            };
            for (const item of data) {
                this.financeDateDetailTotal.total += item.tutar;
                this.financeDateDetailTotal.cost += item.masraf;
                this.financeDateDetailTotal.currency += item.kur;
            }
        }
    }
}
</script>
<style scoped>

</style>