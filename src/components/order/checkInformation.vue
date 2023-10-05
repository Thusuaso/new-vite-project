<template>
    <button type="button" class="btn btn-secondary" @click="excel_output">Excel</button>
    <DataTable v-model:value="getProductDetailCheckList" style="font-size:85%;" sortField="sira" sortOrder="1">
        <Column field="sira" header="#"></Column>
        <Column field="urunKart" header="Ürün Kart"></Column>
        <Column field="kasaNo" header="Kasa No"></Column>
        <Column field="tedarikciAdi" header="Tedarikçi"></Column>
        <Column field="kategoriAdi" header="Kategori"></Column>
        <Column field="urunAdi" header="Ürün">
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.totalKasa) }}
            </template>
        </Column>
        <Column field="yuzeyIslem" header="Yüzey"></Column>
        <Column field="en" header="En"></Column>
        <Column field="boy" header="Boy"></Column>
        <Column field="kenar" header="Kenar"></Column>
        <Column field="birimAdi" header="Birim"></Column>
        <Column field="kasaM2" header="M2">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.kasaM2) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.m2) }}
            </template>
        </Column>
        <Column field="kasaMt" header="Mt">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.kasaMt) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.mt) }}
            </template>
        </Column>
        <Column field="kasaAdet" header="Adet">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.kasaAdet) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.adet) }}
            </template>
        </Column>
        <Column field="miktar" header="Miktar">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.miktar) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.miktar) }}
            </template>
        </Column>
        <Column field="tonaj" header="Ton">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.tonaj) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(checkListTotal.ton) }}
            </template>
        </Column>

    </DataTable>

</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { useLocalStore } from '../../stores/local';
import { mapState } from 'pinia';
import { productionsService } from '../../services/productions';

export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDetailCheckList',
            'checkListTotal'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    data() {
        return {
            check: {
                'total': 0,
                
            }
        }
    },
    methods: {
        excel_output() {
            productionsService.getCheckExcellist(this.getProductDetailCheckList).then((res) => {
                if (res.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalServiceUrl + "excel/listeler/siparisCekiListesi";

                    link.setAttribute("download", "ceki_listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            });
        },
        
    }
}
</script>
<style scoped></style>