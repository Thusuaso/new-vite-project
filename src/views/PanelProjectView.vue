<template>
    <button type="button" class="btn btn-success w-100 mb-3" @click="newForm">Yeni Proje Ekle</button>
    <DataTable 
        :value="getPanelProjectList" 
        v-model:selection="projectPanelSelected"
        selectionMode="single"
        @row-click="selectedProjectPanel($event)"
    >
        <Column field="id" header="Proje Id"></Column>
        <Column field="project_name" header="Proje Adı"></Column>
        <Column field="project_country_name" header="Ülke"></Column>
        <Column field="project_image" header="Fotoğraf">
            <template #body="slotProps">
                <img :src="slotProps.data.project_image" width="200" height="200"/>
            </template>
        </Column>
    </DataTable>
    <Dialog v-model:visible="panel_project_form" :header="project_id + ' - ' + project_name" modal >
        <projectForm :project_id="project_id" :project_name="project_name"/>
    </Dialog>
    <Dialog v-model:visible="panel_project_add_form" header="Yeni Proje" modal>
        <addProjectForm/>
    </Dialog>
</template>
<script>
import { usePanelStore } from '../stores/panel';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';
import { socket } from '../services/customServices/realTimeService';

import projectForm from '../components/panel/projectForm.vue';
import addProjectForm from '../components/panel/addProjectForm.vue';
export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProjectList'
        ])
    },
    components: {
        projectForm,
        addProjectForm
    },
    data() {
        return {
            projectPanelSelected: {},
            panel_project_form: false,
            project_id: 0,
            project_name: '',
            panel_project_add_form:false,
        }
    },
    methods: {
        newForm() {
            reportsService.getNewProjectModel().then(data => {
                usePanelStore().panel_project_model_load_act(data);
                this.panel_project_add_form = true;
            });
        },
        selectedProjectPanel(event) {
            this.project_name = event.data.project_name;
            this.project_id = event.data.id;
            reportsService.getProjectDetail(event.data.id).then(data => {
                usePanelStore().panel_project_detail_list_load_act(data);
                this.panel_project_form = true;
            })
        }
    },
    mounted() {
        socket.socketIO.on('project_list_update_on', () => {
            useLoadingStore().begin_loading_act();
            reportsService.getProjectList().then(data => {
                usePanelStore().panel_project_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        }),
            socket.socketIO.on('project_list_detail_update_on', (id) => {
                reportsService.getProjectDetail(id).then(data => {
                    usePanelStore().panel_project_detail_list_load_act(data);
                })
            })
    }
    
}
</script>
<style scoped>

</style>