<template>
    <br/>
    <div class="row" v-if="!getMobile">
        <div class="col">
            <FileUpload mode="basic" accept=".pdf" :maxFileSize="1000000" @select="save($event)" chooseLabel="Yükle"/>
        </div>
        <div class="col">
            <a :href="productFolder.Draft" >
                <button class="btn btn-success" :disabled="productFolder.Draft == '' ? true : false" type="button">İndir</button>
            </a>
        </div>
    </div>
    <div class="" v-if="getMobile">
        <div class="">
            <FileUpload class="w-100 mb-3" mode="basic" accept=".pdf" :maxFileSize="1000000" @select="save($event)" chooseLabel="Yükle"/>
        </div>
        <div class="">
            <a :href="productFolder.Draft" >
                <button class="btn btn-success w-100 mb-3" :disabled="productFolder.Draft == '' ? true : false" type="button">İndir</button>
            </a>
        </div>
    </div>
</template>
<script>
import { useUploadingStore } from '../../stores/uploading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { uploadingService } from '../../services/uploadingService';
import { fileService } from '../../services/fileService';
import { socket } from '../../services/customServices/realTimeService';
export default  {
    props: ['id', 'po'],
    computed: {
        ...mapState(useUploadingStore, [
            'getUploadingProductFolderList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    data() {
        return {
            productFolder: {
                Draft:''
            },
        }
    },
    created() {
        if (this.getUploadingProductFolderList.find(x => x.faturano == this.id) != null) {
            this.productFolder = this.getUploadingProductFolderList.find(x => x.faturano == this.id);
        }
    },
    methods: {
        save(event) {
            fileService.sendInvoice(event.files[0],this.id,this.po).then(data => {
                if (!data) {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                } else {
                    const values = {
                        'id': this.id,
                        'siparisno': this.po,
                        'kullaniciId':localStorage.getItem('userId')
                    }
                    uploadingService.save(values).then(data => {
                        if (data.status) {
                            socket.socketIO.emit('uploading_folder_update_list_emit', this.po)
                            this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                        }
                        else {
                            this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                        };
                    });
                };
            })
            
        }
    }

}
</script>
<style scoped>

</style>