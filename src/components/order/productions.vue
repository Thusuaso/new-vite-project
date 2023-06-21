<template>
    <div class="container text-center">
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col" style="margin-top:7px;">
                        <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
                    </div>
                    <div class="col">
                        <Dropdown v-model="selectedYear" :options="years" optionLabel="year" class="w-full md:w-14rem" @change="changeYear($event)" />
                    </div>
                    <div class="col">
                        <button class="pi pi-file-excel btn btn-secondary" type="button" @click="excel_output_tr" style="margin-top:10px;"> TR</button>
                    </div>
                </div>

            </div>

            <div class="col">
                <div class="row">
                    <div class="col">
                        Tedarikçi:
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" value="Hepsi" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault1" v-model="supplierRadio" @change="supplierRadioInput"> 
                            <label class="form-check-label" for="flexRadioDefault1">
                                Hepsi
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" value="Mekmer" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault1" v-model="supplierRadio" @change="supplierRadioInput">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Mekmer
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" value="Dis" type="radio" name="flexRadioDefault"
                                id="flexRadioDefault1" v-model="supplierRadio" @change="supplierRadioInput">
                            <label class="form-check-label" for="flexRadioDefault1">
                                Dış
                            </label>
                        </div>
                    </div>

                </div>
                <div class="row">
                    <div class="col">
                        Satışçı:
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" value="Hepsi" type="radio" name="flexRadioDefault1"
                                id="flexRadioDefault2" v-model="sellerRadio" @change="sellerRadioChange">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Hepsi
                            </label>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-check">
                            <input class="form-check-input" value="Mekmar" type="radio" name="flexRadioDefault1"
                                id="flexRadioDefault2" v-model="sellerRadio" @change="sellerRadioChange">
                            <label class="form-check-label" for="flexRadioDefault2">
                                Mekmar
                            </label>
                        </div>
                    </div>
                    <div class="col">

                    </div>

                </div>
            </div>
        </div>
    </div>
    <br/>
    <productionsList :title="title"/>

    <Dialog v-model:visible="order_form" header="Yeni Sipariş" modal :style="{ width: '100vw' }">
        <orderForm/>
    </Dialog>
</template>
<script>
import productionsList from './productionsList.vue';
import { productionsService } from '../../services/productions';
import { useProductionsStore } from '../../stores/productions';
import { useLocalStore } from '../../stores/local';
import { mapState } from 'pinia';
import orderForm from '../../components/order/orderForm.vue';
export default {
    props:['title'],
    components: {
        productionsList,
        orderForm
    },
    computed: {
        ...mapState(useProductionsStore, [
            'getProductionsList',
            'getProductionsFilterList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ])
    },
    data() {
        return {
            order_form:false,
            sellerRadio: 'Hepsi',
            supplierRadio: 'Hepsi',
            years: [
                { year: 'Hepsi' },
                { year: '2023' },
                { year: '2022' },
                { year: '2021' },
                { year: '2020' },
                { year: '2019' },

            ],
            selectedYear: { year: 'Hepsi' },
        }
    },
    created() {
        if (this.$route.fullPath == '/siparisler/sevk') {
            this.selectedYear = { year: '2023' };
            this.years= [
                { year: '2023' },
                { year: '2022' },
                { year: '2021' },
                { year: '2020' },
                { year: '2019' }

            ]
        }
    },
    methods: {
        sellerRadioChange() {
            if (this.sellerRadio == 'Hepsi') {
                useProductionsStore().productions_list_load_act(this.getProductionsFilterList);

            } else if (this.sellerRadio == 'Mekmar'){
                const filter = this.getProductionsFilterList.filter(x => x.marketing == 'Mekmar');
                useProductionsStore().productions_list_load_act(filter);

            }
        },
        supplierRadioInput() {
            if (this.supplierRadio == 'Hepsi') {
                useProductionsStore().productions_list_load_act(this.getProductionsFilterList);
            } else if (this.supplierRadio == 'Mekmer') {
                const filter = this.getProductionsFilterList.filter(x => x.tedarikciAdi == 'Mekmer' || x.tedarikciAdi == 'Mek-Moz');
                useProductionsStore().productions_list_load_act(filter);
            } else if (this.supplierRadio == 'Dis') {
                const filter = this.getProductionsFilterList.filter(x => !(x.tedarikciAdi == 'Mekmer' || x.tedarikciAdi == 'Mek-Moz'));
                useProductionsStore().productions_list_load_act(filter);
            }
        },
        changeYear(event) {
            this.$emit('changeYearProductions',event.value.year)
        },
        newForm() {
            productionsService.getOrderDetailModel().then(data => {
                useProductionsStore().productions_detail_model_load_act(data);
                useProductionsStore().productions_new_button_load_act(true);
                useProductionsStore().products_save_button_status_load_act(false);
                this.order_form = true;
            })
        },
        excel_output_tr() {
            productionsService.getProductExcelList(this.getProductionsList).then((response) => {
                if (response.status) {
                    const link = document.createElement("a");
                    link.href = this.getLocalServiceUrl + "siparisler/dosyalar/uretimExcelCikti";
                    link.setAttribute("download", "Üretim_Listesi.xlsx");
                    document.body.appendChild(link);
                    link.click();
                }
            });
        }
    }
}
</script>