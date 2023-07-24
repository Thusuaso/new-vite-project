<template>
    <div class="container">
      <div class="row">
        <div class="col">
          <button type="button" class="btn btn-success" @click="newCustomer">Yeni</button>

        </div>
        <div class="col">
          <Dropdown v-model="selectedPriority" :options="priorities" optionLabel="priority" class="w-full md:w-14rem" @change="isChangePriority($event)"/>

        </div>
        <div class="col">
          <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
            <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" v-model="followingStatus" @input="followingStatusChange($event)">
            <label class="btn btn-outline-primary" for="btncheck1" v-if="!followingStatus">Takibi Bırak</label>
            <label class="btn btn-outline-primary" for="btncheck1" v-else-if="followingStatus">Takibi Et</label>

        </div>
        </div>
      </div>
    </div>
    <DataTable 
    :value="customerListDetail.musteriDetay" 
    style="font-size:85%;"
    @row-click="customerListSelect($event)"
    v-model:selection="customerListselection"
    selectionMode="single"
    
    >
            <Column field="sira" header="#"></Column>
            <Column field="tarih_giris" header="Kayıt"></Column>
            <Column field="baslik" header="Başlık"></Column>
            <Column field="aciklama" header="Açıklama"></Column>
            <Column field="hatirlatmaTarihi" header="Hatırlatma T."></Column>
                <Column field="hatirlatma_notu" header="Hatırlatma N."></Column>
                <Column field="satisci_cloud_dosya" header="İndir">
                    <template #body="slotProps">
                        <button
                        type="button"
                        :disabled="slotProps.data.satisci_cloud > 0 ? false : true"
                        @click="faturaDowload(slotProps.data)"
                    ><i class="pi pi-download"></i></button>
                    </template>
                </Column>
                <Column field="temsilci" header="Temsilci"></Column>


    </DataTable>

    <Dialog v-model:visible="customer_detail_new_form" modal header="Yeni" style="min-width:80rem;">
        <customerDetailForm :customerName="customerName"/>
    </Dialog>
</template>

<script>
import { useCustomerStore } from '../../stores/customers';
import { mapState } from 'pinia';
import { customerService } from '../../services/customerService';
import customerDetailForm from './customerDetailForm.vue';
import { socket } from '../../services/customServices/realTimeService';
export default {
    props:['customerName','priority','followStatus'],
    components: {
      customerDetailForm  
    },
    data() {
        return {
            customerListselection:[],
            customer_detail_new_form: false,
            priorities: [
                { 'priority': 'A' },
                { 'priority': 'B' },
                { 'priority': 'C' },

            ],
            selectedPriority: {},
           followingStatus:false,
        }
    },
    computed: {
        ...mapState(useCustomerStore, [
            'customerListDetail'
        ])
    },
    methods: {
        customerListSelect(event) {
            useCustomerStore().customer_new_button_status_load_act(false);
          useCustomerStore().customer_model_load_act(event.data)
            this.customer_detail_new_form = true  
        },
        followingStatusChange(event) {
            let followingStatus = 0;
            if (event.target._modelValue == true) {
                followingStatus = 1
            } else {
                followingStatus = 0
            }
            customerService.setCustomerFollowing(this.customerName, followingStatus).then(data => {
                if (data.status) {
                    socket.socketIO.emit('customer_update_emit', localStorage.getItem('userId'));
                    this.emitter.emit('customerDialogClosed')
                    this.$toast.add({severity:'success',detail:'Takip Durumu Değiştirildi',life:3000})
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Takip Durumu Değiştirilemedi', life: 3000 })
                }
          })
        },
        isChangePriority(event) {
            if (confirm('Değiştirmek istiyor musunuz?')) {
                customerService.setCustomerPriority(this.customerName, event.value.priority).then(data => {
                    if (data.status) {
                        socket.socketIO.emit('customer_update_emit',localStorage.getItem('userId'))
                        this.$toast.add({severity:'success',detail:'Öncelik Değiştirildi',life:3000})
                    } else {
                        this.$toast.add({ severity: 'danger', detail: 'Öncelik Değiştirme Hata', life: 3000 })

                    }
                })

            }
        },
        newCustomer() {
            useCustomerStore().customer_new_button_status_load_act(true);
            customerService.customerModel().then(data => {
                useCustomerStore().customer_model_load_act(data)
                this.customer_detail_new_form = true
            })
        },
    },
    created() {
        this.selectedPriority = this.priorities.find(x => x.priority == this.priority)
       this.followingStatus = this.followStatus
    },
    mounted() {
        this.emitter.on('customerDetailDialogClose', () => {
            this.customer_detail_new_form = false
        })
    }
}
</script>
<style scoped>

</style>