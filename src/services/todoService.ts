import { api } from '../services/customServices/doctorService';

export const todoService = {
    getModel() {
        return api.get('/yapilacaklar/model').then(response => response.data);
    },
    getList(username:any) {
        return api.get(`/yapilacaklar/kullanici/list/${username}`).then(response => response.data);
    },
    getAllList() {
        return api.get('/yapilacaklar/list/all').then(response => response.data);
    },
    save(data: any) {
        return api.post('/yapilacaklar/islem', data).then(response => response.data);
    },
    update(data: any) {
        return api.put('/yapilacaklar/islem', data).then(response => response.data);
    },
    deleteTodo(id: any) {
        return api.delete(`/yapilacaklar/delete/${id}`).then(response => response.data);
    },
    updateTodo(data: any) {
        return api.put('/yapilacaklar/yapildi', data).then(response => response.data);
    },
    getDetailList(id: any) {
        return api.get(`/yapilacaklar/list/detail/${id}`).then(response => response.data);
    },
    getUsersList() {
        return api.get('/yapilacaklar/list/users/all').then(response => response.data);
    },
    getCustomerControlService() {
        return api.get('/kontroller/musterietatakipislem').then(response => response.data);
    },
    getMailControl(){
        return api.get('/todo/mail/control').then(response=>response.data);
    },
    getTodoMainList(userid:any){
        return api.get(`/todo/main/list/${userid}`).then(response=>response.data);
    },
    setTodoMainQueue(data:any){
        return api.post('/todo/main/queue/change',data).then(response=>response.data);
    },
    setTodoMainSeeing(id:any){
        return api.get(`/todo/mailn/seeing/${id}`).then(response=>response.data);
    }
}