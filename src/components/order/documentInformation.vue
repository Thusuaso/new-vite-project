<template>
    <DataTable :value="getProductDetailDocumentList">
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
    </DataTable>
</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { mapState } from 'pinia';

export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDetailDocumentList'
        ])
    },
    methods: {
        documentDownload(documentLink, documentName) {
            const link = document.createElement("a");
            link.href = documentLink;
            link.setAttribute("download", `${documentName}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
    }
}
</script>
<style scoped>

</style>