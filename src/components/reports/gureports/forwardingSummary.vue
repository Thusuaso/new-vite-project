<template>
    <div class="row">
        <div class="col-3 mb-5" style="border-right: 1px solid gray;border-left: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.tenYear" sortField="month" sortOrder="1">
                <template #header>
                    {{ new Date().getFullYear() }}
                </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.tenFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.tenDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.nineYear" sortField="month" sortOrder="1">
                <template #header>
                    {{ new Date().getFullYear() - 1 }}
                </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.nineFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.nineDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
                        <DataTable :value="getMekmarGuForwardingSummaryList.eightYear" sortField="month" sortOrder="1">
                            <template #header>
                                {{ new Date().getFullYear() - 2 }}
                            </template>
                            <Column field="month_str" header="Ay"></Column>
                            <Column field="fob" header="Fob($)">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.fob) }}
                                </template>
                                <template #footer>
                                    {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.eightFob) }}
                                </template>
                            </Column>
                            <Column field="ddp" header="Ddp($)">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.ddp) }}
                                </template>
                                <template #footer>
                                    {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.eightDdp) }}
                                </template>
                            </Column>
                        </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.sevenYear" sortField="month" sortOrder="1">
                <template #header>
                    {{ new Date().getFullYear() - 3 }}
                </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.sevenFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.sevenDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.sixYear" sortField="month" sortOrder="1">
                <template #header>
                    {{ new Date().getFullYear() - 4 }}
                </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.sixFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.sixDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
                        <DataTable :value="getMekmarGuForwardingSummaryList.fiveYear" sortField="month" sortOrder="1">
                            <template #header>
                                {{ new Date().getFullYear() - 5 }}
                            </template>
                            <Column field="month_str" header="Ay"></Column>
                            <Column field="fob" header="Fob($)">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.fob) }}
                                </template>
                                <template #footer>
                                    {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.fiveFob) }}
                                </template>
                            </Column>
                            <Column field="ddp" header="Ddp($)">
                                <template #body="slotProps">
                                    {{ $filters.formatPrice(slotProps.data.ddp) }}
                                </template>
                                <template #footer>
                                    {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.fiveDdp) }}
                                </template>
                            </Column>
                        </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
                            <DataTable :value="getMekmarGuForwardingSummaryList.fourYear" sortField="month" sortOrder="1">
                                <template #header>
                                    {{ new Date().getFullYear() - 6 }}
                                </template>
                                <Column field="month_str" header="Ay"></Column>
                                <Column field="fob" header="Fob($)">
                                    <template #body="slotProps">
                                        {{ $filters.formatPrice(slotProps.data.fob) }}
                                    </template>
                                    <template #footer>
                                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.fourFob) }}
                                    </template>
                                </Column>
                                <Column field="ddp" header="Ddp($)">
                                    <template #body="slotProps">
                                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                                    </template>
                                    <template #footer>
                                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.fourDdp) }}
                                    </template>
                                </Column>
                            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
                <DataTable :value="getMekmarGuForwardingSummaryList.threeYear" sortField="month" sortOrder="1">
                    <template #header>
                        {{ new Date().getFullYear() - 7 }}
                    </template>
                    <Column field="month_str" header="Ay"></Column>
                    <Column field="fob" header="Fob($)">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.fob) }}
                        </template>
                        <template #footer>
                                {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.threeFob) }}
                            </template>
                    </Column>
                    <Column field="ddp" header="Ddp($)">
                        <template #body="slotProps">
                            {{ $filters.formatPrice(slotProps.data.ddp) }}
                        </template>
                        <template #footer>
                            {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.threeDdp) }}
                        </template>
                    </Column>
                </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.twoYear" sortField="month" sortOrder="1">
                <template #header>
                        {{ new Date().getFullYear() - 8 }}
                    </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.twoFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.twoDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>
        <div class="col-3 mb-5" style="border-right: 1px solid gray;">
            <DataTable :value="getMekmarGuForwardingSummaryList.oneYear" sortField="month" sortOrder="1">
                <template #header>
                            {{ new Date().getFullYear() - 9 }}
                        </template>
                <Column field="month_str" header="Ay"></Column>
                <Column field="fob" header="Fob($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.fob) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.oneFob) }}
                    </template>
                </Column>
                <Column field="ddp" header="Ddp($)">
                    <template #body="slotProps">
                        {{ $filters.formatPrice(slotProps.data.ddp) }}
                    </template>
                    <template #footer>
                        {{ $filters.formatPrice(getMekmarGuForwardingSummaryTotal.oneDdp) }}
                    </template>
                </Column>
            </DataTable>
        </div>

   


        

        





            

 

            

    </div>


</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';
export default {
    computed: {
        ...mapState(useReportsStore,['getMekmarGuForwardingSummaryList','getMekmarGuForwardingSummaryTotal'])
    },
    data() {
        return {

        }
    },
    created() {

    }
}
</script>

<style scoped>

</style>