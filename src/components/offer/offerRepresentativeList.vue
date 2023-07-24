<template>
    <div class="row mt-3">
        <div class="col">
            <DataTable 
                :value="getOfferRepresentativeList"
                v-model:selection="selectedOfferRepresentative"
                selectionMode="single"
                @row-click="offerRepresentativeSelected($event)"
                style="font-size:85%;"
            >
                <Column field="adi" header="Temsilci"></Column>
                <Column field="teklifSayisi" header="Teklif Sayısı">
                    <template #footer>
                        {{ getOfferRepresentativeTotalList.offer }}
                    </template>
                </Column>
                <Column field="proformaSayisi" header="PI">
                    <template #footer>
                        {{ getOfferRepresentativeTotalList.pi }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { offerService } from '../../services/offerService';
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferRepresentativeList',
            'getOfferRepresentativeTotalList'
        ])
    },
    methods: {
        offerRepresentativeSelected(event) {
            useLoadingStore().begin_loading_act();
            offerService.getOfferAllRepresentativeList(event.data.temsilci_id).then(data => {
                useOfferStore().offer_all_list_load_act(data);
                useLoadingStore().end_loading_act();
                this.emitter.emit('offer_all_representative_dialog', true);
            })
        }
    },
    mounted() {
        
    }
}
</script>
<style scoped></style>