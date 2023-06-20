<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Po</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.proformaPoNo">
            </div>
        </div>
        <div class="col">
            <span class="p-float-label">
                <Calendar id="p_date" class="w-100" v-model="p_date" showIcon @date-select="offerProformaDateSelected($event)"/>
                <label for="p_date">Proforma Tarih</label>
            </span>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Tutar($)</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.proformaTutar" @input="getOfferModelList.proformaTutar = $filters.formatPoint($event.target.value)">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Not</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getOfferModelList.proformaNot">
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <FileUpload class="w-100" mode="basic" accept=".pdf" :maxFileSize="1000000" @select="onProformaSelected($event)" :auto="true" chooseLabel="Proforma Yükle" />
        </div>
        <div class="col">
            <a :href="offerProformaLink">
                <button type="button" class="btn btn-secondary w-100">Proforma Aç</button>
            </a>
        </div>
    </div>
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { fileService } from '../../services/fileService';
import { offerService } from '../../services/offerService';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferModelList'
        ])
    },
    data() {
        return {
            p_date: null,
            offerProformaLink: null,
        }
    },
    methods: {
        onProformaSelected(event) {
            fileService.sendOfferProforma(event.files[0],this.getOfferModelList.id).then(data => {
                if (data.Status) {
                    this.getOfferModelList.proformaCloud = true;
                    this.getOfferModelList.proformaCloudDosya = data.dosyaAdi;
                    offerService.setOfferProforma(this.getOfferModelList).then(data => {
                        if (data.status) {
                            this.offerProformaLink = `https://file-service.mekmar.com/file/download/teklif/proforma/${this.getOfferModelList.id}/${this.getOfferModelList.proformaCloudDosya}`;
                            this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });

                        } else {
                            this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                        }

                    })
                }
            })
        },
        offerProformaDateSelected(event) {
            this.getOfferModelList.proformaTarih = localDateService.getDateString(event);
        }
    }
}
</script>
<style scoped>

</style>