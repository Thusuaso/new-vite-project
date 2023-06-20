<template>
    <div>
        <list />
    </div>
</template>
<script>

import { useEtaStore } from '../stores/eta';

import { etaService } from '../services/etaService';
import { socket } from '../services/customServices/realTimeService';

import list from '../components/eta/list.vue';

export default {
    components: {
        list,
    },
    created() {
        etaService.getList().then(data => {
            useEtaStore().eta_list_load_act(data);
        })
    },
    mounted() {
        socket.socketIO.on('eta_list_on', () => {
            etaService.getList().then(data => {
                useEtaStore().eta_list_load_act(data);
            })
        })
    }
}
</script>