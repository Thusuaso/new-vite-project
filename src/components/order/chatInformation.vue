<template>
    <chats v-for="item of getProductDetailUsersList" :key="item" :chatsData="item" :po="po" :chatList="getChatList(item.mailAdres)"/>
</template>
<script>
import { useProductionsStore } from '../../stores/productions';
import { mapState } from 'pinia';

import chats from './forms/chats.vue';
export default {
    props: ['po'],
    components: {
        chats
    },
    computed: {
        ...mapState(useProductionsStore, [
            'getProductDetailUsersList',
            'getProductDetailChatList'
        ]),
        
    },
    data() {
        return {
        }
    },
    created() {
        this.getProductDetailUsersList.splice(this.findIndex(this.getProductDetailUsersList), 1);
    },
    methods: {
        findIndex(datas) {
            let index = 0;
            const userId = localStorage.getItem('userId');
            for (let item of datas) {
                if (item.id == userId) {
                    return index;
                } else {
                    index += 1;
                }
            }
        },
        getChatList(mail) {
            return this.getProductDetailChatList.find(x => x.alici == mail);
        }
    }
}
</script>
<style scoped></style>