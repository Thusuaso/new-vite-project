<template>
    <div class="row m-auto mt-3">
        <div class="col-2">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Fiyat</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="addPrice.price" @input="addPrice.price = $filters.formatPoint($event.target.value)"> 
            </div>
        </div>
        <div class="col-2">
            <button type="button" class="btn btn-success" @click="savePrice">Kaydet</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getMekmerProductionPricesDetailList" style="font-size:85%;">
                <Column field="sira" header="#"></Column>
                <Column field="tarihtop" header="Tarih"></Column>
                <Column field="kasanotop" header="Kasa"></Column>
                <Column field="tedarikci_aditop" header="Tedarikçi"></Column>
                <Column field="kategoritop" header="Kategori"></Column>
                <Column field="urunaditop" header="Ürün"></Column>
                <Column field="yuzeyislemtop" header="Yüzey"></Column>
                <Column field="entop" header="En"></Column>
                <Column field="boytop" header="Boy"></Column>
                <Column field="kenartop" header="Kenar"></Column>
                <Column field="adettop" header="Adet">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.adettop) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerProductionPricesDetailTotalList.piece) }}
                    </template>
                </Column>
                <Column field="miktartop" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktartop) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatDecimal(getMekmerProductionPricesDetailTotalList.amount) }}
                    </template>
                </Column>
                <Column field="birimaditop" header="Birim"></Column>
                <Column field="durum" header="Status"></Column>
                <Column field="aciklama" header="Not"></Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../stores/reports';
import { mapState } from 'pinia';

import { socket } from '../../services/customServices/realTimeService';
import { reportsService } from '../../services/reportsService';
export default {
    props:['status','productId','price'],
    computed: {
        ...mapState(useReportsStore, [
            'getMekmerProductionPricesDetailList',
            'getMekmerProductionPricesDetailTotalList'
        ])
    },
    data() {
        return {
            addPrice: {
                price: 0,
                productId:0,
            }
        }
    },
    created() {
        this.addPrice.price = this.price;
    },
    methods: {
        savePrice() {
            let status;
            if (this.status == 'mekmermekmoz') status = 1;
            else if (this.status == 'dismekmer') status = 2;
            else if (this.status == 'mekmerdis') status = 3;
            this.addPrice.productId = this.productId;
            reportsService.setMekmerStockPrice(this.addPrice).then(data => {
                if (data) {
                    socket.socketIO.emit('mekmer_reports_stock_prices_list_update_list_emit', status);
                    this.emitter.emit('close_reports_stock_prices_dialog');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })

        },
    }
}
</script>