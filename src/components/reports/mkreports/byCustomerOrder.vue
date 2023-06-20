<template>
    <div class="row m-auto mt-3">
        <div class="col">
            <DataTable
              v-model:value="getMekmarMkCustomerOrderList"
              v-model:filters="filters"
              filterDisplay="row"
            >
              <Column
                field="musteri"
                header="Müşteri Adı"
                bodyStyle="text-align:center"
                headerStyle="width:60px;"
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.musteri }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by Customer"
                  />
                </template>
              </Column>
              <Column
                field="logo"
                header="Logo"
                headerStyle="width:30px;"
                bodyStyle="text-align:center"
                
              >
                <template #body="slotProps">
                  <img
                    :src="'https://cdn.mekmarimage.com/countryLogo/' +
                        slotProps.data.logo
                        "
                    width="40"
                    height="40"
                  />
                </template>
              </Column>
              <Column
                field="Toplam"
                header="Total"
                headerStyle="width:65px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.Toplam) }}
                </template>
              </Column>
              <Column
                field="ulkeAdi"
                header="Ülke"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.ulkeAdi }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by Country"
                  />
                </template>
              </Column>
              <Column
                field="temsilci"
                header="Temsilci"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
                :showFilterMenu="false"
                :showFilterOperator="false"
                :showClearButton="false"
                :showApplyButton="false"
                :showFilterMatchModes="false"
                :showAddButton="false"
              >
                <template #body="slotProps">
                  {{ slotProps.data.temsilci }}
                </template>
                <template #filter="{ filterModel, filterCallback }">
                  <InputText
                    type="text"
                    v-model="filterModel.value"
                    @input="filterCallback()"
                    class="p-column-filter"
                    placeholder="Search by Represantative"
                  />
                </template>
              </Column>

              <Column
                field="BuYilUretim"
                header="               2023                                         Uretim    -    Sevkiyat"
                headerStyle="width:100px;white-space:pre-wrap;"
                bodyStyle="text-align:center"
              >
                <template #body="slotProps">
                  <div style="column-count: 2; column-rule: 1px solid black">
                    <div>
                      {{ $filters.formatPrice(slotProps.data.BuYilUretim) }}
                    </div>
                    <div>
                      {{ $filters.formatPrice(slotProps.data.BuYilSevkiyat) }}
                    </div>
                  </div>
                </template>
              </Column>

              <Column
                field="GecenYil"
                header="2022 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.GecenYil) }}
                </template>
              </Column>
              <Column
                field="OncekiYil"
                header="2021 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OncekiYil) }}
                </template>
              </Column>

              <Column
                field="OnDokuzYili"
                header="2020 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnDokuzYili) }}
                </template>
              </Column>

              <Column
                field="OnSekizYili"
                header="2019 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnSekizYili) }}
                </template>
              </Column>
              <Column
                field="OnYediYili"
                header="2018 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnYediYili) }}
                </template>
              </Column>
              <Column
                field="OnAltiYili"
                header="2017 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnAltiYili) }}
                </template>
              </Column>
              <Column
                field="OnBesYili"
                header="2016 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnBesYili) }}
                </template>
              </Column>
              <Column
                field="OnDortYili"
                header="2015 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnDortYili) }}
                </template>
              </Column>
              <Column
                field="OnUcYili"
                header="2014 - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnUcYili) }}
                </template>
              </Column>
              <Column
                field="OnUcYiliOncesi"
                header="2013 ve Öncesi - Ddp"
                headerStyle="width:60px;"
                bodyStyle="text-align:center"
                style="flex-grow: 1; flex-basis: 100px"
              >
                <template #body="slotProps">
                  {{ $filters.formatPrice(slotProps.data.OnUcYiliOncesi) }}
                </template>
              </Column>
            </DataTable>
        </div>
    </div>
</template>
<script>
import { useReportsStore } from '../../../stores/reports';
import { mapState } from 'pinia';

import { FilterMatchMode } from "primevue/api";
export default {
    computed: {
        ...mapState(useReportsStore, [
            'getMekmarMkCustomerOrderList'
        ])
    },
    data() {
        return {
            filters: {
                musteri: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                ulkeAdi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
                temsilci: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
            },
        }
    }
}
</script>