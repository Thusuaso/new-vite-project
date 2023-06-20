<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <span class="p-float-label">
                <Calendar id="e_date" v-model="e_date" showIcon @date-select="enterDateSelected($event)"/>
                <label for="e_date">Giriş Tarihi</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label">
                <Calendar id="r_date" v-model="r_date" showIcon @date-select="reminderDateSelected($event)" />
                <label for="r_date">Hatırlatma Tarihi</label>
            </span>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Takip No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.numuneTrackingNo">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Ödenen($)</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.numuneOdenenTutar" @input="getOfferModelList.numuneOdenenTutar = $filters.formatPoint($event.target.value)">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Alınan($)</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.numuneAlinanTutar" @input="getOfferModelList.numuneAlinanTutar = $filters.formatPoint($event.target.value)">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Not</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.numuneNot">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <FileUpload class="w-100" mode="basic"  accept=".pdf" :maxFileSize="1000000" @select="onSampleSelected($event)" :auto="true" chooseLabel="Numune Yükle" />
        </div>
        <div class="col">
            <a :href="sampleLink">
                <button type="button" class="btn btn-secondary w-100">Numune Aç</button>
            </a>
        </div>
    </div>
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { mapState } from 'pinia';

import { offerService } from '../../services/offerService';
import { fileService } from '../../services/fileService';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferModelList'
        ])
    },
    data() {
        return {
            e_date: "",
            r_date: "",
            sampleLink: null,
        }
    },
    created() {

    },
    methods: {
        onSampleSelected(event) {
            fileService.sendSampleFile(event, this.getOfferModelList.id).then((data) => {
                this.getOfferModelList.numuneCloud = true;
                this.getOfferModelList.numuneCloudDosya = data.dosyaAdi;

                offerService.setOfferSample(this.teklif).then((veri) => {
                    if (veri.Status) {
                        this.sampleLink = `https://file-service.mekmar.com/file/download/teklif/teklifNumune/${this.getOfferModelList.id}/${this.getOfferModelList.numuneCloudDosya}`;
                    }
                });
            });
        },
        enterDateSelected(event) {
            this.getOfferModelList.numuneGirisTarihi = event;
        },
        reminderDateSelected(event) {
            this.getOfferModelList.numuneHatirlatmaTarihi = event;

        }
    }
}
</script>
<style scoped>

</style>