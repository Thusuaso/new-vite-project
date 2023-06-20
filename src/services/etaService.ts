import { api } from '../services/customServices/doctorService';

export const etaService = {
    getList() {
        return api.get('/eta/yaklasan/bildirim/list').then(response => response.data);
    },
    setEtaControlStatus(po:any,etaTime:any) {
        return api.get(`/eta/yaklasan/bildirim/status/${po}/${etaTime}`).then(res => res.data);
    }
}