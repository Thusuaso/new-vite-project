<template>
    <div class="container text-center">
      <div class="row">
        <div class="col-4">
          <button type="button" class="btn btn-success" @click="newProject">Yeni Proje</button>
        </div>
        <div class="col-4">
          <button type="button" class="btn btn-danger" @click="statistics">İstatistik</button>
        </div>
      </div>
      <br/>
      <div class="row">
        <div class="col-4">
            <Dropdown v-model="selectedRepresentive" :options="representivies" optionLabel="name" class="w-full md:w-14rem" @change="representivChange($event)" />

        </div>
        <div class="col-4">
            <Dropdown v-model="selectedCountry" :options="bgpCountryList" optionLabel="ulkeAdi" class="w-full md:w-14rem" @change="representivCountryChange($event)"/>
        </div>
        <div class="col-4">
            {{ bgpTotal }}
        </div>
      </div>
    </div>
    <br/>
    <div class="container text-center">
      <div class="row">
        <div class="col-4" v-for="item of getBgpList" :key="item" style="margin-bottom:15px">
          <div class="card text-center">
          <div class="card-header">
            <h5 class="card-title">{{ item.projectName }}</h5>
          </div>
          <!-- <div class="card-body">
            <h5 class="card-title">{{ item.projectName }}</h5>
          </div> -->
          <div class="card-footer text-body-secondary">
            <div class="container text-center">
                <div class="row">
                    <div class="col-4">
                        <button type="button" class="btn btn-primary" @click="detail(item.projectName, item.ulkeAdi)">Detay</button>
                    </div>
                    <div class="col-4">
                        {{ $filters.formatDate(item.dateOfRegistiration) }}  {{ item.temsilciAdi }}

                    </div>
                    <div class="col-4">
                        <button type="button" class="btn btn-danger" @click="deleteProject(item.projectName)">Sil</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>
    <Dialog v-model:visible="bgp_new_project_form" modal header="Yeni Proje" :style="{ 'width': '100vw' }">
        <br/>
        <newProject/>
    </Dialog>
    <Dialog v-model:visible="bgp_detail_form" modal header="Detay" :style="{ 'width': '100vw' }">
        <detail :projectName="projectName" :ulkeAdi="ulkeAdi"/>
    </Dialog>
    <Dialog v-model:visible="bgp_statistic_form" modal header="İstatistikler" :style="{ 'width': '100vw' }">
        <statistics/>
    </Dialog>

</template>

<script>
import { useBgpStore } from '../stores/bgp';
import { mapState } from 'pinia';
import { socket } from '../services/customServices/realTimeService';
import newProject from '../components/bgp/newProject.vue';
import { bgpService } from '../services/bgpService';
import { useLoadingStore } from '../stores/loading';
import detail from '../components/bgp/detail.vue';
import statistics from '../components/bgp/statistics.vue';

export default {
    components: {
        newProject,
        detail,
        statistics
    },
    data() {
        return {
            bgp_new_project_form: false,
            bgp_detail_form: false,
            bgp_statistic_form:false,
            projectName: '',
            ulkeAdi: '',
            selectedRepresentive: { 'id': 0, 'name': 'Hepsi' },
            representivies: [
                { 'id': 0, 'name': 'Hepsi' },
                { 'id': 19, 'name': 'Özlem' },
                { 'id': 44, 'name': 'Hakan' },
            ],
            selectedCountry: {},
            bgpCountryList: [],
            bgpTotal:0,
            

        }
    },
    computed: {
        ...mapState(useBgpStore, [
            'getBgpList',
            'getBgpCountryList',
            'getStatisticList',
            'getRepresentiveCountry'
        ])
    },
    methods: {
        representivCountryChange(event) {
            if (this.selectedRepresentive.id == 0) {
                this.bgpTotal = this.bgpCountryList.find(x => x.ulkeAdi == event.value.ulkeAdi).toplamProje

            } else {
                this.bgpTotal = this.bgpCountryList.find(x=>x.ulkeAdi == event.value.ulkeAdi && x.temsilciId == this.selectedRepresentive.id).projectSum
            }
        },
        representivChange(event) {
            if (event.value.id == 0) {
                this.bgpCountryList = this.getBgpCountryList

            } else {
                this.bgpCountryList = this.getRepresentiveCountry.filter(x => x.temsilciId == event.value.id)

            }
        },
        statistics() {
            this.bgp_statistic_form = true
        },
        newProject() {
          this.bgp_new_project_form = true  
        },
        detail(projectName, ulkeAdi) {
            useLoadingStore().begin_loading_act()
            this.projectName = projectName
            this.ulkeAdi = ulkeAdi
            bgpService.bgpDetail(projectName).then(data => {
                useBgpStore().bgp_list_detail_load_act(data)
                useLoadingStore().end_loading_act()
                this.bgp_detail_form = true
            })

        },
        deleteProject(projectName) {
            if (confirm('Gerçekten silmek istiyor musunuz?')) {
                useLoadingStore().begin_loading_act()
                bgpService.bgpDelete(projectName).then(data => {
                    if (data.status) {
                        socket.socketIO.emit('bgp_project_list_emit', localStorage.getItem('userId'))
                        useLoadingStore().end_loading_act()
                        this.$toast.add({severity:'success',detail:'Başarıyla silindi',life:3000})
                    } else {
                        useLoadingStore().end_loading_act()
                        this.$toast.add({ severity: 'error', detail: 'Silme işlemi başarısız', life: 3000 })

                    }
                })
            }
        }
    },
    mounted() {
        socket.socketIO.on('bgp_project_list_on', (userId) => {
            useLoadingStore().begin_loading_act()
            bgpService.bgpList(userId).then(data => {
                useBgpStore().bgp_list_load_act(data.result)
                useBgpStore().bgp_country_list_load_act(data.bgpulkeler)
                useBgpStore().bgp_statistic_list_load_act(data.statistic)
                useBgpStore().country_list_load_act(data.ulkelerList)
                useLoadingStore().end_loading_act()
            })
        })
        socket.socketIO.on('bgp_project_list_ayrinti_on', (projectName) => {
            useLoadingStore().begin_loading_act()
            bgpService.bgpDetail(projectName).then(data => {
                useBgpStore().bgp_list_detail_load_act(data)
                useLoadingStore().end_loading_act()
                this.bgp_detail_form = true
            })
        })
    },
    created() {
        this.bgpCountryList = this.getBgpCountryList
    }
}
</script>

<style scoped>

</style>