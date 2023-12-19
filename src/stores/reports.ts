import { defineStore } from 'pinia';

export const useReportsStore = defineStore('reports', {
    state: () => {
        return {
            mekmarLoadingListNewYearTotal:{
              'fob':0,
              'ddp':0,  
            },
            mekmarLoadingListNewYear:[],
            createSizeList:[],
            mekmarMkCustomerOrderList: [],
            mekmerProductionList: [],
            mekmerProductionTotalList: {
                'amount': 0,
                'piece': 0,
            },
            mekmerStockList: [],
            mekmerStockDetailList: [],
            mekmerStockListTotal: {
                'crate': 0,
                'amount': 0,
            },
            mekmerStockDetailListTotal: {
                'piece': 0,
                'amount':0
            },
            mekmerProductionPricesList: [],
            mekmerProductionPricesTotalList: {
                'amount': 0,
                'crate': 0,
            },
            mekmerProductionPricesDetailList: [],
            mekmerProductionPricesDetailTotalList: {
                'amount': 0,
                'piece': 0,
            },
            mekmerMineList: [],
            mekmerToBeProducedList: [],
            mekmerToBeProducedTotalList: {
                'order': 0,
                'produce':0
            },
            mekmerToBeProducedDetailList: [],
            mekmerToBeProducedDetailTotalList: {
                'order': 0,
            },
            mekmerAtlantaStockList: [],
            mekmerAtlantaStockTotalList: {
                'stockBox': 0,
                'stockSqft': 0,
                'stockM2': 0,
                'seaBox': 0,
                'seaSqft': 0,
                'seaM2': 0,
                
            },
            mekmerAtlantaStockDetailList: [],
            mekmerAtlantaStockDetailTotalList: [],
            mekmarAyoList: [],
            mekmarAyoTotalList: {
                'total': 0,
                'mekmar': 0,
                'mekmoz': 0,
                'external': 0,
                'transport': 0,
                'duty': 0,
                'spraying': 0,
                'port': 0,
                'insurance': 0,
                'freight': 0,
                'lashing': 0,
                'booking': 0,
                'spanzlet': 0,
                'detail_1': 0,
                'detail_2': 0,
                'detail_3': 0,
                'mekus': 0,
                'marketing': 0,
                'special_workerman': 0,
                'bank': 0,
                'carrier': 0,
                'cost':0,
                'gain_usd': 0,
                'gain_tl': 0,                
                
            },
            mekmarAyoYearList: [],
            mekmarAyoMonthList: [],
            mekmarAyoDetailCostList: [],
            mekmarAyoDetailBankList: [],
            mekmarAyoDetailInvoiceList: [],
            mekmarAyoDetailCostTotalList: {
                'invoice': 0,
                'mekmar': 0,
                'mekmoz': 0,
                'outer': 0,
                'transport': 0,
                'duty': 0,
                'spraying': 0,
                'port': 0,
                'insurance': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'mekus': 0,
                'commision': 0,
                'workmanship': 0,
                'bank': 0,
                'courier': 0,
                'cost_usd': 0,
                'cost_tr': 0,
                'profit_usd': 0,
                'profit_tr': 0,
            },
            mekmarAyoDetailBankTotalList: {
                'usd': 0,
                'tl': 0,
                'cost': 0,
                'currency': 0,
            },
            mekmarLoadingListMonth: [],
            mekmarLoadingListYear: [],
            mekmarLoadingListByCustomer: [],
            mekmarLoadingListYearCounting: [],
            mekmarLoadingYearList: [],
            mekmarLoadingMonthList: [],
            mekmarLoadingTotalListMonth: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarLoadingTotalListYear: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarLoadingTotalListMarketing: {
                'month': 0,
                'year': 0,
            },
            mekmarLoadingTotalListYearCount: [],
            mekmarForwardingList: [],
            mekmarForwardingTotalList: {
                'piece': 0,
                'amount': 0,
                'totalPrice':0,
            },
            mekmarOrderSummaryProduction: [],
            mekmarOrderSummaryProductionTotal: {
                'thisYearFob': 0,
                'thisYearDdp': 0,
                'lastYearFob': 0,
                'lastYearDdp': 0,
                'previousYearFob': 0,
                'previousYearDdp': 0,
            },

            mekmarOrderSummaryForwarding: [],
            mekmarOrderSummaryForwardingTotal: {
                'thisYearFob': 0,
                'thisYearDdp': 0,
                'lastYearFob': 0,
                'lastYearDdp': 0,
                'previousYearFob': 0,
                'previousYearDdp': 0,
            },

            mekmarOrderSummaryProductionUserThen: [],
            mekmarOrderSummaryProductionUserThenTotal: {
                'fob': 0,
                'ddp':0
            },

            mekmarOrderSummaryForwardingUserThen: [],
            mekmarOrderSummaryForwardingUserThenTotal: {
                'fob': 0,
                'ddp': 0,
            },


            mekmarOrderSummaryProductionUserNow: [],
            mekmarOrderSummaryProductionUserNowTotal: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarOrderSummaryForwardingUserNow: [],
            mekmarOrderSummaryForwardingUserNowTotal: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarOrderSummaryDetailList: [],
            mekmarOrderSummaryDetailTotalList:{
                'fob': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'detail4': 0,
                'ddp': 0,
            },
            mekmarMkYearsList: [],
            mekmarMkMonthsList:[],
            mekmarMkByPoProductionList: [],
            mekmarMkByPoProductionTotalList: {
                'fob': 0,
                'ddp': 0,
            },

            mekmarMkByCustomerProductionList: [],
            mekmarMkByCustomerProductionTotalList: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarMkByMarketingProductionList: [],
            mekmarMkByMarketingProductionTotalList: {
                'fob': 0,
                'ddp': 0,
            },

            mekmarMkByMarketingForwardingList: [],
            mekmarMkByMarketingForwardingTotalList: {
                'fob': 0,
                'ddp': 0,
            },
            mekmarMkByMarketingForwardingDetailList: [],
            mekmarMkByMarketingForwardingDetailMekmarList: [],
            mekmarMkByMarketingForwardingDetailMekmerList:[],
            mekmarMkByMarketingForwardingDetailIcPiyasaList: [],
            mekmarMkByMarketingForwardingDetailImperialHomesList:[],
            mekmarMkByMarketingForwardingDetailFilteredTotalList: {
                'mekmarFob': 0,
                'mekmarDdp': 0,
                'mekmerFob': 0,
                'mekmerDdp': 0,
                'domesticMarketFob': 0,
                'domesticMarketDdp': 0,
                'imperialHomesFob': 0,
                'imperialHomesDdp': 0,
            },
            mekmarMkProductionAndForwardingList: [],
            mekmarMkProductionAndForwardingTotalList: {
                'product': 0,
                'forward': 0,
                'total': 0,
            },
            mekmarMkList: [],
            mekmarGuList: [],
            mekmarGuYearList:[],
            mekmarGuAyoCostList: [],
            mekmarGuContainerCountryList: [],
            mekmarGuContainerCountryTotalList: {
                'country': 0,
                'order': 0,
                'container':0,
            },
            mekmarGuContainerCountryDetailList: [],
            mekmarGuContainerCountryDetailTotalList: {
                'fob':0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'ddp': 0,
            },

            mekmarGuContainerCustomerList: [],
            mekmarGuContainerCustomerTotalList: {
                'customer': 0,
                'forwarding': 0,
                'container':0,
            },

            mekmarGuContainerCustomerDetailList: [],
            mekmarGuContainerCustomerDetailTotalList: {
                'fob':0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'ddp': 0,
            },

            mekmarGuContainerSupplierDetailList:[],
            mekmarGuContainerSupplierDetailTotalList: {
                'buying': 0,  
            },


            mekmarGuContainerSupplierList: [],
            mekmarGuContainerSupplierTotalList: {
                'supplier': 0,
                'forwarding': 0,
                'getPaid':0,
            },
            mekmarGuMekusList: [],
            mekmarGuMekusTotalList: {
                'total': 0,
            },
            mekmarGuLogsList: [],
            mekmarGuAyoTotalList: {
                'total': 0,
                'cost': 0,
                'getPaidUsd': 0,
                'remainder': 0,
                'profitUsd': 0,
                'profitTl': 0,
            },
            mekmarGuAyoDetailList: [],
            mekmarGuAyoDetailTotalList: {
                'selling': 0,
                'setFreight': 0,
                'setDetail1': 0,
                'setDetail2': 0,
                'setDetail3': 0,
                'setInsurance': 0,
                'total': 0,
                'buying': 0,
                'getFreight': 0,
                'getDetail1': 0,
                'getDetail2': 0,
                'getDetail3': 0,
                'commision': 0,
                'document': 0,
                'bank': 0,
                'workmanship': 0,
                'getInsurance': 0,
                'invoiceCost':0,
                'totalCost': 0,
                'paid': 0,
                'remainder': 0,
                'gainUsd': 0,
                'gainTl': 0,
            },
            mekmarToDoListDone: [],
            mekmarToDoListToDo: [],
            orderRepresentativeInfoList: [],
            orderRepresentativeInfoTotal: {
                orderer: 0,
                operation: 0,
            },
            toplam_bedel_sum :0,
            toplam_masraf_sum: 0,
            toplam_kar_zarar_orani: 0,
            mekmarGuForwardingSummaryList: {
                'oneYear': [],
                'twoYear': [],
                'threeYear': [],
                'fourYear': [],
                'fiveYear': [],
                'sixYear': [],
                'sevenYear': [],
                'eightYear': [],
                'nineYear': [],
                'tenYear':[]
            },
            mekmarGuForwardingSummaryTotal: {
                oneFob: 0,
                oneDdp: 0,
                twoFob: 0,
                twoDdp: 0,
                threeFob: 0,
                threeDdp: 0,
                fourFob: 0,
                fourDdp: 0,
                fiveFob: 0,
                fiveDdp: 0,
                sixFob: 0,
                sixDdp: 0,
                sevenFob: 0,
                sevenDdp: 0,
                eightFob: 0,
                eightDdp: 0,
                nineFob: 0,
                nineDdp: 0,
                tenFob: 0,
                tenDdp:0,
            }
        }
    },
    actions: {
        create_size_list_load_act(data:any){
          this.createSizeList = data;  
        },
        order_representative_info_list_load_act(data: any) {
            this.orderRepresentativeInfoList = data;
            this.orderRepresentativeInfoTotal = {
                orderer: 0,
                operation: 0,
            };
            for (const item of data.ssOzet) {
                this.orderRepresentativeInfoTotal.orderer += item.adet;

            };
            for (const item of data.opOzet) {
                this.orderRepresentativeInfoTotal.operation += item.adet;
            }

        },
        mekmer_production_list_load_act(data: any) {
            this.mekmerProductionList = data;
            this.mekmer_production_list_total_load_act(data);
        },
        mekmer_production_list_total_load_act(data: any) {
            this.mekmerProductionTotalList = {
                'amount': 0,
                'piece': 0,
            };
            for (const item of data) {
                this.mekmerProductionTotalList.amount += item.miktar;
                this.mekmerProductionTotalList.piece += item.adet;
            }
        },
        mekmer_stock_list_load_act(data: any) {
            this.mekmerStockList = data;
            this.mekmer_stock_list_total_load_act(data);
        },
        mekmer_stock_detail_list_load_act(data: any) {
            this.mekmerStockDetailList = data.stok_ayrinti_listesi;
            this.mekmer_stock_detail_list_total_load_act(data.stok_ayrinti_listesi);
        },
        mekmer_stock_list_total_load_act(data: any) {
            this.mekmerStockListTotal = {
                'crate': 0,
                'amount': 0,
            };
            for (const item of data) {
                this.mekmerStockListTotal.crate += item.kasaSayisi;
                this.mekmerStockListTotal.amount += item.miktar;
            }
        },
        mekmer_stock_detail_list_total_load_act(data: any) {
            this.mekmerStockDetailListTotal = {
                'piece': 0,
                'amount': 0
            };
            for (const item of data) {
                this.mekmerStockDetailListTotal.piece += item.adettop;
                this.mekmerStockDetailListTotal.amount += item.miktartop;
            }
        },
        mekmer_production_prices_list_load_act(data: any) {
            this.mekmerProductionPricesList = data;
            this.mekmer_production_prices_total_list_load_act(data);
        },
        mekmer_production_prices_total_list_load_act(data: any) {
            this.mekmerProductionPricesTotalList = {
                'amount': 0,
                'crate': 0,
            };
            for (const item of data) {
                this.mekmerProductionPricesTotalList.crate += item.kasaSayisi;
                this.mekmerProductionPricesTotalList.amount += item.miktar;
            }
        },
        mekmer_production_prices_detail_list_load_act(data: any) {
            this.mekmerProductionPricesDetailList = data;
            this.mekmer_production_prices_detail_total_list_load_act(data);
        },
        mekmer_production_prices_detail_total_list_load_act(data: any) {
            this.mekmerProductionPricesDetailTotalList = {
                'amount': 0,
                'piece': 0,
            };
            for (const item of data) {
                this.mekmerProductionPricesDetailTotalList.amount += item.miktartop;
                this.mekmerProductionPricesDetailTotalList.piece += item.adettop;
            }
        },
        mekmer_mine_list_load_act(data: any) {
            this.mekmerMineList = data;
        },
        mekmer_to_be_produced_list_load_act(data: any) {
            this.mekmerToBeProducedList = data;
            this.mekmer_to_be_produced_total_list_load_act(data);
        },
        mekmer_to_be_produced_total_list_load_act(data: any) {
            this.mekmerToBeProducedTotalList = {
                'order': 0,
                'produce': 0
            };
            for (const item of data) {
                this.mekmerToBeProducedTotalList.order += item.sipMiktari;
                this.mekmerToBeProducedTotalList.produce += item.uretimMiktar;

            }
        },
        mekmer_to_be_produced_detail_list_load_act(data: any) {
            this.mekmerToBeProducedDetailList = data;
            this.mekmer_to_be_produced_detail_total_list_load_act(data);
        },
        mekmer_to_be_produced_detail_total_list_load_act(data: any) {
            this.mekmerToBeProducedDetailTotalList = {
                'order': 0,
            };
            for (const item of data) {
                this.mekmerToBeProducedDetailTotalList.order += item.sipMiktari;
            };
        },
        mekmer_atlanta_stock_list_load_act(data: any) {
            this.mekmerAtlantaStockList = data;
            this.mekmer_atlanta_stock_total_list_load_act(data);
        },
        mekmer_atlanta_stock_total_list_load_act(data: any) {
            this.mekmerAtlantaStockTotalList = {
                'stockBox': 0,
                'stockSqft': 0,
                'stockM2': 0,
                'seaBox': 0,
                'seaSqft': 0,
                'seaM2': 0,
                
            };
            for (const item of data) {
                this.mekmerAtlantaStockTotalList.stockBox += item.stok_kutu;
                this.mekmerAtlantaStockTotalList.stockSqft += item.stok_sqft;
                this.mekmerAtlantaStockTotalList.stockM2 += item.stok_m2;
                this.mekmerAtlantaStockTotalList.seaBox += item.su_kutu;
                this.mekmerAtlantaStockTotalList.seaSqft += item.su_sqft;
                this.mekmerAtlantaStockTotalList.seaM2 += item.su_m2;
            };
        },
        mekmer_atlanta_stock_detail_list_load_act(data: any) {
            this.mekmerAtlantaStockDetailList = data;
        },
        mekmar_ayo_list_load_act(data: any) {
            this.mekmarAyoList = data;
            this.mekmar_ayo_yuzde_hesap_load_act(data);
            this.mekmar_ayo_total_list_load_act(data);
        },
        mekmar_ayo_yuzde_hesap_load_act(data: any) {
            this.toplam_bedel_sum = 0
            this.toplam_masraf_sum = 0
            this.toplam_kar_zarar_orani = 0;
            for (const i of data) {
                this.toplam_bedel_sum += i.toplam_bedel
                this.toplam_masraf_sum += i.masraf_toplam
            }
            const toplam_kar_zarar = (this.toplam_bedel_sum - this.toplam_masraf_sum)
            this.toplam_kar_zarar_orani = ((toplam_kar_zarar / this.toplam_bedel_sum) * 100).toFixed(2)
        },
        mekmar_ayo_total_list_load_act(data: any) {
            this.mekmarAyoTotalList = {
                'total': 0,
                'mekmar': 0,
                'mekmoz': 0,
                'external': 0,
                'transport': 0,
                'duty': 0,
                'spraying': 0,
                'port': 0,
                'insurance': 0,
                'freight': 0,
                'lashing': 0,
                'booking': 0,
                'spanzlet': 0,
                'detail_1': 0,
                'detail_2': 0,
                'detail_3': 0,
                'mekus': 0,
                'marketing': 0,
                'special_workerman': 0,
                'bank': 0,
                'carrier': 0,
                'cost':0,
                'gain_usd': 0,
                'gain_tl': 0,
            };
            for (const item of data) {
                this.mekmarAyoTotalList.total += item.toplam_bedel;
                this.mekmarAyoTotalList.mekmar += item.mekmar_alim;
                this.mekmarAyoTotalList.mekmoz += item.mekmoz_alim;
                this.mekmarAyoTotalList.external += item.dis_alim;
                this.mekmarAyoTotalList.transport += item.nakliye;
                this.mekmarAyoTotalList.duty += item.gumruk;
                this.mekmarAyoTotalList.spraying += item.ilaclama;
                this.mekmarAyoTotalList.port += item.liman;
                this.mekmarAyoTotalList.insurance += item.sigorta;
                this.mekmarAyoTotalList.freight += item.navlun;
                this.mekmarAyoTotalList.lashing += item.lashing;
                this.mekmarAyoTotalList.booking += item.booking;
                this.mekmarAyoTotalList.spanzlet += item.spazlet;
                this.mekmarAyoTotalList.detail_1 += item.detay_1;
                this.mekmarAyoTotalList.detail_2 += item.detay_2;
                this.mekmarAyoTotalList.detail_3 += item.detay_3;
                this.mekmarAyoTotalList.mekus += item.mekus_masraf;
                this.mekmarAyoTotalList.marketing += item.pazarlama;
                this.mekmarAyoTotalList.special_workerman += item.ozel_iscilik;
                this.mekmarAyoTotalList.bank += item.banka_masrafi;
                this.mekmarAyoTotalList.carrier += item.kurye_masrafi;
                this.mekmarAyoTotalList.cost += item.masraf_toplam;
                this.mekmarAyoTotalList.gain_usd += item.kar_zarar;
                this.mekmarAyoTotalList.gain_tl += item.kar_zarar_tl;
            }
        },
        mekmar_ayo_year_list_load_act(data: any) {
            this.mekmarAyoYearList = data;
        },
        mekmar_ayo_month_list_load_act(data: any) {
            this.mekmarAyoMonthList = data;
        },
        mekmar_ayo_detail_list_load_act(data: any) {
            this.mekmarAyoDetailCostList = data.maliyet;
            this.mekmar_ayo_detail_total_list_load_act(data.maliyet);
            this.mekmarAyoDetailBankList = data.banka;
            this.mekmar_ayo_detail_bank_total_list_load_act(data.banka);
            this.mekmarAyoDetailInvoiceList = data.evrak;
        },
        mekmar_ayo_detail_total_list_load_act(data: any) {
            this.mekmarAyoDetailCostTotalList = {
                'invoice': 0,
                'mekmar': 0,
                'mekmoz': 0,
                'outer': 0,
                'transport': 0,
                'duty': 0,
                'spraying': 0,
                'port': 0,
                'insurance': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'mekus': 0,
                'commision': 0,
                'workmanship': 0,
                'bank': 0,
                'courier': 0,
                'cost_usd': 0,
                'cost_tr': 0,
                'profit_usd': 0,
                'profit_tr': 0,
            };
            for (const item of data) {
                this.mekmarAyoDetailCostTotalList.invoice += item.invoiced;
                this.mekmarAyoDetailCostTotalList.mekmar += item.mekmer_alim;
                this.mekmarAyoDetailCostTotalList.mekmoz += item.mek_moz_alim;
                this.mekmarAyoDetailCostTotalList.outer += item.dis_alim;
                this.mekmarAyoDetailCostTotalList.transport += item.nakliye;
                this.mekmarAyoDetailCostTotalList.duty += item.gumruk;
                this.mekmarAyoDetailCostTotalList.spraying += item.ilaclama;
                this.mekmarAyoDetailCostTotalList.port += item.liman;
                this.mekmarAyoDetailCostTotalList.insurance += item.sigorta;
                this.mekmarAyoDetailCostTotalList.freight += item.navlun_alis;
                this.mekmarAyoDetailCostTotalList.detail1 += item.detay_1;
                this.mekmarAyoDetailCostTotalList.detail2 += item.detay_2;
                this.mekmarAyoDetailCostTotalList.detail3 += item.detay_3;
                this.mekmarAyoDetailCostTotalList.mekus += item.mekus_masraf;
                this.mekmarAyoDetailCostTotalList.commision += item.komisyon;
                this.mekmarAyoDetailCostTotalList.workmanship += item.ozel_iscilik;
                this.mekmarAyoDetailCostTotalList.bank += item.banka_masrafi;
                this.mekmarAyoDetailCostTotalList.courier += item.kurye;
                this.mekmarAyoDetailCostTotalList.cost_usd += item.total_in;
                this.mekmarAyoDetailCostTotalList.cost_tr += item.total_in * item.kur;
                this.mekmarAyoDetailCostTotalList.profit_usd += item.invoiced - item.total_in;
                this.mekmarAyoDetailCostTotalList.profit_tr += (item.invoiced - item.total_in) * item.kur;
            }
        },
        mekmar_ayo_detail_bank_total_list_load_act(data: any) {
            this.mekmarAyoDetailBankTotalList = {
                'usd': 0,
                'tl': 0,
                'cost': 0,
                'currency': 0
            };
            for (const item of data) {
                this.mekmarAyoDetailBankTotalList.usd += item.tutar;
                this.mekmarAyoDetailBankTotalList.tl += item.tutartl;
                this.mekmarAyoDetailBankTotalList.cost += item.masraf;
                this.mekmarAyoDetailBankTotalList.currency += item.kur;

            };
            this.mekmarAyoDetailBankTotalList.currency = this.mekmarAyoDetailBankTotalList.currency / data.length;
        },
        mekmar_loading_list_load_act(data: any) {
            this.mekmarLoadingListMonth = data.aylik_yukleme_listesi;
            this.mekmar_loading_total_list_month(data.aylik_yukleme_listesi);
            this.mekmarLoadingListYear = data.yillik_yukleme_listesi;
            this.mekmar_loading_total_list_year(data.yillik_yukleme_listesi);
            this.mekmarLoadingListByCustomer = data.musteribazinda_aylik;
            this.mekmarLoadingListYearCounting = data.yillik_sayim_listesi;
            this.mekmar_loading_total_list_marketing(data.yillik_sayim_listesi)
            this.mekmarLoadingListNewYear = data.musteribazinda_yeni_yillik;
            this.mekmar_loading_total_new_list_total(data.musteribazinda_yeni_yillik);
        },

        mekmar_loading_new_list_load_act(data:any){
            this.mekmarLoadingListNewYear = data;
            this.mekmar_loading_total_new_list_total(data);
        },
        mekmar_loading_total_new_list_total(data:any){
          this.mekmarLoadingListNewYearTotal = {
            'fob':0,
            'ddp':0
          };
          for(const item of data){
            this.mekmarLoadingListNewYearTotal.fob += item.fob;
            this.mekmarLoadingListNewYearTotal.ddp += item.dtp;
          }
        },
        mekmar_loading_year_list_load_act(data: any) {
            this.mekmarLoadingYearList = data;
        },
        mekmar_loading_month_list_load_act(data: any) {
            this.mekmarLoadingMonthList = data;
        },
        mekmar_loading_total_list_month(data: any) {
            this.mekmarLoadingTotalListMonth = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarLoadingTotalListMonth.fob += item.fob;
                this.mekmarLoadingTotalListMonth.ddp += item.dtp;
            }
        },
        mekmar_loading_total_list_year(data: any) {
            this.mekmarLoadingTotalListYear = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarLoadingTotalListYear.fob += item.fob;
                this.mekmarLoadingTotalListYear.ddp += item.dtp;
            }
        },
        mekmar_loading_total_list_marketing(data: any) {
            this.mekmarLoadingTotalListMarketing = {
                'month': 0,
                'year': 0,
            };
            for (const item of data) {
                this.mekmarLoadingTotalListMarketing.month += item.yukleme_sayisiay;
                this.mekmarLoadingTotalListMarketing.year += item.yukleme_sayisi;

            }
        },
        mekmar_forwarding_list_load_act(data: any) {
            this.mekmarForwardingList = data;
            this.mekmar_forwarding_total_list_load_act(data);
        },
        mekmar_forwarding_total_list_load_act(data: any) {
            this.mekmarForwardingTotalList = {
                'piece': 0,
                'amount': 0,
                'totalPrice': 0,
            };
            for (const item of data) {
                this.mekmarForwardingTotalList.piece += item.adet;
                this.mekmarForwardingTotalList.amount += item.miktar;
                this.mekmarForwardingTotalList.totalPrice += item.toplam;

            }
        },
        mekmar_order_summary_list_load_act(data: any) {
            this.mekmarOrderSummaryProduction = data.siparis_list;
            this.mekmar_order_summary_production_total_list_load_act(data.siparis_list);

            this.mekmarOrderSummaryForwarding = data.sevk_list;
            this.mekmar_order_summary_forwarding_total_list_load_act(data.sevk_list);

            this.mekmarOrderSummaryProductionUserThen = data.siparis_gecen_yil_list;
            this.mekmar_order_summary_production_user_then_total(data.siparis_gecen_yil_list);

            this.mekmarOrderSummaryForwardingUserThen = data.sevkiyat_gecen_yil_list;
            this.mekmar_order_summary_forwarding_user_then_total(data.sevkiyat_gecen_yil_list);

            this.mekmarOrderSummaryProductionUserNow = data.siparis_bu_yil_list;
            this.mekmar_order_summary_production_user_now_total(data.siparis_bu_yil_list);

            this.mekmarOrderSummaryForwardingUserNow = data.sevkiyat_bu_yil_list;
            this.mekmar_order_summary_forwarding_user_now_total(data.sevkiyat_bu_yil_list);
        },
        mekmar_order_summary_production_total_list_load_act(data: any) {
            this.mekmarOrderSummaryProductionTotal = {
                'thisYearFob': 0,
                'thisYearDdp': 0,
                'lastYearFob': 0,
                'lastYearDdp': 0,
                'previousYearFob': 0,
                'previousYearDdp': 0,
            };
            for (const item of data) {
                this.mekmarOrderSummaryProductionTotal.thisYearFob += item.buyil_mal_bedeli;
                this.mekmarOrderSummaryProductionTotal.thisYearDdp += item.buyil_toplam;
                this.mekmarOrderSummaryProductionTotal.lastYearFob += item.gecenyil_mal_bedeli;
                this.mekmarOrderSummaryProductionTotal.lastYearDdp += item.gecenyil_toplam;
                this.mekmarOrderSummaryProductionTotal.previousYearFob += item.oncekiyil_mal_bedeli;
                this.mekmarOrderSummaryProductionTotal.previousYearDdp += item.oncekiyil_toplam;
            }
        },
        mekmar_order_summary_forwarding_total_list_load_act(data: any) {
            this.mekmarOrderSummaryForwardingTotal = {
                'thisYearFob': 0,
                'thisYearDdp': 0,
                'lastYearFob': 0,
                'lastYearDdp': 0,
                'previousYearFob': 0,
                'previousYearDdp': 0,
            };
            for (const item of data) {
                this.mekmarOrderSummaryForwardingTotal.thisYearFob += item.buyil_mal_bedeli;
                this.mekmarOrderSummaryForwardingTotal.thisYearDdp += item.buyil_toplam;
                this.mekmarOrderSummaryForwardingTotal.lastYearFob += item.gecenyil_mal_bedeli;
                this.mekmarOrderSummaryForwardingTotal.lastYearDdp += item.gecenyil_toplam;
                this.mekmarOrderSummaryForwardingTotal.previousYearFob += item.oncekiyil_mal_bedeli;
                this.mekmarOrderSummaryForwardingTotal.previousYearDdp += item.oncekiyil_toplam;
            }
        },
        mekmar_order_summary_production_user_then_total(data: any) {
            this.mekmarOrderSummaryProductionUserThenTotal = {
                'fob': 0,
                'ddp': 0
            };
            for (const item of data) {
                this.mekmarOrderSummaryProductionUserThenTotal.fob += item.gecenyil_mal_bedeli;
                this.mekmarOrderSummaryProductionUserThenTotal.ddp += item.gecenyil_toplam;
            };
        },
        mekmar_order_summary_production_user_now_total(data: any) {
            this.mekmarOrderSummaryProductionUserNowTotal = {
                'fob': 0,
                'ddp':0
            };
            for (const item of data) {
                this.mekmarOrderSummaryProductionUserNowTotal.fob += item.buyil_mal_bedeli;
                this.mekmarOrderSummaryProductionUserNowTotal.ddp += item.buyil_toplam;
            }
        },
        mekmar_order_summary_forwarding_user_then_total(data: any) {
            this.mekmarOrderSummaryForwardingUserThenTotal = {
                'fob': 0,
                'ddp':0
            };
            for (const item of data) {
                this.mekmarOrderSummaryForwardingUserThenTotal.fob += item.gecenyil_mal_bedeli;
                this.mekmarOrderSummaryForwardingUserThenTotal.ddp += item.gecenyil_toplam;
            }
        },
        mekmar_order_summary_forwarding_user_now_total(data: any) {
            this.mekmarOrderSummaryForwardingUserNowTotal = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarOrderSummaryForwardingUserNowTotal.fob += item.buyil_mal_bedeli;
                this.mekmarOrderSummaryForwardingUserNowTotal.ddp += item.buyil_toplam;

            }
        },
        mekmar_order_summary_detail_list(data: any) {
            this.mekmarOrderSummaryDetailList = data;
            this.mekmar_order_summary_detail_total_list(data);
        },
        mekmar_order_summary_detail_total_list(data: any) {
            this.mekmarOrderSummaryDetailTotalList = {
                'fob': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'detail4': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarOrderSummaryDetailTotalList.fob += item.satistoplam;
                this.mekmarOrderSummaryDetailTotalList.freight += item.navlun;
                this.mekmarOrderSummaryDetailTotalList.detail1 += item.detay1;
                this.mekmarOrderSummaryDetailTotalList.detail2 += item.detay2;
                this.mekmarOrderSummaryDetailTotalList.detail3 += item.detay3;
                this.mekmarOrderSummaryDetailTotalList.detail4 += item.detay4;
                this.mekmarOrderSummaryDetailTotalList.ddp +=
                    (
                        item.satistoplam +
                        item.navlun +
                        item.detay1 +
                        item.detay2 +
                        item.detay3 +
                        item.detay4
                    );

            };
        },
        mekmar_mk_years_list_load_act(data: any) {
            this.mekmarMkYearsList = data;
        },
        mekmar_mk_list_load_act(data: any) {
            this.mekmarMkList = data;
            this.mekmarMkByPoProductionList = data.byPo;
            this.mekmarMkByCustomerProductionList = data.byCustomer;
            this.mekmarMkByMarketingProductionList = data.byMarketing;
            this.mekmarMkByMarketingForwardingList = data.byMarketingYukleme;
            this.mekmarMkByMarketingForwardingDetailList = data.byMarketingDetayYukleme;
            this.mekmarMkProductionAndForwardingList = data.byYuklemevSiparisler;
            this.mekmarMkCustomerOrderList = data.byCustomerOrder;
            this.mekmar_mk_production_and_forwarding_total_list_load_act(data.byYuklemevSiparisler);
            this.mekmar_mk_by_po_production_total_list_load_act(data.byPo);
            this.mekmar_mk_by_customer_production_total_list_load_act(data.byCustomer);
            this.mekmar_mk_by_marketing_production_total_list_load_act(data.byMarketing);
            this.mekmar_mk_by_marketing_forwarding_detail_filtered_list_loac_act(data.byMarketingDetayYukleme);
            this.mekmar_mk_by_marketing_forwarding_total_list_load_act(data.byMarketingYukleme);

        },
        mekmar_mk_by_po_production_total_list_load_act(data: any) {
            this.mekmarMkByPoProductionTotalList = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarMkByPoProductionTotalList.fob += item.fob;
                this.mekmarMkByPoProductionTotalList.ddp += item.ddp;

            }
        },
        mekmar_mk_by_customer_production_total_list_load_act(data: any) {
            this.mekmarMkByCustomerProductionTotalList = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarMkByCustomerProductionTotalList.fob += item.toplam;
                this.mekmarMkByCustomerProductionTotalList.ddp += item.toplamCfr;

            }
        },
        mekmar_mk_by_marketing_production_total_list_load_act(data: any) {
            this.mekmarMkByMarketingProductionTotalList = {
                'fob': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarMkByMarketingProductionTotalList.fob += item.toplam;
                this.mekmarMkByMarketingProductionTotalList.ddp += item.toplamCfr;

            }
        },
        mekmar_mk_by_marketing_forwarding_detail_filtered_list_loac_act(data: any) {
            this.mekmarMkByMarketingForwardingDetailFilteredTotalList = {
                'mekmarFob': 0,
                'mekmarDdp': 0,
                'mekmerFob': 0,
                'mekmerDdp': 0,
                'domesticMarketFob': 0,
                'domesticMarketDdp': 0,
                'imperialHomesFob': 0,
                'imperialHomesDdp': 0,
            };
            this.mekmarMkByMarketingForwardingDetailMekmarList = data.filter((x: { marketing: string; }) => x.marketing == 'Mekmar');
            this.mekmarMkByMarketingForwardingDetailMekmerList = data.filter((x: { marketing: string; }) => x.marketing == 'Mekmer');
            this.mekmarMkByMarketingForwardingDetailIcPiyasaList = data.filter((x: { marketing: string; }) => x.marketing == 'İç Piyasa');
            this.mekmarMkByMarketingForwardingDetailImperialHomesList = data.filter((x: { marketing: string; }) => x.marketing == 'Imperial Homes');
            if (this.mekmarMkByMarketingForwardingDetailMekmarList.length > 0) {
               for (const item1 of this.mekmarMkByMarketingForwardingDetailMekmarList) {
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.mekmarFob += item1.toplamFob;
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.mekmarDdp += item1.toplamCfr;
                };
            };
            if (this.mekmarMkByMarketingForwardingDetailMekmerList.length > 0) {
               for (const item1 of this.mekmarMkByMarketingForwardingDetailMekmerList) {
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.mekmerFob += item1.toplamFob;
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.mekmerDdp += item1.toplamCfr;
                };
            };
            if (this.mekmarMkByMarketingForwardingDetailIcPiyasaList.length > 0) {
               for (const item1 of this.mekmarMkByMarketingForwardingDetailIcPiyasaList) {
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.domesticMarketFob += item1.toplamFob;
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.domesticMarketDdp += item1.toplamCfr;
                };
            };
            if (this.mekmarMkByMarketingForwardingDetailImperialHomesList.length > 0) {
               for (const item1 of this.mekmarMkByMarketingForwardingDetailImperialHomesList) {
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.imperialHomesFob += item1.toplamFob;
                    this.mekmarMkByMarketingForwardingDetailFilteredTotalList.imperialHomesDdp += item1.toplamCfr;
                };
            };
        },
        mekmar_mk_by_marketing_forwarding_total_list_load_act(data: any) {
            this.mekmarMkByMarketingForwardingTotalList = {
                'fob': 0,   
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarMkByMarketingForwardingTotalList.fob += item.fobToplam;
                this.mekmarMkByMarketingForwardingTotalList.ddp += item.cfrToplam;

            }
        },
        mekmar_mk_production_and_forwarding_total_list_load_act(data: any) {
            this.mekmarMkProductionAndForwardingTotalList = {
                'product': 0,
                'forward': 0,
                'total': 0,
            };
            for (const item of data) {
                this.mekmarMkProductionAndForwardingTotalList.product += item.siparisfob;
                this.mekmarMkProductionAndForwardingTotalList.forward += item.yuklenenddp;
                this.mekmarMkProductionAndForwardingTotalList.total += item.total;

            }
        },
        mekmar_gu_list_load_act(data: any) {
            this.mekmarGuList = data;

            this.mekmarGuAyoCostList = data.ayo;
            this.mekmar_gu_ayo_cost_total_list_load_act(data.ayo);

            this.mekmarGuContainerCountryList = data.ulke;
            this.mekmar_gu_container_country_total_list_load_act(data.ulke);
            this.mekmarGuContainerCustomerList = data.musteri;
            this.mekmar_gu_container_customer_total_list_load_act(data.musteri);
            this.mekmarGuContainerSupplierList = data.tedarikci;
            this.mekmar_gu_container_supplier_total_list_load_act(data.tedarikci)

            this.mekmarGuMekusList = data.mekus;
            this.mekmar_gu_mekus_total_list_load_act(data.mekus);

            this.mekmarGuAyoDetailList = data.ayoDetail;

            this.mekmarGuLogsList = data.logs;

            // this.mekmarGuForwardingSummaryList = data.forwarding;

            const date = new Date();
            const year = date.getFullYear();
            const yearL = year - 9;
            for (const item of data.forwarding) {
                if (item.year == yearL) {
                    this.mekmarGuForwardingSummaryList.oneYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.oneFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.oneDdp += item.ddp;

                } else if (item.year == yearL + 1) {
                    this.mekmarGuForwardingSummaryList.twoYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.twoFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.twoDdp += item.ddp;
                } else if (item.year == yearL + 2) {
                    this.mekmarGuForwardingSummaryList.threeYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.threeFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.threeDdp += item.ddp;
                }else if (item.year == yearL + 3) {
                    this.mekmarGuForwardingSummaryList.fourYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.fourFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.fourDdp += item.ddp;
                }else if (item.year == yearL + 4) {
                    this.mekmarGuForwardingSummaryList.fiveYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.fiveFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.fiveDdp += item.ddp;
                }else if (item.year == yearL + 5) {
                    this.mekmarGuForwardingSummaryList.sixYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.sixFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.sixDdp += item.ddp;
                }else if (item.year == yearL + 6) {
                    this.mekmarGuForwardingSummaryList.sevenYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.sevenFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.sevenDdp += item.ddp;
                }else if (item.year == yearL + 7) {
                    this.mekmarGuForwardingSummaryList.eightYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.eightFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.eightDdp += item.ddp;
                }else if (item.year == yearL + 8) {
                    this.mekmarGuForwardingSummaryList.nineYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.nineFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.nineDdp += item.ddp;
                }else if (item.year == yearL + 9) {
                    this.mekmarGuForwardingSummaryList.tenYear?.push(item);
                    this.mekmarGuForwardingSummaryTotal.tenFob += item.fob;
                    this.mekmarGuForwardingSummaryTotal.tenDdp += item.ddp;
                }
            }


            


        },

        mekmar_gu_year_list_load_act(data: any) {
            this.mekmarGuYearList = data;
        },
        mekmar_gu_ayo_cost_total_list_load_act(data: any) {
            this.mekmarGuAyoTotalList = {
                'total': 0,
                'cost': 0,
                'getPaidUsd': 0,
                'remainder': 0,
                'profitUsd': 0,
                'profitTl': 0,
            };
            for (const item of data) {
                this.mekmarGuAyoTotalList.total += item.toplam_bedel;
                this.mekmarGuAyoTotalList.cost += item.masraf_toplam;
                this.mekmarGuAyoTotalList.getPaidUsd += item.odenen_usd_tutar;
                this.mekmarGuAyoTotalList.remainder += item.kalan_bedel;
                this.mekmarGuAyoTotalList.profitUsd += item.kar_zarar;
                this.mekmarGuAyoTotalList.profitTl += item.kar_zarar_tl;

            }
        },
        mekmar_gu_container_country_total_list_load_act(data: any) {
            this.mekmarGuContainerCountryTotalList = {
                'country': 0,
                'order': 0,
                'container': 0,
            };
            this.mekmarGuContainerCountryTotalList.country = data.length;
            for (const item of data) {
                this.mekmarGuContainerCountryTotalList.order += item.sip_sayisi;
                this.mekmarGuContainerCountryTotalList.container += item.konteynir_sayisi;
            };
        },
        mekmar_gu_container_customer_total_list_load_act(data: any) {
            this.mekmarGuContainerCustomerTotalList = {
                'customer': 0,
                'forwarding': 0,
                'container': 0,
            };
            this.mekmarGuContainerCustomerTotalList.customer = data.length;
            for (const item of data) {
                this.mekmarGuContainerCustomerTotalList.forwarding += item.yuk_mus_sayisi;
                this.mekmarGuContainerCustomerTotalList.container += item.konteynir_sayisi;
            }
        },
        mekmar_gu_container_supplier_total_list_load_act(data: any) {
            this.mekmarGuContainerSupplierTotalList = {
                'supplier': 0,
                'forwarding': 0,
                'getPaid':0,
            };
            this.mekmarGuContainerSupplierTotalList.supplier = data.length;
            for (const item of data) {
                this.mekmarGuContainerSupplierTotalList.forwarding += item.yuklenen_tedarikci_sayisi;
                this.mekmarGuContainerSupplierTotalList.getPaid += item.total_alis;
            
            }
        },
        mekmar_gu_mekus_total_list_load_act(data: any) {
            this.mekmarGuMekusTotalList = {
                'total': 0,
            };
            for (const item of data) {
                this.mekmarGuMekusTotalList.total += item.mekusMasraf;
            }
        },

        mekmar_gu_ayo_detail_total_list_load_act(data: any) {
            this.mekmarGuAyoDetailTotalList = {
                'selling': 0,
                'setFreight': 0,
                'setDetail1': 0,
                'setDetail2': 0,
                'setDetail3': 0,
                'setInsurance': 0,
                'total': 0,
                'buying': 0,
                'getFreight': 0,
                'getDetail1': 0,
                'getDetail2': 0,
                'getDetail3': 0,
                'commision': 0,
                'document': 0,
                'bank': 0,
                'workmanship': 0,
                'getInsurance': 0,
                'invoiceCost': 0,
                'totalCost': 0,
                'paid': 0,
                'remainder': 0,
                'gainUsd': 0,
                'gainTl': 0,
            };
            for (const item of data) {
                this.mekmarGuAyoDetailTotalList.selling += item.satis_toplami;
                this.mekmarGuAyoDetailTotalList.setFreight += item.navlun_satis;
                this.mekmarGuAyoDetailTotalList.setDetail1 += item.detay_1;
                this.mekmarGuAyoDetailTotalList.setDetail2 += item.detay_2;
                this.mekmarGuAyoDetailTotalList.setDetail3 += item.detay_3;
                this.mekmarGuAyoDetailTotalList.setInsurance += item.sigorta_tutar_satis;
                this.mekmarGuAyoDetailTotalList.total += item.toplam_bedel;
                this.mekmarGuAyoDetailTotalList.buying += item.alis_toplami;
                this.mekmarGuAyoDetailTotalList.getFreight += item.navlun_alis;
                this.mekmarGuAyoDetailTotalList.getDetail1 += item.detay_alis_1;
                this.mekmarGuAyoDetailTotalList.getDetail2 += item.detay_alis_2;
                this.mekmarGuAyoDetailTotalList.getDetail3 += item.detay_alis_3;
                this.mekmarGuAyoDetailTotalList.commision += item.komisyon;
                this.mekmarGuAyoDetailTotalList.document += item.evrak_gideri;
                this.mekmarGuAyoDetailTotalList.bank += item.banka_masrafi;
                this.mekmarGuAyoDetailTotalList.workmanship += item.iscilik_masrafi;
                this.mekmarGuAyoDetailTotalList.getInsurance += item.sigorta_alis;
                this.mekmarGuAyoDetailTotalList.invoiceCost += item.fatura_masraflari;
                this.mekmarGuAyoDetailTotalList.totalCost += item.masraf_toplam;
                this.mekmarGuAyoDetailTotalList.paid += item.odenen_usd_tutar;
                this.mekmarGuAyoDetailTotalList.remainder += item.kalan_bedel;
                this.mekmarGuAyoDetailTotalList.gainUsd += item.kar_zarar;
                this.mekmarGuAyoDetailTotalList.gainTl += item.kar_zarar_tl;
            }

        },
        mekmar_gu_container_by_country_detail_list_load_act(data: any) {
            this.mekmarGuContainerCountryDetailList = data;
            this.mekmar_gu_container_by_country_detail_total_list_load_act(data);
        },
        mekmar_gu_container_by_country_detail_total_list_load_act(data: any) {
            this.mekmarGuContainerCountryDetailTotalList = {
                'fob': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarGuContainerCountryDetailTotalList.fob += item.fob_toplami;
                this.mekmarGuContainerCountryDetailTotalList.freight += item.navlun;
                this.mekmarGuContainerCountryDetailTotalList.detail1 += item.detay_1;
                this.mekmarGuContainerCountryDetailTotalList.detail2 += item.detay_2;
                this.mekmarGuContainerCountryDetailTotalList.detail3 += item.detay_3;
                this.mekmarGuContainerCountryDetailTotalList.ddp +=
                    (
                        item.fob_toplami +
                        item.navlun +
                        item.detay_1 +
                        item.detay_2 +
                        item.detay_3 
                    );

            }
        
        },

        mekmar_gu_container_by_customer_detail_list_load_act(data: any) {
            this.mekmarGuContainerCustomerDetailList = data;
            this.mekmar_gu_container_by_customer_detail_total_list_load_act(data);
        },
        mekmar_gu_container_by_customer_detail_total_list_load_act(data: any) {
            this.mekmarGuContainerCustomerDetailTotalList = {
                'fob': 0,
                'freight': 0,
                'detail1': 0,
                'detail2': 0,
                'detail3': 0,
                'ddp': 0,
            };
            for (const item of data) {
                this.mekmarGuContainerCustomerDetailTotalList.fob += item.fob_toplami;
                this.mekmarGuContainerCustomerDetailTotalList.freight += item.navlun;
                this.mekmarGuContainerCustomerDetailTotalList.detail1 += item.detay_1;
                this.mekmarGuContainerCustomerDetailTotalList.detail2 += item.detay_2;
                this.mekmarGuContainerCustomerDetailTotalList.detail3 += item.detay_3;
                this.mekmarGuContainerCustomerDetailTotalList.ddp +=
                    (
                        item.fob_toplami +
                        item.navlun +
                        item.detay_1 +
                        item.detay_2 +
                        item.detay_3 
                    );

            }
        
        },

        mekmar_gu_container_by_supplier_detail_list_load_act(data: any) {
            this.mekmarGuContainerSupplierDetailList = data;
            this.mekmar_gu_container_by_supplier_detail_total_list_load_act(data);
        },
        mekmar_gu_container_by_supplier_detail_total_list_load_act(data: any) {
            this.mekmarGuContainerSupplierDetailTotalList = {
                'buying': 0,
            };
            for (const item of data) {
                this.mekmarGuContainerSupplierDetailTotalList.buying += item.alis_toplami;
            }
        },
        mekmar_to_do_list_load_act(data: any) {
            this.mekmarToDoListDone = data.yapildi;
            this.mekmarToDoListToDo = data.yapilacak;
        }

    },
    getters: {
        getMekmarLoadingListNewYear(state){
          return state.mekmarLoadingListNewYear;  
        },
        getcreateSizeList(state){
          return state.createSizeList;  
        },
        getMekmarGuForwardingSummaryTotal(state) {
            return state.mekmarGuForwardingSummaryTotal;
        },
        getMekmarGuForwardingSummaryList(state) {
            return state.mekmarGuForwardingSummaryList;
        },
        getToplam_kar_zarar_orani(state) {
            return state.toplam_kar_zarar_orani;
        },
        getOrderRepresentativeInfoTotal(state) {
            return state.orderRepresentativeInfoTotal;
        },
        getOrderRepresentativeInfoList(state) {
            return state.orderRepresentativeInfoList;
        },
        getMekmerProductionList(state) {
            return state.mekmerProductionList;
        },
        getMekmerStockList(state) {
            return state.mekmerStockList;
        },
        getMekmerStockDetailList(state) {
            return state.mekmerStockDetailList;
        },
        getMekmerStockListTotal(state) {
            return state.mekmerStockListTotal;
        },
        getMekmerStockDetailListTotal(state) {
            return state.mekmerStockDetailListTotal;
        },
        getMekmerProductionTotalList(state) {
            return state.mekmerProductionTotalList;
        },
        getMekmerProductionPricesList(state) {
            return state.mekmerProductionPricesList;
        },
        getMekmerProductionPricesTotalList(state) {
            return state.mekmerProductionPricesTotalList;
        },
        getMekmerProductionPricesDetailList(state) {
            return state.mekmerProductionPricesDetailList;
        },
        getMekmerProductionPricesDetailTotalList(state) {
            return state.mekmerProductionPricesDetailTotalList;
        },
        getMekmerMineList(state) {
            return state.mekmerMineList;
        },
        getMekmerToBeProducedList(state) {
            return state.mekmerToBeProducedList;
        },
        getMekmerToBeProducedTotalList(state) {
            return state.mekmerToBeProducedTotalList;
        },
        getMekmerToBeProducedDetailList(state) {
            return state.mekmerToBeProducedDetailList;
        },
        getMekmerToBeProducedDetailTotalList(state) {
            return state.mekmerToBeProducedDetailTotalList;
        },
        getMekmerAtlantaStockList(state) {
            return state.mekmerAtlantaStockList;
        },
        getMekmerAtlantaStockTotalList(state) {
            return state.mekmerAtlantaStockTotalList;
        },
        getMekmerAtlantaStockDetailList(state) {
            return state.mekmerAtlantaStockDetailList;
        },
        getMekmarAyoList(state) {
            return state.mekmarAyoList;
        },
        getMekmarAyoTotalList(state) {
            return state.mekmarAyoTotalList;
        },
        getMekmarAyoYearList(state) {
            return state.mekmarAyoYearList;
        },
        getMekmarAyoMonthList(state) {
            return state.mekmarAyoMonthList;
        },
        getMekmarAyoDetailCostList(state) {
            return state.mekmarAyoDetailCostList;
        },
        getMekmarAyoDetailBankList(state) {
            return state.mekmarAyoDetailBankList;
        },
        getMekmarAyoDetailInvoiceList(state) {
            return state.mekmarAyoDetailInvoiceList;
        },
        getMekmarAyoDetailCostTotalList(state) {
            return state.mekmarAyoDetailCostTotalList;
        },
        getMekmarAyoDetailBankTotalList(state) {
            return state.mekmarAyoDetailBankTotalList;
        },
        getMekmarLoadingListMonth(state) {
            return state.mekmarLoadingListMonth;
        },
        getMekmarLoadingListYear(state) {
            return state.mekmarLoadingListYear;
        },
        getMekmarLoadingListYearCounting(state) {
            return state.mekmarLoadingListYearCounting;
        },
        getMekmarLoadingListByCustomer(state) {
            return state.mekmarLoadingListByCustomer;
        },
        getMekmarLoadingYearList(state) {
            return state.mekmarLoadingYearList;
        },
        getMekmarLoadingMonthList(state) {
            return state.mekmarLoadingMonthList;
        },
        getMekmarLoadingTotalListMonth(state) {
            return state.mekmarLoadingTotalListMonth;
        },
        getMekmarLoadingTotalListYear(state) {
            return state.mekmarLoadingTotalListYear;
        },
        getMekmarLoadingTotalListMarketing(state) {
            return state.mekmarLoadingTotalListMarketing;
        },
        getMekmarForwardingList(state) {
            return state.mekmarForwardingList;
        },
        getMekmarForwardingTotalList(state) {
            return state.mekmarForwardingTotalList;
        },
        getMekmarOrderSummaryProduction(state) {
            return state.mekmarOrderSummaryProduction;
        },
        getMekmarOrderSummaryForwarding(state){
            return state.mekmarOrderSummaryForwarding;
        },
        getMekmarOrderSummaryProductionUserThen(state) {
            return state.mekmarOrderSummaryProductionUserThen;
        },
        getMekmarOrderSummaryForwardingUserThen(state) {
            return state.mekmarOrderSummaryForwardingUserThen;
        },
        getMekmarOrderSummaryProductionUserNow(state) {
            return state.mekmarOrderSummaryProductionUserNow;
        },
        getMekmarOrderSummaryForwardingUserNow(state) {
            return state.mekmarOrderSummaryForwardingUserNow;
        },
        getMekmarOrderSummaryProductionTotal(state) {
            return state.mekmarOrderSummaryProductionTotal;
        },
        getMekmarOrderSummaryProductionUserThenTotal(state) {
            return state.mekmarOrderSummaryProductionUserThenTotal;
        },
        getMekmarOrderSummaryProductionUserNowTotal(state) {
            return state.mekmarOrderSummaryProductionUserNowTotal;
        },
        getMekmarOrderSummaryForwardingTotal(state) {
            return state.mekmarOrderSummaryForwardingTotal;
        },
        getMekmarOrderSummaryForwardingUserThenTotal(state) {
            return state.mekmarOrderSummaryForwardingUserThenTotal;
        },
        getMekmarOrderSummaryForwardingUserNowTotal(state) {
            return state.mekmarOrderSummaryForwardingUserNowTotal;
        },
        getMekmarOrderSummaryDetailList(state) {
            return state.mekmarOrderSummaryDetailList;
        },
        getMekmarOrderSummaryDetailTotalList(state) {
            return state.mekmarOrderSummaryDetailTotalList;
        },
        getMekmarMkYearsList(state) {
            return state.mekmarMkYearsList;
        },
        getMekmarMkByPoProductionList(state) {
            return state.mekmarMkByPoProductionList;
        },
        getMekmarMkByPoProductionTotalList(state) {
            return state.mekmarMkByPoProductionTotalList;
        },
        getMekmarMkByCustomerProductionList(state) {
            return state.mekmarMkByCustomerProductionList;
        },
        getMekmarMkByCustomerProductionTotalList(state) {
            return state.mekmarMkByCustomerProductionTotalList;
        },
        getMekmarMkByMarketingProductionList(state) {
            return state.mekmarMkByMarketingProductionList;
        },
        getMekmarMkByMarketingProductionTotalList(state) {
            return state.mekmarMkByMarketingProductionTotalList;
        },
        getmekmarMkByMarketingForwardingList(state) {
            return state.mekmarMkByMarketingForwardingList;
        },
        getMekmarMkByMarketingForwardingDetailList(state) {
            return state.mekmarMkByMarketingForwardingDetailList;
        },
        getMekmarMkByMarketingForwardingDetailMekmarList(state) {
            return state.mekmarMkByMarketingForwardingDetailMekmarList;
        },
        getMekmarMkByMarketingForwardingDetailMekmerList(state) {
            return state.mekmarMkByMarketingForwardingDetailMekmerList;
        },
        getMekmarMkByMarketingForwardingDetailIcPiyasaList(state) {
            return state.mekmarMkByMarketingForwardingDetailIcPiyasaList;
        },
        getMekmarMkByMarketingForwardingDetailImperialHomesList(state) {
            return state.mekmarMkByMarketingForwardingDetailImperialHomesList;
        },
        getMekmarMkByMarketingForwardingDetailFilteredTotalList(state) {
            return state.mekmarMkByMarketingForwardingDetailFilteredTotalList;
        },
        getMekmarMkByMarketingForwardingTotalList(state) {
            return state.mekmarMkByMarketingForwardingTotalList;
        },
        getMekmarMkProductionAndForwardingList(state) {
            return state.mekmarMkProductionAndForwardingList;
        },
        getMekmarMkProductionAndForwardingTotalList(state) {
            return state.mekmarMkProductionAndForwardingTotalList;
        },
        getMekmarMkList(state) {
            return state.mekmarMkList;
        },
        getMekmarMkCustomerOrderList(state) {
            return state.mekmarMkCustomerOrderList;
        },
        getMekmarGuYearList(state) {
            return state.mekmarGuYearList
        },
        getMekmarGuAyoCostList(state) {
            return state.mekmarGuAyoCostList;
        },
        getMekmarGuContainerCountryList(state) {
            return state.mekmarGuContainerCountryList;
        },
        getMekmarGuContainerCustomerList(state) {
            return state.mekmarGuContainerCustomerList;
        },
        getmekmarGuContainerSupplierList(state) {
            return state.mekmarGuContainerSupplierList;
        },
        getMekmarGuMekusList(state) {
            return state.mekmarGuMekusList;
        },
        getMekmarGuLogsList(state) {
            return state.mekmarGuLogsList;
        },
        getMekmarGuAyoTotalList(state) {
            return state.mekmarGuAyoTotalList;
        },
        getMekmarGuContainerCountryTotalList(state) {
            return state.mekmarGuContainerCountryTotalList;
        },
        getMekmarGuContainerCustomerTotalList(state) {
            return state.mekmarGuContainerCustomerTotalList;
        },
        getMekmarGuContainerSupplierTotalList(state) {
            return state.mekmarGuContainerSupplierTotalList;
        },
        getMekmarGuMekusTotalList(state) {
            return state.mekmarGuMekusTotalList;
        },
        getMekmarGuAyoDetailList(state) {
            return state.mekmarGuAyoDetailList;
        },
        getMekmarGuAyoDetailTotalList(state) {
            return state.mekmarGuAyoDetailTotalList;
        },
        getMekmarGuContainerCountryDetailList(state) {
            return state.mekmarGuContainerCountryDetailList;
        },
        getMekmarGuContainerCountryDetailTotalList(state) {
            return state.mekmarGuContainerCountryDetailTotalList;
        },
        getMekmarGuContainerCustomerDetailList(state) {
            return state.mekmarGuContainerCustomerDetailList;
        },
        getMekmarGuContainerCustomerDetailTotalList(state) {
            return state.mekmarGuContainerCustomerDetailTotalList;
        },
        getMekmarGuContainerSupplierDetailList(state) {
            return state.mekmarGuContainerSupplierDetailList;
        },
        getMekmarGuContainerSupplierDetailTotalList(state) {
            return state.mekmarGuContainerSupplierDetailTotalList;
        },
        getMekmarToDoListDone(state) {
            return state.mekmarToDoListDone;
        },
        getMekmarToDoListToDo(state) {
            return state.mekmarToDoListToDo;
        },


    }
})