<template>
    <TabView>
        <TabPanel header="Gelen">
            <div class="row m-auto mt-3">
                <div class="col-6">
                    <DataTable :value="getMekmerAtlantaStockDetailList.stok_liste" style="font-size:85%;">
                        <template #header>
                            Stok Listesi
                        </template>
                        <Column field="order_no" header="Po"></Column>
                        <Column field="yukleme_tarihi" header="Yükleme Tarihi"></Column>
                        <Column field="eta" header="Eta"></Column>
                        <Column field="konteyner_no" header="Kont.No"></Column>
                        <Column field="masraf" header="Masraf">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.masraf) }}
                            </template>
                        </Column>
                        <Column field="box" header="Kutu">
                            <template #body="slotProps">
                                {{ $filters.formatDecimal(slotProps.data.box) }}
                            </template>
                        </Column>
                        <Column field="m2" header="M2">
                            <template #body="slotProps">
                                {{ $filters.formatDecimal(slotProps.data.m2) }}
                            </template>
                        </Column>
                        <Column field="sqft" header="Sqft">
                            <template #body="slotProps">
                                {{ $filters.formatDecimal(slotProps.data.sqft) }}
                            </template>
                        </Column>


                    </DataTable>
                </div>
                <div class="col-6">
                    <DataTable :value="getMekmerAtlantaStockDetailList.su_liste" style="font-size:85%;">
                        <template #header>
                            Su Listesi
                        </template>
                            <Column field="order_no" header="Po"></Column>
                            <Column field="yukleme_tarihi" header="Yükleme Tarihi"></Column>
                            <Column field="eta" header="Eta"></Column>
                            <Column field="konteyner_no" header="Kont.No"></Column>
                            <Column field="masraf" header="Masraf">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.masraf) }}
                                </template>
                            </Column>
                            <Column field="box" header="Kutu">
                                <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.box) }}
                                </template>
                            </Column>
                            <Column field="m2" header="M2">
                                <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.m2) }}
                                </template>
                            </Column>
                            <Column field="sqft" header="Sqft">
                                <template #body="slotProps">
                                    {{ $filters.formatDecimal(slotProps.data.sqft) }}
                                </template>
                            </Column>


                    </DataTable>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Satış">
            <DataTable :value="getMekmerAtlantaStockDetailList.satis_liste" style="font-size:85%;">
                <Column field="musteriAdi" header="Müşteri"></Column>
                <Column field="orderNo" header="Po"></Column>
                <Column field="satisTarihi" header="Satış"></Column>
                <Column field="sevkTarihi" header="Sevk"></Column>
                <Column field="rof" header="Rof"></Column>
                <Column field="kutu" header="Kutu">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.kutu) }}
                    </template>
                </Column>
                <Column field="m2" header="M2">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.m2) }}
                    </template>
                </Column>
                <Column field="sqft" header="Sqft">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.sqft) }}
                    </template>
                </Column>
                <Column field="birimFiyat" header="Fiyat">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.birimFiyat) }}
                    </template>
                </Column>
                <Column field="toplamFiyat" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplamFiyat) }}
                    </template>
                </Column>


            </DataTable>
        </TabPanel>
        <TabPanel header="Maliyet">
            <DataTable :value="getMekmerAtlantaStockDetailList.maliyet" style="font-size:85%;">
                <Column field="uretici" header="Üretici"></Column>
                <Column field="uretici_fiyat" header="Fiyat"></Column>
                <Column field="transport" header="Taşıma"></Column>
                <Column field="max_payload" header="Max Yük"></Column>
                <Column field="mekus_kira" header="Mekus Kira"></Column>
                <Column  header="Fırlatma Maliyeti">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.transport / slotProps.data.max_payload) }}
                    </template>
                </Column>
                <Column  header="Toplam Maliyet">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.uretici_fiyat + (slotProps.data.transport / slotProps.data.max_payload) + slotProps.data.mekus_kira ) }}
                    </template>
                </Column>
                <Column  header="Mekus Sqm">
                    <template #body="slotProps">
                        {{ $filters.formatPrice((slotProps.data.uretici_fiyat + (slotProps.data.transport / slotProps.data.max_payload) + slotProps.data.mekus_kira) * 1.35) }}
                    </template>
                </Column>
                <Column  header="Mekus Sqft">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(((slotProps.data.uretici_fiyat + (slotProps.data.transport / slotProps.data.max_payload) + slotProps.data.mekus_kira) * 1.35) / 10.76) }}
                    </template>
                </Column>

            </DataTable>
        </TabPanel>
    </TabView>
</template>
<script>
import { useReportsStore } from '../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerAtlantaStockDetailList'
        ])
    }
}
</script>
<style scoped>

</style>