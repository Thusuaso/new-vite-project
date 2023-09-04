<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary fixed-top"  data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Satışçı
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/salesman">Takip</a></li>
                <li><a class="dropdown-item" href="/bgpnetwork">Bgp Project</a></li>
                <li><a class="dropdown-item" href="/todo/all">Yapılacaklar</a></li>
                <li><a class="dropdown-item" href="/cost/mistake">Maliyet Hatalar</a></li>
                <li><a class="dropdown-item" href="/order/representative">Satışçı ve Operasyon</a></li>


              </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Siparişler
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/order/product">Üretim</a></li>
                  <li><a class="dropdown-item" href="/order/forwarding">Sevk</a></li>
                  <li><a class="dropdown-item" href="/order/waiting">Bekleyen</a></li>

                </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/selection/entry">Seleksiyon Giriş</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Finans
                </a>
                <ul class="dropdown-menu">
                  <a class="nav-link" aria-current="page" href="/finance/list">Finans</a>
                  <a class="nav-link" aria-current="page" href="/finance/test">Finans</a>

                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Operasyon
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/operation/cards">Ürün Kart</a></li>
                  <li><a class="dropdown-item" href="/operation/supplier/list">Tedarikçi</a></li>
                  <li><a class="dropdown-item" href="/operation/forwarding">Sevkiyat</a></li>
                  <li><a class="dropdown-item" href="/operation/uploading">Yükleme Formu</a></li>
                  <li><a class="dropdown-item" href="/operation/invoice/container/follow/list">Konteynır Takip Listesi</a></li>
                  <li><a class="dropdown-item" href="/operation/invoice/container/unfollow/list">Konteynır Takipten Düşenler</a></li>
                  <li><a class="dropdown-item" href="/operation/shipping/input">Nakliye Giriş</a></li>
                  <li><a class="dropdown-item" href="/operation/shipping/list">Nakliye Fatura</a></li>
                  <li><a class="dropdown-item" href="/operation/container/input">Konteynır Giriş</a></li>
                  <li><a class="dropdown-item" href="/operation/container/list">Konteynır Liste</a></li>



                </ul>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Müşteriler
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/shopper/list">Müşteriler</a></li>
                    <li><a class="dropdown-item" href="/shopper/offer/list">Teklifler</a></li>
                    <li><a class="dropdown-item" href="/shopper/bgp/list">Bgp</a></li>
                    <li><a class="dropdown-item" href="/shopper/fair/list">Fuar</a></li>
                    <li><a class="dropdown-item" href="/shopper/selection/list">Seleksiyon</a></li>


                  </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mekmer Raporları
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/reports/mekmer/production">Üretim</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/stock">Stok</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/stock/prices">Stok Fiyatlı</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/mine">Ocak</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/tobeproduced">Üretilecek</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/atlanta">Atlanta</a></li>

                </ul>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mekmar Raporları
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/reports/mekmar/ayo">Ayo</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/loading">Yükleme</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/forwarding">Sevkiyat</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/summary">Sipariş Özet</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/mk">Mk Raporları</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/gu">GU Raporları</a></li>

                  </ul>
            </li>
            <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Numuneler
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/sample/list">Liste</a></li>
                      <li><a class="dropdown-item" href="/sample/finance">Finans</a></li>
                    </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/offer">Teklifler</a>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usa
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/usa/products">Ürünler</a></li>
                    <li><a class="dropdown-item" href="/usa/comments">Yorumlar</a></li>
                  </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Panel
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/panel/products">Ürünler</a></li>
                  <li><a class="dropdown-item" href="/panel/project">Projeler</a></li>

                  <li><a class="dropdown-item" href="/panel/change/queue">Sıra Değiştir</a></li>
                  <li><a class="dropdown-item" href="/panel/users">Kullanıcılar</a></li>

                </ul>
            </li>
            <li class="nav-item">
                <button class="nav-link" icon="pi pi-arrow-right" @click="todo_side_bar_visible = true">
                  <i v-badge.danger="getTodoLength" class="pi pi-calendar p-overlay-badge" style="font-size: 2rem" dateFormat="dd/mm/yy"/>
                </button>
            </li>
            <li class="nav-item">
              <button type="button" class="nav-link" @click="eta_side_bar_visible = true">
                <i v-badge.danger="getListLength" class="pi pi-envelope p-overlay-badge" style="font-size: 2rem" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Sidebar v-model:visible="todo_side_bar_visible" style="width:850px;">
      <toDoView/>
    </Sidebar>
    <Sidebar v-model:visible="eta_side_bar_visible" style="width:850px;">
      <etaView/>
    </Sidebar>
</template>
<script>
import { useTodoStore } from '../../stores/todo';
import { useEtaStore } from '../../stores/eta';
import { mapState } from 'pinia';

import toDoView from '../../views/ToDoView.vue';
import etaView from '../../views/EtaView.vue';
export default {
  computed: {
    ...mapState(useTodoStore, [
      'getTodoLength',

    ]),
    ...mapState(useEtaStore, [
      'getListLength'
    ])
  },
  components: {
    toDoView,
    etaView
  },
  data() {
    return {
      todo_side_bar_visible: false,
      eta_side_bar_visible: false,
    }
  },
  created() {
    if (this.getListLength > 0) {
      alert('Sağ Üstten Eta Sürelerini Kontrol Ediniz!!!')
    }
  },
  
}
</script>