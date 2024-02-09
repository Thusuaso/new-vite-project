<template>
    <div>
        <button type="button" class="btn btn-success w-100" @click="newCreateSize">New</button>
        <DataTable 
            :value="getcreateSizeList" 
            tableStyle="min-width: 50rem"
            v-model:filters="filters"
            filterDisplay="row"
            v-model:selection="selectedCreateSize"
            @row-select="isCreateRowSelected($event)"
            selectionMode="single"
        >
            <Column field="tedarikci_adi" header="Supplier">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                </template>
            </Column>
            <Column field="ebat" header="Stone Size">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                </template>
            </Column>
            <Column field="kasa_olculeri" header="Crate Size">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"  />
                </template>
            </Column>
            <Column field="adet" header="Piece">
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
        </DataTable>
    </div>
    <Dialog v-model:visible="create_size_form" header="New Crate Size" modal> 
        <div class="row">
            <div class="col">
                <AutoComplete v-model="tedarikci" :suggestions="filteredTedarikci" optionLabel="firmaAdi" @complete="searchTedarikci($event)" @item-select="selectedTedarikci($event)" placeholder="Tedarikçi" />
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Stone Size</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="createSize.ebat">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Crate Size</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="createSize.kasa_olculeri">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Piece</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="createSize.adet">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="saveProcess">Save</button>
            </div>
            <div class="col" v-if="!is_new_button_selected">
                <button type="button" class="btn btn-danger w-100" @click="deleteProcess">Delete</button>

            </div>

        </div>
    </Dialog>
</template>
<script>
import {useReportsStore} from '../stores/reports';
import {useProductionsStore} from '../stores/productions'
import {useLoadingStore} from '../stores/loading';
import {mapGetters} from 'pinia';
import { FilterMatchMode } from 'primevue/api';
import {reportsService} from '../services/reportsService';
import {socket} from '../services/customServices/realTimeService';
export default {
    computed:{
        ...mapGetters(useReportsStore,['getcreateSizeList']),
        ...mapGetters(useProductionsStore,['getProductSupplierList'])
    },
    data(){
        return{
            is_new_button_selected:false,
            selectedCreateSize:{},
            tedarikciList:[],
            tedarikci:null,
            filteredTedarikci:null,
            create_size_form:false,
            createSize:{
                tedarikci_adi:null,
                tedarikci:null,
                ebat:null,
                kasa_olculeri:null,
                adet:null,
            },
            filters:{
                tedarikci_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ebat: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                kasa_olculeri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                adet: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            }
        }
    },
    methods:{
        deleteProcess(){
            reportsService.setCreateSizeDelete(this.createSize.id).then(response=>{
                if(response.status){
                    socket.socketIO.emit('create_size_list_update_emit');
                    this.create_size_form = false;
                    this.$toast.add({severity:'success',detail:'Başariyla Silindi.',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Silme İşlemi Başarısız',life:3000});
                }
            })
        },
        isCreateRowSelected(event){
          this.createSize = event.data;
          this.tedarikci = this.getProductSupplierList.find(x=>x.id == event.data.tedarikci);
          this.create_size_form = true;
          this.is_new_button_selected = false;

        },
        saveProcess(){
            if(this.is_new_button_selected){
                this.save();
            }else{
                this.update();
            }
        },
        update(){
            reportsService.setCreateSizeUpdate(this.createSize).then(response=>{
                if(response.status){
                    socket.socketIO.emit('create_size_list_update_emit');
                    this.create_size_form = false;

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                };
            }); 
        },
        save(){
            reportsService.setCreateSizeSave(this.createSize).then(response=>{
                if(response.status){
                    socket.socketIO.emit('create_size_list_update_emit');
                    this.create_size_form = false;

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});

                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                };
            });
        },
        selectedTedarikci(event){
          this.createSize.tedarikci = event.value.id;
          this.createSize.tedarikci_adi = event.value.firmaAdi;
        },
        newCreateSize(){
            this.createSize = {
                tedarikci_adi:null,
                tedarikci:null,
                ebat:null,
                kasa_olculeri:null,
                adet:null,
            };
            this.tedarikci = null;
            this.create_size_form = true;
            this.is_new_button_selected = true;
            
        },
        searchTedarikci(event){
            let result;
            if(event.query.lenght ==0){
                result = this.getProductSupplierList;
            }else{
                result = this.getProductSupplierList.filter(x=>x.firmaAdi.toLowerCase().startsWith(event.query.toLowerCase()));
            }
            this.filteredTedarikci = result;
        }
    },
    mounted(){
        socket.socketIO.on('create_size_list_update_on',()=>{
            useLoadingStore().end_loading_act();
            reportsService.getCreateSizeList().then(create=>{
                useReportsStore().create_size_list_load_act(create);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>