<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmarGuContainerCountryDetailList" style="font-size:85%;">
                <Column field="musteri_adi" header="Müşteri"></Column>
                <Column field="siparis_no" header="Po"></Column>
                <Column field="fob_toplami" header="Fob">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob_toplami) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.fob) }}
                    </template>
                </Column>
                <Column field="navlun" header="Navlun">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.navlun) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.freight) }}
                    </template>
                </Column>
                <Column field="detay_1" header="Detay 1">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_1) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.detail1) }}
                    </template>
                </Column>
                <Column field="detay_2" header="Detay 2">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.detail2) }}
                    </template>
                </Column>
                <Column field="detay_3" header="Detay 3">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_3) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.detail3) }}
                    </template>
                </Column>
                <Column header="Ddp">
                    <template #body="slotProps"> 
                        {{ $filters.formatPrice
                            (
                                slotProps.data.fob_toplami + 
                                slotProps.data.navlun +
                                slotProps.data.detay_1 + 
                                slotProps.data.detay_2 + 
                                slotProps.data.detay_3
                            ) 
                        }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuContainerCountryDetailTotalList.ddp) }}
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
            'getMekmarGuContainerCountryDetailList',
            'getMekmarGuContainerCountryDetailTotalList'
        ])
    },
    
}
</script>
<style scoped>

</style>