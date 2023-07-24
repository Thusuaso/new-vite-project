<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmarAyoDetailCostList" style="font-size:85%;">
                <template #header>
                    Masraflar
                </template>
                <Column field="invoiced" header="Fatura">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.invoiced) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.invoice) }}
                    </template>
                </Column>
                <Column field="mekmer_alim" header="Mekmar Ü.">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.mekmer_alim) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.mekmar) }}
                    </template>
                </Column>
                <Column field="mek_moz_alim" header="Mekmoz Ü.">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.mek_moz_alim) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.mekmoz) }}
                    </template>
                </Column>
                <Column field="dis_alim" header="Dış Ü.">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.dis_alim) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.outer) }}
                    </template>
                </Column>
                <Column field="nakliye" header="Nakliye">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.nakliye) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.transport) }}
                    </template>
                </Column>
                <Column field="gumruk" header="Gümrük">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.gumruk) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.duty) }}
                    </template>
                </Column>
                <Column field="ilaclama" header="İlaçlama">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ilaclama) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.spraying) }}
                    </template>
                </Column>
                <Column field="liman" header="Liman">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.liman) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.port) }}
                    </template>
                    
                </Column>
                <Column field="sigorta" header="Sigorta">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.sigorta) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.insurance) }}
                    </template>
                </Column>
                <Column field="navlun_alis" header="Navlun">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.navlun_alis) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.freight) }}
                    </template>
                </Column>
                <Column field="detay_1" header="Detay 1">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_1) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.detail1) }}
                    </template>
                </Column>
                <Column field="detay_2" header="Detay 2">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.detail2) }}
                    </template>
                </Column>
                <Column field="detay_3" header="Detay 3">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_3) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.detail3) }}
                    </template>
                </Column>
                <Column field="mekus_masraf" header="Mekus">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.mekus_masraf) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.mekus) }}
                    </template>
                </Column>
                <Column field="komisyon" header="Komisyon">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.komisyon) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.commision) }}
                    </template>
                </Column>
                <Column field="ozel_iscilik" header="İşçilik">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ozel_iscilik) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.workmanship) }}
                    </template>
                </Column>
                <Column field="banka_masrafi" header="Banka">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.banka_masrafi) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.bank) }}
                    </template>
                </Column>
                <Column field="kurye" header="Kurye">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kurye) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.courier) }}
                    </template>
                </Column>
                <Column field="total_in" header="Maliyet ($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.total_in) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.cost_usd) }}
                    </template>
                </Column>
                <Column field="maliyet_try" header="Maliyet (₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.total_in * slotProps.data.kur) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.cost_tr) }}
                    </template>
                </Column>
                <Column header="Profit ($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.invoiced - slotProps.data.total_in) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.profit_usd) }}
                    </template>
                </Column>
                <Column header="Profit (₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice
                            (
                                (slotProps.data.invoiced * slotProps.data.kur) - (slotProps.data.total_in * slotProps.data.kur)
                            ) 
                        }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailCostTotalList.profit_tr) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmarAyoDetailBankList" style="font-size:85%;">
                <template #header>
                    Banka Özeti
                </template>
                <Column field="tarih" header="Tarih"></Column>
                <Column field="tutar" header="Tutar ($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailBankTotalList.usd) }}
                    </template>
                </Column>
                <Column field="tutartl" header="Tutar (₺)">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.tutartl) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailBankTotalList.tl) }}
                    </template>
                </Column>
                <Column field="masraf" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailBankTotalList.cost) }}
                    </template>
                </Column>
                <Column field="kur" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kur) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoDetailBankTotalList.currency) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col">
            <DataTable :value="getMekmarAyoDetailInvoiceList" style="font-size:85%;">
                <template #header>
                    Evraklar
                </template>
                <Column field="faturano" header="#"></Column>
                <Column field="yuklemeTarihi" header="Yükleme"></Column>
                <Column field="adi" header="Evrak"></Column>
                <Column field="Draft" header="Link">
                    <template #body="slotProps">
                        <a :href="slotProps.data.Draft" :disabled="slotProps.data.adi.length > 0 ? false : true">
                            <button type="button" class="btn btn-success pi pi-download" :disabled="slotProps.data.adi.length > 0 ? false : true" icon="fas fa-download"></button>  
                        </a>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarAyoDetailCostList',
            'getMekmarAyoDetailCostTotalList',
            'getMekmarAyoDetailBankList',
            'getMekmarAyoDetailBankTotalList',
            'getMekmarAyoDetailInvoiceList',
        ])
    }
}
</script>
<style scoped>

</style>