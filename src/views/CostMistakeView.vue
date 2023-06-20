<template>
    <div class="row m-auto mt-3">
        <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <list />
        </div>
    </div>
    <Dialog v-model:visible="cost_mistake_form" header="" modal>
        <mistakeForm />
    </Dialog>
</template>
<script>
import { useCostStore } from '../stores/cost';
import { useLoadingStore } from '../stores/loading';

import { costService } from '../services/costService';
import { socket } from '../services/customServices/realTimeService';

import list from '../components/cost/list.vue';
import form from '../components/cost/form.vue';
export default {
    components: {
        list,
        mistakeForm: form,
    },
    data() {
        return {
            cost_mistake_form:false,
        }
    },
    methods: {
        newForm() {
            useLoadingStore().begin_loading_act();
            costService.getModel().then(data => {
                useCostStore().cost_error_model_load_act(data);
                useCostStore().cost_error_new_button_load_act(true);
                useLoadingStore().end_loading_act();
            })
            this.cost_mistake_form = true;
        }
    },
    mounted() {
        socket.socketIO.on('cost_error_list_on', () => {
            useLoadingStore().begin_loading_act();
            costService.getList().then(data => {
                useCostStore().cost_error_list_load_act(data);
                useLoadingStore().end_loading_act();
            })
        })

        this.emitter.on('cost_dialog_status', (data) => {
            this.cost_mistake_form = data;
        })
    }
}
</script>