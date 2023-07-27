<template>
    <div class="container text-center" v-if="!getMobile">
      <div class="row">
        <div class="col-4" v-for="item of getCustomerListA" :key="item" >
          <div class="card text-center" style="border-style: solid;border-width: 1px;"
            :style="{borderColor:item.oncelikBackground }"
          >
          <div class="card-header">
            {{ item.musteriadi }} ({{item.oncelik}})
          </div>
          <div class="card-body">
            <p class="card-text">{{ item.aciklama }}</p>
          </div>
          <div class="card-footer text-body-secondary">
            
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <button class="btn btn-primary" @click="musteri_sec(item, 'A')">Detay</button>
                    </div>
                    <div class="col">
                        {{ item.temsilci }}
                    </div>
                    <!-- <div class="col">
                        <button class="btn btn-danger">Delete</button>

                    </div> -->
                </div>
                </div>

          </div>
        </div>
        </div>
        <div class="col-4" v-for="item of getCustomerListB" :key="item" >
              <div class="card text-center" style="border-style: solid;border-width: 1px;"
                :style="{ borderColor: item.oncelikBackground }"
              >
              <div class="card-header">
                {{ item.musteriadi }} ({{ item.oncelik }})
              </div>
              <div class="card-body">
                <p class="card-text">{{ item.aciklama }}</p>
              </div>
              <div class="card-footer text-body-secondary">
            
                <div class="container text-center">
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-primary" @click="musteri_sec(item, 'B')">Detay</button>
                        </div>
                        <div class="col">
                            {{ item.temsilci }}
                        </div>
                        <!-- <div class="col">
                            <button class="btn btn-danger">Delete</button>

                        </div> -->
                    </div>
                    </div>

              </div>
            </div>
        </div>
        <div class="col-4" v-for="item of getCustomerListC" :key="item" >
                  <div class="card text-center" style="border-style: solid;border-width: 1px;"
                    :style="{ borderColor: item.oncelikBackground }"
                  >
                  <div class="card-header">
                    {{ item.musteriadi }} ({{ item.oncelik }})
                  </div>
                  <div class="card-body">
                    <p class="card-text">{{ item.aciklama }}</p>
                  </div>
                  <div class="card-footer text-body-secondary">
            
                    <div class="container text-center">
                        <div class="row">
                            <div class="col">
                                <button class="btn btn-primary" @click="musteri_sec(item, 'C')">Detay</button>
                            </div>
                            <div class="col">
                                {{ item.temsilci }}
                            </div>
                            <!-- <div class="col">
                                <button class="btn btn-danger">Delete</button>

                            </div> -->
                        </div>
                        </div>

                  </div>
                </div>
        </div>

      </div>
    </div>



        <div class="container text-center" v-if="getMobile">
        <div class="">
          <div class="mb-3" v-for="item of getCustomerListA" :key="item" >
            <div class="card text-center" style="border-style: solid;border-width: 1px;"
              :style="{ borderColor: item.oncelikBackground }"
            >
            <div class="card-header">
              {{ item.musteriadi }} ({{ item.oncelik }})
            </div>
            <div class="card-body">
              <p class="card-text">{{ item.aciklama }}</p>
            </div>
            <div class="card-footer text-body-secondary">
            
              <div class="container text-center">
                  <div class="row">
                      <div class="col">
                          <button class="btn btn-primary" @click="musteri_sec(item, 'A')">Detay</button>
                      </div>
                      <div class="col">
                          {{ item.temsilci }}
                      </div>
                      <!-- <div class="col">
                        <button class="btn btn-danger">Delete</button>

                    </div> -->
                  </div>
                  </div>

            </div>
          </div>
          </div>
          <div class="mb-3" v-for="item of getCustomerListB" :key="item" >
                <div class="card text-center" style="border-style: solid;border-width: 1px;"
                  :style="{ borderColor: item.oncelikBackground }"
                >
                <div class="card-header">
                  {{ item.musteriadi }} ({{ item.oncelik }})
                </div>
                <div class="card-body">
                  <p class="card-text">{{ item.aciklama }}</p>
                </div>
                <div class="card-footer text-body-secondary">
            
                  <div class="container text-center">
                      <div class="row">
                          <div class="col">
                              <button class="btn btn-primary" @click="musteri_sec(item, 'B')">Detay</button>
                          </div>
                          <div class="col">
                              {{ item.temsilci }}
                          </div>
                          <!-- <div class="col">
                            <button class="btn btn-danger">Delete</button>

                        </div> -->
                      </div>
                      </div>

                </div>
              </div>
          </div>
          <div class="mb-3" v-for="item of getCustomerListC" :key="item" >
                    <div class="card text-center" style="border-style: solid;border-width: 1px;"
                      :style="{ borderColor: item.oncelikBackground }"
                    >
                    <div class="card-header">
                      {{ item.musteriadi }} ({{ item.oncelik }})
                    </div>
                    <div class="card-body">
                      <p class="card-text">{{ item.aciklama }}</p>
                    </div>
                    <div class="card-footer text-body-secondary">
            
                      <div class="container text-center">
                          <div class="row">
                              <div class="col">
                                  <button class="btn btn-primary" @click="musteri_sec(item, 'C')">Detay</button>
                              </div>
                              <div class="col">
                                  {{ item.temsilci }}
                              </div>
                              <!-- <div class="col">
                                <button class="btn btn-danger">Delete</button>

                            </div> -->
                          </div>
                          </div>

                    </div>
                  </div>
          </div>

        </div>
      </div>



    <Dialog v-model:visible="customer_forms" modal header="Ayrıntı" :style="{ 'width': '100vw' }">
      <customerDetail :customerName="customerName" :priority="priority" :followStatus="followStatus"/>
    </Dialog>
    
</template>

<script>
import { useCustomerStore } from '../stores/customers';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import customerDetail from '../components/customers/customerDetail.vue';

import { customerService } from '../services/customerService'
import { socket } from '../services/customServices/realTimeService';
export default {
  components: {
      customerDetail
    },
    data() {
        return {
          customer_forms: false,
          customerName: '',
          priority: '',
            followStatus:false,
        }
    },
    computed: {
        ...mapState(useCustomerStore,
            [
                'getCustomerListA',
                'getCustomerListB',
                'getCustomerListC',
          ]),
      ...mapState(useMobilStore, [
        'getMobile'
      ])
    },
    methods: {
        musteri_sec(event, priority) {
            useLoadingStore().begin_loading_act()
            customerService.customerListDetail(event.musteriadi).then(data => {
                useCustomerStore().customer_list_detail_load_act(data)
                this.customer_forms = true
                this.customerName = event.musteriadi
              this.priority = priority
                this.followStatus = event.takipEt
                useLoadingStore().end_loading_act()


            })

        },
        faturaDowload(event) {
            const dosya_adi = "Fatura"
            const link = document.createElement("a");
            link.href = `https://file-service.mekmar.com/file/download/satisci/satisciDosya/${event.id}/${event.satisci_cloud_dosya}`;

            link.setAttribute("download", `${dosya_adi}.pdf`);
            document.body.appendChild(link);
            link.click();
        }
  },
  mounted() {
    socket.socketIO.on('customer_detail_update_on', (musteriadi) => {
      useLoadingStore().begin_loading_act()
      customerService.customerListDetail(musteriadi).then(data => {
        useCustomerStore().customer_list_detail_load_act(data)
        this.customerName = musteriadi
        useLoadingStore().end_loading_act()


      })
    })
    socket.socketIO.on('customer_update_on', (userId) => {
      useLoadingStore().begin_loading_act()
      customerService.customerList(userId).then(data => {
        useCustomerStore().customer_list_load_act(data)
        useLoadingStore().end_loading_act()

      })
    })
    this.emitter.on('customerDialogClosed', () => {
      this.customer_forms = false;
    })
  }
}
</script>