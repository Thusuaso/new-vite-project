<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                :value="getTodoList.yapilmadi"
                v-model:selection="selectedTodo"
                selectionMode="single"
                @row-click="todoSelected($event)"
                style="font-size:85%;"
                sortField="aciliyet" :sortOrder="-1"
                :rowStyle="rowStyle"
            >
                <template #header>
                    To Do List
                </template>
                <Column field="girisTarihi" header="Date of Entry">
                    <template #body="slotProps">
                        {{ $filters.formatDate(slotProps.data.girisTarihi) }}
                    </template>
                </Column>
                <Column field="yapilacak" header="To Do">
                    <template #body="slotProps">
                        <div :style="{'backgroundColor':slotProps.data.gorev_veren_id == 10 ? 'yellow':''}">
                            {{ slotProps.data.yapilacak }}
                        </div>
                    </template>
                </Column>
                <Column field="oncelik" header="Priority"></Column>
                <Column header="Status">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-warning" @click="updateTodo(slotProps.data.id,1)">Done</button>
                    </template>
                </Column>
                <Column header="Delete">
                    <template #body="slotProps">
                        <button type="button" class="btn btn-danger" @click="deleteTodo(slotProps.data.id)">Delete</button>
                    </template>
                </Column>


            </DataTable>
        </div>
    </div>
    <div class="row m-auto mt-3">
            <div class="col">
                <DataTable :value="getTodoList.yapildi" style="font-size:85%;">
                    <template #header>
                        Done List
                    </template>
                    <Column field="girisTarihi" header="Date of Entry">
                        <template #body="slotProps">
                            {{ $filters.formatDate(slotProps.data.girisTarihi) }}
                        </template>
                    </Column>
                    <Column field="yapildiTarihi" header="Date of Completion">
                        <template #body="slotProps">
                            {{ slotProps.data.yapildiTarihi }}
                        </template>
                    </Column>
                    <Column field="yapilacak" header="To Do">
                        <template #body="slotProps">
                            <div :style="{ 'backgroundColor': slotProps.data.gorev_veren_id == 10 ? 'yellow' : '' }">
                                {{ slotProps.data.yapilacak }}
                            </div>
                        </template>
                    </Column>
                    <Column field="oncelik" header="Priority"></Column>
                    <Column header="Status">
                        <template #body="slotProps">
                            <button type="button" class="btn btn-info" @click="updateTodo2(slotProps.data.id, 0)">Not Done</button>
                        </template>
                    </Column>
                    <Column header="Delete">
                        <template #body="slotProps">
                            <button type="button" class="btn btn-danger" @click="deleteTodo(slotProps.data.id)">Delete</button>
                        </template>
                    </Column>


                </DataTable>
            </div>
        </div>

</template>
<script>
import { useTodoStore } from '../../stores/todo';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { todoService } from '../../services/todoService';
import { localDateService } from '../../services/localDateService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useTodoStore, [
            'getTodoList'
        ])
    },
    data() {
        return {
            selectedTodo: {},

        }
    },
    methods: {
        rowStyle(event){
            return event.aciliyet ? 'border:3px solid red;':''
        },
        todoSelected(event) {
            useLoadingStore().begin_loading_act();
            todoService.getDetailList(event.data.id).then(data => {
                useTodoStore().to_do_model_list_load_act(data);
                useTodoStore().to_do_new_button_load_act(false);
                this.emitter.emit('todo_dialog_opened', true);
                useLoadingStore().end_loading_act();
            })
        },
        updateTodo2(id, status) {
            const value = {
                'id': id,
                'status': status,
                'yapildiTarihi': '',
            };
            useLoadingStore().begin_loading_act();
            todoService.updateTodo(value).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_list_emit');
                    socket.socketIO.emit('to_do_list_emit_all');

                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        updateTodo(id, status) {
            const value = {
                'id': id,
                'status': status,
                'yapildiTarihi': localDateService.getDateString(new Date()),
            };
            useLoadingStore().begin_loading_act();
            todoService.updateTodo(value).then(data => {
                if (data.status) {
                    socket.socketIO.emit('to_do_list_emit');
                    socket.socketIO.emit('to_do_list_emit_all');

                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            });
        },
        deleteTodo(id) {
            if (confirm('Silmek istediğinize emin misiniz?')) {
                useLoadingStore().begin_loading_act();
                todoService.deleteTodo(id).then(data => {
                    if (data.status) {
                        socket.socketIO.emit('to_do_list_emit');
                    socket.socketIO.emit('to_do_list_emit_all');

                        useLoadingStore().end_loading_act();
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    } else {
                        useLoadingStore().end_loading_act();
                        this.$toast.add({ severity: 'danger', detail: 'Silme Başarısız', life: 3000 });
                    };
                });
            };
        }
    }
}
</script>