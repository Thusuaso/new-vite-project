<template>
    <div class="row">
        <div class="col">
            <FileUpload class="w-100" mode="basic" accept="image/*" :maxFileSize="2000000" @select="newMainPhotos($event)" :auto="true" chooseLabel="Ana Fotoğraf Değiştir" />
        </div>
        <div class="col">
            <button type="button" class="btn btn-primary w-100 mb-3" @click="openPhotosList">Fotoğraf Listesi</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary w-100 mb-3" @click="uploadVideos">Video Ekle</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-info w-100" @click="suggestedProject">Önerilen Projeler</button>
        </div>
    </div>

    <div class="row">
        <div class="col">
            <Galleria :value="getPanelProjectDetailList.project_detail_list" :responsiveOptions="responsiveOptions" :numVisible="5" >
                <template #item="slotProps">
                    <img :src="slotProps.item.image_link" style="width:100%;"/>
                </template>
                <template #thumbnail="slotProps">
                    <img :src="slotProps.item.image_link" style="width:60px;height:60px;" />
                </template>
            </Galleria>
        </div>
        <div class="col">
            <iframe style="width:100%; height:320px;" :src="getPanelProjectDetailList.project_detail_video_list[0].video_link" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
            <br/>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 250px" v-model="information" @input="informationControl($event)"></textarea>
                <label for="floatingTextarea2">Açıklama En ({{ 1500 - information.length }})</label>
                <span style="color:red;" v-if="information.length == 1500">*1500 Karakterden fazlasını desteklememektedir.</span>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 250px" v-model="information_fr" @input="informationControl2($event)"></textarea>
                <label for="floatingTextarea2">Açıklama Fr ({{ 1500 - information_fr.length }})</label>
                <span style="color:red;" v-if="information_fr.length == 1500">*1500 Karakterden fazlasını desteklememektedir.</span>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 250px" v-model="information_es" @input="informationControl3($event)"></textarea>
                <label for="floatingTextarea2">Açıklama Es ({{ 1500 - information_es.length }})</label>
                <span style="color:red;" v-if="information_es.length == 1500">*1500 Karakterden fazlasını desteklememektedir.</span>
            </div>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 250px" v-model="information_ru" @input="informationControl4($event)"></textarea>
                <label for="floatingTextarea2">Açıklama Ru ({{ 1500 - information_ru.length }})</label>
                <span style="color:red;" v-if="information_ru.length == 1500">*1500 Karakterden fazlasını desteklememektedir.</span>
            </div>
            <button type="button" class="btn btn-success mt-2 w-100" @click="addInformation">Açıklama Ekle</button>
            <button type="button" class="btn btn-warning mt-2 w-100" @click="updateInformation">Açıklama Güncelle</button>
        
        </div>
    </div>
    <div class="row">
        <div class="col">
            <Dialog v-model:visible="photos_list_form" header="Fotoğraf Listesi" modal :style="{ width: '100vw' }">
                <FileUpload class="w-100 mb-2" mode="basic" accept="image/*" :multiple="true" :maxFileSize="2000000" @select="onUpload($event)" chooseLabel="Fotoğraf Yükle" />


                <button type="button" class="btn btn-danger w-100 mb-2" @click="deletePhotos">Sil</button>
                <button type="button" class="btn btn-secondary w-100 mb-2" @click="mainPhotosChange(panelPickListPhotos[1])" :disabled="panelPickListPhotos[1].lenght == 1">Ana Fotoğrafla Değiştir</button>
                <button type="button" class="btn btn-primary w-100 mb-2" @click="photos_product_name_form = true">Ürün Adı</button>
                <PickList v-model="panelPickListPhotos"  
                    @reorder="isSelectionChange($event)"
                >
                    <template #sourceheader> Available </template>
                    <template #targetheader> Selected </template>
                    <template #item="slotProps">
                        <div class="flex flex-wrap p-2 align-items-center gap-3 w-4rem">
                            <span class="font-bold p-4">{{ slotProps.item.queue }}</span>
                            <img class=" shadow-2 flex-shrink-0 border-round" :src="slotProps.item.image_link" :alt="slotProps.item.name" width="60" height="60"/>
                            <span class="font-bold p-4">{{ slotProps.item.image_name }}</span>

                        </div>
                    </template>
                </PickList>
            </Dialog>
            <Dialog v-model:visible="video_form" header="Video Ekle" modal :style="{width:'100vw'}">
                <div class="row mt-2">
                    <div class="col-9">
                        <div class="input-group mb-3 w-100">
                            <span class="input-group-text" id="basic-addon1">Video Linki</span>
                            <input type="text" class="form-control " v-model="video_link"  aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button" class="btn btn-success w-100" @click="addVideo">Ekle</button>
                    </div>
                </div>

            </Dialog>
            <Dialog v-model:visible="suggested_form" header="Önerilen Projeler" modal :style="{ width: '100vw' }">
                <button type="button" class="btn btn-success w-100 mb-3" @click="sendSuggestedProject">Kaydet</button>
                <PickList v-model="suggestedList" dataKey="id" @move-to-target="suggestedListMoveToTarget($event)" 
    >
    
                <template #sourceheader> Available </template>
                <template #targetheader> Selected </template>
                <template #item="slotProps">
                    <div class="flex flex-wrap p-2 align-items-center gap-3">

                        <img class=" shadow-2 flex-shrink-0 border-round" width="60" height="60" :src="slotProps.item.project_image"  />
                        <span class="font-bold p-3">{{ slotProps.item.project_name }}</span>

                        
                    </div>
                </template>
            </PickList>
            </Dialog>
            <Dialog v-model:visible="photos_product_name_form" header="Fotoğraf Ürün Adı" modal :style="{ width: '100vw' }">
                <DataTable v-model:editingRows="editingRows" :value="editingNew" editMode="row" dataKey="id" @row-edit-save="onRowEditSave($event)"
                                :pt="{
                                    table: { style: 'min-width: 50rem' },
                                    column: {
                                        bodycell: ({ state }) => ({
                                            class: [{ 'pt-0 pb-0': state['d_editing'] }]
                                        })
                                    }
                                }"
                            >
                                <Column field="image_link" header="Fotoğraf">
                                    <template #body="slotProps">
                                        <img :src="slotProps.data.image_link" width="250" height="250"/>
                                    </template>
                                </Column>
                                <Column  field="product_name" style="width: 25%" header="Ürün Adı (En)">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                </Column>
                                <Column  field="product_name_fr" style="width: 25%" header="Ürün Adı (Fr)">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                </Column>
                                <Column  field="product_name_es" style="width: 25%" header="Ürün Adı (Es)">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                </Column>
                                <Column  field="product_name_ru" style="width: 25%" header="Ürün Adı (Ru)">
                                    <template #editor="{ data, field }">
                                        <InputText v-model="data[field]" />
                                    </template>
                                </Column>
                                <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>

                            </DataTable>                  
            </Dialog>
        </div>
    </div>
</template>
<script>
import { usePanelStore } from '../../stores/panel';
import { mapState } from 'pinia';

import { reportsService } from '../../services/reportsService';
import { socket } from '../../services/customServices/realTimeService';
import digitalOceanService from '../../services/digitalOceanService';
import { useLoadingStore } from '../../stores/loading';
export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProjectDetailList',
            'getPanelPickListPhotosDetailList'
        ])
    },
    props:['project_id','project_name'],
    data() {
        return {
            information_ru:"",
            editingNew:[],
            editingRows:[],
            photos_product_name_form:false,
            information_fr:"",
            information_es:"",
            panelPickListPhotos:[],
            suggestedList:[],
            suggested_form:false,
            project_product_name: "",
            information: "",
            video_link:"",
            video_form:false,
            photos_list_form:false,
            responsiveOptions: [
                {
                    breakpoint: '991px',
                    numVisible: 4
                },
                {
                    breakpoint: '767px',
                    numVisible: 3
                },
                {
                    breakpoint: '575px',
                    numVisible: 1
                }
            ],
            informationControlText:'',
        }
    },
    created() {
        // @ts-ignore
        if (this.getPanelProjectDetailList.project_detail_information_list) {
            // @ts-ignore
            this.information = this.getPanelProjectDetailList.project_detail_information_list[0].information;
            this.information_fr = this.getPanelProjectDetailList.project_detail_information_list[0].information_fr;
            this.information_es = this.getPanelProjectDetailList.project_detail_information_list[0].information_es;
            this.information_ru = this.getPanelProjectDetailList.project_detail_information_list[0].information_ru;



            // @ts-ignore
            this.project_product_name = this.getPanelProjectDetailList.project_detail_information_list[0].project_product_name;
        };
        this.panelPickListPhotos = this.getPanelPickListPhotosDetailList;
        this.editingNew = this.panelPickListPhotos[0];
    },
    methods: {
        onRowEditSave(event){
            useLoadingStore().begin_loading_act();
            reportsService.setProjectProductName(event.newData)
            .then(response=>{
                if(response.status){

                    const index = this.editingNew.findIndex(x=>x.id == event.newData.id);
                    this.editingNew[index] = event.newData;

                    useLoadingStore().end_loading_act();

                    this.$toast.add({'severity':'success','detail':'Başarıyla Kaydedildi.',life:3000});
                } else{
                    useLoadingStore().end_loading_act();

                    this.$toast.add({'severity':'error','detail':'Kaydetme Başarısız.',life:3000});
                }
            })
        },
        isSelectionChange(event){
        
            let index = 1;
          this.panelPickListPhotos[0].forEach(element => {
            element.queue = index;
            index += 1;
          });
          reportsService.setProjectPhotosQueueChange(this.panelPickListPhotos[0])
          .then(response=>{
                if(response.status){
                    this.$toast.add({'severity':'success','detail':'Başarıyla Değiştirildi.','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Değiştirme Başarısız.','life':3000});
                    
                }
           })
        },
        informationControl(event){
          if(event.target.value.length >100){
                this.information = event.target.value.substring(0,1500);
            }
        },
        informationControl2(event){
          if(event.target.value.length >100){
                this.information_fr = event.target.value.substring(0,1500);
            }
        },
        informationControl3(event){
          if(event.target.value.length >100){
                this.information_es = event.target.value.substring(0,1500);
            }
        },
        informationControl4(event){
            if(event.target.value.length >100){
                this.information_ru = event.target.value.substring(0,1500);
            }
        },
        mainPhotosChange(event){
            reportsService.setProjectMainPhotosChange(event[0]).then(response=>{
                if(response.status){
                    // @ts-ignore
                    this.$toast.add({severity:'success',detail:'Ana Fotoğraf Başarıyla Değiştirildi',life:3000});
                    this.photos_list_form = true;
                }else{
                    // @ts-ignore
                    this.$toast.add({severity:'error',detail:'Ana Fotoğraf Değiştirme İşlemi Başarısız',life:3000});
                    
                }
            })
        },
        newMainPhotos(event){
            const data = {
                'project_id':this.project_id,
                'newFileName':event.files[0].name
            }
            reportsService.setProjectMainPhotos(data).then(res=>{
                if(res.status){
                    const result = digitalOceanService.projeFotoGonder(event.files[0]);
                    if (result) {
                        // @ts-ignore
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Yüklendi', life: 3000 });
                    } else {
                        // @ts-ignore
                        this.$toast.add({ severity: 'error', detail: 'Yükleme Başarısız', life: 3000 });
                    }
                }else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Yükleme Başarısız', life: 3000 });
                }
            })
            
        },
        sendSuggestedProject() {
            useLoadingStore().begin_loading_act();
            for (const item of this.suggestedList[1]) {
                item.project_id = this.project_id;
            };
            for(const item of this.suggestedList[0]){
                item.project_id = this.project_id;
            }
            
            reportsService.setSuggestedProjects(this.suggestedList).then(data => {
                if (data) {
                    // @ts-ignore
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                }else{
                    // @ts-ignore
                    useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        },

        suggestedProject() {
            reportsService.getSuggestedProjects(this.project_id).then(data => {
                this.suggestedList = [data.not_suggested, data.suggested];
                this.suggested_form = true;
            })
        },
        updateInformation() {
            // @ts-ignore
            this.getPanelProjectDetailList.project_detail_information_list[0].information = this.information;
            this.getPanelProjectDetailList.project_detail_information_list[0].information_fr = this.information_fr;
            this.getPanelProjectDetailList.project_detail_information_list[0].information_es = this.information_es;
            this.getPanelProjectDetailList.project_detail_information_list[0].information_ru = this.information_ru;



            // @ts-ignore
            this.getPanelProjectDetailList.project_detail_information_list[0].project_product_name = this.project_product_name;

            // @ts-ignore
            reportsService.updateInformation(this.getPanelProjectDetailList.project_detail_information_list[0]).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_detail_update_emit', this.project_id);
                    // @ts-ignore
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        },
        addInformation() {
            const data = {
                'project_id': this.project_id,
                'project_information': this.information,
                'project_information_fr':this.information_fr,
                'project_information_es':this.information_es,
                'project_information_ru':this.information_ru,

            }
            reportsService.addInformation(data).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_detail_update_emit', this.project_id);

                    // @ts-ignore
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });

                }
            })
        },
        addVideo() {
            const data = {
                'id': this.project_id,
                'project_name': this.project_name,
                'image_status': 0,
                'videos_status':1,
                'videos_link': this.video_link
            }
            reportsService.addVideo(data).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_detail_update_emit', this.project_id);

                    // @ts-ignore
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        uploadVideos() {
            this.video_form = true;
        },
        onUpload(event) {
            let photos = [];
            for (const item of event.files) {
                digitalOceanService.projeDetayFotoGonder(item);
                const data = {
                    'id': this.project_id,
                    'name': this.project_name,
                    'image_link': 'https://mekmar-image.fra1.cdn.digitaloceanspaces.com/galleria-project_photos/photos/' + item.name,
                    'image_name': item.name.split('.')[0],
                    'image_status': 1,
                    'video_status': 0,
                };
                photos.push(data);
            };
            this.sendPhotosServer(photos);
        },
        sendPhotosServer(photos) {
            reportsService.addProjectPhotosServer(photos).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_detail_update_emit', this.project_id);

                    // @ts-ignore
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        },
        pickListMoveSourceAll(event) {
            for (const item of event.items) {
                this.getPanelPickListPhotosDetailList[0].push(item);
            }
            this.getPanelPickListPhotosDetailList[1] = [];
        },
        pickListMoveSource(event) {
            this.getPanelPickListPhotosDetailList[0].push(event.items[0]);
            this.getPanelPickListPhotosDetailList[1].splice(this.findIndex(event.items[0].id, this.getPanelPickListPhotosDetailList[1]), 1)
        },
        deletePhotos() {
            if(confirm('Silme işlemini onaylıyor musunuz?')){
                reportsService.deleteProjectPhotos(this.panelPickListPhotos[1]).then(data => {
                if (data.status) {
                    socket.socketIO.emit('project_list_detail_update_emit', this.project_id);
                    this.panelPickListPhotos[1] = [];
                    // @ts-ignore
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    // @ts-ignore
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });

                }
            })
            }
            
        },
        pickListMoveAll(event) {
            for (const item of event.items) {
            this.getPanelPickListPhotosDetailList[1].push(item);
            }
            this.getPanelPickListPhotosDetailList[0] = [];
        },
        pickListMove(event) {
            this.getPanelPickListPhotosDetailList[1].push(event.items[0]);

            this.getPanelPickListPhotosDetailList[0].splice(this.findIndex(event.items[0].id, this.getPanelPickListPhotosDetailList[0]),1)
        },
        openPhotosList() {
            this.photos_list_form = true;
        },
        findIndex(id, value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i].id == id) {
                    return i;
                }
            }
        }
    },
    mounted() {

    }
    
}
</script>

<style scoped>

</style>