<template>
    <DataTable :value="getStatisticList" style="font-size:85%;">
        <Column field="ulkeAdi" header="Country"></Column>
        <Column field="notResponse" header="Not Answer">
            <template #footer>
                {{ statisticsSum.wrongNumber }}
            </template>
        </Column>
        <Column field="wrongNumber" header="Wrong Number">
            <template #footer>
                    {{ statisticsSum.wrongNumber }}
                </template>
        </Column>
        <Column field="notInterested" header="Not Interested">
            <template #footer>
                        {{ statisticsSum.notInterested }}
                    </template>
        </Column>
        <Column field="interested" header="Interested">
            <template #footer>
                            {{ statisticsSum.interested }}
                        </template>
        </Column>
    </DataTable>
</template>
<script>
import { useBgpStore } from '../../stores/bgp';
import { mapState } from 'pinia';
export default {
    data() {
        return {
            statisticsSum: {
                wrongNumber: 0,
                notResponse: 0,
                notInterested: 0,
                interested: 0,
            
            }
      }  
    },
    computed: {
        ...mapState(useBgpStore,['getStatisticList'])
    },
    created() {
        this.statisticsSumFunc(this.getStatisticList)
    },
    methods: {
        
        statisticsSumFunc(data) {
            this.statisticsSum = {
                wrongNumber: 0,
                notResponse: 0,
                notInterested: 0,
                interested: 0,
            }
            for (let i of data) {
                this.statisticsSum.wrongNumber += i.wrongNumber
                this.statisticsSum.notResponse += i.notResponse
                this.statisticsSum.notInterested += i.notInterested
                this.statisticsSum.interested += i.interested

            }
        }
    }

    
}
</script>