<template>
    <div class="container text-center" v-if="!getMobile">
      <div class="row">
        <div class="col-6">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Proje Adı</span>
            <input v-model="project.name" type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1" >
          </div>
        </div>
        <div class="col-6">
          <Dropdown v-model="selectedCountry" :options="countryList" filter optionLabel="ulkeAdi" style="width:350px;height:38px;">
                
            </Dropdown>
        </div>

      </div>
      <button type="button" class="btn btn-success" @click="save">Kaydet</button>
    </div>

        <div class="container text-center" v-if="getMobile">
        <div class="">
          <div class="">
            <div class="input-group mb-3 w-100">
              <span class="input-group-text" id="basic-addon1">Proje Adı</span>
              <input v-model="project.name" type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1" >
            </div>
          </div>
          <div class="">
            <Dropdown class="w-100 mb-3" v-model="selectedCountry" :options="countryList" filter optionLabel="ulkeAdi" >
                
              </Dropdown>
          </div>

        </div>
        <button type="button" class="btn btn-success w-100 mb-3" @click="save">Kaydet</button>
      </div>
</template>
<script>
import { useBgpStore } from '../../stores/bgp';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';
import { bgpService } from '../../services/bgpService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    data() {
        return {
            selectedCountry: {},
            project: {
                name: '',
                country: '',
                countryLogo: '',
                representive:0,
            }
      }  
    },
    computed: {
      ...mapState(useBgpStore, ['countryList']),
        ...mapState(useMobilStore,['getMobile']),
    },
    methods: {
        save() {
            this.project.country = this.selectedCountry.ulkeAdi
            this.project.countryLogo = this.selectedCountry.logo
            this.project.representive = localStorage.getItem('userId')
            bgpService.bgpSave(this.project).then(data => {
                if (data.status) {
                    socket.socketIO.emit('bgp_project_list_emit',localStorage.getItem('userId'))
                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000})
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 })
                }
            })

        },

    }
}
</script>
<style scoped>

</style>