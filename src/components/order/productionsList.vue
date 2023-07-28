<template>
    <DataTable 
    class="p-datatable-sm"
      tableStyle="width:100%;"
      style="font-size: 55%"
      :value="productionsList" 
      rowGroupMode="rowspan"
      :groupRowsBy="groups"
      sortMode="single"
      sortField="groups"
      :sortOrder="1"
      :globalFilterFields="['musteriAdi', 'siparisNo', 'urunAdi', 'en', 'boy', 'kenar', 'tedarikciAdi', 'operasyon','icerik']"
      v-model:filters="filters"
      filterDisplay="row"
      v-model:selection="selectedSiparis"
      selectionMode="single"
      @row-select="siparisSecim($event)"
      @filter="productFilterEvent($event)"
      :rowStyle="rowStyle"
      v-if="$route.fullPath == '/order/forwarding'"
      paginator :rows="10"
    >
        <template #header>
            <div class="row " style="height:25px;">
              <div class="col-9">
                <h4>{{ title }}</h4>
              </div>
              <div class="col-3" style="margin-top:-6px;">
                <div class="flex justify-content-between">
                  <span class="p-input-icon-left">
                    <input v-model="filters['global'].value" type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
                  </span>
                </div>
              </div>
            </div>
            
          </template>
        <Column field="tarih" header="Tarih" ></Column>
        <Column field="musteriAdi" header="Kime" 
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
        >
          <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="link" :header="getProductStatusId == 3 ? 'CI' : 'PI'">
          <template #body="slotProps">
             <Button
                type="button"
                :disabled="
                  getProductStatusId == 2
                    ? slotProps.data.evrak != 0
                      ? false
                      : true
                    : slotProps.data.evrakc != 0
                      ? false
                      : true
                                "
                @click="proformaDowload(slotProps.data.link,'Proforma')"
                class="pi pi-cloud-download"
                style="margin-right: 0.5em"
              ></Button>
          </template>
        </Column>
        <Column 
                field="siparisNo"
                header="PO" 
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
                :filterMenuStyle="{ width: '14rem' }"
        >
          <template #body="slotProps">
              {{ slotProps.data.siparisNo }}
          </template>
          <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="urunAdi" header="Ürün" 
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
                :filterMenuStyle="{ width: '14rem' }">

          <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
              </template>
        </Column>
        <Column field="icerik" header="İçerik" headerStyle="width:150px;" bodyStyle="width:150px;">
          <template #body="slotProps" >
            <div style="width:340px;">
            {{ slotProps.data.icerik }}
            </div>
          </template>
        </Column>
        <Column field="en" header="E" 
        :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false" 
        
        :filterMenuStyle="{ width: '14rem' }" headerStyle="width:30px;" bodyStyle="width:30px;"> 
          <template #body="slotProps">
            <div style="width:30px;">
              {{ slotProps.data.en }}
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="boy" header="B" 
        :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
         :filterMenuStyle="{ width: '14rem' }">
          <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
              </template>
        </Column>
        <Column field="kenar" header="K" 
        :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
        :filterMenuStyle="{ width: '14rem' }">
          <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
        </Column>
        <Column field="tedarikciAdi" header="Kimden" 
        :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
        :filterMenuStyle="{ width: '14rem' }">
          <template #body="slotProps">
              <div :style="{
                backgroundColor: slotProps.data.urunDurumRenk,
                color:
                  slotProps.data.urunDurumRenk != 'transparent' &&
                    getProductStatusId == 2
                    ? 'white'
                    : 'black',
              }">
                {{ slotProps.data.tedarikciAdi }}
              </div>
          </template>
          
          <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
          </template>
        </Column>
        <Column field="siparisMiktari" header="M">
          <template #footer>
            {{ $filters.formatDecimal(getProductionsListTotal.amount) }}
          </template>
        </Column>
        <!-- <Column field="adet" header="A">
          <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.piece) }}
            </template>
        </Column>
        <Column field="mt2" header="M2">
          <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.m2) }}
            </template>
        </Column> -->
        <Column field="birim" header="B"></Column>
        <Column field="uretimMiktari" header="Üretim">
          <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.production) }}
            </template>
        </Column>
        <Column field="ton" header="Ton">
          <template #footer>
                {{ $filters.formatDecimal(getProductionsListTotal.ton) }}
              </template>
        </Column>
        <Column field="birimFiyat" header="F">
          <template #body="slotProps">
            {{ $filters.formatPrice(slotProps.data.birimFiyat) }}
          </template>
        </Column>
        <Column field="satisToplam" header="Toplam">
          <template #body="slotProps">
            {{ $filters.formatPrice(slotProps.data.satisToplam) }}
          </template>
          <template #footer>
            {{ $filters.formatPrice(getProductionsListTotal.productPriceSum) }}
          </template>
        </Column>
    </DataTable>



     <DataTable 
    class="p-datatable-sm"

        tableStyle="width:100%;"
        style="font-size: 55%"
        :value="productionsList" 
        rowGroupMode="rowspan"
        :groupRowsBy="groups"
        sortMode="single"
        sortField="groups"
        :sortOrder="1"
        :globalFilterFields="['musteriAdi', 'siparisNo', 'urunAdi', 'en', 'boy', 'kenar', 'tedarikciAdi', 'operasyon', 'icerik']"
        v-model:filters="filters"
        filterDisplay="row"
        scrollable 
        scrollHeight="650px"
        v-model:selection="selectedSiparis"
        selectionMode="single"
        @row-select="siparisSecim($event)"
        @filter="productFilterEvent($event)"
        :rowStyle="rowStyle"
        v-else
      >
          <template #header>
              <div class="row" style="height:25px;">
                <div class="col-9">
                  <h5>{{ title }}</h5>
                </div>
                <div class="col-3" style="margin-top:-6px;">
                  <div class="flex justify-content-between ">
                    <span class="p-input-icon-left">
                      <input v-model="filters['global'].value" type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1">
                    </span>
                  </div>
                </div>
              </div>
            
            </template>
          <Column field="tarih" header="Tarih" ></Column>
          <Column field="musteriAdi" header="Kime" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
          >
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="link" :header="getProductStatusId == 3 ? 'CI' : 'PI'">
            <template #body="slotProps">
               <Button
                  type="button"
                  :disabled="getProductStatusId == 2
                      ? slotProps.data.evrak != 0
                        ? false
                        : true
                      : slotProps.data.evrakc != 0
                        ? false
                        : true
                    "
                  @click="proformaDowload(slotProps.data.link, 'Proforma')"
                  class="pi pi-cloud-download"
                  style="margin-right: 0.5em"
                ></Button>
            </template>
          </Column>
          <Column 
                  field="siparisNo"
                  header="PO" 
                  :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
                  :filterMenuStyle="{ width: '14rem' }"
          >
            <template #body="slotProps">
              <div :style="{'color':slotProps.data.isf_alis_fiyati_durum }">
                {{ slotProps.data.siparisNo }}

              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                  <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
              </template>
          </Column>
          <Column field="urunAdi" header="Ürün" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
          :filterMenuStyle="{ width: '14rem' }">

            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
          </Column>
          <Column field="icerik" header="İçerik" headerStyle="width:150px;" bodyStyle="width:150px;">
            <template #body="slotProps" >
              <div style="width:340px;">
              {{ slotProps.data.icerik }}
              </div>
            </template>
          </Column>
          <Column field="en" header="E" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false" 
        
          :filterMenuStyle="{ width: '14rem' }" headerStyle="width:30px;" bodyStyle="width:30px;"> 
            <template #body="slotProps">
              <div style="width:30px;">
                {{ slotProps.data.en }}
              </div>
            </template>
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="boy" header="B" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
           :filterMenuStyle="{ width: '14rem' }">
            <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template>
          </Column>
          <Column field="kenar" header="K" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
          :filterMenuStyle="{ width: '14rem' }">
            <template #filter="{ filterModel, filterCallback }">
                      <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                  </template>
          </Column>
          <Column field="tedarikciAdi" header="Kimden" 
          :showFilterMenu="false"
                  :showFilterOperator="false"
                  :showClearButton="false"
                  :showApplyButton="false"
                  :showFilterMatchModes="false"
                  :showAddButton="false"
          :filterMenuStyle="{ width: '14rem' }">
            <template #body="slotProps">
                <div :style="{
                  backgroundColor: slotProps.data.urunDurumRenk,
                  color:
                    slotProps.data.urunDurumRenk != 'transparent' &&
                      getProductStatusId == 2
                      ? 'white'
                      : 'black',
                }">
                  {{ slotProps.data.tedarikciAdi }}
                </div>
            </template>
          
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" style="width:50px;" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
          </Column>
          <Column field="siparisMiktari" header="M">
            <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.amount) }}
            </template>
          </Column>
          <!-- <Column field="adet" header="A">
          <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.piece) }}
            </template>
        </Column>
        <Column field="mt2" header="M2">
          <template #footer>
              {{ $filters.formatDecimal(getProductionsListTotal.m2) }}
            </template>
        </Column> -->
          <Column field="birim" header="B"></Column>
          <Column field="uretimMiktari" header="Üretim">
            <template #footer>
                {{ $filters.formatDecimal(getProductionsListTotal.production) }}
              </template>
          </Column>
          <Column field="ton" header="Ton">
            <template #footer>
                  {{ $filters.formatDecimal(getProductionsListTotal.ton) }}
                </template>
          </Column>
          <Column field="birimFiyat" header="F">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.birimFiyat) }}
            </template>
          </Column>
          <Column field="satisToplam" header="Toplam">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.satisToplam) }}
            </template>
            <template #footer>
              {{ $filters.formatPrice(getProductionsListTotal.productPriceSum) }}
            </template>
          </Column>
      </DataTable>






    <Dialog v-model:visible="product_detail_form" :header="po" modal :style="{ width: '100vw' }" :closeOnEscape="false" :closable="false"> 
        <orderForm :po="po"/>
    </Dialog>

</template>
<script>
import orderForm from './orderForm.vue';

import { useProductionsStore } from '../../stores/productions';
import { useLoadingStore } from '../../stores/loading';
import { useProductCostStore } from '../../stores/productcost';
import { mapState } from 'pinia';
import { FilterMatchMode } from "primevue/api";
import { productionsService } from '../../services/productions';
import { socket } from '../../services/customServices/realTimeService';
export default {
    props: ['title'],
    computed: {
      ...mapState(useProductionsStore, [
        'productionsList',
        'productionsDetailModel',
        'getProductStatusId',
        'getProductionsListTotal'
      ]),


  },
  components: {
    orderForm
  },
    
    data() {
      return {
            product_detail_form:false,
            po:"",
            selectedSiparis:[],
            groups: [ "siparisNo", "musteriAdi", "tarih", "link"],
            filters: {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                musteriAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparisNo: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                urunAdi: { value: null, matchMode: FilterMatchMode.CONTAINS },
                en: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                boy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kenar: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                tedarikciAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },


            }
        }
    },
  methods: {
    rowStyle(event) {
      if (event.operasyon == 'semih' && event.operasyon == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2' ,'border':'1px solid black'};
      } else if (event.operasyon == 'hakan' && event.operasyon == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2' , 'border': '1px solid black' };
      } else if (event.operasyon == 'ozlem' && event.operasyon == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2' , 'border': '1px solid black' };
      } else if (event.temsilci == 'hakan' && event.temsilci == localStorage.getItem('username').toLowerCase()) {
        return {'backgroundColor':'#d1e0f2' , 'border': '1px solid black' }
      } else if (event.temsilci == 'semih' && event.temsilci == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2' , 'border': '1px solid black' };
      } else if (event.temsilci == 'ozlem' && event.temsilci == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2', 'border': '1px solid black' };
      } else if (event.operasyon == 'gizem' && event.operasyon == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2', 'border': '1px solid black' };
      } else if (event.temsilci == 'gizem' && event.temsilci == localStorage.getItem('username').toLowerCase()) {
        return { 'backgroundColor': '#d1e0f2', 'border': '1px solid black' };
      } else{
        return { 'border': '1px solid black' };
      }
    },
    siparisSecim(event) {
      useLoadingStore().begin_loading_act();
      useProductionsStore().productions_new_button_load_act(false);
      this.po = event.data.siparisNo;
      useProductCostStore().masraflarResetAct();
      productionsService.getOrderDetail(event.data.siparisNo).then(data => {
        useProductionsStore().product_detail_cost_list(data.costList);
        useProductionsStore().product_total_load_act(data.productList);
        useProductionsStore().productions_detail_model_load_act(data.productList);
        useProductionsStore().product_detail_check_list(data.checkList);
        useProductionsStore().product_detail_document_list(data.documentList);
        useProductionsStore().products_detail_supplier_list(data.supplierList);
        useProductionsStore().products_supplier_delivery_list(data.supplierDeliveryList);
        useProductionsStore().products_supplier_invoice_list(data.supplierInvoiceList);
        useProductionsStore().product_detail_order_information_load_act(data.orderInformationList);
        useProductionsStore().product_detail_users_list_load_act(data.usersList);
        useProductionsStore().product_detail_chat_list_load_act(data.chatList);
        useProductionsStore().products_save_button_status_load_act(true);
        this.product_detail_form = true;
        useLoadingStore().end_loading_act();

      });
          
    },
    proformaDowload(proformaLink,folderName) {
      const link = document.createElement("a");
      link.href = proformaLink;
      link.setAttribute("download", `${folderName}.pdf`);
      document.body.appendChild(link);
      link.click();
    },
    productFilterEvent(event) {
      useProductionsStore().products_total_datatable_load_act(event.filteredValue);
    },
  },

  mounted() {
    this.emitter.on('products_closed_dialog', () => {
      this.product_detail_form = false;
    });
    socket.socketIO.on('products_detail_update_on', (po) => {
      useLoadingStore().begin_loading_act();
      useProductionsStore().productions_new_button_load_act(false);
      productionsService.getOrderDetail(po).then(data => {
        useProductionsStore().product_detail_cost_list(data.costList);
        useProductionsStore().product_total_load_act(data.productList);
        useProductionsStore().productions_detail_model_load_act(data.productList);
        useProductionsStore().product_detail_check_list(data.checkList);
        useProductionsStore().product_detail_document_list(data.documentList);
        useProductionsStore().products_detail_supplier_list(data.supplierList);
        useProductionsStore().products_supplier_delivery_list(data.supplierDeliveryList);
        useProductionsStore().products_supplier_invoice_list(data.supplierInvoiceList);
        useProductionsStore().product_detail_order_information_load_act(data.orderInformationList);
        useProductionsStore().product_detail_users_list_load_act(data.usersList);
        useProductionsStore().product_detail_chat_list_load_act(data.chatList);
        useProductionsStore().products_save_button_status_load_act(true);
        useLoadingStore().end_loading_act();

      });
    })
  }
}
</script>
