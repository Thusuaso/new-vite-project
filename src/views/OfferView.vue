<template>
    <div class="row m-auto mt-3">
        <div class="col-3">
            <div class="card" style="width: 100%;">
            <div class="card-body">
                <p class="card-text">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <button type="button" class="btn btn-success" @click="allOfferList">Hepsi</button>
                            <offerRepresentativeList/>
                            <offerCustomerList/>
                            <offerCustomerCountList/>
                        </div>
                    </div>
                </p>
            </div>
            </div>
        </div>
        <div class="col-9">
            <div class="card" style="width: 100%;">
            <div class="card-body">
                <p class="card-text">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <button type="button" class="btn btn-success mr-3" @click="newForm" style="margin-right:15px;">Yeni</button>
                            <button type="button" class="btn btn-info ml-3" @click="allOffersList">Tüm Teklifler</button>
                            <offerCalendarList/>
                        </div>
                    </div>
                </p>
            </div>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="offer_all_list_visible" header="" modal>
        <offerAllList/>
    </Dialog>
    <Dialog v-model:visible="offer_form_visible" header="" modal>
        <offerForm/>
    </Dialog>
    <Dialog v-model:visible="offers_all_list_form" header="" modal>
        <offersAllList/>
    </Dialog>
</template>
<script>
import { useOfferStore } from '../stores/offer';
import { useLoadingStore } from '../stores/loading';
import { mapState } from 'pinia';

import { offerService } from '../services/offerService';
import { socket } from '../services/customServices/realTimeService';

import offerCustomerCountList from '../components/offer/offerCustomerCountList.vue';
import offerCustomerList from '../components/offer/offerCustomerList.vue';
import offerRepresentativeList from '../components/offer/offerRepresentativeList.vue';
import offerCalendarList from '../components/offer/offerCalendarList.vue';
import offerAllList from '../components/offer/offerAllList.vue';
import offerForm from '../components/offer/offerForm.vue';
import offersAllList from '../components/offer/offersAllList.vue';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferMainPageList',
        ])
    },
    components: {
        offerRepresentativeList,
        offerCustomerList,
        offerCustomerCountList,
        offerCalendarList,
        offerAllList,
        offerForm,
        offersAllList
    },
    data() {
        return {
            offer_all_list_visible: false,
            offer_form_visible: false,
            offers_all_list_form:false,
        }
    },
    methods: {
        allOffersList() {
            useLoadingStore().begin_loading_act();
            offerService.getOffersAllList().then(data => {
                useOfferStore().offers_all_list_load_act(data);
                this.offers_all_list_form = true;
                useLoadingStore().end_loading_act();
            });
        },
        newForm() {
            useLoadingStore().begin_loading_act();
            offerService.getOfferFormModel().then(data => {
                useOfferStore().offer_form_model_list_load_act(data);
                useLoadingStore().end_loading_act();
                useOfferStore().offer_new_button_load_act(true);
                this.offer_form_visible = true;

            })
        },
        allOfferList() {
            useLoadingStore().begin_loading_act();
            offerService.getOfferAllList().then(data => {
                useOfferStore().offer_all_list_load_act(data);
                useOfferStore().offer_all_button_load_act(true);
                useLoadingStore().end_loading_act();
                this.offer_all_list_visible = true;
            })
        }
    },
    mounted() {
        this.emitter.on('offer_all_representative_dialog', (data) => {
            this.offer_all_list_visible = data;
        });
        this.emitter.on('offer_detail_dialog_close', () => {
            this.offer_form_visible = false;
        })
        socket.socketIO.on('offer_list_on', () => {
            useLoadingStore().begin_loading_act();
            offerService.getOfferMainPage(localStorage.getItem('userId')).then(data => {
                useOfferStore().offer_main_page_list_load_act(data);
                useLoadingStore().end_loading_act();
            });
        })

    }
    
}
</script>