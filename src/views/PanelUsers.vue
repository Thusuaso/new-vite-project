<template>
    <div class="row">
            <div class="col">
              <span class="p-float-label">
                <InputText
                  id="username"
                  :disabled="dis_form"
                  type="text"
                  v-model="getPanelCustomersModel.kullaniciadi"
                />
                <label for="username">Username</label>
              </span>
            </div>
            <div class="col">
              <span class="p-float-label">
                <InputText
                  id="name"
                  type="text"
                  :disabled="dis_form"
                  v-model="getPanelCustomersModel.adi"
                />
                <label for="name">Adı</label>
              </span>
            </div>
            <div class="col">
              <span class="p-float-label">
                <InputText
                  id="mailadres"
                  :disabled="dis_form"
                  type="text"
                  v-model="getPanelCustomersModel.mailadres"
                />
                <label for="mailadres">Mail Adresi</label>
              </span>
            </div>
            <div class="col">
              <span class="p-float-label">
                <InputText
                  id="telefon"
                  :disabled="dis_form"
                  type="text"
                  v-model="getPanelCustomersModel.telefon"
                />
                <label for="telefon">Telefon</label>
              </span>
            </div>
            <div class="col">
              <button
                class="btn btn-primary"
                :disabled="dis_yeni"
                @click="btn_yeni_click"
              >Yeni</button>
            </div>
            <div class="col">
              <button
                class="btn btn-secondary"
                :disabled="dis_vazgec"
                @click="btn_vazgec_click"
              >Vazgeç</button>
            </div>
            <div class="col">
              <button
                class="btn btn-success"
                :disabled="dis_kaydet"
                @click="btn_kaydet_click"
              >Kaydet</button>
            </div>
            <div class="col">
              <button
                class="btn btn-danger"
                :disabled="dis_sil"
                
                @click="btn_sil_click"
              >Sil</button>
            </div>
          </div>

    <DataTable 
        :value="getPanelCustomersList" 
        v-model:filters="filters"
        filterDisplay="row"
         selectionMode="single"
        v-model:selection="select_musteri"
        @row-select="musteriSec($event)"
    
    >
        <Column field="id" header="Id"></Column>
        <Column field="adi" header="Adı">
            <template #filter="{ filterModel, filterCallback }">
                <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
            </template>
        </Column>
        <Column field="kullaniciadi" header="Kullanıcı Adı"></Column>
        <Column field="mailadres" header="Mail"></Column>
        <Column field="telefon" header="Telefon"></Column>
    </DataTable>
</template>
<script>
import { usePanelStore } from '../stores/panel';
import { mapState } from 'pinia';
import { FilterMatchMode } from 'primevue/api';
import { reportsService } from '../services/reportsService';
export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelCustomersModel',
            'getPanelCustomersList'
        ])
    },
    data() {
        return {
            filters: {
                adi:{value:null,matchMode: FilterMatchMode.STARTS_WITH }
            },
            dis_yeni: false,
            dis_vazgec: true,
            dis_kaydet: true,
            dis_sil: true,
            dis_form: true,
            select_musteri: {},
            musteri_detay: {
                kullaniciadi: "",
                adi: "",
                mailadres: "",
                telefon: "",
            },
        }
    },
    methods: {
        musteriSec(event) {
            usePanelStore().panel_customers_detail_load_act(event.data);
            this.dis_yeni = true;
            this.dis_vazgec = false;
            this.dis_kaydet = false;
            this.dis_sil = false;
            this.dis_form = false;
        },
         btn_yeni_click() {
            this.dis_yeni = true;
            this.dis_vazgec = false;
            this.dis_kaydet = false;
            this.dis_sil = true;
            this.dis_form = false;

            this.yeniMusteriDetay();
            this.select_musteri = null;
        },
        btn_vazgec_click() {
            this.dis_yeni = false;
            this.dis_vazgec = true;
            this.dis_kaydet = true;
            this.dis_sil = true;
            this.dis_form = true;
            this.yeniMusteriDetay();
            this.select_musteri = null;
        },
        yeniMusteriDetay() {
            reportsService.getYeniMusteriDetay().then((data) => {
                usePanelStore().panel_customers_detail_load_act(data);
            });
        },
        listeYukle() {
            reportsService.getMekmarComCustomersList().then((data) => {
                usePanelStore().panel_customers_load_act(data);
            });
        },
        btn_sil_click() {

            reportsService.musteriSil(this.getPanelCustomersModel.id).then((status) => {
                if (status) {
                    this.yeniMusteriDetay();
                    this.dis_yeni = false;
                    this.dis_kaydet = true;
                    this.dis_vazgec = true;
                    this.dis_sil = true;
                    this.dis_form = true;
                    this.select_musteri = null;
                    this.listeYukle();
                    this.$toast.add({ severity: 'success', summary: 'Username Silme', detail: 'Username Başarıyla Silindi.', life: 3000 });

                } else {
                    this.$toast.add({ severity: 'error', summary: 'Username Silme', detail: 'Username Silme Başarısız.', life: 3000 });

                }
            });
        },
        btn_kaydet_click() {
            if (this.getPanelCustomersModel.kullaniciadi == "") {
                alert("Kullanıcı Adı Boş Geçilemez.");

                return;
            }

            if (this.select_musteri == null) {
                this.musteriKaydet();
            } else {
                //müşteri güncelleme
                this.musteriGuncelle();
            }
        },
         musteriKaydet() {
            reportsService.yeniMusteriKaydet(this.getPanelCustomersModel).then((status) => {
                if (status) {
                    this.dis_yeni = false;
                    this.dis_vazgec = true;
                    this.dis_kaydet = true;
                    this.dis_form = true;
                    this.dis_sil = true;
                    this.listeYukle();
                    this.yeniMusteriDetay();
                    this.select_musteri = null;
                    this.$toast.add({ severity: 'success', summary: 'Username Kayıt', detail: 'Username Başarıyla Kaydedildi.', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', summary: 'Username Kayıt', detail: 'Username Kayıt Başarısız', life: 3000 });

                }
            });
        },
        musteriGuncelle() {
            reportsService.musteriGuncelle(this.getPanelCustomersModel).then((status) => {
                if (status) {
                    this.dis_yeni = false;
                    this.dis_vazgec = true;
                    this.dis_kaydet = true;
                    this.dis_form = true;
                    this.dis_sil = true;
                    this.listeYukle();
                    this.yeniMusteriDetay();
                    this.select_musteri = null;
                    this.$toast.add({ severity: 'success', summary: 'Username Güncelleme', detail: 'Username Başarıyla Güncellendi.', life: 3000 });

                } else {
                    this.$toast.add({ severity: 'error', summary: 'Username Güncelleme', detail: 'Username Güncelleme Hata', life: 3000 });

                }
            });
        },
    }
}
</script>
<style>
</style>