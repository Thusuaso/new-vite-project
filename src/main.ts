/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';
import mitt from 'mitt';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const emitter = mitt();
import 'maz-ui/css/main.css'
import 'maz-ui/styles' // or import 'maz-ui/css/main.css'

import 'bootstrap';
/*Prime Vue */
import PrimeVue from 'primevue/config';
// import "primevue/resources/themes/rhea/theme.css"     
import "primevue/resources/themes/bootstrap4-light-purple/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

/*Directives */
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import FileUpload from 'primevue/fileupload';
import InputNumber from 'primevue/inputnumber';
import AutoComplete from 'primevue/autocomplete';
import OverlayPanel from 'primevue/overlaypanel';
import Rating from 'primevue/rating';
import Chips from "primevue/chips";
import Galleria from 'primevue/galleria';
import Sidebar from 'primevue/sidebar';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Checkbox from 'primevue/checkbox';
import PickList from 'primevue/picklist';

/*Maz Directives */
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import MazFullscreenLoader from 'maz-ui/components/MazFullscreenLoader'
import MazDialog from 'maz-ui/components/MazDialog'
const app = createApp(App)

app.config.globalProperties.emitter = emitter;
app.config.globalProperties.$filters = {
  formatDecimal(value:any) {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  formatPrice(value:any) {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  formatPriceTl(value:any) {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return "₺" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  formatPriceEuro(value:any) {
    const val = (value / 1).toFixed(2).replace(".", ",");
    return "€" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
  formatPoint(value: any) {
    if (value == null || value == " " || value == undefined || value == "") {
      return 0
    } else {
      return value.replace(',', '.');
      
    }
  },
    formatPointAlis(value: any) {
    if (value == null || value == " " || value == undefined || value == "") {
      return null;
    } else {
      return value.replace(',', '.');
      
    }
  },
  formatDate(value: any) {
    if (value == null) {
      return null
    } else {
          const date = new Date(value);
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          return day + '-' + month + '-' + year;
    }

    
  }
}

app.directive('badge', BadgeDirective);
/*Directives Components*/

app.component('PickList', PickList);
app.component('Checkbox', Checkbox);
app.component('Badge', Badge);
app.component('Galleria', Galleria);
app.component('Chips', Chips);
app.component('Rating', Rating);
app.component('FileUpload', FileUpload);
app.component('Toast', Toast);
app.component('Chart', Chart);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('InputNumber', InputNumber);
app.component('AutoComplete', AutoComplete);
app.component('OverlayPanel', OverlayPanel);
app.component('Sidebar', Sidebar);

/*Component Maz */
app.component('MazBtn', MazBtn);
app.component('MazInput', MazInput);
app.component('MazPhoneNumberInput', MazPhoneNumberInput);
app.component('MazFullscreenLoader', MazFullscreenLoader);
app.component('MazDialog', MazDialog);


app.use(createPinia())
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
