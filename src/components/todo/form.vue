<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 150px;width:350px;padding-top:35px;" v-model="getModel.yapilacak"></textarea>
                <label for="floatingTextarea2">To Do</label>
            </div>
        </div>
        <div class="col">
            <span class="p-float-label w-100">
                <AutoComplete id="users" v-model="selectedUser" multiple :suggestions="filteredUsers" optionLabel="username" @complete="searchUsers($event)" @item-select="usersSelected($event)"/>
                <label for="users">To Do Owner</label>
            </span>
        </div>
        <div class="col">
            <span class="p-float-label w-100">
                <Dropdown id="priority" v-model="selectedPriority" :options="priorities" optionLabel="priority" class="w-100" @change="prioritySelected($event)"/>
                <label for="priority">Priority</label>
            </span>
        </div>
        <div class="col">
            <div class="flex align-items-center mb-3">
                <Checkbox v-model="getModel.aciliyet" inputId="ingredient1" :binary="true" class="mr-2" style="margin-right:10px;"/>
                <label for="ingredient1" class="ml-3"> Urgent</label>
            </div>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="process" :disabled="to_do_save_disabled">Save</button>
        </div>
    </div>
</template>
<script>
import { useTodoStore } from '../../stores/todo';
import { useLoadingStore } from '../../stores/loading';

import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { todoService } from '../../services/todoService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useTodoStore, [
            'getModel',
            'getUsersList',
            'getTodoNewButton'
        ])
    },
    data() {
        return {
            priorities: [
                { 'id': 1, 'priority': 'A' },
                { 'id': 2, 'priority': 'B' },
                { 'id': 3, 'priority': 'C' },
            ],
            selectedPriority: {},
            selectedUser: [],
            to_do_save_disabled:false,
            aciliyet:false,
            filteredUsers:null,
            ortakUser:'',
            users:[],
        }
    },
    created() {
        if (!this.getTodoNewButton) {
            this.todoCreatedProcess();
        }
    },
    methods: {
        usersSelected(event){
          this.ortakUser = '';
          this.selectedUser.forEach(x=>{
            this.ortakUser += x.username + ",";
          }); 
        },
        searchUsers(event){
            let results;
            if(event.query.length == 0){
                results = this.getUsersList;
            } else{
                results = this.getUsersList.filter(x=>{
                    return x.username.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredUsers = results;
        },
        todoCreatedProcess() {
            this.selectedPriority = this.priorities.find(x => x.priority == this.getModel.oncelik);
                const val =this.getModel.ortak_gorev.split(',');
                
                this.selectedUser = [];
                val.forEach(x=>{
                    if(x == '' || x == ' ' || x == null){
                        console.log('')
                    } else{
                        this.selectedUser.push(this.getUsersList.find(y=>y.username == x.trim()));
                        
                    }
                })

        },
        process() {
            if (this.getTodoNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        save() {
            this.to_do_save_disabled = true;
            useLoadingStore().begin_loading_act();
            this.getModel.gorev_veren_id = localStorage.getItem('userId');
            this.getModel.gorev_veren_adi = localStorage.getItem('username');
            this.getModel.girisTarihi = localDateService.getDateString(new Date());
            let ortakusers = '';
            this.selectedUser.forEach(x=>{
                ortakusers += x.username + ",";
            }); 
            this.getModel.ortak_gorev = ortakusers.slice(0,-1);
            todoService.save(this.getModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_list_emit');
                    socket.socketIO.emit('to_do_list_emit_all');
                    socket.socketIO.emit('to_do_main_list_emit_all');

                    this.reset();
                    this.to_do_save_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.to_do_save_disabled = false;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'danger', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        update() {
            
            useLoadingStore().begin_loading_act();
            let ortakusers = '';
            this.selectedUser.forEach(x=>{
                ortakusers += x.username + ",";
            }); 
            this.getModel.ortak_gorev = ortakusers.slice(0,-1);
            todoService.update(this.getModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_list_emit');
                    socket.socketIO.emit('to_do_list_emit_all');
                    socket.socketIO.emit('to_do_main_list_emit_all');

                    useLoadingStore().end_loading_act();
                    this.emitter.emit('todo_dialog_opened', false);
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        },
        reset() {
            todoService.getModel().then(data => {
                this.selectedPriority = { };
                this.selectedUser = [];
                useTodoStore().to_do_model_list_load_act(data);
                useTodoStore().to_do_new_button_load_act(true);
            });
        },
        prioritySelected(event) {
            this.getModel.oncelik = event.value.priority;
        },
        userSelected(event) {
            this.getModel.gorev_sahibi_adi = event.value.username;
            this.getModel.gorev_sahibi_id = event.value.id;
        }
    }
}
</script>
<style scoped>

</style>