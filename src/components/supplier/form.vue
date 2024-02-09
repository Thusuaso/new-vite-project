<template>
    <div class="input-group mb-3">
      <span class="input-group-text" id="basic-addon1">Supplier</span>
      <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="supplierModel.tedarikciadi">
    </div>
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-success" @click="supplierProcess">Save</button>
        </div>
        <div class="col" v-if="!getSupplierNewButton">
            <button type="button" class="btn btn-danger" @click="deleteSupplier">Delete</button>
        </div>
    </div>
</template>
<script>
import { useSupplierStore } from '../../stores/supplier';
import { mapState } from 'pinia';

import { supplierService } from '../../services/supplierService';
import { socket } from '../../services/customServices/realTimeService';
import { useLoadingStore } from '../../stores/loading';

export default {
    props:['selectedSupplier'],
    computed: {
        ...mapState(useSupplierStore, [
            'getSupplierNewButton',
        ])
    },
    data() {
        return {
            supplierModel: {
                'id': null,
                'tedarikciadi':null
            }
        }
    },
    created() {
        if (!this.getSupplierNewButton) {
            this.supplierModel = this.selectedSupplier;
        };
    },
    methods: {
        deleteSupplier() {
            useLoadingStore().begin_loading_act();
            supplierService.delete(this.selectedSupplier.id).then(data => {
                if (data.status) {
                    socket.socketIO.emit('supplier_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });
                };
            })
        },
        supplierProcess() {
            if (this.getSupplierNewButton) {
                this.save();
            } else {
                this.update();
            };
        },
        save() {
            supplierService.save(this.supplierModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('supplier_update_list_emit');
                    socket.socketIO.emit('products_detail_supplier_update_emit')
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        update() {
            useLoadingStore().begin_loading_act();
            supplierService.update(this.supplierModel).then(data => {
                if (data.status) {
                    socket.socketIO.emit('supplier_update_list_emit');
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        }
    }
}
</script>
<style scoped>

</style>