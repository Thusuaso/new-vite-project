<template>
    <br/>
    <div class="container text-center" v-if="!getMobile">
      <div class="row">
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Company</span>
            <input v-model="getBgpListDetailModel.firmaAdi" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>
        
        <div class="col">
          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">Email</span>
            <input v-model="getBgpListDetailModel.email" type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
          </div>
        </div>
        <div class="col">
              <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Phone</span>
        <input v-model="getBgpListDetailModel.phoneNumber" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
        </div>
        </div>
      </div>
      <br/>
      <div class="row">
            <div class="col">
              <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                <input type="checkbox" class="btn-check" id="btncheck1" autocomplete="off" v-model="getBgpListDetailModel.wrongNumber">
                <label class="btn btn-outline-primary" for="btncheck1">Wrong Number</label>
             </div>
            </div>
            <div class="col">
                  <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" v-model="getBgpListDetailModel.notResponse">
                    <label class="btn btn-outline-primary" for="btncheck2">Not Answer</label>
                 </div>
            </div>
            <div class="col">
                      <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" v-model="getBgpListDetailModel.interested">
                        <label class="btn btn-outline-primary" for="btncheck3">Interested</label>
                     </div>
                </div>
            <div class="col">
                        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" v-model="getBgpListDetailModel.notInterested">
                        <label class="btn btn-outline-primary" for="btncheck4">Not Interested</label>
                        </div>
                </div>
      </div>
      <br/>

      <div class="row">
        <div class="col-2"> 
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="contractor" v-model="getBgpListDetailModel.unvan" >
                <label class="form-check-label" for="flexRadioDefault1">
                    Contractor
                </label>
            </div>
        </div>
        <div class="col-2">
            <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="architect" v-model="getBgpListDetailModel.unvan">
                    <label class="form-check-label" for="flexRadioDefault2">
                        Architech
                    </label>
                </div>
        </div>
      </div>
      <br/>
      <div class="row">
            <div class="col">
              <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Title</span>
                <input v-model="getBgpListDetailModel.baslik" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
              </div>
            </div>
            <div class="col">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Reminder Date</span>
                    <Calendar v-model="r_date" showIcon style="width:80%;height:40px;" dateFormat="dd/mm/yy"/>
                  </div>
                </div>
      </div>
      <br/>
      <div class="row">
        <div class="col">
            <div class="form-floating">
                <textarea class="form-control "  placeholder="Leave a comment here" id="floatingTextarea" v-model="getBgpListDetailModel.aciklama" style="height: 100px;padding-top:35px;"></textarea>
                <label for="floatingTextarea">Description</label>
            </div>
        </div>
        <div class="col">
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="getBgpListDetailModel.hatirlatmaAciklama" style="height: 100px;padding-top:35px;"></textarea>
                    <label for="floatingTextarea">Reminder Description</label>
                </div>
            </div>
      </div>
      <br/>

        <button type="button" class="btn btn-success" @click="save"  v-if="getbgpProjectNewButtonStatus">Save</button>
        <button type="button" class="btn btn-warning" @click="update" v-if="!getbgpProjectNewButtonStatus">Update</button>
        <button type="button" class="btn btn-danger" v-if="!getbgpProjectNewButtonStatus" @click="deleteProject" >Delete</button>

    </div>
        <div class="container text-center" v-if="getMobile">
          <div class="">
            <div class="">
              <div class="input-group mb-3 w-100">
                <span class="input-group-text" id="basic-addon1">Company</span>
                <input v-model="getBgpListDetailModel.firmaAdi" type="text" class="form-control " aria-label="Username" aria-describedby="basic-addon1">
              </div>
            </div>
        
            <div class="">
              <div class="input-group mb-3 w-100">
                <span class="input-group-text" id="basic-addon1">Email</span>
                <input v-model="getBgpListDetailModel.email" type="text" class="form-control"  aria-label="Username" aria-describedby="basic-addon1">
              </div>
            </div>
            <div class="">
                  <div class="input-group mb-3 w-100">
            <span class="input-group-text" id="basic-addon1">Phone</span>
            <input v-model="getBgpListDetailModel.phoneNumber" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
            </div>
            </div>
          </div>
          <br/>
          <div class="">
                <div class="">
                  <div class="btn-group w-100 mb-3" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" class="btn-check w-100" id="btncheck1" autocomplete="off" v-model="getBgpListDetailModel.wrongNumber">
                    <label class="btn btn-outline-primary" for="btncheck1">Wrong Number</label>
                 </div>
                </div>
                <div class="">
                      <div class="btn-group w-100 mb-3" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" class="btn-check" id="btncheck2" autocomplete="off" v-model="getBgpListDetailModel.notResponse">
                        <label class="btn btn-outline-primary" for="btncheck2">Not Answer</label>
                     </div>
                </div>
                <div class="">
                          <div class="btn-group w-100 mb-3" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check" id="btncheck3" autocomplete="off" v-model="getBgpListDetailModel.interested">
                            <label class="btn btn-outline-primary" for="btncheck3">Interested</label>
                         </div>
                    </div>
                <div class="">
                            <div class="btn-group w-100 mb-3" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check" id="btncheck4" autocomplete="off" v-model="getBgpListDetailModel.notInterested">
                            <label class="btn btn-outline-primary" for="btncheck4">Not Interested</label>
                            </div>
                    </div>
          </div>
          <br/>

          <div class="row">
            <div class="col"> 
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="contractor" v-model="getBgpListDetailModel.unvan" >
                    <label class="form-check-label" for="flexRadioDefault1">
                        Contractor
                    </label>
                </div>
            </div>
            <div class="col">
                <div class="form-check">
                        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="architect" v-model="getBgpListDetailModel.unvan">
                        <label class="form-check-label" for="flexRadioDefault2">
                            Architech
                        </label>
                    </div>
            </div>
          </div>
          <br/>
          <div class="">
                <div class="">
                  <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Title</span>
                    <input v-model="getBgpListDetailModel.baslik" type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1">
                  </div>
                </div>
                <div class="">

                      <span class="p-float-label">
                        <Calendar class="w-100" inputId="r_date" v-model="r_date" showIcon dateFormat="dd/mm/yy"/>
                        <label for="r_date">Reminder Date</label>
                    </span>
                    </div>
          </div>
          <br/>
          <div class="">
            <div class="">
                <div class="form-floating mb-3">
                    <textarea class="form-control "  placeholder="Leave a comment here" id="floatingTextarea" v-model="getBgpListDetailModel.aciklama" style="height: 100px;padding-top:35px;"></textarea>
                    <label for="floatingTextarea">Description</label>
                </div>
            </div>
            <div class="">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" v-model="getBgpListDetailModel.hatirlatmaAciklama" style="height: 100px;padding-top:35px;"></textarea>
                        <label for="floatingTextarea">Reminder Description</label>
                    </div>
                </div>
          </div>
          <br/>

            <button type="button" class="btn btn-success w-100 mb-3" @click="save"  v-if="getbgpProjectNewButtonStatus">Save</button>
            <button type="button" class="btn btn-warning w-100 mb-3" @click="update" v-if="!getbgpProjectNewButtonStatus">Update</button>
            <button type="button" class="btn btn-danger w-100 mb-3" v-if="!getbgpProjectNewButtonStatus" @click="deleteProject" >Delete</button>

        </div>
</template>
<script>
import { useBgpStore } from '../../stores/bgp';
import { useLoadingStore } from '../../stores/loading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { bgpService } from '../../services/bgpService';
import { socket } from '../../services/customServices/realTimeService';
export default {
    props:['projectName','ulkeAdi'],
    data() {
        return {
            checked: false,
            r_date: new Date(),
            s_date:new Date()
        }
    },
    computed: {
        ...mapState(useBgpStore, [
            'getBgpListDetailModel',
            'getbgpProjectNewButtonStatus'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    created() {
        if (!this.getbgpProjectNewButtonStatus) {
            this.s_date = localDateService.getStringDate2(this.getBgpListDetailModel.kayitTarihi)
            this.r_date = localDateService.getStringDate2(this.getBgpListDetailModel.hatirlatmaTarihi)
        } else {
            useLoadingStore().begin_loading_act()
            bgpService.bgpProjectDetailModel().then(data => {
                useBgpStore().bgp_list_detail_model_load_act(data)
                useLoadingStore().end_loading_act()
            })
        }
        

    },
    methods: {
        save() {
            useLoadingStore().begin_loading_act()
            this.getBgpListDetailModel.kayitTarihi = localDateService.getDateString(this.s_date);
            this.getBgpListDetailModel.hatirlatmaTarihi = localDateService.getDateString(this.r_date);
            this.getBgpListDetailModel.temsilci = localStorage.getItem('userId');
            this.getBgpListDetailModel.ulkeAdi = this.ulkeAdi
            this.getBgpListDetailModel.projectName = this.projectName
            bgpService.bgpProjectDetailSave(this.getBgpListDetailModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('bgp_project_list_ayrinti_emit', this.projectName)
                    this.emitter.emit('bgp_project_detail_closed_dialog');
                    useLoadingStore().end_loading_act()

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000})
                } else {
                    useLoadingStore().end_loading_act()
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 })

                }
            })
        },
        update() {
            useLoadingStore().begin_loading_act()
            this.getBgpListDetailModel.kayitTarihi = localDateService.getDateString(this.s_date);
            this.getBgpListDetailModel.hatirlatmaTarihi = localDateService.getDateString(this.r_date);
            bgpService.bgpProjectDetailUpdate(this.getBgpListDetailModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('bgp_project_list_ayrinti_emit', this.projectName)
                    this.emitter.emit('bgp_project_detail_closed_dialog');
                    useLoadingStore().end_loading_act()
                    this.$toast.add({severity:'success',detail:'Başarıyla Güncellendi',life:3000})
                } else {
                    useLoadingStore().end_loading_act()
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 })
                }
            })
        },
        deleteProject() {
            useLoadingStore().begin_loading_act()
            bgpService.bgpProjectDetailDelete(this.getBgpListDetailModel.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('bgp_project_list_ayrinti_emit', this.projectName)
                    this.emitter.emit('bgp_project_detail_closed_dialog');
                    useLoadingStore().end_loading_act()
                    this.$toast.add({severity:'success',detail:'Başarıyla Silindi',life:3000})
                } else {
                    useLoadingStore().end_loading_act()
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 })

                }
            })
        }
    }
}
</script>

<style scoped>


</style>