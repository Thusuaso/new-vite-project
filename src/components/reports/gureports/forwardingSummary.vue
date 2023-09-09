<template>
    <DataTable :value="getMekmarGuForwardingSummaryList" tableStyle="min-width: 50rem">
        <Column field="month_str" header="Ay"></Column>
        <Column field="fob" header="Fob($)">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.fob) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.fob) }}
            </template>
        </Column>
        <Column field="ddp" header="Ddp($)">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.ddp) }}
            </template>
            <template #footer>
                {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.ddp) }}
            </template>
        </Column>
    </DataTable>

</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore,['getMekmarGuForwardingSummaryList','getMekmarGuForwardingSummaryTotal'])
    }
}
</script>

<style scoped>

</style>