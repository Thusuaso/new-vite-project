<template>
    <div class="container">
        <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    :value="getTodoListAll.yapilmadi.yapilmadiA" 
                    style="font-size:85%;"
                    v-model:filters="filtersNotTodo"
                    filterDisplay="row"
                    scrollable 
                    scrollHeight="650px"
                    selectionMode="single"
                    v-model:selection="selectedTodo"
                    @row-click="todoSelected($event)"
                    sortField="aciliyet" :sortOrder="-1"
                    :rowStyle="rowStyle"
                    :globalFilterFields="['ortak_gorev', 'yapilacak',]"
                >
                <template #header>
                    <div class="flex justify-content-between">
                        Yapılacaklar
                        <span class="p-input-icon-right">
                            <i class="pi pi-search" />
                            <InputText v-model="filtersNotTodo['global'].value" placeholder="Genel Arama" />
                        </span>
                    </div>
                </template>
                <Column 
                        field="ortak_gorev" 
                        header="Görev Sahibi"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="yapilacak" header="Görev"></Column>
                <Column header="Durum" v-if="userId == 10">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-warning" @click="status(slotProps.data.id)">Yapıldı</button>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
    <div class="row mt-3">

        <div class="col">
            <DataTable 
                    :value="getTodoListAll.yapilmadi.yapilmadiC" 
                    style="font-size:85%;"
                    v-model:filters="filtersNotTodo"
                    filterDisplay="row"
                    scrollable scrollHeight="650px"
                    selectionMode="single"
                    v-model:selection="selectedTodo"
                    @row-click="todoSelected($event)"
                    sortField="aciliyet" :sortOrder="-1"
                    :rowStyle="rowStyle3"
                    :globalFilterFields="['ortak_gorev', 'yapilacak',]"
                >
                <template #header>
                    Mail Bölümü
                </template>
                <Column 
                        field="ortak_gorev" 
                        header="Görev Sahibi"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="yapilacak" header="Görev"></Column>
                <Column header="Durum" v-if="userId == 10">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-warning" @click="status(slotProps.data.id)">Yapıldı</button>
                    </template>
                </Column>

            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-5 mb-5">
        <div class="col">
            <DataTable 
                    :value="getTodoListAll.yapildi" 
                    style="font-size:85%;"
                    v-model:filters="filtersTodo"
                    filterDisplay="row"
                    scrollable scrollHeight="450px"
                >
                <template #header>
                    Yapılanlar
                </template>
                <Column 
                    field="girisTarihi" 
                    header="Giriş Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                
                >
                <template #body="slotProps">
                            {{ $filters.formatDate(slotProps.data.girisTarihi) }}
                        </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column 
                    field="yapildiTarihi" 
                    header="Yapıldı Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                <template #body="slotProps">
                    {{ slotProps.data.yapildiTarihi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                </template>
                </Column>
                <Column 
                        field="ortak_gorev"
                        header="Görev Sahibi"
                        :showFilterMenu="false"
                        :showFilterOperator="false"
                        :showClearButton="false"
                        :showApplyButton="false"
                        :showFilterMatchModes="false"
                        :showAddButton="false"
                    >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column field="yapilacak" header="Görev"></Column>
                <Column 
                    field="oncelik" 
                    header="Öncelik"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"/>
                    </template>
                </Column>
                <Column header="Status" v-if="userId == 10">
                    <template #body="slotProps">
                    <button type="button" class="btn btn-danger" @click="status2(slotProps.data.id)">Yapılmadı</button>

                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
    </div>


    <Dialog v-model:visible="to_do_list_form" header="" modal>
        <div class="row">
            <div class="col mt-3">
                <span class="p-float-label w-100">
                <AutoComplete id="users" v-model="selectedUser" multiple :suggestions="filteredUsers" optionLabel="username" @complete="searchUsers($event)" @item-select="usersSelected($event)"/>
                <label for="users">Görev Sahibi</label>
            </span>
                <span class="p-float-label mt-4">
                        <Dropdown id="priority" v-model="selectedPriority" :options="priorities" optionLabel="priority"  class="w-100" @change="prioritiesSelectedChange($event)"/>
                        <label for="priority">Öncelik</label>
                    </span>

            </div>
            <div class="col">
                <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:200px;" v-model="selectedTodo.yapilacak"></textarea>
                <label for="floatingTextarea2">Comments</label>
                </div>
            </div>
            
            <div class="flex align-items-center mb-3">
                <Checkbox v-model="selectedTodo.aciliyet" inputId="ingredient1" :binary="true" class="mr-2" style="margin-right:10px;"/>
                <label for="ingredient1" class="ml-3"> Acil</label>
            </div>

        </div>
        <div class="row">
            <div class="col">
                <button class="btn btn-success" @click="update" type="button" :disabled="update_to_do_disabled">Güncelle</button>
            </div>
            <div class="col">
                <button class="btn btn-danger" @click="deleteTodo(selectedTodo.id)" type="button" v-if="userId == 10">Sil</button>
            </div>
        </div>
    </Dialog>
</template>
<script>
import { useTodoStore } from '../stores/todo';
import { useLoadingStore } from '../stores/loading';
import { localDateService } from '../services/localDateService';

import { mapState } from 'pinia';

import { FilterMatchMode } from 'primevue/api';
import { todoService } from '../services/todoService';
import { socket } from '../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useTodoStore, [
            'getTodoListAll'
        ])
    },
    data() {
        return {
            filteredUsers:null,
            statusPriority:false,
            userId:0,
            update_to_do_disabled:false,
            selectedPriority:{},
            priorities: [
                { 'id': 1, 'priority': 'A' },
                { 'id': 2, 'priority': 'B' },
                { 'id': 3, 'priority': 'C' },
            ],
            users:[],
            selectedUser:[],
            to_do_list_form:false,
            selectedTodo:{},
            filtersNotTodo: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ortak_gorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            },
            filtersTodo: {
                girisTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yapildiTarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ortak_gorev: { value: null, matchMode: FilterMatchMode.CONTAINS },
                oncelik: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },

            },
            ortakUser:'',
        }
    },
    created(){
        todoService.getUsersList().then(data => {
                this.users = data;
            });  
    },
    methods: {
        usersSelected(){
            this.ortakUser = '';
          this.selectedUser.forEach(x=>{
            this.ortakUser += x.username + ",";
          }); 
        },
        searchUsers(event){
            let results;
            if(event.query.length == 0){
                results = this.users;
            } else{
                results = this.users.filter(x=>{
                    return x.username.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredUsers = results;  
        },
        deleteTodo(id){
            if (confirm('Silmek istediğinize emin misiniz?')) {
                useLoadingStore().begin_loading_act();
                todoService.deleteTodo(id).then(data => {
                    if (data.status) {
                        socket.socketIO.emit('to_do_list_emit');
                        socket.socketIO.emit('to_do_list_emit_all');
                        this.to_do_list_form = false;
                        useLoadingStore().end_loading_act();
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    } else {
                        useLoadingStore().end_loading_act();
                        this.$toast.add({ severity: 'danger', detail: 'Silme Başarısız', life: 3000 });
                    };
                });
            }  
        },
        rowStyle3(event){
          return event.aciliyet ? 'border:3px solid red':''  
        },
        rowStyle2(event){
          return event.aciliyet ? 'border:3px solid red':''  
        },
        rowStyle(event){
          return event.aciliyet ? 'border:3px solid red':''  
        },
        status2(event){
            const value = {
                    'id': event,
                    'status': 0,
                    'yapildiTarihi': '',
                };
            todoService.updateTodo(value).then(data=>{
                if(data.status){
                    socket.socketIO.emit('to_do_list_emit_all');

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                }
            })
        },
        status(event){
            const value = {
                    'id': event,
                    'status': 1,
                    'yapildiTarihi': localDateService.getDateString(new Date()),
                };
            todoService.updateTodo(value).then(data=>{
                if(data.status){
                    socket.socketIO.emit('to_do_list_emit_all');

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                }
            })
        },
        update() {
            this.update_to_do_disabled = true;
            let ortak_users = '';
            this.selectedUser.forEach(x=>{

                    ortak_users += x.username + ","; 
            });
            this.selectedTodo.ortak_gorev = ortak_users.slice(0,-1);
            todoService.update(this.selectedTodo).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_list_emit_all');
                    this.to_do_list_form = false;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                    this.update_to_do_disabled = false;
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });

                }
            })
        },
        prioritiesSelectedChange(event) {
            this.selectedTodo.oncelik = event.value.priority;
        },
        usersSelectedChange(event) {
            this.selectedTodo.gorev_sahibi_id = event.value.id;
            this.selectedTodo.gorev_sahibi_adi = event.value.username;
        },
        todoSelected(event) {
            this.to_do_list_form = true;
            todoService.getUsersList().then(data => {
                this.users = data;
                const val = event.data.ortak_gorev.split(',');
                
                this.selectedUser = [];
                val.forEach(x=>{
                    if(x == '' || x == ' ' || x == null){
                        console.log('')
                    } else{
                        this.selectedUser.push(this.users.find(y=>y.username == x.trim()));
                        
                    }
                })


                // this.selectedUser = data.find(x=>x.id == event.data.gorev_sahibi_id)

            });
            this.selectedPriority = this.priorities.find(x => x.priority == event.data.oncelik);
            this.selectedTodo.aciliyet = event.data.aciliyet;
        }
    },
    mounted() {
        this.userId = localStorage.getItem('userId');
        socket.socketIO.on('to_do_list_on_all', () => {
             useLoadingStore().begin_loading_act();
            todoService.getAllList().then(data => {
                useTodoStore().to_do_list_all_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })
    }
}
</script>