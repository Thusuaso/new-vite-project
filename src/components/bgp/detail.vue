<template>
  <br/>
    <div class="container text-center">
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-success" @click="newProjectDetail">Yeni</button>
        </div>
      </div>
      <DataTable :value="getBgpListDetail" style="font-size:85%;" :selection="bgpListSelected" selectionMode="single" @row-click="bgpListDetail($event)">
        <Column field="firmaAdi" header="Firma Adı"></Column>
        <Column field="kayitTarihi" header="Tarih">
          <template #body="slotProps">
            {{ $filters.formatDate(slotProps.data.kayitTarihi) }}
          </template>
        </Column>
        <Column field="baslik" header="Başlık"></Column>
        <Column field="aciklama" header="Açıklama"></Column>
        <Column field="hatirlatmaTarihi" header="H.Tarihi">
          <template #body="slotProps">
              {{ $filters.formatDate(slotProps.data.hatirlatmaTarihi) }}
            </template>
        </Column>
        <Column field="hatirlatmaAciklama" header="H.Açıklama"></Column>
        <Column field="email" header="Email"></Column>
        <Column field="phone" header="Tel"></Column>
        <Column field="unvan" header="Ünvan"></Column>


      </DataTable>
    </div>
    <Dialog v-model:visible="bgp_detail_list_form" modal :style="{ 'width': '100vw' }">
        <detailForm :projectName="projectName" :ulkeAdi="ulkeAdi"/>
    </Dialog>
</template>

<script lang="javascript">
import { useBgpStore } from '../../stores/bgp';
import { mapState } from 'pinia';
import detailForm from '../../components/bgp/detailForm.vue'

export default {
    props:['projectName','ulkeAdi'],
    components: {
      detailForm  
    },
    computed: {
      ...mapState(useBgpStore,['getBgpListDetail'])  
    },
    data() {
        return {
            bgp_detail_list_form: false,
            bgpListSelected:[]
        }
    },
    methods: {
        newProjectDetail() {
            useBgpStore().bgp_project_new_button_load_act(true);
            this.bgp_detail_list_form = true;

        },
        bgpListDetail(event) {
            
            useBgpStore().bgp_project_new_button_load_act(false);
            useBgpStore().bgp_list_detail_model_load_act(event.data)
            this.bgp_detail_list_form = true;
        }
    },
    created() {
        
    },
    mounted() {
        this.emitter.on('bgp_project_detail_closed_dialog', () => {
            this.bgp_detail_list_form = false
        })
    }
}
</script>

<style scoped>

</style>