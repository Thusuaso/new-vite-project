<template>
    <DataTable :value="getProductDetailDocumentList" style="font-size:85%;">
        <Column field="faturano" header="#"></Column>
        <Column field="yuklemeTarihi" header="Yükleme Tarihi"></Column>
        <Column field="adi" header="Evrak Adı"></Column>
        <Column header="Link">
            <template #body="slotProps">
                <button type="button" class="btn btn-success" @click="documentDownload(slotProps.data.Draft, slotProps.data.adi)">
                    İndir
                </button>
            </template>
            
        </Column>
        <Column field="kullanici" header="Yükleyen"></Column>
        <Column header="">
            <template #body="slotProps">
                <button type="button" class="btn btn-danger" v-if="slotProps.data.faturano == 2" @click="deleteProforma">Sil</button>
            </template>
        </Column>
    </DataTable>
</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { mapState } from 'pinia';

import { productionsService } from '../../services/productions';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDetailDocumentList',
            'getProductionsDetailModel'
        ])
    },
    methods: {
        documentDownload(documentLink, documentName) {
            const link = document.createElement("a");
            link.href = documentLink;
            link.setAttribute("download", `${documentName}.pdf`);
            document.body.appendChild(link);
            link.click();
        },
        deleteProforma() {
            productionsService.deleteProforma(this.getProductionsDetailModel.siparis.siparisNo).then(data => {
                if (data) {
                    socket.socketIO.emit('products_detail_update_emit', this.getProductionsDetailModel.siparis.siparisNo);
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                };
            })
        }
    }
}
</script>
<style scoped>

</style>