<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmarGuContainerSupplierDetailList" tableStyle="min-width: 50rem">
                <Column field="firma_adi" header="Firma"></Column>
                <Column field="siparis_no" header="Po"></Column>
                <Column field="alis_toplami" header="Alış">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.alis_toplami) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerSupplierDetailTotalList.buying) }}
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
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuContainerSupplierDetailList',
            'getMekmarGuContainerSupplierDetailTotalList'
        ])
    }
}
</script>
<style scoped>

</style>