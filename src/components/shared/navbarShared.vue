<template>

    <nav class="navbar navbar-expand-md bg-body-tertiary bg-primary fixed-top"  data-bs-theme="dark">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="navbarNavDropdown" class="navbar-collapse collapse" >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/salesman">Follow</a></li>
                <li><a class="dropdown-item" href="/bgpnetwork">Bgp Project</a></li>
                <li><a class="dropdown-item" href="/todo/all">To Do</a></li>
                <li><a class="dropdown-item" href="/points/to/consider">Points to Consider </a></li>
                <li><a class="dropdown-item" href="/order/representative">Sales & Operation</a></li>
                <li><a class="dropdown-item" href="/main/follow">Main To Do</a></li>



              </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Orders
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/order/production">Production</a></li>
                  <li><a class="dropdown-item" href="/order/shipped">Shipped</a></li>
                  <li><a class="dropdown-item" href="/order/waiting">Waiting</a></li>

                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Selection
                </a>
                <ul class="dropdown-menu">
                  <li><a class="nav-link" aria-current="page" href="/selection/entry">Entry</a></li>
                  <li><a class="nav-link" aria-current="page" href="/create/sizes">Crate Size</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link" aria-current="page" href="/finance/test">Finance</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Operation
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/operation/cards">Product Card</a></li>
                  <li><a class="dropdown-item" href="/operation/supplier/list">Supplier</a></li>
                  <li><a class="dropdown-item" href="/operation/forwarding">Shipment</a></li>
                  <li><a class="dropdown-item" href="/operation/uploading">Upload Form</a></li>
                  <li><a class="dropdown-item" href="/operation/invoice/container/follow/list">Container Follow List</a></li>
                  <li><a class="dropdown-item" href="/operation/invoice/container/unfollow/list">Container Out of Tracking</a></li>
                  <li><a class="dropdown-item" href="/operation/shipping/input">Shipping Introduction</a></li>
                  <li><a class="dropdown-item" href="/operation/shipping/list">Shipping Invoice</a></li>
                  <li><a class="dropdown-item" href="/operation/container/input">Container Input</a></li>
                  <li><a class="dropdown-item" href="/operation/container/list">Container List</a></li>



                </ul>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Customers
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/shopper/list">Order</a></li>
                    <li><a class="dropdown-item" href="/shopper/offer/list">Offer</a></li>
                    <li><a class="dropdown-item" href="/shopper/bgp/list">Bgp</a></li>
                    <li><a class="dropdown-item" href="/shopper/fair/list">Fair & Visit</a></li>
                    <li><a class="dropdown-item" href="/shopper/selection/list">Selection</a></li>


                  </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mekmer Reports
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/reports/mekmer/production">Production</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/stock">Stock</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/stock/prices">Stock by Price</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/mine">Mine</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/tobeproduced">Will be Produced</a></li>
                  <li><a class="dropdown-item" href="/reports/mekmer/atlanta">Atlanta</a></li>

                </ul>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mekmar Reports
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/reports/mekmar/ayo">Ayo</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/loading">Loading</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/forwarding">Forwarding</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/summary">Order Summary</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/mk">Mk Reports</a></li>
                    <li><a class="dropdown-item" href="/reports/mekmar/order/gu">GU Reports</a></li>

                  </ul>
            </li>
            <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Samples
                    </a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="/sample/list">List</a></li>
                      <li><a class="dropdown-item" href="/sample/finance">Finance</a></li>
                    </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/offer">Offers</a>
            </li>
            <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Usa
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/usa/products">Products</a></li>
                    <li><a class="dropdown-item" href="/usa/comments">Comments</a></li>
                  </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Panel
                </a>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/panel/products/1">Products(Yayınlı)</a></li>
                  <li><a class="dropdown-item" href="/panel/products/0">Products(Yayınlı Olmayan)</a></li>

                  <li><a class="dropdown-item" href="/panel/project">Project</a></li>

                  <li><a class="dropdown-item" href="/panel/change/queue">Change Queue</a></li>
                  <li><a class="dropdown-item" href="/panel/users">Users</a></li>



                </ul>
            </li>
            <li class="nav-item">
                <button class="nav-link" icon="pi pi-arrow-right" @click="todo_side_bar_visible = true">
                  <i v-badge.danger="getTodoLength" class="pi pi-calendar p-overlay-badge" style="font-size: 2rem" dateFormat="dd/mm/yy"/>
                </button>
            </li>
            <li class="nav-item" v-if="userId == 12">
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
      userId:0,
    }
  },
  created() {
      this.userId = localStorage.getItem('userId');
      
    
  },
  
}
</script>