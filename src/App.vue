<template>

  <!-- <div style="width:100%;height:1600px;background-color:gray;opacity:0.5;z-index:99;position: absolute;top:0%;left:0%;" v-if="getLoading">
    <div class="container">
      <div class="spinner-border m-5" role="status" style="position: relative;top:280px;left:45%;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
  </div> -->

  <el-button
    v-loading.fullscreen.lock="getLoading"
    type="primary"
    v-if="getAuthentication"
    style="z-index:98;"
  >
  </el-button>


  <Toast position="bottom-right" />
  

  <br/>
  <br/>

  <header style="width:100%;z-index:99;" v-if="getAuthentication" >

    <navBar/>
  </header>
  <br/>
  <body class="">
    <RouterView />
  </body>
</template>

<script lang="javascript">
import { RouterView } from 'vue-router';
import navBar from './components/shared/navbarShared.vue';


import { useLoginStore } from './stores/login';
import { useLoadingStore } from './stores/loading';
import { useTodoStore } from './stores/todo';
import { useEtaStore } from './stores/eta';

import { mapState } from 'pinia';

import { todoService } from './services/todoService';
import { etaService } from './services/etaService';

export default ({
  computed: {
    ...mapState(useLoginStore, ['getAuthentication']),
    ...mapState(useLoadingStore, ['getLoading'])
  },
  data() {
    return {
    }
  },
  components: {
    navBar,
    RouterView
  },
  beforeCreate() {
    const data = {
      username: localStorage.getItem('username'),
      userId: localStorage.getItem('userId')
    }
    useLoginStore().login_act(data);
    useLoginStore().login_authentication_act(true);

    if (localStorage.getItem('username') == null) {
      this.$router.push('/login');
      useLoginStore().login_authentication_act(false);
    };
     


  },
  created() {
    todoService.getList(localStorage.getItem('userId')).then(data => {
      useTodoStore().to_do_list_load_act(data);
    });
    todoService.getCustomerControlService();

    etaService.getList().then(data => {
      useEtaStore().eta_list_load_act(data);
      if (data.length > 0 && localStorage.getItem('userId') == 12) {
        alert('Sağ Üstten Eta Sürelerini Kontrol Ediniz!!!');
      }
    });
    
    todoService.getMailControl().then(response=>{
      console.log(response.status);
    })

  }
})
</script>

<style>
  @import url('../public/css/bootstrap.css');
  @import url('../public/css/bootstrap.min.css');

</style>
