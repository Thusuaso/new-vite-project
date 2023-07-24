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
  >
  </el-button>


  <Toast position="bottom-right" />
  

  <br/>
  <br/>

  <header style="width:100%;" v-if="getAuthentication">
    <navBar/>
  </header>
  <br/>
  <body class="">
    <RouterView />
  </body>
</template>

<script lang="javascript">
import { RouterView } from 'vue-router';
import navBar from '@/components/shared/navbarShared.vue';
import { useLoginStore } from '@/stores/login';
import { useLoadingStore } from '@/stores/loading';
import { useTodoStore } from './stores/todo';

import { todoService } from './services/todoService';

import { mapState } from 'pinia';
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
    todoService.getList(localStorage.getItem('userId')).then(data => {
      useTodoStore().to_do_list_load_act(data);
    });


  }
})
</script>

<style>

</style>
