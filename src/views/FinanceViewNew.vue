<template>
    <div class="row m-auto">
        <div class="col">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" @click="finance_all($event)">
                <label class="form-check-label" for="flexSwitchCheckDefault">Hepsi</label>
            </div>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="collection">Tahsilat</button>
        </div>
        <div class="col">
            <button type="button" class="btn btn-primary" @click="advancePayment">Peşinat</button>
        </div>
        <div class="col-1">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="konteyner" v-model="excel_radio_button" checked>
                <label class="form-check-label" for="flexRadioDefault1">
                    Konteynır
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="depo" v-model="excel_radio_button" >
                <label class="form-check-label" for="flexRadioDefault2">
                    Depo
                </label>
            </div>
        </div>
        <div class="col">
            <button type="button" class="btn btn-secondary" @click="excel_finance_list">Excel</button>
        </div>
    </div>
    <br/>
    <div class="row m-auto">
        <div class="col-8">
            <list/>
        </div>
        <div class="col-4">
            <warehouseList/>
            <expiryList/>
        </div>
    </div>
    <Dialog v-model:visible="is_collection_form" header="Tahsilat Listesi" modal :style="{ 'width': '100vw' }">
        <collectionList/>
    </Dialog>
    <Dialog v-model:visible="is_advanced_payment_form" header="Peşinat" modal :style="{ 'width': '100vw' }">
        <advancedPayment/>
    </Dialog>
</template>
<script>
import list from '../components/financenew/list.vue';
import warehouseList from '../components/financenew/warehouseList.vue';
import expiryList from '../components/financenew/expiryList.vue';
import collectionList from '../components/financenew/collectionList.vue';
import advancedPayment from '../components/financenew/advancedPayment.vue';

import { financeServiceNew } from '../services/financeServiceNew';

import { useFinanceStoreNew } from '../stores/financenew';
import { useLoadingStore } from '../stores/loading';
import { useLocalStore } from '../stores/local';
import { mapState } from 'pinia';
export default {
    components: {
        list,
        warehouseList,
        expiryList,
        collectionList,
        advancedPayment
    },
    computed: {
        ...mapState(useFinanceStoreNew, [
            'getFinanceList',
            'getFinanceListNotFilter',
            'getShowingFinanceList',
            'getWarehouseList'
        ]),
        ...mapState(useLocalStore, [
            'url'
        ])
    },
    data() {
        return {
            is_collection_form: false,
            is_advanced_payment_form: false,
            excel_radio_button: 'konteyner',
        }
    },
    methods: {
        excel_finance_list() {
            if (this.excel_radio_button == "konteyner") {
                financeServiceNew.getFinanceExcelList(this.getShowingFinanceList).then((response) => {
                    if (response.status) {
                        const link = document.createElement("a");
                        link.href =
                            this.url + "finans/dosyalar/konteynerExcelCikti";

                        link.setAttribute("download", "konteyter_listesi.xlsx");
                        document.body.appendChild(link);
                        link.click();
                    }
                });
            } else {
                financeServiceNew.getWarehouseExcelList(this.getWarehouseList).then((x) => {
                    if (x.status) {
                        const link = document.createElement("a");
                        link.href = this.url + "finans/dosyalar/depoExcelCikti";
                        link.setAttribute("download", "depo_listesi.xlsx");
                        document.body.appendChild(link);
                        link.click();

                    }
                });
            }
        },
        finance_all(event) {
            if (event.target.checked == true) {
                useFinanceStoreNew().showing_finance_list_load_act(this.getFinanceListNotFilter);

            } else {
                useFinanceStoreNew().showing_finance_list_load_act(this.getFinanceList);
            }   

        },
        collection() {
            useLoadingStore().begin_loading_act();
            financeServiceNew.getFinanceCollectionYearList().then(year => {
                useFinanceStoreNew().finance_collection_year_list_load_act(year);
                financeServiceNew.getFinanceCollectionMonthList(year[0].yil).then(month => {
                    useFinanceStoreNew().finance_collection_month_list_load_act(month);
                    financeServiceNew.getFinanceCollectionList(year[0].yil, month[0].ay).then(data => {
                        useFinanceStoreNew().finance_collection_list_load_act(data);
                        useLoadingStore().end_loading_act();
                        this.is_collection_form = true;

                    });
                });
            });
        },
        advancePayment() {
            useLoadingStore().begin_loading_act();
            financeServiceNew.getAdvancedPaymentList().then(data => {
                useFinanceStoreNew().finance_advanced_payment_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.is_advanced_payment_form = true;
            })
        }
    }
}
</script>
<style scoped>

</style>