<template>

    <div class="row m-auto mt-3">
        <div class="col">
            <div class="card" style="width: 100%;">
            <div class="card-body">
                <p class="card-text">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="row m-auto" v-if="!getMobile">
                                <div class="col">
                                    <button type="button" class="btn btn-success mr-3" @click="newForm" style="margin-right:15px;">Yeni</button>
                                </div>
                                                                <div class="col">
                                        <button type="button" class="btn btn-secondary" @click="allOfferList">Güncel Teklifler</button>


                                    </div>
                                <div class="col">
                                    <button type="button" class="btn btn-info ml-3" @click="allOffersList">Eski Teklifler</button>

                                </div>

                            </div>
                            <div class=" m-auto" v-if="getMobile">
                                    <div class="">
                                        <button type="button" class="btn btn-success  w-100 mb-3" @click="newForm">Yeni</button>
                                    </div>
                                                                       <div class="">
                                            <button type="button" class="btn btn-secondary w-100 mb-3" @click="allOfferList">Güncel Teklifler</button>


                                        </div>
                                    <div class="">
                                        <button type="button" class="btn btn-info  w-100 mb-3" @click="allOffersList">Eski Teklifler</button>

                                    </div>
 
                                </div>
                            <offerRepresentativeList/>
                            <offerCustomerList/>
                            <offerCustomerCountList/>
                        </div>
                    </div>
                </p>
            </div>
            </div>
        </div>
        <!-- <div class="col-9">
            <div class="card" style="width: 100%;">
            <div class="card-body">
                <p class="card-text">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            
                             <offerCalendarList/> 
                        </div>
                    </div>
                </p>
            </div>
            </div>
        </div> -->
    </div>
    <Dialog v-model:visible="offer_all_list_visible" header="" modal :style="{ width: '100vw' }" :closeOnEscape="false">
        <offerAllList/>
    </Dialog>
    <Dialog v-model:visible="offer_all_list_visible2" header="" modal :style="{ width: '100vw' }" :closeOnEscape="false">
            <offerAllList2/>
        </Dialog>
    <Dialog v-model:visible="offer_form_visible" header="" modal :style="{ width: '100vw' }">
        <offerForm/>
    </Dialog>
    <Dialog v-model:visible="offers_all_list_form" header="" modal :style="{ width: '100vw' }" :closeOnEscape="false">
        <offersAllList/>
    </Dialog>
</template>
<script>
import { useOfferStore } from '../stores/offer';
import { useLoadingStore } from '../stores/loading';
import { useMobilStore } from '../stores/mobil';
import { mapState } from 'pinia';

import { offerService } from '../services/offerService';
import { socket } from '../services/customServices/realTimeService';

import offerCustomerCountList from '../components/offer/offerCustomerCountList.vue';
import offerCustomerList from '../components/offer/offerCustomerList.vue';
import offerRepresentativeList from '../components/offer/offerRepresentativeList.vue';
// import offerCalendarList from '../components/offer/offerCalendarList.vue';
import offerAllList from '../components/offer/offerAllList.vue';
import offerAllList2 from '../components/offer/offerAllList2.vue';

import offerForm from '../components/offer/offerForm.vue';
import offersAllList from '../components/offer/offersAllList.vue';

export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferMainPageList',
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    components: {
        offerRepresentativeList,
        offerCustomerList,
        offerCustomerCountList,
        // offerCalendarList,
        offerAllList,
        offerForm,
        offersAllList,
        offerAllList2
    },
    data() {
        return {
            offer_all_list_visible: false,
            offer_form_visible: false,
            offers_all_list_form:false,
            offer_all_list_visible2:false,
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
        this.emitter.on('offer_all_representative_dialog2', (data) => {
            this.offer_all_list_visible2 = data;
        });
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