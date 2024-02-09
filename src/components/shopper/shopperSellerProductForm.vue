<template>
    <DataTable :value="getShopperSellerProductList" style="font-size:85%;">
        <Column field="kategori" header="Category"></Column>
        <Column field="urunAdi" header="Product"></Column>
        <Column field="en" header="Width"></Column>
        <Column field="boy" header="Height"></Column>
        <Column field="kenar" header="Thickness"></Column>
        <Column field="miktar" header="Amount">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.miktar) }}
            </template>
        </Column>
        <Column field="birimAdi" header="Unit"></Column>
        <Column field="satisFiyati" header="Sale Price">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.satisFiyati) }}
            </template>
        </Column>
        <Column field="satisToplam" header="Total">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.satisToplam) }}
            </template>
        </Column>

    </DataTable>
</template>
<script>
import { useShopperStore } from '../../stores/shopper';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperSellerProductList'
        ])
    },
    
}
</script>
<style scoped>

</style>