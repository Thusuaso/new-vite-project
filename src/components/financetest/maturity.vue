<template>

    <DataTable :value="list" style="font-size:85%;">
        <template #header>
                        Maturity List
        </template>
        <Column field="firmaAdi" header="Customer">
            <template #body="slotProps">
                {{ slotProps.data.firmaAdi }}
            </template>
        </Column>

        <Column field="siparis_no" header="PO" bodyStyle="text-align:center;">
            <template #body="slotProps">
                {{ slotProps.data.siparis_no }}
            </template>
        </Column>
        <Column field="vade_tarih" header="Maturity Date" bodyStyle="text-align:center;">
            <template #body="slotProps">
                {{ $filters.formatDate(slotProps.data.vade_tarih) }}
            </template>
        </Column>
        <Column field="tutar" header="Total" bodyStyle="text-align:center;">
            <template #body="slotProps">
                {{ formatPrice(slotProps.data.tutar) }}
            </template>
            <template #footer>
                {{ formatPrice(toplam_vade) }}
            </template>
        </Column>
    </DataTable>

</template>
<script>
import { financeServiceTest } from '../../services/financeServiceTest';

export default {
    data() {
        return {
            select_depo: null,
            loading: false,
            is_form: false,
            list: "",
            toplam_vade: 0,
        };
    },
    created() {

        financeServiceTest.getMaturityList().then((data) => {
            this.list = data;
            for (let key in this.list) {
                const item = this.list[key];

                this.toplam_vade += item.tutar;
            }
        });
    },

    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
    },
};
</script>

<style scoped>

</style>
