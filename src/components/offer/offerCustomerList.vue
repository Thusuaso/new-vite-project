<template>
    <div class="row mt-3">
        <div class="col">
            <DataTable :value="getOfferReminderList" style="font-size:85%;">
                <Column field="tarih" header="Tarih"></Column>
                <Column field="musteriAdi" header="Müşteri"></Column>
                <Column field="ulkeAdi" header="Ülke"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferReminderList'
        ])
    },

}
</script>
<style scoped></style>