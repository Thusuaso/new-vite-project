 <template>
    <div class="row m-auto mt-3">
        <div class="col">
            {{ getOffersAllList }}
        </div>
    </div>
 </template>
 <script>
 import { useOfferStore } from '../../stores/offer';
 import { mapState } from 'pinia';
 export default {
     computed: {
          ...mapState(useOfferStore, [
                'getOffersAllList',
           ])
      }
 }
 </script>