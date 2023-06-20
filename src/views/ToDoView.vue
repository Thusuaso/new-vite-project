<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <button type="button" class="btn btn-success w-100" @click="newForm">Yeni</button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <list/>
        </div>
    </div>
    <Dialog v-model:visible="to_do_form" header="" modal style="width:100%;">
        <toDoForm />
    </Dialog>
</template>
<script>
import { useTodoStore } from '../stores/todo';
import { useLoadingStore } from '../stores/loading';

import { todoService } from '../services/todoService';
import { socket } from '../services/customServices/realTimeService';

import form from '../components/todo/form.vue';
import list from '../components/todo/list.vue';
export default {
    components: {
        toDoForm: form,
        list,
    },
    data() {
        return {
            to_do_form:false,
        }
    },
    created() {

    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            todoService.getModel().then(data => {
                useTodoStore().to_do_model_list_load_act(data);
                useTodoStore().to_do_new_button_load_act(true);
                this.to_do_form = true;
                useLoadingStore().end_loading_act();
            });
        }
    },
    mounted() {
        socket.socketIO.on('to_do_list_on', (userId) => {
            todoService.getList(userId).then(data => {
                useTodoStore().to_do_list_load_act(data);
            });
        }),
        this.emitter.on('todo_dialog_opened', (data) => {
            this.to_do_form = data;
        })
    }
}
</script>
<style scoped>

</style>
