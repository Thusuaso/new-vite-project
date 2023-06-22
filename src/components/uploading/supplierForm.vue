<template>
    {{ filterSupplierList }}
    {{ getUploadingSupplierList }}
    <div class="row m-auto mt-3">
        <div class="col">
            <AutoComplete
            :dropdown="true"
            size="20%;"
            v-model="selectedSupplier"
            :suggestions="filterSupplierList"
            @complete="searchSupplier($event)"
            field="tedarikci"
            @item-select="supplierKindSelected($event)"
          >
            <template #items="slotProps">
              <div class="p-clearfix p-autocomplete-brand-item">
                <div>
                  {{ slotProps.tedarikci }}
                </div>
              </div>
            </template>
          </AutoComplete>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">Fatura No</span>
                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="invoiceNo">
            </div>
        </div>
        <div class="col">
            <a :href="supplierLink" ref="download" target="_blank">

            </a>
            <button type="button" class="pi pi-download btn btn-success" @click="$refs.download.click()" :disabled="supplier_link_form"></button>
        </div>
    </div>
    <div class="row m-auto mt-3">
        <div class="col">
            <custom-file-input
                baslik="  Dosya Yükle  "
                @sunucuDosyaYolla="invoiceSend($event)"
                :isISFForm="supplier_document_form"
            />
        </div>
        <div class="col">
            <button type="button" class="btn btn-success" :disabled="product_save_form" @click="productSave">Kaydet</button>
        </div>
    </div>
</template>
<script>
import { useLoadingStore } from '../../stores/loading';
import { useUploadingStore } from '../../stores/uploading';
import { mapState } from 'pinia';

import { uploadingService } from '../../services/uploadingService';
import { fileService } from '../../services/fileService';

import CustomInputFile from "../../components/shared/CustomInputFile.vue";
export default {
    props: ['po'],
    computed: {
        ...mapState(useUploadingStore, [
            'getUploadingSupplierList',
        ])
    },
    components: {
        customFileInput: CustomInputFile,
    },
    data() {
        return {
            selectedSupplier: null,
            filterSupplierList: [],
            product_save_form: false,
            supplier_document_form: false,
            id: null,
            supplierLink: "",
            supplier_link_form: true,
            invoiceNo: '',
            disabled_sample_open_document_form: false,
            disabled_document_open_form: false,
        }
    },
    created() {
        useLoadingStore().begin_loading_act();
        uploadingService.getSupplierList(this.po).then(data => {
            useUploadingStore().uploading_supplier_list_load_act(data);
            useLoadingStore().end_loading_act();
        });
    },
    methods: {
        productSave() {
            const veri = {
                FaturaNo: this.invoiceNo,
                tedarikci_id: this.selectedSupplier.ID,
                tedarikci: this.selectedSupplier.tedarikci,
                evrak: this.selectedSupplier.tedarikci + ".pdf",
                siparisno: this.po,
                kullaniciAdi: localStorage.getItem('username'),
            };
            uploadingService.setSupplier(veri).then((veri) => {
                if (veri.Status) {
                    alert("Kayıt İşlemi Yapıldı.");
                } else {
                    alert("Ops! Lütfen Yeniden Deneyiniz.");
                }
            });
        },
        invoiceSend(event) {
            if (event.size > 1000000) {
                alert("Evrak Boyutunu Kontrol Ediniz.");
            } else {
                const veri = {
                    FaturaNo: this.invoiceNo,
                    tedarikci_id: this.selectedSupplier.ID,
                    tedarikci: this.selectedSupplier.tedarikci,
                    evrak: this.selectedSupplier.tedarikci + ".pdf",
                    siparisno: this.po,
                    kullaniciAdi: localStorage.getItem('username'),
                };
                fileService
                    .sendSupplier(
                        event,
                        this.po,
                        this.selectedSupplier.tedarikci + ".pdf"
                    )
                    .then((data) => {
                        console.log(data);
                        uploadingService.setSupplierInvoice(veri).then((veri) => {
                            if (veri.Status) {
                                alert("Kayıt İşlemi Yapıldı.");
                                this.disabled_sample_open_document_form = false;
                                this.supplierLink = `https://file-service.mekmar.com/file/tedarikci/download/30/${this.SiparisEvrakList.siparisno
                                    }/${this.selectedSupplier.tedarikci + ".pdf"}`;

                                this.disabled_document_open_form = false;
                            }
                        });
                    });
            };
        },
        supplierKindSelected(event) {
                uploadingService.getUploadingDocumentControl(event.value.tedarikci, this.po).then(data => {
                    if (data.data) {
                        this.product_save_form = true
                        this.supplier_document_form = true
                        alert('Zaten bu siparişin tedarikçisi bulunmakta,lütfen siparişi kontrol ediniz.')
                    } else {
                        this.product_save_form = false
                        this.supplier_document_form = false


                        this.id = event.value.ID;
                        if (event.value.ID == 1 || event.value.ID == 123) {
                            this.product_save_form = true

                        } else {
                            this.product_save_form = false
                        }
                        this.supplierLink = `https://file-service.mekmar.com/file/tedarikci/download/30/${this.po
                            }/${event.value.tedarikci + ".pdf"}`
                        this.supplier_link_form = false
                    }
                })
        },
        searchSupplier(event) {
            setTimeout(() => {
                let result;
                if (event.query.length === 0) {
                    result = [...this.getUploadingSupplierList];
                } else {
                    result = this.getUploadingSupplierList.filter((ted) => {
                        return ted.tedarikci
                            .toLowerCase()
                            .startsWith(event.query.toLowerCase());
                    });
                }

                this.filterSupplierList = result;
            }, 250);
        }
    }
}
</script>
<style scoped>
</style>