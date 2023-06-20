<template>
    <div class="row mt-3">
        <div class="col">
            <DataTable :value="getOfferCustomerList" scrollable scrollHeight="400px">
                <Column field="musteriAdi" header="Müşteri"></Column>
                <Column field="ulkeAdi" header="Ülke"></Column>
                <Column field="teklifSayisi" header="T"></Column>
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
            'getOfferCustomerList'
        ])
    }
}
</script>
<style scoped></style>