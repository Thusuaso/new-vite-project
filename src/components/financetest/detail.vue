<template>
  <div v-if="!getMobile">
    <div class="row m-auto mt-3">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Total Order</th>
              <th scope="col">Paid</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}</td>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}</td>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row m-auto mt-3">
      <div class="col bg-danger m-auto text-center" style="color: white">
        * Yellow colored ones are Maya account
      </div>
    </div>
    <div class="row m-auto mt-3">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="excel_output">Excel</button>
      </div>
    </div>
    <div class="row m-auto mt-3">
      <div class="col">
        <DataTable
          :value="getFinanceTestDetailList"
          scrollable
          scrollHeight="500px"
          v-model:selection="selectedDetail"
          selectionMode="single"
          @row-click="detailSelected($event)"
          :rowClass="rowClass"
          style="font-size: 85%"
          :sortField="['status', 'forwarding_date']"
          sortOrder="-1"
        >
          <Column field="po" header="Purchase Order"></Column>
          <Column field="product_date" header="Order Date">
            <template #body="slotProps">
              {{ $filters.formatDate(slotProps.data.product_date) }}
            </template>
          </Column>
          <Column field="forwarding_date" header="Shipment Date">
            <template #body="slotProps">
              {{ $filters.formatDate(slotProps.data.forwarding_date) }}
            </template>
          </Column>

          <Column field="status" header="Status"></Column>
          <Column field="cost" header="Order Total USD">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.cost) }}
            </template>
            <template #footer>
              {{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}
            </template>
          </Column>
          <Column field="paid" header="Paid Amount">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.paid) }}
            </template>
            <template #footer>
              {{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}
            </template>
          </Column>
          <Column field="balance" header="Balance">
            <template #body="slotProps">
              <div
                :style="{
                  backgroundColor: slotProps.data.balance > 5 ? '#6aa84f' : '',
                  color: slotProps.data.balance > 5 ? 'white' : '',
                }"
              >
                {{ $filters.formatPrice(slotProps.data.balance) }}
              </div>
            </template>
            <template #footer>
              {{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}
            </template>
          </Column>
          <Column field="advanced_payment" header="Prepayment">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
            </template>
            <template #footer>
              {{ $filters.formatPrice(getFinanceTestDetailTotalList.advanced_payment) }}
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="col">
        <DataTable
          :value="getFinanceTestDetailPaidList"
          scrollable
          scrollHeight="500px"
          v-model:selection="selectedDetailPaid"
          selectionMode="single"
          @row-click="detailPaidSelected($event)"
          style="font-size: 85%"
        >
          <Column field="date" header="Paid Date">
            <template #body="slotProps">
              {{ $filters.formatDate(slotProps.data.date) }}
            </template>
          </Column>
          <Column field="paid" header="Paid">
            <template #body="slotProps">
              {{ $filters.formatPrice(slotProps.data.paid) }}
            </template>
            <template #footer>
              {{ $filters.formatPrice(getFinanceTestDetailPaidTotalList.paid) }}
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
  <div v-if="getMobile">
    <div class="row m-auto mt-3">
      <div class="col">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Order Total</th>
              <th scope="col">Paid</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}</td>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}</td>
              <td>{{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row m-auto mt-3">
      <div class="col bg-danger m-auto text-center" style="color: white">
        * Yellow colored ones are Maya account
      </div>
    </div>
    <div class="row m-auto mt-3">
      <div class="col">
        <button type="button" class="btn btn-primary w-100" @click="excel_output">
          Excel
        </button>
      </div>
    </div>

    <DataTable
      :value="getFinanceTestDetailList"
      scrollable
      scrollHeight="500px"
      v-model:selection="selectedDetail"
      selectionMode="single"
      @row-click="detailSelected($event)"
      :rowClass="rowClass"
      style="font-size: 85%"
    >
      <Column field="po" header="Purchase Order"></Column>
      <Column field="product_date" header="Order Date">
        <template #body="slotProps">
          {{ $filters.formatDate(slotProps.data.product_date) }}
        </template>
      </Column>
      <Column field="forwarding_date" header="Shipment Date">
        <template #body="slotProps">
          {{ $filters.formatDate(slotProps.data.forwarding_date) }}
        </template>
      </Column>

      <Column field="status" header="Status"></Column>
      <Column field="cost" header="Order Total USD">
        <template #body="slotProps">
          {{ $filters.formatPrice(slotProps.data.cost) }}
        </template>
        <template #footer>
          {{ $filters.formatPrice(getFinanceTestDetailTotalList.cost) }}
        </template>
      </Column>
      <Column field="paid" header="Paid Amount">
        <template #body="slotProps">
          {{ $filters.formatPrice(slotProps.data.paid) }}
        </template>
        <template #footer>
          {{ $filters.formatPrice(getFinanceTestDetailTotalList.paid) }}
        </template>
      </Column>
      <Column field="balance" header="Balance">
        <template #body="slotProps">
          <div
            :style="{
              backgroundColor: slotProps.data.balance > 0 ? '#6aa84f' : '',
              color: slotProps.data.balance > 0 ? 'white' : '',
            }"
          >
            {{ $filters.formatPrice(slotProps.data.balance) }}
          </div>
        </template>
        <template #footer>
          {{ $filters.formatPrice(getFinanceTestDetailTotalList.balance) }}
        </template>
      </Column>
      <Column field="advanced_payment" header="Prepayment">
        <template #body="slotProps">
          {{ $filters.formatPrice(slotProps.data.advanced_payment) }}
        </template>
        <template #footer>
          {{ $filters.formatPrice(getFinanceTestDetailTotalList.advanced_payment) }}
        </template>
      </Column>
    </DataTable>
    <DataTable
      :value="getFinanceTestDetailPaidList"
      scrollable
      scrollHeight="500px"
      v-model:selection="selectedDetailPaid"
      selectionMode="single"
      @row-click="detailPaidSelected($event)"
      style="font-size: 85%"
    >
      <Column field="date" header="Paid Date">
        <template #body="slotProps">
          {{ $filters.formatDate(slotProps.data.date) }}
        </template>
      </Column>
      <Column field="paid" header="Paid">
        <template #body="slotProps">
          {{ $filters.formatPrice(slotProps.data.paid) }}
        </template>
        <template #footer>
          {{ $filters.formatPrice(getFinanceTestDetailPaidTotalList.paid) }}
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="paid_detail_form"
    :header="date"
    modal
    :style="{ width: '100vw' }"
  >
    <paidDetail />
  </Dialog>
  <Dialog
    v-model:visible="payment_detail_form"
    header=""
    modal
    :style="{ width: '100vw' }"
  >
    <paymentDetail :balance="balance" :customer_id2="customer_id2" :po="po" />
  </Dialog>
</template>
<script>
import { useFinanceTestStore } from "../../stores/financetest";
import { useLoadingStore } from "../../stores/loading";
import { useLocalStore } from "../../stores/local";
import { useMobilStore } from "../../stores/mobil";
import { mapState } from "pinia";

import { financeServiceTest } from "../../services/financeServiceTest";
import { socket } from "../../services/customServices/realTimeService";

import paidDetail from "../financetest/paidDetail.vue";
import paymentDetail from "../financetest/paymentDetail.vue";
export default {
  components: {
    paidDetail,
    paymentDetail,
  },
  computed: {
    ...mapState(useFinanceTestStore, [
      "getFinanceTestDetailList",
      "getFinanceTestDetailPaidList",
      "getFinanceTestDetailTotalList",
      "getFinanceTestDetailPaidTotalList",
    ]),
    ...mapState(useLocalStore, ["getLocalServiceUrl"]),
    ...mapState(useMobilStore, ["getMobile"]),
  },
  props: ["customer_id"],
  data() {
    return {
      selectedDetailPaid: [],
      date: "",
      paid_detail_form: false,
      selectedDetail: [],
      payment_detail_form: false,
      balance: 0,
      customer_id2: 0,
      po: "",
    };
  },
  methods: {
    excel_output() {
      financeServiceTest.getDetailExcelList(this.getFinanceTestDetailList).then((res) => {
        if (res.status) {
          const link = document.createElement("a");
          link.href =
            this.getLocalServiceUrl + "finans/dosyalar/konteynerAyrintiExcelListe";

          link.setAttribute("download", "konteynır_ayrinti.xlsx");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    rowClass(event) {
      return [{ "bg-warning": event.maya_control === true }];
    },
    detailSelected(event) {
      useLoadingStore().begin_loading_act();
      this.customer_id2 = event.data.customer_id;
      this.po = event.data.po;
      this.balance = event.data.balance;
      financeServiceTest
        .getPaymentDetail(event.data.customer_id, event.data.po)
        .then((data) => {
          useFinanceTestStore().finance_test_detail_payment_list_load_act(data);
          useLoadingStore().end_loading_act();
          this.payment_detail_form = true;
        });
    },
    detailPaidSelected(event) {
      useLoadingStore().begin_loading_act();
      const date = event.data.date.split("-");
      const year = date[0];
      const month = date[1];
      const day = date[2];
      const newDateFormat = day + "-" + month + "-" + year;
      this.date = newDateFormat;
      financeServiceTest
        .getPaidDetailList(this.customer_id, newDateFormat)
        .then((data) => {
          useFinanceTestStore().finance_test_detail_paid_detail_list_load_act(data);
          useLoadingStore().end_loading_act();

          this.paid_detail_form = true;
        });
    },
  },
  mounted() {
    socket.socketIO.on("finance_test_detail_payment_on", (data) => {
      financeServiceTest.getPaymentDetail(data.customer_id, data.po).then((data) => {
        useFinanceTestStore().finance_test_detail_payment_list_load_act(data);
      });
    });
  },
};
</script>
