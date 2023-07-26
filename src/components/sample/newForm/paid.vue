<template>
    <div v-if="!getMobile">
            <div class="row m-auto mt-3">
            <div class="col">
                <span class="p-float-label">
                    <Calendar id="p_date" v-model="p_date" showIcon dateFormat="dd/mm/yy"/>
                    <label for="p_date">Ödeme Tarihi</label>
                </span>
            </div>
            <div class="col">
                <span class="p-float-label">
                    <InputText id="usd" v-model="finance.tutar" />
                    <label for="usd">$</label>
                </span>
            </div>
            <div class="col">
                <Dropdown v-model="selectedBank" :options="bankList" optionLabel="name" placeholder="Banka Seç" class="w-full md:w-14rem" />
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <button type="button" class="btn btn-success w-100" @click="saveFinance">Kaydet</button>
            </div>
        </div>
        <div class="row m-auto mt-3">
            <div class="col">
                <DataTable :value="getSamplePaidList" style="font-size:85%;">
                    <Column field="tarih" header="Tarih"></Column>
                    <Column field="numune_no" header="Po"></Column>
                    <Column field="aciklama" header="Açıklama"></Column>
                    <Column field="tutar" header="Tutar">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.tutar) }}
                        </template>
                    </Column>
                    <Column field="masraf" header="Masraf">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.masraf) }}
                        </template>
                    </Column>
                    <Column field="banka" header="Banka">
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>

    <div v-if="getMobile">
                <div class=" m-auto mt-3">
                <div class="">
                    <span class="p-float-label">
                        <Calendar class="w-100 mb-3" id="p_date" v-model="p_date" showIcon dateFormat="dd/mm/yy"/>
                        <label for="p_date">Ödeme Tarihi</label>
                    </span>
                </div>
                <div class="">
                    <span class="p-float-label mb-3">
                        <InputText id="usd" v-model="finance.tutar" />
                        <label for="usd">$</label>
                    </span>
                </div>
                <div class="">
                    <Dropdown v-model="selectedBank" :options="bankList" optionLabel="name" placeholder="Banka Seç" class="w-100 mb-3" />
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <button type="button" class="btn btn-success w-100 mb-3" @click="saveFinance">Kaydet</button>
                </div>
            </div>
            <div class=" m-auto mt-3">
                <div class="">
                    <DataTable :value="getSamplePaidList" style="font-size:85%;">
                        <Column field="tarih" header="Tarih"></Column>
                        <Column field="numune_no" header="Po"></Column>
                        <Column field="aciklama" header="Açıklama"></Column>
                        <Column field="tutar" header="Tutar">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.tutar) }}
                            </template>
                        </Column>
                        <Column field="masraf" header="Masraf">
                            <template #body="slotProps">
                                {{ $filters.formatPrice(slotProps.data.masraf) }}
                            </template>
                        </Column>
                        <Column field="banka" header="Banka">
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>

</template>
<script>
import { useSampleStore } from '../../../stores/sample';
import { useLoadingStore } from '../../../stores/loading';
import { useMobilStore } from '../../../stores/mobil';
import { mapState } from 'pinia';

import { localDateService } from '../../../services/localDateService';
import { sampleService } from '../../../services/sampleService';
export default {
    computed: {
        ...mapState(useSampleStore, [
            'getSampleModel',
            'getSamplePaidList'
        ]),
        ...mapState(useMobilStore, [
            'getMobile',
        ])
    },
    data() {
        return {
            p_date: new Date(),
            finance: {
                'tarih': "",
                'tutar': 0,
                'banka': "",
                'siparisno': "",
                'musteri_id': "",
                'kullaniciid': 0,
                'kullaniciadi':"",
            },
            selectedBank: {},
            bankList: [
                { 'id': 1, 'name': 'Maya Paypal' },
                { 'id': 2, 'name': 'Maya Bank' },
                { 'id': 3, 'name': 'Mekmar Bank' },
            ],
        }
    },
    methods: {
        saveFinance() {
            useLoadingStore().begin_loading_act();
            this.finance.tarih = localDateService.getDateString(this.p_date);
            this.finance.banka = this.selectedBank.name;
            this.finance.siparisno = this.getSampleModel.numuneNo;
            this.finance.musteri_id = this.getSampleModel.musteriId;
            this.finance.kullaniciid = localStorage.getItem('userId');
            this.finance.kullaniciadi = localStorage.getItem('username');
            sampleService.financeSave(this.finance).then(data => {
                if (data.status) {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                };
            })
        }
    }
}
</script>