<template>
    <br/>
    <div class="row" v-if="!getMobile">
        <div class="col">
            <Dropdown v-model="selectedSupplier" :options="tedarikci_list" optionLabel="tedarikci" class="w-full md:w-14rem" />
        </div>
        <div class="col">
            <CustomInputFile
              baslik="  Dosya Yükle  "
              @sunucuDosyaYolla="faturaDosyaGonder($event)"
            />
        </div>
        <div class="col">
            <a :href="tedarikciLink" target="_self">
                <button
                  class="btn btn-success"
                  iconPos="left"
                  icon="fas fa-download"
                  :disabled="dis_download"
                >indir</button>
              </a>
        </div>
    </div>
        <div class="" v-if="getMobile">
            <div class="">
                <Dropdown v-model="selectedSupplier" :options="tedarikci_list" optionLabel="tedarikci" class="w-100 mb-3" />
            </div>
            <div class="">
                <CustomInputFile
                    class="mb-3"
                  baslik="  Dosya Yükle  "
                  @sunucuDosyaYolla="faturaDosyaGonder($event)"
                />
            </div>
            <div class="">
                <a :href="tedarikciLink" target="_self">
                    <button
                      class="btn btn-success w-100 mb-3"
                      iconPos="left"
                      icon="fas fa-download"
                      :disabled="dis_download"
                    >indir</button>
                  </a>
            </div>
        </div>
</template>
<script>
import { useUploadingStore } from '../../stores/uploading';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { uploadingService } from '../../services/uploadingService';
import { fileService } from '../../services/fileService';
import { socket } from '../../services/customServices/realTimeService';

import CustomInputFile from "../../components/shared/CustomInputFile.vue";
export default {
    props:['po'],
    computed: {
        ...mapState(useUploadingStore, [
            'getUploadingProductFolderList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])
    },
    components: {
        CustomInputFile
    },
    data() {
        return {
            tedarikciLink: null,
            selectedSupplier: {},
            dis_download:false,
            tedarikci_list:[],
        }
    },
    created() {
        

        uploadingService.getWorkermanSupplierList(this.po).then(data => {
            this.tedarikci_list = data;
            if (data.length > 0) {
                this.dis_download = false;
                this.tedarikciLink = `https://file-service.mekmar.com/file/download/40/${this.po}`;
            } else {
                this.dis_download = true;
            }
        });

        

    },
    methods: {

        faturaDosyaGonder(event) {
                if (event.size > 1000000) {
                alert("Evrak Boyutunu Kontrol Ediniz.");
            } else {
                const veri = {
                    evrak: this.po + '.pdf',
                    siparisno: this.po,
                    kullaniciAdi: localStorage.getItem('username'),
                };

                fileService
                    .faturaDosyaGonder(
                        event,
                        40,
                        this.po
                    )
                    .then((data) => {
                        console.log(data);
                        uploadingService.setWorkerman(veri).then((veri) => {
                            if (veri.Status) {
                                alert("Kayıt İşlemi Yapıldı.");
                                socket.socketIO.emit('uploading_folder_update_list_emit',this.po);
                                this.tedarikciLink = `https://file-service.mekmar.com/file/tedarikci/download/40/${this.po
                                    }/${this.selectedSupplier.tedarikci}`;

                            }
                        });
                    });
            }
        }
    }
}
</script>