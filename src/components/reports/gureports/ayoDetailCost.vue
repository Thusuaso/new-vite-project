<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="ayo_detail_list" 
                tableStyle="font-size:75%;"
                class="p-datatable-sm"
                scrollable 
                scrollHeight="400px"
            
            >
            <Column field="siparis_no" header="Po" style="min-width: 100px"></Column>
            <Column field="yukleme_tarihi" header="Y.Tarihi" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatDate(slotProps.data.yukleme_tarihi) }}
                </template>
            </Column>
            <Column field="satis_toplami" header="Satış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.satis_toplami) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.selling) }}
                </template>
            </Column>
            <Column field="navlun_satis" header="N.Satış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.navlun_satis) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.setFreight) }}
                </template>
            </Column>
            <Column field="detay_1" header="D.Satış 1" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_1) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.setDetail1) }}
                </template>
            </Column>
            <Column field="detay_2" header="D.Satış 2" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_2) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.setDetail2) }}
                </template>
            </Column>
            <Column field="detay_3" header="D.Satış 3" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_3) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.setDetail3) }}
                </template>
            </Column>
            <Column field="sigorta_tutar_satis" header="Sig.Satış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.sigorta_tutar_satis) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.setInsurance) }}
                </template>
            </Column>
            <Column field="toplam_bedel" header="S.Toplam" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.toplam_bedel) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.total) }}
                </template>
            </Column>
            <Column field="alis_toplami" header="Alış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.alis_toplami) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.buying) }}
                </template>
            </Column>
            <Column field="navlun_alis" header="N.Alış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.navlun_alis) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.getFreight) }}
                </template>
            </Column>
            <Column field="detay_alis_1" header="D.Alış 1" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_alis_1) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.getDetail1) }}
                </template>
            </Column>
            <Column field="detay_alis_2" header="D.Alış 2" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_alis_2) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.getDetail2) }}
                </template>
            </Column>
            <Column field="detay_alis_3" header="D.Alış 3" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.detay_alis_3) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.getDetail3) }}
                </template>
            </Column>
            <Column field="komisyon" header="Komisyon" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.komisyon) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.commision) }}
                </template>
            </Column>
            <Column field="evrak_gideri" header="E.Gideri" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.evrak_gideri) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.document) }}
                </template>
            </Column>
            <Column field="banka_masrafi" header="B.Masrafı" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.banka_masrafi) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.bank) }}
                </template>
            </Column>
            <Column field="iscilik_masrafi" header="İşçilik" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.iscilik_masrafi) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.workmanship) }}
                </template>
            </Column>
            <Column field="sigorta_alis" header="Sig.Alış" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.sigorta_alis) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.getInsurance) }}
                </template>
            </Column>
            <Column field="fatura_masraflari" header="F.Masraf" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.fatura_masraflari) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.invoiceCost) }}
                </template>
            </Column>
            <Column field="masraf_toplam" header="Masraflar" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.masraf_toplam) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.totalCost) }}
                </template>
            </Column>
            <Column field="odenen_usd_tutar" header="Ödenen" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.odenen_usd_tutar) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.paid) }}
                </template>
            </Column>
            <Column field="kalan_bedel" header="Kalan" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kalan_bedel) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.remainder) }}
                </template>
            </Column>
            <Column field="kar_zarar" header="Profit($)" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPrice(slotProps.data.kar_zarar) }}
                </template>
                <template #footer>
                    {{ $filters.formatPrice(getMekmarGuAyoDetailTotalList.gainUsd) }}
                </template>
            </Column>
            <Column field="kar_zarar_tl" header="Profit(₺)" style="min-width: 100px">
                <template #body="slotProps">
                    {{ $filters.formatPriceTl(slotProps.data.kar_zarar_tl) }}
                </template>
                <template #footer>
                    {{ $filters.formatPriceTl(getMekmarGuAyoDetailTotalList.gainTl) }}
                </template>
            </Column>
            <Column field="kar_zarar_orani" header="Oran" style="min-width: 100px">
                <template #body="slotProps">
                    %{{ slotProps.data.kar_zarar_orani }}
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
    props: ['ayo_detail_list'],
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarGuAyoDetailTotalList',
        ])
    }
}
</script>
<style scoped>

</style>