// @ts-nocheck
<template>
    <div class="row mt-3">
        <div class="col">
            <div class="input-group mb-3 h-100 w-100">
                <span class="input-group-text" id="basic-addon1">Proje Adı</span>
                <input type="text" class="form-control h-full" aria-describedby="basic-addon1" v-model="getPanelProjectModel.project_name">
            </div>
        </div>
        <div class="col">
            <AutoComplete class="h-100 w-100" v-model="selectedCountry" :suggestions="filteredCountryList" optionLabel="ulkeAdi"  @complete="searchCountryList($event)" @item-select="countrySelected($event)"/>
        </div>

        <div class="col">
            <FileUpload class="w-100" style="height:54px;" mode="basic" accept="image/*" :maxFileSize="2000000" @select="projectImageUpload($event)" chooseLabel="Fotoğraf Yükle" />

        </div>
    </div>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-success w-100 mt-3" @click="save" :disabled="project_save_button_disabled">Kaydet</button>
        </div>
    </div>
</template>
<script>
import { usePanelStore } from '../../stores/panel';
import { mapState } from 'pinia';

import digitalOceanService from '../../services/digitalOceanService';
import { reportsService } from '../../services/reportsService';
import { socket } from '../../services/customServices/realTimeService';

export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProjectModel',
            'getPanelProjectCountry'
        ])
    },
    data() {
        return {
            filteredCountryList: [],
            selectedCountry: null,
            project_save_button_disabled:true,
        }
    },
    methods: {
        save() {
            this.project_save_button_disabled = true;
            reportsService.setNewProject(this.getPanelProjectModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_update_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        projectImageUpload(event) {
            const result = digitalOceanService.projeFotoGonder(event.files[0]);
            // @ts-ignore
            if (!result.failed) {
                this.project_save_button_disabled = false;
                // @ts-ignore
                this.getPanelProjectModel.project_image = 'https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/' + result.body.name;
                // @ts-ignore
                this.$toast.add({ 'severity': 'success', detail: 'Başarıyla Yüklendi', life: 3000 });
            } else {
                // @ts-ignore
                this.$toast.add({ 'severity': 'error', detail: 'Yükleme Başarısız', life: 3000 });

            }
        },
        countrySelected(event) {
            // @ts-ignore
            this.getPanelProjectModel.project_country_id = event.value.id;
            // @ts-ignore
            this.getPanelProjectModel.project_country_name = event.value.ulkeAdi;

        },
        searchCountryList(event) {
            let countryList;
            if (event.query.length == 0) {
                countryList = this.getPanelProjectCountry;
            } else {
                countryList = this.getPanelProjectCountry.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.filteredCountryList = countryList;
        }
    }
}
</script>
<style scoped>

</style>