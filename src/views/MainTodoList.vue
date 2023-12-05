<template>
    <div class="container">
        <button type="button" class="btn btn-success w-100 mb-3" @click="saveQueue" :disabled="save_queue_disabled_form">Sıra Değiştir</button>
        <DataTable :value="todoMainList" :reorderableColumns="true"  @rowReorder="onRowReorder" sortField="sira" sortOrder="1"
            :selection="selectedTodo"
            selectionMode="single"
            @row-click="todoSelected($event)"
        >
            <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
            <Column  field="sira" header="Sıra" ></Column>
            <Column  field="ortak_gorev" header="Görev Sahibi" ></Column>
            <Column  field="yapilacak" header="Görev" ></Column>
            <Column header="#" >
                <template #body='slotProps'>
                    <button class="btn btn-success" type="button" @click="isTodoUpdate(slotProps.data.id)">Yapıldı</button>
                </template>
            </Column>
            <Column header="#">
                <template #body="slotProps">
                    <button class="btn btn-primary" type="button" @click="isTodoSeeing(slotProps.data.id)">Görüldü</button>
                </template>
            </Column>

        </DataTable>
        <Dialog v-model:visible="todo_visible_form" header="" modal>
            <todoForm />
        </Dialog>
    </div>
</template>
<script>
import {mapState} from 'pinia';
import { useTodoStore } from '../stores/todo';
import {todoService} from '../services/todoService';
import {useLoadingStore} from '../stores/loading';
import form from '../components/todo/form.vue';
import { socket } from '../services/customServices/realTimeService';
import {localDateService} from '../services/localDateService';
export default {
    components:{
        todoForm:form
    },
    data(){
      return{
            save_queue_disabled_form:false,
            selectedTodo:null,
            todo_visible_form:false,
        }  
    },
    computed:{
        ...mapState(useTodoStore,['todoMainList'])
    },
    methods:{
        isTodoSeeing(id){
            todoService.setTodoMainSeeing(id).then(response=>{
                if(response.status){
                    socket.socketIO.emit('to_do_main_list_emit_all');

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                    
                }
            })
        },
        isTodoUpdate(id){
            const value = {
                'id': id,
                'status': 1,
                'yapildiTarihi': localDateService.getDateString(new Date()),
            };
            useLoadingStore().begin_loading_act();
            todoService.updateTodo(value).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_main_list_emit_all');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            }); 
        },
        todoSelected(event){
            useLoadingStore().begin_loading_act();
            todoService.getDetailList(event.data.id).then(data => {
                this.todo_visible_form = true;
                useTodoStore().to_do_model_list_load_act(data);
                useTodoStore().to_do_new_button_load_act(false);
                useLoadingStore().end_loading_act();
            })
        },
        saveQueue(){
            useLoadingStore().begin_loading_act();
            this.save_queue_disabled_form = true;
            todoService.setTodoMainQueue(this.todoMainList)
            .then(response=>{
                if(response.status){
                    useLoadingStore().end_loading_act();
                    this.$toast.add({severity:'success',detail:'Sıralar Başarıyla Değiştirildi.',life:3000});
                    this.save_queue_disabled_form = false;
                } else{
                    useLoadingStore().end_loading_act();
                    this.$toast.add({severity:'error',detail:'Sıra Değiştirme Başarısız',life:3000});
                    this.save_queue_disabled_form = false;

                }
            });  
        },
        onRowReorder(event){
            let data = [];
            let index =  1;
            for(const item of event.value){
                item.sira = index;
                data.push(item);
                index += 1;
            };
            useTodoStore().to_do_main_list_load_act(data);
        }
    },
    mounted(){
        socket.socketIO.on('to_do_main_list_emit_on',()=>{
                todoService.getTodoMainList(localStorage.getItem('userId')).then(data=>{
                    useTodoStore().to_do_main_list_load_act(data);
                });
        });
    }

    
}
</script>