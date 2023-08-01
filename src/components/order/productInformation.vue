<template>
    <div v-if="!getMobile">
            <div class="input-group mb-4 mt-3 ">
          <span class="input-group-text " id="basic-addon1">PO</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.siparisNo" :disabled="getProductionsNewButton ? false : true">
        </div>
        <span class="p-float-label mb-4 w-100">
            <Calendar v-model="o_date" inputId="o_date" showIcon class="w-100" @date-select="selectedODate($event)" :disabled="getProductionsNewButton ? false : true" dateFormat="dd/mm/yy"/>
            <label for="o_date">Sipariş Tarihi</label>
        </span>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="e_l_date" inputId="e_l_date" showIcon class="w-100" @date-select="selectedELDate($event)" :disabled="getProductionsNewButton ? false : true" dateFormat="dd/mm/yy"/>
            <label for="e_l_date">Tahmini Yükleme Tarihi</label>
        </span>
        <div class="input-group mb-3" >
            <span class="input-group-text " id="basic-addon1">Müşteri</span>
            <Dropdown v-model="selectedCustomer" filter  :options="getCustomersList" :disabled="getProductionsNewButton ? false : true" optionLabel="firmaAdi"  class="w-full md:w-14rem form-control" @change="changeCustomer($event)"/>
        </div>
        <br/>
        <div class="input-group mb-3" >
            <span class="input-group-text " id="basic-addon1">Satışçı</span>
            <Dropdown v-model="selectedSalesman" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeSalesman($event)"/>
        </div>
        <div class="input-group mb-3" >
                <span class="input-group-text" id="basic-addon1">Operasyon</span>
                <Dropdown v-model="selectedOperation" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeOperation($event)"/>
        </div>
        <div class="input-group mb-3" >
            <span class="input-group-text" id="basic-addon1">Finansman</span>
            <Dropdown v-model="selectedFinance" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeFinance($event)"/>
        </div>
        <br/>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.productTotal"/>
        </div>
        <div class="input-group mb-4 mt-3 w-100">
                <span class="input-group-text " id="basic-addon1">Navlun</span>
                <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.productFreight"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">D. Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.otherTotal"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">G.Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.generalTotal"/>
        </div>
        <div class="input-group mb-4 mt-3 ">
            <span class="input-group-text " id="basic-addon1">Peşinat</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" :disabled="advanced_payment_disabled" v-model="productionsDetailModel.siparis.pesinat"/>
        </div>
        <br/>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="l_date" inputId="l_date" showIcon class="w-100" @date-select="selectedLDate($event)" dateFormat="dd/mm/yy"/>
            <label for="l_date">Yükleme Tarihi</label>
        </span>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="e_date" inputId="e_date" showIcon class="w-100" @date-select="selectedEDate($event)" dateFormat="dd/mm/yy"/>
            <label for="e_date">Eta Tarihi</label>
        </span>
        <div class="input-group mb-4 mt-3 ">
            <span class="input-group-text " id="basic-addon1">Kont. No</span>
            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.konteynerNo">
        </div>
        <div class="input-group mb-4 mt-3 ">
                <span class="input-group-text " id="basic-addon1">Sip. F. No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.siparisFaturaNo">
        </div>
        <br/>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Üretici</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.producer"/>


        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">İşçilik</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.workmanship"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Navlun</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.freight"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Diğer</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.other"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Komisyon</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.commission"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Fob</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.fob"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Genel</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.general"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Profit ($)</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.profit"/>

        </div>
    </div>
    <div v-if="getMobile">
        <div class="input-group mb-4 mt-3 ">
          <span class="input-group-text " id="basic-addon1">PO</span>
          <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.siparisNo" :disabled="getProductionsNewButton ? false : true">
        </div>
        <span class="p-float-label mb-4 w-100">
            <Calendar v-model="o_date" inputId="o_date" showIcon class="w-100" @date-select="selectedODate($event)" :disabled="getProductionsNewButton ? false : true" dateFormat="dd/mm/yy"/>
            <label for="o_date">Sipariş Tarihi</label>
        </span>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="e_l_date" inputId="e_l_date" showIcon class="w-100" @date-select="selectedELDate($event)" :disabled="getProductionsNewButton ? false : true" dateFormat="dd/mm/yy"/>
            <label for="e_l_date">Tahmini Yükleme Tarihi</label>
        </span>
        <div class="input-group mb-3" >
            <span class="input-group-text " id="basic-addon1">Müşteri</span>
            <Dropdown v-model="selectedCustomer" filter  :options="getCustomersList" :disabled="getProductionsNewButton ? false : true" optionLabel="firmaAdi"  class="w-full md:w-14rem form-control" @change="changeCustomer($event)"/>
        </div>
        <br/>
        <div class="input-group mb-3" >
            <span class="input-group-text " id="basic-addon1">Satışçı</span>
            <Dropdown v-model="selectedSalesman" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeSalesman($event)"/>
        </div>
        <div class="input-group mb-3" >
                <span class="input-group-text" id="basic-addon1">Operasyon</span>
                <Dropdown v-model="selectedOperation" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeOperation($event)"/>
        </div>
        <div class="input-group mb-3" >
            <span class="input-group-text" id="basic-addon1">Finansman</span>
            <Dropdown v-model="selectedFinance" filter  :options="getUserList" optionLabel="kullaniciAdi"  class="w-full md:w-14rem form-control" @change="changeFinance($event)"/>
        </div>
        <br/>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.productTotal"/>
        </div>
        <div class="input-group mb-4 mt-3 w-100">
                <span class="input-group-text " id="basic-addon1">Navlun</span>
                <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.productFreight"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">D. Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.otherTotal"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">G.Toplam</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductTotal.generalTotal"/>
        </div>
        <div class="input-group mb-4 mt-3 ">
            <span class="input-group-text " id="basic-addon1">Peşinat</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" :disabled="advanced_payment_disabled" v-model="productionsDetailModel.siparis.pesinat"/>
        </div>
        <br/>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="l_date" inputId="l_date" showIcon class="w-100" @date-select="selectedLDate($event)" dateFormat="dd/mm/yy"/>
            <label for="l_date">Yükleme Tarihi</label>
        </span>
        <span class="p-float-label mb-3 w-100">
            <Calendar v-model="e_date" inputId="e_date" showIcon class="w-100" @date-select="selectedEDate($event)" dateFormat="dd/mm/yy"/>
            <label for="e_date">Eta Tarihi</label>
        </span>
        <div class="input-group mb-4 mt-3 ">
            <span class="input-group-text " id="basic-addon1">Kont. No</span>
            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.konteynerNo">
        </div>
        <div class="input-group mb-4 mt-3 ">
                <span class="input-group-text " id="basic-addon1">Sip. F. No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="productionsDetailModel.siparis.siparisFaturaNo">
        </div>
        <br/>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Üretici</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.producer"/>


        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">İşçilik</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.workmanship"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Navlun</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.freight"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Diğer</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.other"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Komisyon</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.commission"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Fob</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.fob"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Genel</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.general"/>

        </div>
        <div class="input-group mb-4 mt-3 w-100">
            <span class="input-group-text " id="basic-addon1">Profit ($)</span>
            <InputNumber inputId="currency-us" mode="currency" currency="USD" locale="en-US" disabled v-model="getProductCost.profit"/>

        </div>
    </div>

</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';
import {localDateService} from '../../services/localDateService'
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'productionsDetailModel',
            'getCustomersList',
            'getProductionsNewButton',
            'getUserList',
            'getProductTotal',
            'getProductCost'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    data() {
        return {
            o_date: "",
            e_l_date: "",
            l_date: "",
            e_date:"",
            selectedCustomer: {},
            selectedSalesman: {},
            selectedOperation: {},
            selectedFinance: {},
            advanced_payment_disabled:true,
        }
    },
    methods: {
        selectedEDate(event) {
            this.productionsDetailModel.siparis.eta = localDateService.getDateString(event);
            useProductionsStore().products_save_button_status_load_act(false);
        },
        selectedLDate(event) {
            this.productionsDetailModel.siparis.yuklemeTarihi = localDateService.getDateString(event);
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changeFinance(event) {
            this.productionsDetailModel.siparis.finansman = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changeOperation(event) {
            this.productionsDetailModel.siparis.operasyon = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changeSalesman(event) {
            this.productionsDetailModel.siparis.siparisSahibi = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);
        },
        selectedELDate(event) {
            this.productionsDetailModel.siparis.TahminiyuklemeTarihi = localDateService.getDateString(event);
            useProductionsStore().products_save_button_status_load_act(false);
        },
        selectedODate(event) {
            
            this.productionsDetailModel.siparis.siparisTarihi = localDateService.getDateString(event);
            useProductionsStore().products_save_button_status_load_act(false);
        },
        changeCustomer(event) {
            this.productionsDetailModel.siparis.musteriAdi = event.value.firmaAdi;
            this.productionsDetailModel.siparis.musteriId = event.value.id;
            useProductionsStore().products_save_button_status_load_act(false);

        },
        productInformationCreated() {
            this.selectedCustomer = this.getCustomersList.find(x => x.id == this.productionsDetailModel.siparis.musteriId);

            if (this.productionsDetailModel.siparis.siparisTarihi == '' || this.productionsDetailModel.siparis.siparisTarihi == null) {
                this.o_date = "";
            } else {
                this.o_date = localDateService.getStringDate(this.productionsDetailModel.siparis.siparisTarihi);
            }

            if (this.productionsDetailModel.siparis.yuklemeTarihi == '' || this.productionsDetailModel.siparis.yuklemeTarihi == null) {
                this.l_date = "";
            } else {
                this.l_date = localDateService.getStringDate(this.productionsDetailModel.siparis.yuklemeTarihi);
            }

            if (this.productionsDetailModel.siparis.eta == '' || this.productionsDetailModel.siparis.eta == null) {
                this.e_date = "";
            } else {
                this.e_date = localDateService.getStringDate(this.productionsDetailModel.siparis.eta);
            }
            if (this.productionsDetailModel.siparis.TahminiyuklemeTarihi == '' || this.productionsDetailModel.siparis.TahminiyuklemeTarihi == null) {
                this.e_l_date = "";
            } else {
                this.e_l_date = localDateService.getStringDate(this.productionsDetailModel.siparis.TahminiyuklemeTarihi)
            }


            this.selectedSalesman = this.getUserList.find(x=>x.id == this.productionsDetailModel.siparis.siparisSahibi);
            this.selectedOperation = this.getUserList.find(x => x.id == this.productionsDetailModel.siparis.operasyon);
            this.selectedFinance = this.getUserList.find(x => x.id == this.productionsDetailModel.siparis.finansman)
        }
    },
    created() {
        if (!this.getProductionsNewButton) {
            this.productInformationCreated();
        }
    },
    mounted() {
        this.emitter.on('open_advanced_payment',(value)=>{
            this.advanced_payment_disabled = value;
        })
    }
}
</script>
<style scoped>
    .input-group-text{
        width:30%;
    }
    div{
        text-align:center;
    }
</style>