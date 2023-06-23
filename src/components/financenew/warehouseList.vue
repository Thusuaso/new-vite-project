<template>
    <DataTable :value="getWarehouseList" tableStyle="" class="p-datatable-sm">
        <template #header>
            Depo Alacak Listesi
        </template>
        <Column field="musteriadi" header="Müşteri"></Column>
        <Column field="ciro" header="Ciro">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.ciro) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(this.warehouseTotal.endorsement) }}
            </template>
        </Column>
        <Column field="odenen" header="Ödenen">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.odenen) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(this.warehouseTotal.paid) }}
            </template>
        </Column>
        <Column field="bakiye" header="Kalan">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.bakiye) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(this.warehouseTotal.balance) }}
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
            'getWarehouseList'
        ])
    },
    data() {
        return {
            warehouseTotal: {
                'endorsement': 0,
                'paid': 0,
                'balance':0
            }
        }
    },
    created() {
        this.warehoseListSum(this.getWarehouseList);
    },
    methods: {
        warehoseListSum(data) {
            this.warehouseTotal = {
                'endorsement': 0,
                'paid': 0,
                'balance': 0
            };
            for (const item of data) {
                this.warehouseTotal.endorsement += item.ciro;
                this.warehouseTotal.paid += item.odenen;
                this.warehouseTotal.balance += item.bakiye;
            }
        }
    }
}
</script>
<style scoped>

</style>