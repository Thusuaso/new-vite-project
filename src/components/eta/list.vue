<template>

    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable :value="getList" style="font-size:85%;">
                <Column field="yuklemeTarihi" header="Yükleme">
                        <template #body="slotProps"> 
                            {{ formatDate(slotProps.data.yuklemeTarihi) }}
                        </template>
                    </Column>
                <Column field="etaTarihi" header="Eta">
                    <template #body="slotProps"> 
                        {{ formatDate(slotProps.data.etaTarihi) }}
                    </template>
                </Column>
                <Column field="musteri" header="Müşteri"></Column>
                <Column field="po" header="Po"></Column>
                <Column field="siparisci" header="Siparişçi"></Column>
                <Column field="operasyon" header="Operasyon"></Column>
                <Column field="satisBedel" header="Satış($)">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.satisBedel) }}
                    </template>
                </Column>
                <Column field="odenen" header="Ödenen($)">
                    <template #body="slotProps">
                            {{ formatPrice(slotProps.data.odenen) }}
                        </template>
                </Column>
                <Column field="kalan" header="Kalan($)">
                    <template #body="slotProps">
                                {{ formatPrice(slotProps.data.kalan) }}
                            </template>
                </Column>
                    <Column field="odemelerBilgisi" header="Bilgi"></Column>
                    <Column field="etaSure" header="Kalan Süre"></Column>
                    <Column header="Durum">
                        <template #body="slotProps">
                            <button type="button" class="btn btn-primary" @click="seen(slotProps.data)">Görüldü</button>
                        </template>
                    </Column>



            </DataTable>
        </div>
    </div>
</template>

<script>
import { useEtaStore } from '../../stores/eta';
import { mapState } from 'pinia';

import { etaService } from '../../services/etaService';

import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useEtaStore, [
            'getList'
        ])
    },
    methods: {
        seen(value) {
            etaService.setEtaControlStatus(value.po, value.etaSure).then(data => {
                if (data) {
                    this.$toast.add({ severity: 'success', detail: 'Durum Başarıyla Değiştirildi', life: 3000 });
                    socket.socketIO.emit('eta_list_emit');
                }
            })
        }
    }
}
</script>