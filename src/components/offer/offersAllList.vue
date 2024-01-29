 <template>
        <DataTable 
                     v-model:value="getOffersAllList" 
                     paginator 
                     :rows="15"
                     v-model:filters="filters"
                     filterDisplay="row"
                     v-model:selection="selectedOffers"
                     selectionMode="single"
                     @row-click="offersSelected($event)"
                     scrollable scrollHeight="400px"

                 >
                     <Column 
                             field="teklifno" 
                             header="Teklif No"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                     >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="tarih" 
                             header="Tarih"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                     >
                         <template #body="slotProps">
                             {{ slotProps.data.tarih }}
                         </template>
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column
                              field="musteriadi" 
                              header="Müşteri"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                
                     >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="ulkeadi" 
                             header="Ülke"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="kategoriadi" 
                             header="Kategori"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="urunadi" 
                             header="Ürün"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="islemadi" 
                             header="Yüzey"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="enboy" 
                             header="EnxBoy"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                        
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="kalinlik" 
                             header="Kalınlık"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"
                        
                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column 
                             field="kullaniciadi" 
                             header="Kullanıcı"
                             :showFilterMenu="false"
                             :showFilterOperator="false"
                             :showClearButton="false"
                             :showApplyButton="false"
                             :showFilterMatchModes="false"
                             :showAddButton="false"

                         >
                         <template #filter="{ filterModel, filterCallback }">
                             <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                         </template>
                     </Column>
                     <Column field="fobfiyat" header="Fiyat"></Column>
                     <Column field="birim" header="Birim"></Column>
        </DataTable>

    <Dialog v-model:visible="offer_detail_form" header="" modal :style="{ width: '100vw' }" :closeOnEscape="false">
        <offerForm/>
    </Dialog>
 </template>
 <script>
 import { useOfferStore } from '../../stores/offer';
 import { useLoadingStore } from '../../stores/loading';
 import { mapState } from 'pinia';

 import { offerService } from '../../services/offerService';

 import { FilterMatchMode } from 'primevue/api';

 import offerForm from '../../components/offer/offerForm.vue';
 export default {
     components: {
        offerForm
      },
     computed: {
          ...mapState(useOfferStore, [
                'getOffersAllList',
           ])
     },
     data() {
          return {
               filters: {
                   teklifno: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   tarih: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   musteriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   ulkeadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   kategoriadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   urunadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   islemadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   enboy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   kullaniciadi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                   kalinlik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
               },
               selectedOffers: {},
               offer_detail_form:false,
           }
     },
     methods: {
          offersSelected(event) {
              useLoadingStore().begin_loading_act();
              offerService.getOfferDetail(event.data.teklifid).then(data => {
                  useOfferStore().offer_form_model_list_load_act(data);
                  useOfferStore().offer_new_button_load_act(false);
                  this.offer_detail_form = true;
                  useLoadingStore().end_loading_act();

              });

          },
      }
 }
 </script>