<template>
    <table class="table text-center">
      <thead>
        <tr>
          <th scope="col">Toplam Masraf</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">{{ $filters.formatPrice(total) }}</th>
        </tr>
      </tbody>
    </table>
    <div class="row">
        <div class="col-4 mb-3" v-if="sprayingList.length > 0">
            <DataTable :value="sprayingList">
                <template #header>
                    İlaçlama
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.spraying) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="dutyList.length > 0">
                <DataTable :value="dutyList">
                    <template #header>
                        Gümrük
                    </template>
                    <Column field="aciklama" header="Açıklama"></Column>
                    <Column field="tutar" header="Tutar">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.tutar) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(costListSum.duty) }}
                        </template>
                    </Column>
                </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="lashingList.length > 0">
            <DataTable :value="lashingList">
                <template #header>
                    Lashing
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.lashing) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="transportList.length > 0">
            <DataTable :value="transportList">
                <template #header>
                    Nakliye
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.transport) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="portList.length > 0">
            <DataTable :value="portList" >
                <template #header>
                    Liman
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.port) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="bookingList.length > 0">
            <DataTable :value="bookingList">
                <template #header>
                    Booking
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.booking) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="workmanshipList.length > 0">
            <DataTable :value="workmanshipList">
                <template #header>
                    İşçilik
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.workmanship) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="spazletList.length > 0">
            <DataTable :value="spazletList">
                <template #header>
                    Spanzlet
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.spanzlet) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-4 mb-3" v-if="freightList.length > 0">
            <DataTable :value="freightList">
                <template #header>
                    Navlun
                </template>
                <Column field="aciklama" header="Açıklama"></Column>
                <Column field="tutar" header="Tutar">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.tutar) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(costListSum.freight) }}
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDetailCostList'
        ])
    },
    data() {
        return {
            costList: {
                sprayingList: [],
                dutyList: [],
                lashingList: [],
                transportList: [],
                portList: [],
                bookingList: [],
                workmanshipList: [],
                spazletList: [],
                freightList: []
            },
            costListSum: {
                spraying:0,
                duty:0,
                lashing:0,
                transport:0,
                port:0,
                booking:0,
                workmanship:0,
                spanzlet:0,
                freight:0
            },
            total:0,
        }
    },
    created() {
        this.totalSum(this.getProductDetailCostList);
        this.sprayingList = this.getProductDetailCostList.filter(x => x.tur == 'İlaçlama Faturası');
        this.sprayingListSum(this.sprayingList);
        this.dutyList = this.getProductDetailCostList.filter(x => x.tur == 'Gümrük Faturası');
        this.dutyListSum(this.dutyList);
        this.lashingList = this.getProductDetailCostList.filter(x => x.tur == 'Lashing Faturası');
        this.lashingListSum(this.lashingList);
        this.transportList = this.getProductDetailCostList.filter(x => x.tur == 'Nakliye Faturası');
        this.transportListSum(this.transportList);
        this.portList = this.getProductDetailCostList.filter(x => x.tur == 'Liman Masrafı');
        this.portListSum(this.portList);
        this.bookingList = this.getProductDetailCostList.filter(x => x.tur == 'Booking Faturası');
        this.bookingListSum(this.bookingList);
        this.workmanshipList = this.getProductDetailCostList.filter(x => x.tur == 'Özel İşçilik');
        this.workmanshipListSum(this.workmanshipList);
        this.spazletList = this.getProductDetailCostList.filter(x => x.tur == 'Spazlet Faturası');
        this.spanzletListSum(this.spazletList);
        this.freightList = this.getProductDetailCostList.filter(x => x.tur == 'Navlun');
        this.freightListSum(this.freightList);
    },
    methods: {
        sprayingListSum(data) {
            for (const item of data) {
                this.costListSum.spraying += item.tutar;
            }
        },
        dutyListSum(data) {
            for (const item of data) {
                this.costListSum.duty += item.tutar;
            }
        },
        lashingListSum(data) {
            for (const item of data) {
                this.costListSum.lashing += item.tutar;
            }
        },
        transportListSum(data) {
            for (const item of data) {
                this.costListSum.transport += item.tutar;
            }
        },
        portListSum(data) {
            for (const item of data) {
                this.costListSum.port += item.tutar;
            }
        },
        bookingListSum(data) {
            for (const item of data) {
                this.costListSum.booking += item.tutar;
            }
        },
        workmanshipListSum(data) {
            for (const item of data) {
                this.costListSum.workmanship += item.tutar;
            }
        },
        spanzletListSum(data) {
            for (const item of data) {
                this.costListSum.spanzlet += item.tutar;
            }
        },
        freightListSum(data) {
            for (const item of data) {
                this.costListSum.freight += item.tutar;
            }
        },
        totalSum(data) {
            for (const item of data) {
                this.total += item.tutar;
            }
        }

    }
}
</script>
<style scoped>

</style>