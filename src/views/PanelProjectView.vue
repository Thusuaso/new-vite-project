<template>
    <div class="row">
        <div class="col">
        <button type="button" class="btn btn-success w-100 mb-3" @click="newForm">Yeni Proje Ekle</button>

        </div>
        <div class="col">
        <button type="button" class="btn btn-primary w-100 mb-3" @click="projectListForm">Projeler</button>

        </div>
    </div>

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
    <Dialog v-model:visible="projects_list_form" header="Projeler" modal>
        <button type="button" class="btn btn-success w-100 mb-3" @click="pickProjectQueueSave">Kaydet</button>
        <PickList v-model="projectPickList" listStyle="height:342px" dataKey="id" @reorder="projectPickListReorder($event)">
        <template #sourceheader> Available </template>
        <template #targetheader> Selected </template>
        <template #item="slotProps">
            <div class="flex flex-wrap p-2 align-items-center gap-3">
                    <div class="flex-1 flex flex-column gap-2">
                        <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.project_image" :alt="slotProps.item.name" width="70" height="70"/>

                        <span class="font-bold p-3"><span>({{ slotProps.item.queue }})</span> {{ slotProps.item.project_name }}</span>
                    </div>

            </div>
        </template>
    </PickList>

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
            panel_project_add_form: false,
            projects_list_form: false,
            projectPickList: [],
            projectPickListQueueList: [],
        }
    },
    methods: {
        projectPickListReorder(event) {
            const data = [];
            let queue = 1;
            for (const item of event.value[0]) {
                item.queue = queue;
                data.push(item);
                queue++;
            };
            this.projectPickListQueueList = data;
        },
        pickProjectQueueSave() {
            useLoadingStore().begin_loading_act();
            reportsService.setProjectQueue(this.projectPickListQueueList).then(data => {
                if (data.status) {
                    this.projects_list_form = false;
                    socket.socketIO.emit('project_list_update_emit')
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        projectListForm() {
            this.projects_list_form = true;
            this.projectPickList = [this.getPanelProjectList, []];
        },
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