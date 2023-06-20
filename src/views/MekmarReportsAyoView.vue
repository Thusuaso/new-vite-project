<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <Dropdown v-model="selectedYear" :options="getMekmarAyoYearList" optionLabel="yil" class="w-full md:w-14rem" @change="yearChange($event)" :disabled="mekmar_ayo_date_form"/>
        </div>
        <div class="col">
            <Dropdown v-model="selectedMonth" :options="getMekmarAyoMonthList" optionLabel="ay_str" class="w-full md:w-14rem" @change="monthChange($event)" :disabled="mekmar_ayo_date_form"/>
        </div>
        <div class="col">
            <div class="form-check mt-2">
                <input class="form-check-input" type="checkbox" value="hepsi" id="flexCheckDefault" v-model="allAyoReports" @change="allAyoReportsChange($event)">
                <label class="form-check-label" for="flexCheckDefault">
                    Hepsi
                </label>
            </div>
        </div>
        <div class="col">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Profit ($)</th>
                        <th scope="col">Profit (₺)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Toplam</th>
                        <td>{{ $filters.formatPrice(getMekmarAyoTotalList.gain_usd) }}</td>
                        <td>{{ $filters.formatPriceTl(getMekmarAyoTotalList.gain_tl) }}</td>
                    </tr>

                </tbody>
            </table>
        </div>

    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable 
                    v-model:value="getMekmarAyoList" 
                    tableStyle="font-size:80%"
                    class="p-datatable-sm"
                    v-model:filters="filters"
                    filterDisplay="row"
                    @filter="mekmarAyoFilter($event)"
                    v-model:selection="selectedMekmarAyo"
                    selectionMode="single"
                    @row-click="mekmarAyoSelected($event)"
                >
                <Column 
                    field="siparisci" 
                    header="Satışçı"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="operasyon" 
                    header="Operasyon"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="musteri_adi" 
                    header="Müşteri"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="siparis_no" 
                    header="Po"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >   
                    <template #body="slotProps">
                        <div :style="{ backgroundColor: slotProps.data.alisFiyatiKontrol }">
                            {{ slotProps.data.siparis_no }}
                        </div>
                    </template>
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="marketing" 
                    header="Marketing"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="faturatur" 
                    header="Fatura"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="siparis_tarihi" 
                    header="S.Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="yukleme_tarihi" 
                    header="Y.Tarihi"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="ulke_adi" 
                    header="Ülke"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column 
                    field="teslim_sekli" 
                    header="Teslim"
                    :showFilterMenu="false"
                    :showFilterOperator="false"
                    :showClearButton="false"
                    :showApplyButton="false"
                    :showFilterMatchModes="false"
                    :showAddButton="false"
                >
                    <template #filter="{ filterModel, filterCallback }">
                        <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" />
                    </template>
                </Column>
                <Column field="toplam_bedel" header="Proforma">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.toplam_bedel) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.total) }}
                    </template>
                </Column>
                <Column field="mekmar_alim" header="Mekmer Ü.">
                    <template #body="slotProps">
                        <div 
                            :style="{
                                'background-color':
                                    slotProps.data.mekmar_alim > 0 &&
                                        slotProps.data.mekmar_alim_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.mekmar_alim) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.mekmar) }}
                    </template>
                </Column>
                <Column field="mekmoz_alim" header="Mekmoz Ü.">
                    <template #body="slotProps">
                        <div 
                            :style="{
                                'background-color':
                                    slotProps.data.mekmoz_alim > 0 &&
                                        slotProps.data.mekmoz_alim_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.mekmoz_alim) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.mekmoz) }}
                    </template>
                </Column>
                <Column field="dis_alim" header="Dış Alım">
                    <template #body="slotProps">
                        <div 
                            :style="{
                                'background-color':
                                    (slotProps.data.dis_alim > 0 &&
                                        slotProps.data.dis_alim_tedarikci_sayisi !=
                                        slotProps.data.tedarikci_sayisi) ||
                                        slotProps.data.dis_alim_fatura_sayisi !=
                                        slotProps.data.tedarikci_sayisi
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.dis_alim) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.external) }}
                    </template>
                </Column>

                <Column field="nakliye" header="Nakliye">
                    <template #body="slotProps">
                        <div 
                            :style="{
                                'background-color':
                                    slotProps.data.nakliye_evrak.length == 0 &&
                                        slotProps.data.nakliye > 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.nakliye) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.transport) }}
                    </template>
                </Column>
                <Column field="gumruk" header="Gümrük">
                    <template #body="slotProps">
                        <div 
                            :style="{
                                'background-color':
                                    slotProps.data.gumruk_evrak.length == 0 &&
                                        slotProps.data.gumruk > 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.gumruk) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.duty) }}
                    </template>
                </Column>
                <Column field="ilaclama" header="İlaçlama">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.ilaclama_evrak.length == 0 &&
                                        slotProps.data.ilaclama > 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.ilaclama) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.spraying) }}
                    </template>
                </Column>
                <Column field="liman" header="Liman">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.liman_evrak.length == 0 &&
                                        slotProps.data.liman > 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.liman) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.port) }}
                    </template>
                </Column>
                <Column field="sigorta" header="Sigorta">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.sigorta_id == 1 &&
                                        slotProps.data.sigorta == 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >   
                        {{ $filters.formatPrice(slotProps.data.sigorta) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.insurance) }}
                    </template>
                </Column>
                <Column field="navlun" header="Navlun">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.navlun > 0 &&
                                        slotProps.data.navlun_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.navlun) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.freight) }}
                    </template>
                </Column>
                <Column field="lashing" header="Lashing">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.lashing > 0 &&
                                        slotProps.data.lashing_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.lashing) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.lashing) }}
                    </template>
                </Column>
                <Column field="booking" header="Booking">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.booking > 0 &&
                                        slotProps.data.booking_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.booking) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.booking) }}
                    </template>
                </Column>
                <Column field="spazlet" header="Spanzlet">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.spazlet > 0 &&
                                        slotProps.data.spazlet_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.spazlet) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.spanzlet) }}
                    </template>
                </Column>
                <Column field="detay_1" header="Diğer 1">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_1) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.detail_1) }}
                    </template>
                </Column>
                <Column field="detay_2" header="Diğer 2">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_2) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.detail_2) }}
                    </template>
                </Column>
                <Column field="detay_3" header="Diğer 3">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.detay_3) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.detail_3) }}
                    </template>
                </Column>
                <Column field="mekus_masraf" header="Mekus">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.mekus_id == 1 ? '#ADFF2F' : '',
                            }"
                        >
                        {{ $filters.formatPrice(slotProps.data.mekus_masraf) }}

                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.mekus) }}
                    </template>
                </Column>
                <Column field="pazarlama" header="Pazarlama">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.pazarlama) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.marketing) }}
                    </template>
                </Column>
                <Column field="ozel_iscilik" header="Özel İşçilik">
                    <template #body="slotProps">
                        <div
                            :style="{
                                'background-color':
                                    slotProps.data.ozel_iscilik > 0 &&
                                        slotProps.data.ozel_iscilik_evrak.length <= 0
                                        ? '#F1948A'
                                        : '',
                            }"
                        >
                            {{ $filters.formatPrice(slotProps.data.ozel_iscilik) }}
                        </div>
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.special_workerman) }}
                    </template>
                </Column>
                <Column field="banka_masrafi" header="Banka">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.banka_masrafi) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.bank) }}
                    </template>
                </Column>
                <Column field="kurye_masrafi" header="Kurye">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kurye_masrafi) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.carrier) }}
                    </template>
                </Column>
                <Column field="masraf_toplam" header="Toplam">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.masraf_toplam) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.cost) }}
                    </template>
                </Column>
                <Column field="kar_zarar" header="Profit / USD">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.kar_zarar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarAyoTotalList.gain_usd) }}
                    </template>
                </Column>
                <Column field="kar_zarar_tl" header="Profit / TRY">
                    <template #body="slotProps">
                        {{ $filters.formatPriceTl(slotProps.data.kar_zarar_tl) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPriceTl(getMekmarAyoTotalList.gain_tl) }}
                    </template>
                </Column>
                <Column field="kar_zarar_tl_yuzdesi" header="Kar Zarar(%)">
                    <template #body="slotProps">
                        % {{ slotProps.data.kar_zarar_tl_yuzdesi }}
                    </template>
                </Column>
                <Column field="dosya_kapanma_date" header="Kapanma T."></Column>
            </DataTable>
        </div>
    </div>
    <Dialog v-model:visible="ayo_detail_form" :header="po" modal>
        <mekmarReportsAyoDetail />
    </Dialog>
</template>
<script>
import { useReportsStore } from '../stores/reports';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { reportsService } from '../services/reportsService';

import { FilterMatchMode } from 'primevue/api';

import mekmarReportsAyoDetail from '../components/reports/mekmarReportsAyoDetail.vue';
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarAyoList',
            'getMekmarAyoTotalList',
            'getMekmarAyoYearList',
            'getMekmarAyoMonthList',
        ])
    },
    components: {
        mekmarReportsAyoDetail
    },
    data() {
        return {
            filters: {
                siparisci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                operasyon: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                musteri_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_no: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                marketing: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                faturatur: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                siparis_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                yukleme_tarihi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ulke_adi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                teslim_sekli: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
            selectedYear: {},
            selectedMonth: {},
            allAyoReports: false,
            mekmar_ayo_date_form: false,
            ayo_detail_form: false,
            selectedMekmarAyo: {},
            po: "",
        }
    },
    created() {
        
    },
    methods: {
        mekmarAyoSelected(event) {
            useLoadingStore().begin_loading_act();
            this.po = event.data.siparis_no;
            reportsService.getMekmarAyoDetailList(event.data.siparis_no).then(data => {
                useReportsStore().mekmar_ayo_detail_list_load_act(data);
                this.ayo_detail_form = true;
                useLoadingStore().end_loading_act();
            })
        },
        allAyoReportsChange(event) {
            if (event.target._modelValue) {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmarAyoListAll(this.selectedYear.yil).then(data => {
                    useReportsStore().mekmar_ayo_list_load_act(data);
                    this.mekmar_ayo_date_form = true;
                    useLoadingStore().end_loading_act();
                })
            } else {
                useLoadingStore().begin_loading_act();
                reportsService.getMekmarAyoList(this.selectedYear.yil, this.selectedMonth.ay).then(data => {
                    useReportsStore().mekmar_ayo_list_load_act(data);
                    this.mekmar_ayo_date_form = false;
                    useLoadingStore().end_loading_act();

                })
            }
        },
        monthChange(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarAyoList(this.selectedYear.yil, event.value.ay).then(data => {
                useReportsStore().mekmar_ayo_list_load_act(data);
                useLoadingStore().end_loading_act();

            })
        },
        yearChange(event) {
            useLoadingStore().begin_loading_act();
            reportsService.getMekmarAyoMonthList(event.value.yil).then(months=>{
                useReportsStore().mekmar_ayo_month_list_load_act(months);
                reportsService.getMekmarAyoList(event.value.yil, months[0].ay).then(data => {
                    useReportsStore().mekmar_ayo_list_load_act(data);
                    useLoadingStore().end_loading_act();

                })
            })
        },
        mekmarAyoFilter(event) {
            useReportsStore().mekmar_ayo_total_list_load_act(event.filteredValue);
        }
    },
    watch: {
        getMekmarAyoYearList(){
            this.selectedYear = this.getMekmarAyoYearList[0];
        },
        getMekmarAyoMonthList() {
            this.selectedMonth = this.getMekmarAyoMonthList[0];
        }
    }
}
</script>