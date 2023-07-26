<template>
    <div class="row m-auto mt-3" v-if="!getMobile">
        <div class="col-9">
            <TabView>
                <TabPanel header="Bilgiler">
                    <info/>
                </TabPanel>
                <TabPanel header="Ödemeler">
                    <paid/>
                </TabPanel>
                <TabPanel header="Fotoğraflar">
                    <images />
                </TabPanel>
            </TabView>
        </div>
        <div class="col-3">
            <button type="button" class="btn btn-success mb-3 w-100" @click="sampleProcess">Kaydet</button>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">Po</span>
                <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="getSampleModel.numuneNo" :disabled="sample_no_disabled">
            </div>
            <span class="p-float-label mb-4">
                <Calendar v-model="s_date" showIcon class="w-100" @date-select="sendingDateSelected($event)" dateFormat="dd/mm/yy"/>
                <label for="customer">Giriş Tarihi</label>
            </span>
            <span class="p-float-label mb-4">
                <Calendar v-model="l_date" showIcon class="w-100" @date-select="loadingDateSelected($event)" dateFormat="dd/mm/yy"/>
                <label for="customer">Yükleme Tarihi</label>
            </span>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedCustomer" dropdown :suggestions="filteredCustomerList" optionLabel="musteriAdi" @complete="customerSearch($event)" @item-select="customerSelected($event)"/>
                <label for="customer">Müşteri</label>
            </span>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulkeAdi" @complete="countrySearch($event)" @item-select="countrySelected($event)"/>
                <label for="customer">Ülke</label>
            </span>
            <div class="form-floating mb-4">
                <textarea class="form-control w-100"  placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px;padding-top:35px;" v-model="getSampleModel.adres"></textarea>
                <label for="floatingTextarea">Adres</label>
            </div>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedRepresentative" dropdown :suggestions="filteredRepresentativeList" optionLabel="name" @complete="representativeSearch($event)" @item-select="representativeSelected($event)"/>
                <label for="customer">Temsilci</label>
            </span>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">T.No</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getSampleModel.takip_No">
            </div>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">Parite</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getSampleModel.parite" @input="getSampleModel.parite = $filters.formatPoint($event.target.value)">
            </div>
        </div>
    </div>

    <div class="m-auto mt-3" v-if="getMobile">
        <div class="">
            <TabView>
                <TabPanel header="Bilgiler">
                    <info/>
                </TabPanel>
                <TabPanel header="Ödemeler">
                    <paid/>
                </TabPanel>
                <TabPanel header="Fotoğraflar">
                    <images />
                </TabPanel>
            </TabView>
        </div>
        <div class="">
            <button type="button" class="btn btn-success mb-3 w-100" @click="sampleProcess">Kaydet</button>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">Po</span>
                <input type="text" class="form-control"  aria-describedby="basic-addon1" v-model="getSampleModel.numuneNo" :disabled="sample_no_disabled">
            </div>
            <span class="p-float-label mb-4">
                <Calendar v-model="s_date" showIcon class="w-100" @date-select="sendingDateSelected($event)" dateFormat="dd/mm/yy"/>
                <label for="customer">Giriş Tarihi</label>
            </span>
            <span class="p-float-label mb-4">
                <Calendar v-model="l_date" showIcon class="w-100" @date-select="loadingDateSelected($event)" dateFormat="dd/mm/yy"/>
                <label for="customer">Yükleme Tarihi</label>
            </span>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedCustomer" dropdown :suggestions="filteredCustomerList" optionLabel="musteriAdi" @complete="customerSearch($event)" @item-select="customerSelected($event)"/>
                <label for="customer">Müşteri</label>
            </span>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedCountry" dropdown :suggestions="filteredCountryList" optionLabel="ulkeAdi" @complete="countrySearch($event)" @item-select="countrySelected($event)"/>
                <label for="customer">Ülke</label>
            </span>
            <div class="form-floating mb-4">
                <textarea class="form-control w-100"  placeholder="Leave a comment here" id="floatingTextarea" style="height: 100px;padding-top:35px;" v-model="getSampleModel.adres"></textarea>
                <label for="floatingTextarea">Adres</label>
            </div>
            <span class="p-float-label mb-4">
                <AutoComplete id="customer" class="w-100" v-model="selectedRepresentative" dropdown :suggestions="filteredRepresentativeList" optionLabel="name" @complete="representativeSearch($event)" @item-select="representativeSelected($event)"/>
                <label for="customer">Temsilci</label>
            </span>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">T.No</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getSampleModel.takip_No">
            </div>
            <div class="input-group mb-4">
                <span class="input-group-text" id="basic-addon1">Parite</span>
                <input type="text" class="form-control" aria-label="Username" aria-describedby="basic-addon1" v-model="getSampleModel.parite" @input="getSampleModel.parite = $filters.formatPoint($event.target.value)">
            </div>
        </div>
    </div>
</template>
<script>
import { useSampleStore } from '../../stores/sample';
import { useMobilStore } from '../../stores/mobil';
import { mapState } from 'pinia';

import { localDateService } from '../../services/localDateService';
import { sampleService } from '../../services/sampleService';
import { socket } from '../../services/customServices/realTimeService';


import info from '../../components/sample/newForm/info.vue';
import paid from '../../components/sample/newForm/paid.vue';
import images from '../../components/sample/newForm/images.vue';
export default {
    computed: {
        ...mapState(useSampleStore, [
            'getSampleModel',
            'getSampleCustomerList',
            'getSampleCountryList',
            'getSampleRepresentativeList',
            'getSampleNewButton'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    components: {
        info,
        paid,
        images,
    },
    data() {
        return {
            s_date: null,
            l_date: null,
            selectedCustomer: null,
            filteredCustomerList: [],
            selectedCountry: null,
            filteredCountryList: [],
            selectedRepresentative: null,
            filteredRepresentativeList: [],
            sample_no_disabled:false,
        }
    },
    created() {
        if (!this.getSampleNewButton) {
            this.sampleCreatedProcess();
        }
    },
    methods: {
        save() {
            this.getSampleModel.userId = localStorage.getItem('userId');
            this.getSampleModel.username = localStorage.getItem('username');
            sampleService.save(this.getSampleModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('sample_stock_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        },
        update() {
            const girisTarihi = this.getSampleModel.giristarih.split('-');
            const yuklemeTarihi = this.getSampleModel.yukleme_tarihi.split('-');

            this.getSampleModel.giristarih = girisTarihi[2] + '-' + girisTarihi[1] + '-' + girisTarihi[0];
            this.getSampleModel.yukleme_tarihi = yuklemeTarihi[2] + '-' + yuklemeTarihi[1] + '-' + yuklemeTarihi[0];
            this.getSampleModel.userId = localStorage.getItem('userId');
            this.getSampleModel.username = localStorage.getItem('username');
            this.getSampleModel.temsilci_id = this.selectedRepresentative.id;
            sampleService.update(this.getSampleModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('sample_stock_list_emit');
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });

                }
            })
        },
        sampleProcess() {
            if (this.getSampleNewButton) {
                this.save();
            } else {
                this.update();
            }
        },
        sampleCreatedProcess() {
            this.sample_no_disabled = true;
            this.s_date = localDateService.getStringDate(this.getSampleModel.giristarih);
            this.l_date = localDateService.getStringDate(this.getSampleModel.yukleme_tarihi);
            this.selectedCustomer = this.getSampleCustomerList.find(x => x.id == this.getSampleModel.musteriId);
            this.selectedCountry = this.getSampleCountryList.find(x => x.id == this.getSampleModel.ulke);
            this.selectedRepresentative = this.getSampleRepresentativeList.find(x => x.id == this.getSampleModel.temsilci);

        },
        representativeSelected(event) {
            this.getSampleModel.temsilci = event.value.name;
            this.getSampleModel.temsilci_id = event.value.id;

        },
        representativeSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSampleRepresentativeList;
            } else {
                result = this.getSampleRepresentativeList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredRepresentativeList = result;
        },
        countrySelected(event) {
            this.getSampleModel.ulkeAdi = event.value.ulkeAdi;
            this.getSampleModel.ulke = event.value.id;

        },
        countrySearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSampleCountryList;
            } else {
                result = this.getSampleCountryList.filter(x => {
                    return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCountryList = result;
        },
        customerSelected(event) {
            this.getSampleModel.musteriAdi = event.value.musteriAdi;
            this.getSampleModel.musteriId = event.value.id;

        },
        customerSearch(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getSampleCustomerList;
            } else {
                result = this.getSampleCustomerList.filter(x => {
                    return x.musteriAdi.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredCustomerList = result;
        },
        sendingDateSelected(event) {
            this.getSampleModel.giristarih = localDateService.getDateString(event);
        },
        loadingDateSelected(event) {
            this.getSampleModel.yukleme_tarihi = localDateService.getDateString(event);
        }
    }
}
</script>
<style scoped>

</style>