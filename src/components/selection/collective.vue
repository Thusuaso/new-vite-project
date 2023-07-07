<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <AutoComplete placeholder="Po" class="w-100" v-model="selectedOrder" :suggestions="orderList" @complete="orderSearch($event)" optionLabel="name" @item-select="orderItemSelected($event)" />
        </div>
        <div class="col">
            <Dropdown v-model="selectedProduct" :options="productList" placeholder="Ürün Seçiniz" optionLabel="product_full_name"  />
        </div>
        <div class="col">
            <button type="button" class="btn btn-success" @click="save">Kasaları Ata</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    v-model:selection="selectedCrate" 
                    :value="getSelectionCollectiveList" 
                    dataKey="id" 
                    tableStyle="min-width: 50rem"
                    v-model:filters="filters"
                    filterDisplay="row"
                    paginator 
                    :rows="10"
                >
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column 
                        field="kasa_no" 
                        header="Kasa No"
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
                        field="kategori" 
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
                        field="kenarislem" 
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
                        field="en" 
                        header="En"
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
                        field="boy" 
                        header="Boy"
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
                        field="kenar" 
                        header="Kenar"
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
                <Column field="birim_id" header="Birim">
                    <template #body="slotProps">
                        <div v-if="slotProps.data.birim_id == 1">
                            M2
                        </div>
                        <div v-else-if="slotProps.data.birim_id == 2">
                            Adet
                        </div>
                        <div v-else-if="slotProps.data.birim_id == 3">
                            MTL
                        </div>
                    </template>
                </Column>
                <Column field="miktar" header="Miktar">
                    <template #body="slotProps">
                        {{ $filters.formatDecimal(slotProps.data.miktar) }}
                    </template>
                </Column>
                <Column 
                        field="siparisaciklama" 
                        header="Po"
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




            </DataTable>
        </div>
    </div>
    
</template>
<script>
import { useSelectionStore } from '../../stores/selection';
import {useLoadingStore} from '../../stores/loading';
import {mapState} from 'pinia';

import {selectionService} from '../../services/selectionService';

import {FilterMatchMode} from 'primevue/api';

import {socket} from '../../services/customServices/realTimeService';
export default {
    computed:{
        ...mapState(useSelectionStore,[
            'getOrderList',
            'getSelectionCollectiveList'
        ])
    },
    data(){
        return{
            orderList:[],
            selectedOrder:null,
            productList:[],
            selectedProduct:null,
            selectedCrate:[],
            filters:{
                kasa_no:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                kategori:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                urunadi:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                kenarislem:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                en:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                boy:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                kenar:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
                siparisaciklama:{value:null,matchMode:FilterMatchMode.STARTS_WITH},
            
            
            
            },

        }
    },
    methods:{
        reset(){
          this.selectedOrder = null;
          this.selectedProduct = null;
          this.selectedCrate = [];  
        },
        save(){
            if(this.selectedOrder == null || this.selectedProduct == null){
                alert('Lütfen po ve ürün bilgisini seçiniz.');
                return;
            };
            const data = {
                'po': this.selectedOrder.name,
                'products': this.selectedCrate,
                'product_id': this.selectedProduct.product_id
            }
            if(confirm('Gerçekten atamak istiyor musunuz?')){
                useLoadingStore().begin_loading_act();
                selectionService.setCollectiveCrate(data).then(data=>{
                   if(data.status){
                        socket.socketIO.emit('selection_update_emit');
                        this.reset();
                        useLoadingStore().end_loading_act();
                        this.$toast.add({severity:'success',detail:'Başarıyla Atandı',life:3000});
                    } else{
                        useLoadingStore().end_loading_act();
                        this.$toast.add({severity:'error',detail:'Atama Başarısız',life:3000});
                    }
                });
            }
        },
        orderSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getOrderList;
            }
            else {
                result = this.getOrderList.filter((x) => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            }
            this.orderList = result;
        },
        orderItemSelected(event){
            selectionService.getCollectiveProductList(event.value.name).then(data=>{
                this.productList = data.productList
;            });
        }
    }
    
}
</script>
<style scoped>

</style>