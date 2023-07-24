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
                                                    R1 Gelen Sipariş (FOB)</div>
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
                                                    R2 Gelen Sipariş (FOB)</div>
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
                                                    R3 Aylık Ortalama (FOB)</div>
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
                                                    R4 Yıl Sonu Tahmini (FOB)</div>
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
                                                    R4 Yüklenen Sipariş (DDP)</div>
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
                                                    R6 Yüklenen Sipariş (DDP)</div>
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
                                                    R7 Aylık Ortalama (DDP)</div>
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
                                                    R8 Yıl Sonu Tahmini (DDP)</div>
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
                      <div style="text-align:center;">
                      <Chart type="bar" :data="dashboard.grafik" style="width:700px;height:400px;margin:auto;"/>

                      </div>


  </div>
  <button type="button" class="btn btn-primary" style="width:100%;" @click="subDataLoad" v-if="!sub_data_form">Devamı için tıklayınız</button>
  <br/>
  <br/>
  <div class="container" v-if="sub_data_form">
    <DataTable :value="dashboardSub.konteynir" 
    :paginator="true"
              :rows="5"
              v-model:filters="filterCont"
              filterDisplay="row"
              style="font-size:85%;"
    
    >
        <template #header>
                R14 : Konteynır Takip Listesi
        </template>
            <Column field="firmaAdi" header="Firma Adı" :showFilterMenu="false">
                <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                    </template>
            </Column>
            <Column field="siparisNo" header="Sipariş No" :showFilterMenu="false">
                <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
            </Column>
            <Column field="siparisTarihi" header="Sipariş Tarihi"></Column>
            <Column field="yuklemeTarihi" header="Yükleme Tarihi"></Column>
            <Column field="etaTarihi" header="Eta Tarihi"></Column>
            <Column field="konteynirNo" header="Konteynır No" :showFilterMenu="false">
            <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                        </template>
            </Column>
            <Column field="line" header="Line"></Column>
            <Column field="navlunFirma" header="Navlun Firma"></Column>
            <Column field="kalan" header="Kalan Ödeme">
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
                    R16: 2023 'de Yapılan Sevkiyatın Üreticilere Göre Dağılımı (Mekmar)
            </template>
                <Column field="tedarikci" header="Tedarikçi" :showFilterMenu="false">
                    <template #filter="{ filterModel, filterCallback }">
                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                    
                        </template>
                </Column>
                <Column field="satisMiktar" header="Miktar">
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
                        R17: 2023'deki Ülkelere Göre Sevkiyat
                </template>
                    <Column field="ulkeid" header="Id" >
                        <template #footer>
                            {{ subDataSum.ulkeyeGoreUlkeTop }}
                        </template>    
                    </Column>

                    <Column field="ulkeadi" header="Ülke Adı" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                        </template>
                    </Column>
                    <Column field="toplamsevkiyat" header="Toplam Sevkiyat">
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
                            R18: 2023'deki Mevcut Siparişlerin Müşterilere Göre Dağılımı
                    </template>
                        <Column field="tedarikci" header="Firma Adı" :showFilterMenu="false">
                            <template #filter="{ filterModel, filterCallback }">
                                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                            </template>
                        </Column>

                        <Column field="satisMiktar" header="Miktar" >
                            <template #body="slotProps">
                                    {{ formatPrice(slotProps.data.satisMiktar) }}
                                </template>
                        </Column>
                        <Column field="satisToplam" header="Toplam Sevkiyat">
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
                                R19: Takipteki {{ month }} Ayına Ait Teklifler
                        </template>
                            <Column field="teklifSahibi" header="Teklif Sahibi" :showFilterMenu="false">
                                <template #filter="{ filterModel, filterCallback }">
                                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                </template>
                            </Column>

                            <Column field="teklifSayisi" header="Teklif Sayısı" >
 
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
                                    R20: {{ new Date().getFullYear() }} Yılına Ait Tüm Teklifler
                            </template>
                                <Column field="teklifSahibi" header="Teklif Sahibi" :showFilterMenu="false">
                                    <template #filter="{ filterModel, filterCallback }">
                                            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    
                                    </template>
                                </Column>

                                <Column field="teklifSayisi" header="Teklif Sayısı" >
 
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
                                       R22: {{ new Date().getFullYear() }} Yeni Eklenen Siparişler

                                </template>
                                    <Column field="siparisNo" header="PO">
   
                                    </Column>

                                    <Column field="satisci" header="Satışçı" >
 
                                    </Column>
                                    <Column field="satisToplami" header="Satış Toplamı" >
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
  

</template>
<script>
import { useHomeStore } from '../stores/home';
import { useLoadingStore } from '../stores/loading';
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
            const monthList = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
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
    created() {
        const date = new Date()
        this.month = this.getMonthName(date.getMonth())
  }
}
</script>
