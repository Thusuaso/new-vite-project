import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
    state: () => {
        return {
            model: [],
            usersList: [],
            todoNewButton: false,
            todoList: [],
            todoListAll: [],
            todoLength: 0,
            todoMainList:[],
        }
    },
    actions: {
        to_do_model_list_load_act(data: any) {
            this.model = data.model;
            this.usersList = data.users;
        },
        to_do_new_button_load_act(data: any) {
            this.todoNewButton = data;
        },
        to_do_list_load_act(data: any) {
            this.todoList = data;
            this.to_do_length_load_act(data.yapilmadi);
        },
        to_do_list_all_load_act(data: any) {
            this.todoListAll = data;
        },
        to_do_length_load_act(data: any) {
            this.todoLength = data.length;
        },
        to_do_main_list_load_act(data:any){
            this.todoMainList = data;
        }
    },
    getters: {
        getModel(state) {
            return state.model;
        },
        getUsersList(state) {
            return state.usersList;
        },
        getTodoNewButton(state) {
            return state.todoNewButton;
        },
        getTodoList(state) {
            return state.todoList;
        },
        getTodoListAll(state) {
            return state.todoListAll;
        },
        getTodoLength(state) {
            return state.todoLength;
        },
        getTodoMainList(state){
            return state.todoMainList;
        }
    }
})