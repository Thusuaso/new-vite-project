<template>
    <div v-if="!getMobile">
            <div class="row m-2">
            <div class="col-3 ">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Üretici</th>
                            <th scope="col">Ay</th>
                            <th scope="col">Yıl</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of getProductSummaryList" :key="item">
                            <th scope="row">{{ item.tanim }}</th>
                            <td>{{ $filters.formatDecimal(item.ay) }}</td>
                            <td>{{ $filters.formatDecimal(item.yil) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <b>Toplam</b>
                            </td>
                            <td>
                               <b>{{ $filters.formatDecimal(allSummarySum) }} ({{ $filters.formatDecimal(mekmerSummarySum) }})</b> 
                            </td>
                            <td>
                            
                                <b>{{ $filters.formatDecimal(allYearSummarySum) }}</b>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="col-1">
                <button type="button" class="btn btn-success" @click="newForm">Yeni</button>
            </div>
            <div class="col-2 text-left">
                    <button type="button" class="btn btn-danger m-1 w-50" :disabled="getBtnFormMekmer" @click="mekmer">Mekmer</button>
                    <br/>
                    <button type="button" class="btn btn-primary m-1 w-50" :disabled="getBtnFormOuter" @click="outer">Dış</button>
                    <br/>
                    <button type="button" class="btn btn-secondary m-1 w-50" :disabled="getBtnFormMekmerOuter" @click="mekmerOuter">Mekmer Dış</button>
                    <br/>
                    <button type="button" class="btn btn-warning m-1 w-50" :disabled="getBtnFormNotFound" @click="notFound">Bulunamadı</button>
                    <br/>
                    <button type="button" class="btn btn-info m-1 w-50"  @click="collectiveCrate">Toplu Kasa</button>
            </div>
            <div class="col">
                <button type="text" class="btn btn-secondary" @click="excel_output_list">Excel</button>
                <br/>
                <br/>
                <Calendar v-model="l_date" showIcon dateFormat="dd/mm/yy"/>
                <button type="text" class="btn btn-primary" @click="ticketExcelList" style="margin-left:10px;margin-top:-5px;">Etiket</button>
                <br/>
                <br/>
                <button type="button"  class="btn btn-dark" @click="$refs.op.toggle($event)" >Efe Etiketleri</button>

                <OverlayPanel ref="op">
                <Dropdown v-model="selectedEfeTicket" :options="efeTickets" optionLabel="name" placeholder="Etiket Seç" @change="downloadEfeTicket($event)"/>
        
                <a :href="ticketLink" download type="button" class="btn btn-secondary" v-if="!isEfeTicketForm">İndir</a>
                </OverlayPanel>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col p-3">
                        <Dropdown v-model="selectedVeikBox" :options="etiketlerVeikKutu" optionLabel="urun" placeholder="Veik Kutu" class="w-100" @change="isDropDownChange($event)"/>
                    </div>
                    <div class="col p-3">
                        <Dropdown v-model="selectedVeikCrate" :options="etiketlerVeikKasa" optionLabel="urun" placeholder="Veik Kasa" class="w-100" @change="isDropDownChange($event)"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col p-3">
                        <Dropdown v-model="selectedNovaBox" :options="etiketlerNovaKutu" optionLabel="urun" placeholder="Nova Kutu" class="w-100" @change="isDropDownChange($event)" />
                    </div>
                    <div class="col p-3">
                        <Dropdown v-model="selectedNovaCrate" :options="etiketlerNovaKasa" optionLabel="urun" placeholder="Nova Kasa" class="w-100" @change="isDropDownChange($event)" />
                    </div>
                </div>
                <button type="button" class="btn btn-info w-100" @click="downloadPoTicket">İndir</button>
            </div>

        
        </div>

        <list @formDialogFunc="formDialogFunc($event)" />

    </div>
    <div v-if="getMobile">
            <list @formDialogFunc="formDialogFunc($event)" />

            <div class="">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Üretici</th>
                            <th scope="col">Ay</th>
                            <th scope="col">Yıl</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item of getProductSummaryList" :key="item">
                            <th scope="row">{{ item.tanim }}</th>
                            <td>{{ $filters.formatDecimal(item.ay) }}</td>
                            <td>{{ $filters.formatDecimal(item.yil) }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <b>Toplam</b>
                            </td>
                            <td>
                                <b>{{ $filters.formatDecimal(allSummarySum) }} ({{ $filters.formatDecimal(mekmerSummarySum) }})</b> 
                            </td>
                            <td>
                        
                                <b>{{ $filters.formatDecimal(allYearSummarySum) }}</b>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" class="btn btn-success w-100 mb-2" @click="newForm">Yeni</button>
                <div>
                    <button type="button" class="btn btn-danger w-100 mb-2" :disabled="getBtnFormMekmer" @click="mekmer">Mekmer</button>
                    <br/>
                    <button type="button" class="btn btn-primary  w-100 mb-2" :disabled="getBtnFormOuter" @click="outer">Dış</button>
                    <br/>
                    <button type="button" class="btn btn-secondary  w-100 mb-2" :disabled="getBtnFormMekmerOuter" @click="mekmerOuter">Mekmer Dış</button>
                    <br/>
                    <button type="button" class="btn btn-warning w-100 mb-2" :disabled="getBtnFormNotFound" @click="notFound">Bulunamadı</button>
                    <br/>
                </div>
                
                <button type="button" class="btn btn-info w-100 mb-2"  @click="collectiveCrate">Toplu Kasa</button>
                    <button type="text" class="btn btn-secondary w-100 mb-2" @click="excel_output_list">Excel</button>
                    <br/>
                    <br/>
                    <div style="margin:auto;margin-left:30px;">
                        <Calendar v-model="l_date" showIcon dateFormat="dd/mm/yy"/>
                        <button type="text" class="btn btn-primary" @click="ticketExcelList" style="margin-left:10px;margin-top:-5px;">Etiket</button>

                    </div>
                    <br/>
                    <br/>
                    <button type="button"  class="btn btn-dark mb-4 w-100" @click="$refs.op.toggle($event)" >Efe Etiketleri</button>
                    <OverlayPanel ref="op">
                    <Dropdown v-model="selectedEfeTicket" :options="efeTickets" optionLabel="name" placeholder="Etiket Seç" @change="downloadEfeTicket($event)"/>
        
                    <a :href="ticketLink" download type="button" class="btn btn-secondary" v-if="!isEfeTicketForm">İndir</a>
                    </OverlayPanel>
  
                    <Dropdown v-model="selectedVeikBox" :options="etiketlerVeikKutu" optionLabel="urun" placeholder="Veik Kutu" class="w-100 mb-2" @change="isDropDownChange($event)"/>

                    <Dropdown v-model="selectedVeikCrate" :options="etiketlerVeikKasa" optionLabel="urun" placeholder="Veik Kasa" class="w-100 mb-2" @change="isDropDownChange($event)"/>

     
                    <Dropdown v-model="selectedNovaBox" :options="etiketlerNovaKutu" optionLabel="urun" placeholder="Nova Kutu" class="w-100 mb-2" @change="isDropDownChange($event)" />

                    <Dropdown v-model="selectedNovaCrate" :options="etiketlerNovaKasa" optionLabel="urun" placeholder="Nova Kasa" class="w-100 mb-2" @change="isDropDownChange($event)" />
                    <button type="button" class="btn btn-info w-100 mb-5" @click="downloadPoTicket">İndir</button>
            </div>

        
    </div>



    <Dialog v-model:visible="is_new_form" :header="form_header" modal :style="{ width: '100vw' }">
        <formDialog @formDialogClose="formDialogClose"/>
    </Dialog>
    <Dialog v-model:visible="is_collective_form" header="Kasa Atama" modal :style="{ 'width': '100vw' }">
        <collective />
    </Dialog>
</template>
<script>
import list from '../components/selection/list.vue';
import form from '../components/selection/form.vue';
import collective from '../components/selection/collective.vue';

import { useSelectionStore } from '../stores/selection';
import { useLocalStore } from '../stores/local';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { selectionService } from '../services/selectionService';
import { localDateService } from '../services/localDateService';
export default {
    components: {
        list,
        formDialog:form,
        collective,
    },
    computed: {
        ...mapState(useSelectionStore,[
            'getProductSummaryList',
            'getBtnFormMekmer',
            'getBtnFormOuter',
            'getBtnFormMekmerOuter',
            'getBtnFormNotFound',
            'getSelectionList',
            'getFilteredSelectionList'
        ]),
        ...mapState(useLocalStore, [
            'getLocalServiceUrl'
        ]),
        ...mapState(useMobilStore, [
            'getMobile'
        ])

    },
    data() {
        return {
            ticketLink: "",
            isEfeTicketForm:true,
            selectedEfeTicket:null,
            efeTickets: [
                { "name": '12x24', "link": 'https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2012x24.docx' },
                { "name": '16x16', "link": 'https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x16.docx' },
                { "name": '16x24', "link": 'https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2016x24.docx' },
                { "name": '18x18', "link": 'https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%2018x18.docx' },
                { "name": 'Pattern Set', "link": 'https://trackit-dosyalama.fra1.digitaloceanspaces.com/efe%20set.docx' }

            ],
            code:"",
            is_new_form: false,
            allSummarySum: 0,
            mekmerSummarySum: 0,
            allYearSummarySum: 0,
            l_date: new Date(),
            etiketlerVeikKutu: [
                { code: "SNS01", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
                { code: "SNS02", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
                { code: "SBR01", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
                { code: "SBR02", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
                { code: "SBY01", urun: "ELA KENARI KIRIK (SBY01)" },
                { code: "SBY02", urun: "ELA DÜZ KENAR (SBY02)" },
                { code: "SBS01", urun: "PICASSO KENARI KIRIK (SBS01)" },
                { code: "SBS02", urun: "PICASSO DÜZ KENAR (SBS02)" },
                { code: "ST-450", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
                { code: "ST-448", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
                { code: "VKGD-SNS", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
                { code: "VKCS-FM01", urun: "GOLD (VKCS-FM01)" },
                { code: "VKCS-FM02", urun: "SILVER (VKCS-FM02)" },
                { code: "STS01", urun: "IVORY RUSTİC (STS01)" },
            ],
            etiketlerNovaKutu: [
                { code: "FP-01", urun: "SCABOS KENARI KIRIK (FP-01)" },
                { code: "FP-02", urun: "PICASSO KENARI KIRIK (FP-02)" },
                { code: "FP-03", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
                { code: "FP-04", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
                { code: "FP-05", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
                { code: "FP-06", urun: "BAOMIX KENARI KIRIK (FP-06)" },
                { code: "FP-07", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
                { code: "FP-08", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
                { code: "FP-09", urun: "ELA KENARI KIRIK (FP-09)" },
                { code: "FP-10", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
            ],
            etiketlerVeikKasa: [
                { code: "SNS-01-K", urun: "MINA RUSTIC KENARI KIRIK (SNS01)" },
                { code: "SNS-02-K", urun: "MINA RUSTIC DÜZ KENAR (SNS02)" },
                { code: "SBR-01-K", urun: "SILVER RUSTIC KENARI KIRIK (SBR01)" },
                { code: "SBR-02-K", urun: "SILVER RUSTIC DÜZ KENAR (SBR02)" },
                { code: "SBY-01-K", urun: "ELA KENARI KIRIK (SBY01)" },
                { code: "SBY-02-K", urun: "ELA DÜZ KENAR (SBY02)" },
                { code: "SBS-01-K", urun: "PICASSO KENARI KIRIK (SBS01)" },
                { code: "SBS-02-K", urun: "PICASSO DÜZ KENAR (SBS02)" },
                { code: "ST-450-K", urun: "MINA RUSTIC DÜZ KENAR (ST-450)" },
                { code: "ST-448-K", urun: "SILVER RUSTIC DÜZ KENAR (ST-448)" },
                { code: "VKGD-SNS-K", urun: "CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)" },
                { code: "VKCS-FM01-K", urun: "GOLD (VKCS-FM01)" },
                { code: "VKCS-FM02-K", urun: "SILVER (VKCS-FM02)" },
                { code: "STS-01-K", urun: "IVORY RUSTIC (STS01)" },
                { code: "SAS01", urun: "ELA MOSAIC (SAS01)" },

            ],
            etiketlerNovaKasa: [
                { code: "FP-01-K", urun: "SCABOS KENARI KIRIK (FP-01)" },
                { code: "FP-02-K", urun: "PICASSO KENARI KIRIK (FP-02)" },
                { code: "FP-03-K", urun: "IVORY RUSTIC KENARI KIRIK (FP-03)" },
                { code: "FP-04-K", urun: "CLASSIC MINA KENARI KIRIK (FP-04)" },
                { code: "FP-05-K", urun: "GOLDEN INK KENARI KIRIK (FP-05)" },
                { code: "FP-06-K", urun: "BAOMIX KENARI KIRIK (FP-06)" },
                { code: "FP-07-K", urun: "MINA RUSTIC KENARI KIRIK (FP-07)" },
                { code: "FP-08-K", urun: "VANILLA BEIGE KENARI KIRIK (FP-08)" },
                { code: "FP-09-K", urun: "ELA KENARI KIRIK (FP-09)" },
                { code: "FP-10-K", urun: "SILVER RUSTIC KENARI KIRIK (FP-10)" },
            ],
            selectedVeikBox: {},
            selectedVeikCrate: {},
            selectedNovaBox: {},
            selectedNovaCrate: {},
            is_collective_form:false,
        }
    },
    methods: {
        collectiveCrate(){
            this.is_collective_form = true;
        },
        downloadEfeTicket(event) {
            this.isEfeTicketForm = false;
            this.ticketLink = event.value.link;
        },
        isDropDownChange(event) {
            this.code = event.value.code;
        },
        downloadPoTicket() {
            selectionService.getPoTicketDownload(this.code).then(data => {
                const link = document.createElement("a");
                const folderName = 'Etiket';
                link.href = data;
                link.setAttribute("download", `${folderName}.doc`);
                document.body.appendChild(link);
                link.click();
                this.code = "";
                this.selectedVeikBox = { };
                this.selectedVeikCrate = { };
                this.selectedNovaBox = { };
                this.selectedNovaCrate = { };
            })
        },
        ticketExcelList() {
            let date = localDateService.getDateString(this.l_date);
            selectionService.getTicketDataList(date).then(data => {
                selectionService.getTicketExcelList(data).then(data => {
                    if (data.status) {
                        const link = document.createElement("a");
                        link.href =
                            this.getLocalServiceUrl + "siparisler/dosyalar/seleksiyonEtiketCikti";

                        link.setAttribute("download", "Seleksiyon Üretim Etiket.xlsx");
                        document.body.appendChild(link);
                        link.click();
                        this.$store.dispatch("fullscreenLoadingAct", false);
                    }

                })
            })
        },
        excel_output_list() {
            if (this.getFilteredSelectionList.length > 0) {
                selectionService.getSelectionExcelList(this.getFilteredSelectionList).then(data => {
                    if (data.status) {
                        const link = document.createElement("a");
                        //link.href = 'localhost:5000/' + 'siparisler/dosyalar/seleksiyonExcelCikti'
                        link.href =
                            this.getLocalServiceUrl + "siparisler/dosyalar/seleksiyonExcelCikti";

                        link.setAttribute("download", "seleksiyon_listesi.xlsx");
                        document.body.appendChild(link);
                        link.click();
                        this.$store.dispatch("fullscreenLoadingAct", false);
                    };
                });
            } else {
                selectionService.getSelectionExcelList(this.getSelectionList).then(data => {
                    if (data.status) {
                        const link = document.createElement("a");
                        //link.href = 'localhost:5000/' + 'siparisler/dosyalar/seleksiyonExcelCikti'
                        link.href =
                            this.getLocalServiceUrl + "siparisler/dosyalar/seleksiyonExcelCikti";

                        link.setAttribute("download", "seleksiyon_listesi.xlsx");
                        document.body.appendChild(link);
                        link.click();
                        this.$store.dispatch("fullscreenLoadingAct", false);
                    };
                });
            }
            
        },
        formDialogClose() {
            this.is_new_form = false;
        },
        formDialogFunc(data) {
            this.is_new_form = data.status;
            this.form_header = data.crateNo;
        },
        newForm() {
            useSelectionStore().selection_new_button_load_act(true);
            this.form_header = 'Yeni';
            selectionService.getSelectionModel().then(data => {
                useSelectionStore().selection_model_list_load_act(data);
                this.is_new_form = true;
            });
        },
        mekmer() {
            useSelectionStore().btn_form_mekmer_load_act();
        },
        outer() {
            useSelectionStore().btn_form_outer_load_act();
        },
        mekmerOuter() {
            useSelectionStore().btn_form_mekmer_outer_load_act();
        },
        notFound() {
            useSelectionStore().btn_form_not_found_load_act();
        }
    },
    created() {
        for (let item of this.getProductSummaryList) {
            this.allSummarySum += item.ay;
            this.allYearSummarySum += item.yil;
            if (item.tanim == 'Dış') {
                continue;
            } else {
                this.mekmerSummarySum += item.ay;
            }
        }
    },
    mounted() {
        
        
    }
}
</script>
<style scoped>
</style>