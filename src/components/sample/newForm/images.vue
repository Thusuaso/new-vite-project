<template>
    <div class="row m-auto mt-3">
        <div class="col-6">
            <FileUpload class="mb-3" mode="basic"  accept="image/*" :maxFileSize="1000000" @select="firstImageUpload($event)" chooseLabel="Ön"/>
            <img class="mb-3" :src="sampleLink1" width="400" height="400"/>
        </div>
        <div class="col-6">
            <FileUpload class="mb-3" mode="basic"  accept="image/*" :maxFileSize="1000000" @select="secondImageUpload($event)" chooseLabel="Arka"/>
            <img class="mb-3" :src="sampleLink2" width="400" height="400"/>

        </div>
    </div>
</template>
<script>
import { useSampleStore } from '../../../stores/sample';
import { mapState } from 'pinia';

import { fileService } from '../../../services/fileService';
import { sampleService } from '../../../services/sampleService';
export default {
    computed: {
        ...mapState(useSampleStore, [
            'getSampleModel'
        ])
    },
    data() {
        return {
            sampleLink1: "",
            sampleLink2: "",
        }  
    },
    methods: {
        firstImageUpload(event) {
            fileService.sendSample(event.files[0], this.getSampleModel.id).then(data => {
                if (data.Status) {
                    this.getSampleModel.numuneCloud = true;
                    this.getSampleModel.numuneCloudDosya = event.files[0].name;
                    sampleService.setSampleFileSaveFirst(this.getSampleModel).then(data => {
                        if (data.Status) {
                            this.sampleLink1 = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.getSampleModel.id}/${this.getSampleModel.numuneCloudDosya}`;
                            this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                        } else {
                            this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                        };
                    })
                };
            });
        },
        secondImageUpload(event) {
            fileService.sendSample(event.files[0], this.getSampleModel.id).then(data => {
                if (data.Status) {
                    this.getSampleModel.numuneCloud2 = true;
                    this.getSampleModel.numuneCloudDosya2 = event.files[0].name;
                    sampleService.setSampleFileSaveSecond(this.getSampleModel).then(data => {
                        if (data.Status) {
                            this.sampleLink2 = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.getSampleModel.id}/${this.getSampleModel.numuneCloudDosya2}`;
                            this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                        } else {
                            this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                        };
                    })
                };
            });
        }
    },
    created() {
        this.sampleLink1 = this.getSampleModel.numuneCloudDosya;
        this.sampleLink2 = this.getSampleModel.numuneCloudDosya2;

    }
}
</script>