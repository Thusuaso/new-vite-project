<template>
    <div class="row">
        <div class="col-4">
            <div class="input-group mb-3" >
                <span class="input-group-text" id="basic-addon1">T.Tür</span>
                <Dropdown v-model="selectedDelivery" filter  :options="getProductDeliveryList" optionLabel="teslimTurAdi"  class="w-full md:w-14rem form-control" @change="changeDelivery($event)"/>
            </div>
            <div class="input-group mb-3" >
                    <span class="input-group-text" id="basic-addon1">Ö.Tür</span>
                    <Dropdown v-model="selectedPayment" filter  :options="getProductPaymentList" optionLabel="odemeTurAdi"  class="w-full md:w-14rem form-control" @change="changePayment($event)"/>
            </div>

            <Calendar class="w-100 mb-3" v-model="v_date"  showIcon inputId="birth_date" @date-select="selectedVDate($event)" />



            <div class="input-group mb-3" >
                <span class="input-group-text" id="basic-addon1">Ülke</span>
                <Dropdown v-model="selectedCountry" filter  :options="getCountryList" optionLabel="ulkeAdi"  class="w-full md:w-14rem form-control" @change="changeCountry($event)"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Ö.Açıklama</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.odemeAciklama">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Liman</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.liman">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">K.Ayrıntı</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.konteynerAyrinti">
            </div>
            <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">E.Gideri</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.evrakGideri" @input="changeCost">
            </div>
            <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Komisyon</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.komisyon" @input="changeCost">
                </div>
            <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">İade</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.iade">
            </div>
            <div class="input-group mb-3" >
                <span class="input-group-text" id="basic-addon1">Fatura</span>
                <Dropdown v-model="selectedInvoice" filter  :options="getInvoiceList" optionLabel="faturaKesimTurAdi"  class="w-full md:w-14rem form-control" @change="changeInvoice($event)"/>
            </div>
            
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getProductionsDetailModel.siparis.depo">
                <label class="form-check-label" for="flexCheckDefault">
                    Atlanta SM
                </label>
            </div>
            <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2" v-model="getProductionsDetailModel.siparis.maya" @input="saveButtonControl">
                    <label class="form-check-label" for="flexCheckDefault2">
                        Maya Odeme
                    </label>
                </div>



        </div>
        <div class="col-8">
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;" v-model="getProductionsDetailModel.siparis.uretimAciklama" @input="saveButtonControl"></textarea>
                <label for="floatingTextarea">Üretim Açıklama</label>
            </div>
            <br/>
            <div class="form-floating">
                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;" v-model="getProductionsDetailModel.siparis.sevkiyatAciklama" @input="saveButtonControl"></textarea>
                <label for="floatingTextarea">Sevkiyat Açıklama</label>
            </div>
            <br/>

            <div class="form-floating">
                <textarea   textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;" v-model="getProductionsDetailModel.siparis.finansAciklama" @input="saveButtonControl"></textarea>
                <label for="floatingTextarea">Finans Açıklama</label>
            </div>
            <br/>
            <FileUpload mode="basic" accept=".pdf" :maxFileSize="1000000" @select="onProformaUpload($event)" :auto="true" chooseLabel="Proforma"/>


        </div>
    </div>
    <br/>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">N. Satış</span>
      <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunSatis" @input="changeCost">
    </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">N. Firma</span>
      <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunFirma" @input="store.products_save_button_status_load_act(false)">
    </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">N. Alış</span>
      <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunAlis" @input="changeCost">
    </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">N. Alış Not</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunMekmarNot" @input="store.products_save_button_status_load_act(false)">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">D1 Satış</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_1" @input="changeCost">
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">Açıklama</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_1" @input="store.products_save_button_status_load_act(false)">
                </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">D1 Alış</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_1" @input="changeCost">
                    </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Açıklama</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_1" @input="store.products_save_button_status_load_act(false)">
                        </div>
        </div>
    </div>
    <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">D2 Satış</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_2" @input="changeCost">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Açıklama</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_2" @input="store.products_save_button_status_load_act(false)">
                    </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">D2 Alış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_2" @input="changeCost">
                        </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_2" @input="store.products_save_button_status_load_act(false)">
                            </div>
            </div>
    </div>
    <div class="row">
            <div class="col">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">D3 Satış</span>
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_3" @input="changeCost">
                </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Açıklama</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_3" @input="store.products_save_button_status_load_act(false)">
                    </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">D3 Alış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_3" @input="changeCost">
                        </div>
            </div>
            <div class="col">
                <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_3" @input="store.products_save_button_status_load_act(false)">
                            </div>
            </div>
    </div>
    <div class="row">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Mekus</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_4" @input="changeCost">
                    </div>
                </div>
                <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Açıklama</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_4" @input="store.products_save_button_status_load_act(false)">
                        </div>
                    </div>
                <div class="col">
                    <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">S. Satış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar_satis" @input="changeCost">
                        </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">S. Alış</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar" @input="changeCost">
                    </div>
                </div>
    </div>
</template>
<script>
import { useProductionsStore } from "../../stores/productions";
import { mapState } from 'pinia';
import { localDateService } from '../../services/localDateService';
import { fileService } from '../../services/fileService';
import { productionsService } from '../../services/productions';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDeliveryList',
            'getProductPaymentList',
            'getCountryList',
            'getInvoiceList',
            'getProductionsDetailModel',
            'productionNewButton',
        ])
    },
    data() {
        return {
            selectedDelivery: {},
            selectedPayment: {},
            selectedCountry: {},
            selectedInvoice:{},
            proformaFile:null,
            v_date: null,
            store:null,
      }  
    },
    created() {
        if (!this.productionNewButton) {
            this.proformaCreatedProcess()
        };
        this.store = useProductionsStore();

    },
    methods: {
        saveButtonControl() {
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changeCost() {
            useProductionsStore().product_total_load_act(this.getProductionsDetailModel);
            useProductionsStore().products_save_button_status_load_act(false);
        },
        onProformaUpload(event) {
            if (event.files[0].size > 1000000) {
                this.$toast.ad({severity:'error',detail:'Proforma Yükleme Başarısız, Lütfen Dosya Boyutunu Kontrol Ediniz.',life:3000})
            } else {
                productionsService.getProformaControl(this.getProductionsDetailModel.siparis.siparisNo).then(data=>{
                    if (data) {
                        alert('Proforma Zaten Mevcut');
                    }else{
                      fileService.sendProforma(event.files[0], 2, this.getProductionsDetailModel.siparis.siparisNo).then(data => {
                            if (data) {
                                const proformaData = {
                                    'id': 2,
                                    'siparisno': this.getProductionsDetailModel.siparis.siparisNo,
                                    'kullaniciId': localStorage.getItem('userId'),
                                }
                                productionsService.saveProforma(proformaData).then(data => {
                                    if (data.status) {
                                        this.$toast.add({ severity: 'success', detail: 'Evrak Başarıyla Yüklendi', life: 3000 })
                                    } else {
                                        this.$toast.add({ severity: 'error', detail: 'Evrak Yükleme Başarısız, Lütfen Tekrar Deneyiniz.', life: 3000 })

                                    }
                                })
                            } else {
                                this.$toast.add({ severity: 'error', detail: 'Evrak Yükleme Başarısız, Lütfen Tekrar Deneyiniz.', life: 3000 })
                            };
                        });  
                    };
                })
                


            }

        },
        proformaCreatedProcess() {
            this.selectedDelivery = this.getProductDeliveryList.find(x => x.id == this.getProductionsDetailModel.siparis.teslimTurId);
            this.selectedPayment = this.getProductPaymentList.find(x => x.id == this.getProductionsDetailModel.siparis.odemeTurId);
            this.selectedCountry = this.getCountryList.find(x => x.id == this.getProductionsDetailModel.siparis.ulkeId);
            this.selectedInvoice = this.getInvoiceList.find(x => x.id == this.getProductionsDetailModel.siparis.faturaKesimTurId);
            if (this.getProductionsDetailModel.siparis.vade == '' || this.getProductionsDetailModel.siparis.vade == null) {
                this.v_date = "";
            } else {
                this.v_date = localDateService.getStringDate(this.getProductionsDetailModel.siparis.vade);
            }
 
        },
        changeDelivery(event) {
            this.getProductionsDetailModel.siparis.teslimTurId = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changePayment(event) {
            if (event.value.id == 1 || event.value.id == 2) {
                this.getProductionsDetailModel.siparis.siparisDurumId = 1;
            } else if (event.value.id == 3) {
                this.getProductionsDetailModel.siparis.siparisDurumId = 2;
                this.getProductionsDetailModel.siparis.pesinat = 0;
            };
            if(event.value.id == 2 && localStorage.getItem('userId') == 12){
                this.emitter.emit('open_advanced_payment',false);
            }else{
                this.emitter.emit('open_advanced_payment', true);
            };
            if(event.value.id == 1){
                let result = 0;
                for(const item of this.getProductionsDetailModel.siparisUrunler){
                    result += item.satisToplam;
                }
                this.getProductionsDetailModel.siparis.pesinat = result;
            }
            this.getProductionsDetailModel.siparis.odemeTurId = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);

        },
        selectedVDate(event) {
            this.getProductionsDetailModel.siparis.vade = localDateService.getDateString(event);
            useProductionsStore().products_save_button_status_load_act(false);

        },
        changeCountry(event) {
            this.getProductionsDetailModel.siparis.ulkeId = event.value.id;
            this.getProductionsDetailModel.siparis.ulke = event.value.ulkeAdi;
            useProductionsStore().products_save_button_status_load_act(false);

        },
        changeInvoice(event) {
            this.getProductionsDetailModel.siparis.faturaKesimTurId = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);

        }
    },
    watch: {
    }
}
</script>
<style scoped>
    .input-group-text{
        width:100px;
    }
</style>