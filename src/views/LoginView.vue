<template>
    <div class="container w-25 m-auto">
        <div class="mb-3 ">
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="user.username">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="user.password" @keydown.enter="login">
          </div>
          <button type="submit" class="btn btn-primary btn-md w-100" @click="login">Login</button>
    </div>
    
</template>
<script lang="javascript">
import { loginService } from '../services/loginService';
import { useLoginStore } from '../stores/login';
import { useLoadingStore } from '../stores/loading';
export default {
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            useLoadingStore().begin_loading_act()
            loginService.login(this.user.username, this.user.password).then(data => {
                localStorage.setItem('username', data.user.kullaniciAdi);
                localStorage.setItem('userId', data.user.id);
                const loginData = {
                    username: data.user.kullaniciAdi,
                    userId: data.user.id
                };
                useLoginStore().login_act(loginData);
                useLoginStore().login_authentication_act(true);
                useLoadingStore().end_loading_act();
                if (data) {
                    this.$toast.add({ severity: 'success', summary: 'Giriş Durum', detail: 'Başarıyla Giriş Yapıldı', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'danger', summary: 'Giriş Durum', detail: 'Kullanıcı adınız ya da parolanız hatalıdır.', life: 3000 });

                }
                this.$router.push('/');

            });
        }
    },
    created() {
        useLoginStore().login_authentication_act(false)
    }
}
</script>
<style scoped>

</style>