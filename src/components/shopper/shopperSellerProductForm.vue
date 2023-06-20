<template>
    <DataTable :value="getShopperSellerProductList" tableStyle="min-width: 50rem">
        <Column field="kategori" header="Kategori"></Column>
        <Column field="urunAdi" header="Ürün"></Column>
        <Column field="en" header="En"></Column>
        <Column field="boy" header="Boy"></Column>
        <Column field="kenar" header="Kenar"></Column>
        <Column field="miktar" header="Miktar">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.miktar) }}
            </template>
        </Column>
        <Column field="birimAdi" header="Birim"></Column>
        <Column field="satisFiyati" header="Satış">
            <template #body="slotProps">
                {{ $filters.formatPrice(slotProps.data.satisFiyati) }}
            </template>
        </Column>
        <Column field="satisToplam" header="Toplam">
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