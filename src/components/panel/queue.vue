<template>
    <div>

        <DataTable :value="queueList" :reorderableColumns="true" @columnReorder="onColReorder($event)" @rowReorder="onRowReorder($event)" tableStyle="min-width: 50rem">
            <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" />
            <Column field="product_queue" header="Sıra" key="product_queue">
            
            </Column>

            <Column field="product_image" header="Foto" key="product_image">
                <template #body="slotProps">
                    <img :src="slotProps.data.product_image" width="80" height="80"/>
                </template>
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