<template>
    <div v-if="!getMobile">
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
                <div class="input-group mb-3" style="height:60px;" >
                            <span class="input-group-text" id="basic-addon1" style="height:60px;">Vade</span>
                <Calendar id="vade" class="w-full md:w-14rem form-control" style="height:60px;" v-model="v_date"  showIcon inputId="birth_date" @date-select="selectedVDate($event)" dateFormat="dd/mm/yy"/>

                    </div>


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
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.evrakGideri" @input="changeCost('Evrak Gideri')">
                </div>
                <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Komisyon</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.komisyon" @input="changeCost('Komisyon')">
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
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.uretimAciklama" @input="saveButtonControl"></textarea>
                    <label for="floatingTextarea">Üretim Açıklama</label>
                </div>
                <br/>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.sevkiyatAciklama" @input="saveButtonControl"></textarea>
                    <label for="floatingTextarea">Sevkiyat Açıklama</label>
                </div>
                <br/>

                <div class="form-floating">
                    <textarea   textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.finansAciklama" @input="saveButtonControl"></textarea>
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
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunSatis" @input="changeCost('Navlun Satış')">
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
          <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunAlis" @input="changeCost('Navlun Alış')">
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
                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_1" @input="changeCost('Detay Satış 1')">
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
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_1" @input="changeCost('Detay Alış 1')">
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
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_2" @input="changeCost('Detay Satış 2')">
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
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_2" @input="changeCost('Detay Alış 2')">
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
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_3" @input="changeCost('Detay Satış 3')">
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
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_3" @input="changeCost('Detay Alış 3')">
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
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_4" @input="changeCost('Mekus Masrafı')">
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
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar_satis" @input="changeCost('Sigorta Satış')">
                            </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">S. Alış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar" @input="changeCost('Sigorta Alış')">
                        </div>
                    </div>
        </div>
    </div>

    <div v-if="getMobile">
            <div class="">
                <div class="">
                    <div class="input-group mb-3 w-100" >
                        <span class="input-group-text" id="basic-addon1">T.Tür</span>
                        <Dropdown v-model="selectedDelivery" filter  :options="getProductDeliveryList" optionLabel="teslimTurAdi"  class="w-full md:w-14rem form-control" @change="changeDelivery($event)"/>
                    </div>
                    <div class="input-group mb-3 " >
                            <span class="input-group-text" id="basic-addon1">Ö.Tür</span>
                            <Dropdown v-model="selectedPayment" filter  :options="getProductPaymentList" optionLabel="odemeTurAdi"  class="w-full md:w-14rem form-control" @change="changePayment($event)"/>
                    </div>
                    <div class="input-group mb-3 " >
                                <span class="input-group-text" id="basic-addon1">Vade</span>

                        </div>

                    <div class="input-group mb-3" style="height:60px;" >
                                <span class="input-group-text" id="basic-addon1" style="height:60px;">Vade</span>
                    <Calendar id="vade" class="h-100 mb-3" style="height:70px;" v-model="v_date"  showIcon inputId="birth_date" @date-select="selectedVDate($event)" dateFormat="dd/mm/yy"/>

                        </div>




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
                <div class="">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.uretimAciklama" @input="saveButtonControl"></textarea>
                        <label for="floatingTextarea">Üretim Açıklama</label>
                    </div>
                    <br/>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.sevkiyatAciklama" @input="saveButtonControl"></textarea>
                        <label for="floatingTextarea">Sevkiyat Açıklama</label>
                    </div>
                    <br/>

                    <div class="form-floating">
                        <textarea   textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea" style="height:150px;padding-top:35px;" v-model="getProductionsDetailModel.siparis.finansAciklama" @input="saveButtonControl"></textarea>
                        <label for="floatingTextarea">Finans Açıklama</label>
                    </div>
                    <br/>
                    <FileUpload class="w-100" mode="basic" accept=".pdf" :maxFileSize="1000000" @select="onProformaUpload($event)" :auto="true" chooseLabel="Proforma"/>


                </div>
            </div>
            <br/>
            <div class="">
                <div class="">
                    <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">N. Satış</span>
              <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunSatis" @input="changeCost">
            </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">N. Firma</span>
              <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunFirma" @input="store.products_save_button_status_load_act(false)">
            </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">N. Alış</span>
              <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunAlis" @input="changeCost">
            </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">N. Alış Not</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.navlunMekmarNot" @input="store.products_save_button_status_load_act(false)">
                    </div>
                </div>
            </div>
            <div class="">
                <div class="">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">D1 Satış</span>
                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_1" @input="changeCost">
                    </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Açıklama</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_1" @input="store.products_save_button_status_load_act(false)">
                        </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">D1 Alış</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_1" @input="changeCost">
                            </div>
                </div>
                <div class="">
                    <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_1" @input="store.products_save_button_status_load_act(false)">
                                </div>
                </div>
            </div>
            <div class="">
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">D2 Satış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_2" @input="changeCost">
                        </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_2" @input="store.products_save_button_status_load_act(false)">
                            </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">D2 Alış</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_2" @input="changeCost">
                                </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_2" @input="store.products_save_button_status_load_act(false)">
                                    </div>
                    </div>
            </div>
            <div class="">
                    <div class="">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">D3 Satış</span>
                            <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_3" @input="changeCost">
                        </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_3" @input="store.products_save_button_status_load_act(false)">
                            </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">D3 Alış</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAlis_3" @input="changeCost">
                                </div>
                    </div>
                    <div class="">
                        <div class="input-group mb-3">
                                        <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                        <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayMekmarNot_3" @input="store.products_save_button_status_load_act(false)">
                                    </div>
                    </div>
            </div>
            <div class="">
                        <div class="">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Mekus</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayTutar_4" @input="changeCost">
                            </div>
                        </div>
                        <div class="">
                                <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">Açıklama</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.detayAciklama_4" @input="store.products_save_button_status_load_act(false)">
                                </div>
                            </div>
                        <div class="">
                            <div class="input-group mb-3">
                                    <span class="input-group-text" id="basic-addon1">S. Satış</span>
                                    <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar_satis" @input="changeCost">
                                </div>
                        </div>
                        <div class="">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">S. Alış</span>
                                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getProductionsDetailModel.siparis.sigorta_tutar" @input="changeCost">
                            </div>
                        </div>
            </div>
        </div>

</template>
<script>
import { useProductionsStore } from "../../stores/productions";
import { useMobilStore } from '../../stores/mobil';
import { useProductCostStore } from '../../stores/productcost';
import { mapState } from 'pinia';
import { localDateService } from '../../services/localDateService';
import { fileService } from '../../services/fileService';
import { productionsService } from '../../services/productions';
import { socket } from '../../services/customServices/realTimeService';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDeliveryList',
            'getProductPaymentList',
            'getCountryList',
            'getInvoiceList',
            'getProductionsDetailModel',
            'productionNewButton',
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
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
        changeCost(event) {
            if (event == 'Navlun Satış') {
                this.getProductionsDetailModel.siparis.navlunSatis = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.navlunSatis);
                useProductCostStore().navlun_satis_change_act(this.getProductionsDetailModel.siparis.navlunSatis);
            } else if (event == 'Navlun Alış') {
                this.getProductionsDetailModel.siparis.navlunAlis = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.navlunAlis);
                useProductCostStore().navlun_alis_change_act(this.getProductionsDetailModel.siparis.navlunAlis);
            } else if (event == 'Detay Satış 1') {
                this.getProductionsDetailModel.siparis.detayTutar_1 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayTutar_1);
                useProductCostStore().detay_tutar1_change_act(this.getProductionsDetailModel.siparis.detayTutar_1);
            } else if (event == 'Detay Alış 1') {
                this.getProductionsDetailModel.siparis.detayAlis_1 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayAlis_1);
                useProductCostStore().detay_alis1_change_act(this.getProductionsDetailModel.siparis.detayAlis_1);
            } else if (event == 'Detay Satış 2') {
                this.getProductionsDetailModel.siparis.detayTutar_2 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayTutar_2);
                useProductCostStore().detay_tutar2_change_act(this.getProductionsDetailModel.siparis.detayTutar_2);
            } else if (event == 'Detay Alış 2') {
                this.getProductionsDetailModel.siparis.detayAlis_2 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayAlis_2);
                useProductCostStore().detay_alis2_change_act(this.getProductionsDetailModel.siparis.detayAlis_2);
            } else if (event == 'Detay Satış 3') {
                this.getProductionsDetailModel.siparis.detayTutar_3 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayTutar_3);
                useProductCostStore().detay_tutar3_change_act(this.getProductionsDetailModel.siparis.detayTutar_3);
            } else if (event == 'Detay Alış 3') {
                this.getProductionsDetailModel.siparis.detayAlis_3 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayAlis_3);
                useProductCostStore().detay_alis3_change_act(this.getProductionsDetailModel.siparis.detayAlis_3);
            } else if (event == 'Mekus Masrafı') {
                this.getProductionsDetailModel.siparis.detayTutar_4 = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.detayTutar_4);
                useProductCostStore().mekus_masrafi_change_act(this.getProductionsDetailModel.siparis.detayTutar_4);
            } else if (event == 'Sigorta Satış') {
                this.getProductionsDetailModel.siparis.sigorta_tutar_satis = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.sigorta_tutar_satis);
                useProductCostStore().sigorta_satis_change_act(this.getProductionsDetailModel.siparis.sigorta_tutar_satis);
            } else if (event == 'Sigorta Alış') {
                this.getProductionsDetailModel.siparis.sigorta_tutar = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.sigorta_tutar);
                useProductCostStore().sigorta_alis_change_act(this.getProductionsDetailModel.siparis.sigorta_tutar);
            } else if (event == 'Komisyon') {
                this.getProductionsDetailModel.siparis.komisyon = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.komisyon);
                useProductCostStore().komisyon_change_act(this.getProductionsDetailModel.siparis.komisyon);
            } else if (event == 'Evrak Gideri') {
                this.getProductionsDetailModel.siparis.evrakGideri = this.$filters.formatPoint(this.getProductionsDetailModel.siparis.evrakGideri);
                useProductCostStore().evrak_gideri_change_act(this.getProductionsDetailModel.siparis.evrakGideri);
            }
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
                                        socket.socketIO.emit('products_detail_update_emit', this.getProductionsDetailModel.siparis.siparisNo);
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
            } else{
                this.getProductionsDetailModel.siparis.siparisDurumId = 2;
            }
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