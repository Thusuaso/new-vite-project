<template>
  <div class="container-fluid">
                      <div class="row">

                          <!-- Earnings (Monthly) Card Example -->
                          <div class="col-xl-3 col-md-6 mb-4">
                              <div class="card border-left-primary shadow h-100 py-2">
                                  <div class="card-body">
                                      <div class="row no-gutters align-items-center">
                                          <div class="col mr-2">
                                              <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R1 Incoming Order (Monthly) (FOB)</div>
                                              <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisMekmar[0].gelenSiparisFob)}}</div>
                                          </div>
                                          <div class="col-auto">
                                              <i class="fas fa-calendar fa-2x text-gray-300">{{ dashboard.gelenSiparisMekmar[0].gelenSiparisAy }}</i>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R2 Incoming Order (Yearly) (FOB)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearMekmar[0].gelenSiparisFob) }}</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-2x text-gray-300">
                                                  {{ dashboard.gelenSiparisYearMekmar[0].gelenSiparisYil }} 
                                                  {{ dashboard.gelenSiparisYearMekmar[0].gelenSiparisAy }}
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R3 Monthly Average (FOB)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearMekmar[0].gelenSiparisAylikOrtalama) }}</div>
                                            </div>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R4 End of Year Forecast (FOB)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearMekmar[0].gelenSiparisYilSonuTahmini) }}</div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R4 Shipment (Monthly) (DDP)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisMekmarYuklenen[0].gelenSiparisFob) }}</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-2x text-gray-300">{{ dashboard.gelenSiparisMekmarYuklenen[0].gelenSiparisAy }}</i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-1">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary  mb-1">
                                                    R6 Shipment (Yearly) (DDP)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearYuklenenMekmar[0].gelenSiparisFob) }}</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-2x text-gray-300">
                                                  {{ dashboard.gelenSiparisYearYuklenenMekmar[0].gelenSiparisYil }}
                                                  {{ dashboard.gelenSiparisYearYuklenenMekmar[0].gelenSiparisAy }}

                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R7 Monthly Average (DDP)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearYuklenenMekmar[0].gelenSiparisAylikOrtalama) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-3 col-md-6 mb-4">
                                <div class="card border-left-primary shadow h-100 py-2">
                                    <div class="card-body">
                                        <div class="row no-gutters align-items-center">
                                            <div class="col mr-2">
                                                <div class="text-xs font-weight-bold text-primary mb-1">
                                                    R8 End of Year Forecast (DDP)</div>
                                                <div class="h6 mb-0 font-weight-bold text-gray-800">{{  formatPrice(dashboard.gelenSiparisYearYuklenenMekmar[0].gelenSiparisYilSonuTahmini) }}</div>
                                            </div>
                                            <div class="col-auto">
                                                <i class="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                      </div>
                      <div style="text-align:center;" v-if="!getMobile">
                      <Chart type="bar" :data="dashboard.grafik" style="width:700px;height:400px;margin:auto;"/>

                      </div>
                      <div style="text-align:center;" v-if="getMobile">
                          <Chart type="bar" :data="dashboard.grafik" style="width:100%;margin:auto;"/>

                          </div>


  </div>
  <button type="button" class="btn btn-primary" style="width:100%;" @click="subDataLoad" v-if="!sub_data_form">Click For More</button>
  <br/>
  <br/>
  <div class="container" v-if="sub_data_form" v-show="!getMobile">
    <DataTable :value="dashboardSub.konteynir" 
    :paginator="true"
              :rows="5"
              v-model:filters="filterCont"
              filterDisplay="row"
              style="font-size:85%;"
    
    >
        <template #header>
                R14 : Container Tracking List
        </template>
            <Column field="firmaAdi" header="Customer" :showFilterMenu="false">
                <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                    </template>
            </Column>
            <Column field="siparisNo" header="Po" :showFilterMenu="false">
                <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
            </Column>
            <Column field="siparisTarihi" header="Order Date"></Column>
            <Column field="yuklemeTarihi" header="Shipped Date"></Column>
            <Column field="etaTarihi" header="Eta Date"></Column>
            <Column field="konteynirNo" header="Container No" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
            </Column>
            <Column field="line" header="Line"></Column>
            <Column field="navlunFirma" header="Freight Company"></Column>
            <Column field="kalan" header="Remaining Payment">
                <template #body="slotProps">
                    {{ formatPrice(slotProps.data.kalan) }}
                </template>
                <template #footer>
                    {{ formatDecimal(subDataSum.finansKalanTutarTop) }}
                </template>
            </Column>


      </DataTable>

    <div class="container">
      <div class="row">
        <div class="col-4">
        
          <DataTable :value="dashboardSub.tedarikci" 
                :paginator="true"
                  :rows="5"
                  v-model:filters="filterTedarikci"
                  filterDisplay="row"
                  style="font-size:85%;"
    
        >
            <template #header>
                    R16: {{ new Date().getFullYear() }} Distribution of Shipments by Manufacturers (Mekmar)
            </template>
                <Column field="tedarikci" header="Supplier" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                        </template>
                </Column>
                <Column field="satisMiktar" header="Amount">
                    <template #body="slotProps">
                        {{ formatDecimal(slotProps.data.satisMiktar) }}
                    </template>
                    <template #footer>
                        {{ formatDecimal(this.subDataSum.tedarikciMiktarTop) }}
                    </template>
                </Column>
                <Column field="satisToplam" header="Total">
                    <template #body="slotProps">
                            {{ formatPrice(slotProps.data.satisToplam) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(this.subDataSum.tedarikciSatisTop) }}
                        </template>
                </Column>
          </DataTable>
        </div>
        <div class="col-4">
          <DataTable :value="dashboardSub.ulkeyeGore" 
                    :paginator="true"
                      :rows="5"
                      v-model:filters="filterUlkeyeGore"
                      filterDisplay="row"
                      style="font-size:85%;"
    
            >
                <template #header>
                        R17: {{ new Date().getFullYear() }} Shipping by Country
                </template>
                    <Column field="ulkeid" header="Id" >
                        <template #footer>
                            {{ subDataSum.ulkeyeGoreUlkeTop }}
                        </template>    
                    </Column>

                    <Column field="ulkeadi" header="Country" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                        </template>
                    </Column>
                    <Column field="toplamsevkiyat" header="Total Shipped">
                        <template #body="slotProps">
                            {{ formatPrice(slotProps.data.toplamsevkiyat) }}
                        </template>
                        <template #footer>
                            {{ formatPrice(subDataSum.ulkeyeGoreSevkiyatTop) }}
                        </template>
                    </Column>
              </DataTable>
        </div>
        <div class="col-4">
          <DataTable :value="dashboardSub.musteriSiparisler" 
                        :paginator="true"
                        :rows="5"
                        v-model:filters="filterMusteriyeGore"
                        filterDisplay="row"
                        style="font-size:85%;"
    
                >
                    <template #header>
                            R18: {{ new Date().getFullYear() }} Distribution of Current Orders by Customers
                    </template>
                        <Column field="tedarikci" header="Customer" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                            </template>
                        </Column>

                        <Column field="satisMiktar" header="Amount" >
                            <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.satisMiktar) }}
                                </template>
                        </Column>
                        <Column field="satisToplam" header="Total Shipped">
                            <template #body="slotProps">
                                {{ formatPrice(slotProps.data.satisToplam) }}
                            </template>
    
                        </Column>
                  </DataTable>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
            <DataTable :value="dashboardSub.teklifler" 
                            :paginator="true"
                            :rows="5"
                            v-model:filters="filterTekliflereGore"
                            filterDisplay="row"
                            style="font-size:85%;"
    
                    >
                        <template #header>
                                R19: {{ month }} Following Offers
                        </template>
                            <Column field="teklifSahibi" header="Offer Owner" :showFilterMenu="false">
                                <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                </template>
                            </Column>

                            <Column field="teklifSayisi" header="Offer Count" >
 
                            </Column>

            </DataTable>
            <DataTable :value="dashboardSub.tekliflerYillik" 
                                :paginator="true"
                                :rows="5"
                                v-model:filters="filterTekliflerYillik"
                                filterDisplay="row"
                                style="font-size:85%;"
    
                        >
                            <template #header>
                                    R20: {{ new Date().getFullYear() }} All Offers for the Year
                            </template>
                                <Column field="teklifSahibi" header="Offer Owner" :showFilterMenu="false">
                                    <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                    </template>
                                </Column>

                                <Column field="teklifSayisi" header="Offer Count" >
 
                                </Column>

                </DataTable>
        </div>
        <div class="col-6">
                <DataTable :value="dashboardSub.sonEklenenSiparisler" 
                                
                                    :paginator="true"
                                    :rows="5"
                                    style="font-size:85%;"
    
                            >
                                <template #header>
                                       R22: {{ new Date().getFullYear() }} Newly Added Orders

                                </template>
                                    <Column field="siparisNo" header="PO">
   
                                    </Column>

                                    <Column field="satisci" header="Salesman" >
 
                                    </Column>
                                    <Column field="satisToplami" header="Sales Total" >
                                        <template #body="slotProps">
                                            {{ formatPrice(slotProps.data.satisToplami) }}
                                        </template>
                                    </Column>
                                    <Column field="link" header="PI" bodyStyle="textAlign:center;">
                                        <template #body="slotProps">
                                        <button
                                            type="button"
                                            :disabled="!slotProps.data.evrakDurum"
                                            @click="proformaDowload(slotProps.data.link)"
                                        ><i class="pi pi-download"></i></button>
                                        </template>
                                    </Column>

                    </DataTable>
            </div>
      </div>
    </div>
  </div>
  <div class="container" v-if="sub_data_form" v-show="getMobile">
        <DataTable :value="dashboardSub.konteynir" 
        :paginator="true"
                  :rows="5"
                  v-model:filters="filterCont"
                  filterDisplay="row"
                  style="font-size:85%;"
    
        >
            <template #header>
                    R14 : Container Tracking List
            </template>
                <Column field="firmaAdi" header="Customer" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                        </template>
                </Column>
                <Column field="siparisNo" header="Po" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                            </template>
                </Column>
                <Column field="siparisTarihi" header="Order Date"></Column>
                <Column field="yuklemeTarihi" header="Shipped Date"></Column>
                <Column field="etaTarihi" header="Eta Date"></Column>
                <Column field="konteynirNo" header="Container No" :showFilterMenu="false">
                <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                            </template>
                </Column>
                <Column field="line" header="Line"></Column>
                <Column field="navlunFirma" header="Freight Company"></Column>
                <Column field="kalan" header="Remaining Payment">
                    <template #body="slotProps">
                        {{ formatPrice(slotProps.data.kalan) }}
                    </template>
                    <template #footer>
                        {{ formatDecimal(subDataSum.finansKalanTutarTop) }}
                    </template>
                </Column>


          </DataTable>

        <div class="container">

              <DataTable :value="dashboardSub.tedarikci" 
                    :paginator="true"
                      :rows="5"
                      v-model:filters="filterTedarikci"
                      filterDisplay="row"
                      style="font-size:85%;"
    
            >
                <template #header>
                        R16: {{ new Date().getFullYear() }} Distribution of Shipments by Manufacturers (Mekmar)
                </template>
                    <Column field="tedarikci" header="Supplier" :showFilterMenu="false">
                        <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                            </template>
                    </Column>
                    <Column field="satisMiktar" header="Amount">
                        <template #body="slotProps">
                            {{ formatDecimal(slotProps.data.satisMiktar) }}
                        </template>
                        <template #footer>
                            {{ formatDecimal(this.subDataSum.tedarikciMiktarTop) }}
                        </template>
                    </Column>
                    <Column field="satisToplam" header="Total">
                        <template #body="slotProps">
                                {{ formatPrice(slotProps.data.satisToplam) }}
                            </template>
                            <template #footer>
                                {{ formatPrice(this.subDataSum.tedarikciSatisTop) }}
                            </template>
                    </Column>
              </DataTable>

              <DataTable :value="dashboardSub.ulkeyeGore" 
                        :paginator="true"
                          :rows="5"
                          v-model:filters="filterUlkeyeGore"
                          filterDisplay="row"
                          style="font-size:85%;"
    
                >
                    <template #header>
                            R17: {{ new Date().getFullYear() }} Shipping by Country
                    </template>
                        <Column field="ulkeid" header="Id" >
                            <template #footer>
                                {{ subDataSum.ulkeyeGoreUlkeTop }}
                            </template>    
                        </Column>

                        <Column field="ulkeadi" header="Country" :showFilterMenu="false">
                                <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                            </template>
                        </Column>
                        <Column field="toplamsevkiyat" header="Total Shipped">
                            <template #body="slotProps">
                                {{ formatPrice(slotProps.data.toplamsevkiyat) }}
                            </template>
                            <template #footer>
                                {{ formatPrice(subDataSum.ulkeyeGoreSevkiyatTop) }}
                            </template>
                        </Column>
                  </DataTable>

              <DataTable :value="dashboardSub.musteriSiparisler" 
                            :paginator="true"
                            :rows="5"
                            v-model:filters="filterMusteriyeGore"
                            filterDisplay="row"
                            style="font-size:85%;"
    
                    >
                        <template #header>
                                R18: {{ new Date().getFullYear() }} Distribution of Current Orders by Customers
                        </template>
                            <Column field="tedarikci" header="Customer" :showFilterMenu="false">
                                <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                </template>
                            </Column>

                            <Column field="satisMiktar" header="Amount" >
                                <template #body="slotProps">
                                        {{ formatPrice(slotProps.data.satisMiktar) }}
                                    </template>
                            </Column>
                            <Column field="satisToplam" header="Total Shipped">
                                <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.satisToplam) }}
                                </template>
    
                            </Column>
                      </DataTable>


                <DataTable :value="dashboardSub.teklifler" 
                                :paginator="true"
                                :rows="5"
                                v-model:filters="filterTekliflereGore"
                                filterDisplay="row"
                                style="font-size:85%;"
    
                        >
                            <template #header>
                                    R19: {{ month }} Following Offers
                            </template>
                                <Column field="teklifSahibi" header="Offer Owner" :showFilterMenu="false">
                                    <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                    </template>
                                </Column>

                                <Column field="teklifSayisi" header="Offer Count" >
 
                                </Column>

                </DataTable>
                <DataTable :value="dashboardSub.tekliflerYillik" 
                                    :paginator="true"
                                    :rows="5"
                                    v-model:filters="filterTekliflerYillik"
                                    filterDisplay="row"
                                    style="font-size:85%;"
    
                            >
                                <template #header>
                                        R20: {{ new Date().getFullYear() }} All Offers for the Year
                                </template>
                                    <Column field="teklifSahibi" header="Offer Owner" :showFilterMenu="false">
                                        <template #filter="{ filterModel, filterCallback }">
                                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                        </template>
                                    </Column>

                                    <Column field="teklifSayisi" header="Offer Count" >
 
                                    </Column>

                    </DataTable>

                    <DataTable :value="dashboardSub.sonEklenenSiparisler" 
                                
                                        :paginator="true"
                                        :rows="5"
                                        style="font-size:85%;"
    
                                >
                                    <template #header>
                                           R22: {{ new Date().getFullYear() }} Newly Added Orders

                                    </template>
                                        <Column field="siparisNo" header="PO">
   
                                        </Column>

                                        <Column field="satisci" header="Salesman" >
 
                                        </Column>
                                        <Column field="satisToplami" header="Sales Total" >
                                            <template #body="slotProps">
                                                {{ formatPrice(slotProps.data.satisToplami) }}
                                            </template>
                                        </Column>
                                        <Column field="link" header="PI" bodyStyle="textAlign:center;">
                                            <template #body="slotProps">
                                            <button
                                                type="button"
                                                :disabled="!slotProps.data.evrakDurum"
                                                @click="proformaDowload(slotProps.data.link)"
                                            ><i class="pi pi-download"></i></button>
                                            </template>
                                        </Column>

                        </DataTable>
        </div>
      </div>
  

</template>
<script>
import { useHomeStore } from '../stores/home';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil'; 
import { FilterMatchMode } from 'primevue/api';

import { mapState } from 'pinia';
import { homeService } from '../services/homeService';
export default {
    data() {
        return {
            month:'',
            sub_data_form: false,
            filterCont: {
                firmaAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                konteynirNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },

            },
            filterTedarikci: {
                tedarikci:{value: null, matchMode: FilterMatchMode.STARTS_WITH}
            },
            filterUlkeyeGore: {
              ulkeadi:{value:null, matchMode: FilterMatchMode.STARTS_WITH}  
            },
            filterMusteriyeGore: {
                tedarikci:{value:null, matchMode: FilterMatchMode.STARTS_WITH}
            },
            filterTekliflereGore: {
                teklifSahibi:{value:null,matchMode:FilterMatchMode.STARTS_WITH}
            },
            filterTekliflerYillik: {
                teklifSahibi:{value:null,matchMode:FilterMatchMode.STARTS_WITH}
            },
            subDataSum: { 
                finansKalanTutarTop: 0,
                tedarikciMiktarTop: 0,
                tedarikciSatisTop: 0,
                ulkeyeGoreUlkeTop: 0,
                ulkeyeGoreSevkiyatTop:0,
            }
        }
    },
  computed: {
    ...mapState(useHomeStore, ['dashboard','dashboardSub']),
      ...mapState(useMobilStore, [
            'getMobile',
        ])
  },
    methods: {
        proformaDowload(dosya_link) {
            const dosya_adi = 'Proforma'
            const link = document.createElement("a");
            link.href = dosya_link;
            link.setAttribute("download", `${dosya_adi}.pdf`);
            document.body.appendChild(link);
            link.click();
        },
        getMonthName(val) {
            const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            return monthList[val]
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDecimal(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      },
      subDataLoad() {
        useLoadingStore().begin_loading_act()
          homeService.dashboardSub().then(data => {
              useHomeStore().dashboard_sub_load_act(data)
              this.subDataLoadTotal(data)
              useLoadingStore().end_loading_act()
              this.sub_data_form = true

        })
      },
      subDataLoadTotal(value) {
          this.subDataSum = {
                finansKalanTutarTop: 0,
                tedarikciMiktarTop: 0,
              tedarikciSatisTop: 0,
                ulkeyeGoreUlkeTop: 0,
                ulkeyeGoreSevkiyatTop: 0,
          }
          for (let i of value.konteynir) {
                this.subDataSum.finansKalanTutarTop += i.kalan
          }
          for (let i of value.tedarikci) {
              this.subDataSum.tedarikciMiktarTop += i.satisMiktar
            this.subDataSum.tedarikciSatisTop += i.satisToplam
          }
          for (let i of value.ulkeyeGore) {
            this.subDataSum.ulkeyeGoreSevkiyatTop += i.toplamsevkiyat
          }
          this.subDataSum.ulkeyeGoreUlkeTop = value.ulkeyeGore.length
        }
    
    },
    beforeCreate(){
        homeService.dashboard().then(data => {
          useHomeStore().dashboard_load_act(data)
        });  
    },
    created() {
        const date = new Date();
        this.month = this.getMonthName(date.getMonth());
        homeService.getVadeControl();
  }
}
</script>
