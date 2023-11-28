<template>
    <div>

        <DataTable class="p-datatable-sm" :value="queueList" :reorderableColumns="true" @columnReorder="onColReorder($event)" @rowReorder="onRowReorder($event)" scrollable scrollHeight="500px">
            <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="true" />
            <Column field="product_queue" header="Sıra" key="product_queue">
            
            </Column>
            <Column field="product_id" header="Ürün Id" key="product_id">
            
            </Column>
            <Column field="product_name" header="Ürün Adı" key="product_name">
            
            </Column>
            
        </DataTable>

    </div>
</template>
<script>
import { usePanelStore } from '../../stores/panel';

export default {
    props:{
        queueList:{
            type:Array,
            required:false,
        }
    },
    methods:{
        onColReorder(event){
            console.log("onColReorder",event)
        },
        onRowReorder(event){
            const data = event.value;
            let queue = 1;
            for(const item of data){
                item.product_queue = queue;
                queue ++;
            }

            usePanelStore().panel_queue_products_load_act(event.value);

        }
    }
}
</script>