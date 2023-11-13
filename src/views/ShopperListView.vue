<template>
    <div class="row m-auto" v-if="!getMobile">
        <div class="col">
            <button type="button" class="btn btn-success" @click="newCustomer">Yeni</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-primary" @click="excel_cikti_al_click">Excel</button>
        </div>
        <div class="col">
            <AutoComplete placeholder="Po ile Müşteri Ara" v-model="selectedPo" :suggestions="filteredShopperPoList" optionLabel="po" @complete="searchPo($event)" @item-select="poSelected($event)" @clear="clearPo($event)"/>
        </div>
    </div>
    <div class=" m-auto" v-if="getMobile">
        <div class="">
            <button type="button" class="btn btn-success w-100 mb-3" @click="newCustomer">Yeni</button>
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click="excel_cikti_al_click">Excel</button>
        </div>
        <div class="w-100">
            <span class="p-float-label w-100">
                <AutoComplete inputId="ac" class="w-100 mb-3"  v-model="selectedPo" :suggestions="filteredShopperPoList" optionLabel="po" @complete="searchPo($event)" @item-select="poSelected($event)" @clear="clearPo($event)"/>

                <label for="ac">Po ile Müşteri Ara</label>
            </span>

        </div>
    </div>


    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="filteres_shopper_list_form ? filteredShopperList : getShopperList" 
                paginator 
                :rows="15"
                sortField="sira"
                :sortOrder="-1"
                v-model:filters="filters"
                filterDisplay="row"
                v-model:selection="selectedShopper"
                selectionMode="single"
                @row-click="shopperSelected($event)"
                style="font-size:85%;"
            >
            <Column field="sira" header="#"></Column>
            <Column 
                field="id" 
                header="Id"
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
                field="unvan" 
                header="Firma"
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
            <Column field="adres" header="Adres"></Column>
            <Column 
                field="marketing" 
                header="Marketing"
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
            <Column field="logo" header="Logo">
                <template #body="slotProps">
                    <img :src="slotProps.data.logo"/>
                </template>
            </Column>
            <Column 
                field="temsilci" 
                header="Temsilci"
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
                field="satisci" 
                header="Satışçı"
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
            <Column field="devir" header="Devir">
                <template #body="slotProps">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.devir" disabled>
                </template>
            </Column>
            <Column field="ozel" header="Özel">
                <template #body="slotProps">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="slotProps.data.ozel" disabled>
                </template>
            </Column>


            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="is_shopper_form" header="" modal :style="{'width':'100vw'}">
        <shopperForm/>
    </Dialog>
</template>
<script>
import { useShopperStore } from '../stores/shopper';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import {useLocalStore} from '../stores/local';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';

import { shopperService } from '../services/shopperService';
import { socket } from '../services/customServices/realTimeService';

import form from '../components/shopper/form.vue';

export default {
    computed: {
        ...mapState(useShopperStore, [
            'getShopperList',
            'getShopperPoList',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ]),
        ...mapState(useLocalStore,[
            'getLocalServiceUrl'
        ])
    },
    components: {
        shopperForm: form,
        
    },
    data() {
        return {
            filters: {
                id: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                musteriadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                unvan: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                marketing: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                ulkeadi: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                temsilci: { value: null, matchmode: FilterMatchMode.STARTS_WITH },
                satisci: { value: null, matchmode: FilterMatchMode.STARTS_WITH }, 
            },
            is_shopper_form: false,
            selectedShopper: {},
            selectedPo: null,
            filteredShopperPoList: [],
            filteredShopperList: [],
            filteres_shopper_list_form:false,
        }
    },
    methods: {
        excel_cikti_al_click(){
            shopperService.getMusteriExcelListesi(this.getShopperList).then(response => {
                            
                if(response.status){
                        const link = document.createElement('a')
                        link.href = this.getLocalServiceUrl + 'musteriler/dosya_islemleri/excelMusterilerDetayListesi' 
                        link.setAttribute('download','musteri_listesi.xlsx')
                        document.body.appendChild(link)
                        link.click()
                }
            })
        },
        clearPo(event) {
            this.filteres_shopper_list_form = false;
            this.filteredShopperList = [];
        },
        poSelected(event) {
            this.filteres_shopper_list_form = true;
            this.filteredShopperList = [];
            this.filteredShopperList.push(this.getShopperList.find(x => x.id == event.value.id));
        },
        searchPo(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getShopperPoList;
            } else {
                result = this.getShopperPoList.filter(x => {
                    return x.po.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredShopperPoList = result;
        },
        shopperSelected(event) {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperDetail(event.data.id).then(data => {
                useShopperStore().shopper_new_button_load_act(false);
                useShopperStore().shopper_model_load_act(data);
                useLoadingStore().end_loading_act();
                this.is_shopper_form = true;
            })
            
        },
        newCustomer() {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperModel().then(data => {
                useShopperStore().shopper_model_load_act(data);
                this.is_shopper_form = true;
                useShopperStore().shopper_new_button_load_act(true);
                useLoadingStore().end_loading_act();
            })
        }
    },
    mounted() {
        socket.socketIO.on('shopper_update_list_on', () => {
            useLoadingStore().begin_loading_act();
            shopperService.getShopperList().then(data => {
                useShopperStore().shopper_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        }),
            this.emitter.on('close_dialog', () => {
                this.is_shopper_form = false;
            })
    }
}
</script>
<style scoped>

</style>