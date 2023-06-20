<template>
    <FullCalendar :options="calendarOptions" />
</template>
<script>
import { useOfferStore } from '../../stores/offer';
import { mapState } from 'pinia';
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
export default {
    computed: {
        ...mapState(useOfferStore, [
            'getOfferCalendarList'
        ])
    },
    components: {
        FullCalendar,
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                events:[]
            }
        }
    },
    created() {
        for (const item of this.getOfferCalendarList) {
            this.calendarOptions.events = []
            this.calendarOptions.events.push({
                title: item.title,
                date: item.start,
            });
        }
    }
}
</script>
<style scoped>

</style>