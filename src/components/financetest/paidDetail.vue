<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getFinanceTestDetailPaidDetailList">
                <Column field="sira" header="#"></Column>
                <Column field="siparisno" header="Po">
      
                </Column>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailPaidDetailTotalList.paid) }}
                    </template>
                </Column>
                <Column field="masraf" header="Masraf">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getFinanceTestDetailPaidDetailTotalList.cost) }}
                    </template>
                </Column>
                <Column field="kur" header="Kur">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kur) }}
                    </template>
                </Column>
                

            </DataTable>

        </div>
    </div>
</template>
<script>
import {useFinanceTestStore} from '../../stores/financetest';
import {mapState} from 'pinia';
export default {
    computed:{
        ...mapState(useFinanceTestStore,[
            'getFinanceTestDetailPaidDetailList',
            'getFinanceTestDetailPaidDetailTotalList'
        ])
    }
}
</script>