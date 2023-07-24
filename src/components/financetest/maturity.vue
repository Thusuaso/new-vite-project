<template>

    <DataTable :value="list" style="font-size:85%;">
        <template #header>
                        Vadeli Alacaklar Listesi
        </template>
        <Column field="firmaAdi" header="Müşteri">
            <template #body="slotProps">
                {{ slotProps.data.firmaAdi }}
            </template>
        </Column>

        <Column field="siparis_no" header="PO" bodyStyle="text-align:center;">
            <template #body="slotProps">
                {{ slotProps.data.siparis_no }}
            </template>
        </Column>
        <Column field="vade_tarih" header="Vade Tarihi" bodyStyle="text-align:center;">
            <template #body="slotProps">
                {{ slotProps.data.vade_tarih }}
            </template>
        </Column>
        <Column field="tutar" header="Tutar" bodyStyle="text-align:center;">
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
