import { defineStore } from "pinia";
export const useProductionsStore = defineStore('productions',{
    state: () => {
        return {
            productionNewButton:false,
            productionsList: [],
            productionsListFilter:[],
            productionsDetailModel: [],
            productUnitList: [],
            supplierList: [],
            deliveryList: [],
            paymentList: [],
            invoiceList: [],
            countryList: [],
            customersList: [],
            userList: [],
            productsTotal: {
                productTotal: 0,
                productFreight: 0,
                otherTotal: 0,
                generalTotal: 0,
            },
            productCost: {
                producer: 0,
                workmanship: 0,
                freight: 0,
                other: 0,
                commission: 0,
                fob: 0,
                general: 0,
                profit:0,
                
            },
            workmanshipList: [],
            workmanshipModel: {},
            productDetailCostList: [],
            productDetailCheckList: [],
            productsStatusId: 0,
            productsSaveButtonStatus: true,
            productionsListTotal: {
                'amount': 0,
                'piece': 0,
                'm2': 0,
                'production': 0,
                'ton': 0,
                'productPriceSum':0
            },
            productsDetailSupplierList: [],
            productsSupplierDeliveryList: [],
            productsSupplierInvoiceList: [],
            productDetailDocumentList: [],
            productDetailOrderInformationList: [],
            productDetailUsersList: [],
            productChatWhoSend: {},
            productDetailChatList:[],
            checkListTotal:{
                miktar:0,
                ton:0,
                totalKasa:0,
                m2:0,
                mt:0,
                adet:0,
            }
        }
    },
    actions: {
        productions_list_load_act(data:any) {
            this.productionsList = data;
        },
        productions_list_filter_load_act(data:any) {
            this.productionsListFilter = data;
        },
        productions_detail_model_load_act(data: any) {
            this.productionsDetailModel = data
        },
        productions_unit_list_load_act(data: any) {
            this.productUnitList = data
        },
        productions_supplier_list_load_act(data: any) {
            this.supplierList = data
        },
        productions_delivery_list_load_act(data: any) {
            this.deliveryList = data
        },
        productions_payment_list_load_act(data: any) {
            this.paymentList = data
        },
        productions_invoice_list_load_act(data: any) {
            this.invoiceList = data
        },
        productions_country_list_load_act(data: any) {
            this.countryList = data
        },
        productions_customers_list_load_act(data: any) {
            this.customersList = data
        },
        productions_new_button_load_act(data: any) {
            this.productionNewButton = data
        },
        productions_users_list_load_act(data: any) {
            this.userList = data
        },
        product_total_load_act(data: any) {
            this.productsTotal = {
                productTotal: 0,
                productFreight: 0,
                otherTotal: 0,
                generalTotal: 0
            };
            this.productCost= {
                producer: 0,
                workmanship: 0,
                freight: 0,
                other: 0,
                commission: 0,
                fob: 0,
                general: 0,
                profit:0,
                
            }
            for (const item of data.siparisUrunler) {
                this.productsTotal.productTotal += parseFloat(item.satisToplam);
                this.productCost.producer += (parseFloat(item.alisFiyati) * parseFloat(item.miktar));

            };
            this.productsTotal.productFreight = parseFloat(data.siparis.navlunSatis);
            this.productsTotal.otherTotal =
                (
                    parseFloat(data.siparis.detayTutar_1) +
                    parseFloat(data.siparis.detayTutar_2) +
                    parseFloat(data.siparis.detayTutar_3) +
                    parseFloat(data.siparis.sigorta_tutar_satis)
                );
            

            this.productsTotal.generalTotal =
                (
                    this.productsTotal.productTotal +
                    this.productsTotal.productFreight +
                    this.productsTotal.otherTotal
                )
            
            
            /*Cost */
            this.productCost.freight = parseFloat(data.siparis.navlunAlis);
            this.productCost.commission = parseFloat(data.siparis.komisyon);
            this.productCost.workmanship = parseFloat(data.siparis.iscilikTutar);
            this.productCost.other =
                (
                    parseFloat(data.siparis.detayAlis_1) +
                    parseFloat(data.siparis.detayAlis_2) + 
                    parseFloat(data.siparis.detayAlis_3) +
                    parseFloat(data.siparis.detayTutar_4) +
                    parseFloat(data.siparis.sigorta_tutar) +
                    parseFloat(data.siparis.evrakGideri)
                
                )
            if (this.productDetailCostList.length > 0) {
                for (const item of this.productDetailCostList) {
                    if (item.tur == 'Navlun' || item.tur == 'Özel İşçilik') {
                        continue;
                    } else {
                        this.productCost.fob += item.tutar;
                    }
                } 
            }
            
            this.productCost.general =
                (
                    this.productCost.freight +
                    this.productCost.commission +
                    this.productCost.workmanship +
                    this.productCost.other +
                    this.productCost.producer +
                    this.productCost.fob
                )
            
            this.productCost.profit =
                (
                    this.productsTotal.generalTotal - this.productCost.general
                )
                
                
        },
        product_workmanship_list_load(data: any) {
            this.workmanshipList = data;
        },
        product_workmanship_model_load(data: any) {
            this.workmanshipModel = data
        },
        product_detail_cost_list(data: any) {
            this.productDetailCostList = data
        },
        product_detail_check_list(data: any) {
            this.productDetailCheckList = data
            this.product_detail_check_list_total(data);
        },
        product_detail_check_list_total(data:any){
            this.checkListTotal = {
                miktar:0,
                ton:0,
                totalKasa:0,
                m2:0,
                mt:0,
                adet:0,
            }
            this.checkListTotal.totalKasa += data.length;

            for(const item of data){
                this.checkListTotal.miktar += parseFloat(item.miktar);
                this.checkListTotal.ton += parseFloat(item.tonaj);
                this.checkListTotal.m2 += parseFloat(item.kasaM2);
                this.checkListTotal.mt += parseFloat(item.kasaMt);
                this.checkListTotal.adet += parseFloat(item.adet);

            }
        },
        product_detail_document_list(data: any) {
            this.productDetailDocumentList = data;
        },
        formatPrice(value:any) {
            const val = (value / 1).toFixed(2).replace(".", ",");
            return "$" + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        productions_status_id_load_act(data: any) {
            this.productsStatusId = data;
        },
        products_save_button_status_load_act(data: any) {
            this.productsSaveButtonStatus = data;
        },
        products_total_datatable_load_act(data: any) {
            this.productionsListTotal = {
                'amount': 0,
                'piece': 0,
                'm2': 0,
                'production': 0,
                'ton': 0,
                'productPriceSum': 0
            };
            for (const item of data) {
                this.productionsListTotal.amount += parseFloat(item.siparisMiktari);
                this.productionsListTotal.production += parseFloat(item.uretimMiktari);
                this.productionsListTotal.ton += parseFloat(item.ton);
                this.productionsListTotal.productPriceSum += parseFloat(item.satisToplam);
                if (item.birim == 'M2') {
                    this.productionsListTotal.m2 += parseFloat(item.siparisMiktari);
                } else if (item.birim == 'Adet') {
                    this.productionsListTotal.piece += parseFloat(item.siparisMiktari);
                };
            }
        },
        products_detail_supplier_list(data: any) {
            this.productsDetailSupplierList = data;
        },
        products_supplier_delivery_list(data: any) {
            this.productsSupplierDeliveryList = data;
        },
        products_supplier_invoice_list(data: any) {
            this.productsSupplierInvoiceList = data;
        },
        product_detail_order_information_load_act(data: any) {
            this.productDetailOrderInformationList = data;
        },
        product_detail_users_list_load_act(data: any) {
            this.productDetailUsersList = data;
            this.productChatWhoSend = data.find((x: { id: string | null; }) => x.id == localStorage.getItem('userId'));
        },
        product_detail_chat_list_load_act(data: any) {
            this.productDetailChatList = data;
        }
    },
    getters: {
        getcheckListTotal(state){
          return state.checkListTotal;  
        },
        getProductionsList(state) {
            return state.productionsList;
        },
        getProductionsFilterList(state) {
            return state.productionsListFilter;  
        },
        getProductionsDetailModel(state) {
            return state.productionsDetailModel;
        },
        getProductUnitList(state) {
            return state.productUnitList;
        },
        getProductSupplierList(state) {
            return state.supplierList;
        },
        getProductDeliveryList(state) {
            return state.deliveryList;
        },
        getProductPaymentList(state) {
            return state.paymentList;
        },
        getInvoiceList(state) {
            return state.invoiceList;
        },
        getCountryList(state) {
            return state.countryList;
        },
        getCustomersList(state) {
            return state.customersList;
        },
        getProductionsNewButton(state) {
            return state.productionNewButton;
        },
        getUserList(state) {
            return state.userList;
        },
        getProductTotal(state) {
            return state.productsTotal;
        },
        getProductCost(state) {
            return state.productCost;
        },
        getWorkmanshipList(state) {
            return state.workmanshipList;
        },
        getWorkmanshipModel(state) {
            return state.workmanshipModel;
        },
        getProductDetailCostList(state) {
            return state.productDetailCostList;
        },
        getProductDetailCheckList(state) {
            return state.productDetailCheckList;
        },
        getProductStatusId(state) {
            return state.productsStatusId;
        },
        getProductsSaveButtonStatus(state) {
            return state.productsSaveButtonStatus;
        },
        getProductionsListTotal(state) {
            return state.productionsListTotal;
        },
        getProductsDetailSupplierList(state) {
            return state.productsDetailSupplierList;
        },
        getProductsSupplierDeliveryList(state) {
            return state.productsSupplierDeliveryList;
        },
        getProductsSupplierInvoiceList(state) {
            return state.productsSupplierInvoiceList;
        },
        getProductDetailDocumentList(state) {
            return state.productDetailDocumentList;
        },
        getProductDetailOrderInformationList(state) {
            return state.productDetailOrderInformationList;
        },
        getProductDetailUsersList(state) {
            return state.productDetailUsersList
        },
        getProductChatWhoSend(state) {
            return state.productChatWhoSend;
        },
        getProductDetailChatList(state) {
            return state.productDetailChatList;
        }
        
    }
})