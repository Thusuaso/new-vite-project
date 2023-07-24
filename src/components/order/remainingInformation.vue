<template>
    <button type="button" class="btn btn-secondary" @click="excel_output">Excel</button>
    <DataTable 
    :value="getProductDetailOrderInformationList" 
    style="font-size:85%;">
        <Column field="kategori" header="Kategori"></Column>
        <Column field="urunAdi" header="Ürün"></Column>
        <Column field="yuzey" header="Yüzey"></Column>
        <Column field="en" header="E"></Column>
        <Column field="boy" header="B"></Column>
        <Column field="kenar" header="K"></Column>
        <Column field="birim" header="B"></Column>
        <Column field="miktar" header="Üretilecek">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.miktar) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(remainingSum.toBeProduced) }}
            </template>
        </Column>
        <Column field="uretimMiktari" header="Ü.Miktar">
            <template #body="slotProps">
                    {{ $filters.formatDecimal(slotProps.data.uretimMiktari) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(remainingSum.producedAmount) }}
            </template>
        </Column>
        <Column field="uretimAdet" header="Ü.Adet">
            <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.uretimAdet) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(remainingSum.producedPiece) }}
            </template>
        </Column>
        <Column field="kalanBilgisi" header="I">
            <template #body="slotProps">
                <div :style="{backgroundColor:slotProps.data.kalanRenk ,color:slotProps.data.fontColor }">
                    {{ slotProps.data.kalanBilgisi }}
                </div>

            </template>
        </Column>
        <Column field="kalanMiktar" header="K.Miktar">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.kalanMiktar) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(remainingSum.remainderAmount) }}
            </template>
        </Column>
        <Column field="kalanAdet" header="K.Adet">
            <template #body="slotProps">
                {{ $filters.formatDecimal(slotProps.data.kalanAdet) }}
            </template>
            <template #footer>
                {{ $filters.formatDecimal(remainingSum.remainderPiece) }}
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
            'getProductDetailOrderInformationList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    data() {
        return {
            remainingSum: {
                toBeProduced: 0,
                producedAmount: 0,
                producedPiece: 0,
                remainderAmount: 0,
                remainderPiece:0
            }
        }
    },
    created() {
        this.remainingTotalSum(this.getProductDetailOrderInformationList);
    },
    methods: {
        excel_output() {
            productionsService.getProductRemainingExcelList(this.getProductDetailOrderInformationList).then((response) => {
                if (response.status) {
                    const link = document.createElement("a");
                    link.href =
                    this.getLocalServiceUrl + "raporlar/listeler/sipKalanListesiExcell";
                    link.setAttribute("download", "sipKalanListesiExcell.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            });
        },
        remainingTotalSum(data) {
            this.remainingSum = {
                toBeProduced: 0,
                producedAmount: 0,
                producedPiece: 0,
                remainderAmount: 0,
                remainderPiece: 0
            };
            for (let i of data) {
                this.remainingSum.toBeProduced += i.miktar;
                this.remainingSum.producedAmount += i.uretimMiktari;
                this.remainingSum.producedPiece += i.uretimAdet;
                this.remainingSum.remainderAmount += i.kalanMiktar;
                this.remainingSum.remainderPiece += i.kalanAdet;
            };
        }
    }
}
</script>
<style scoped></style>