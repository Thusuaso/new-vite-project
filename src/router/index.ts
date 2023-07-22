import { createRouter, createWebHistory } from 'vue-router'
/*Services*/
import { homeService } from '@/services/homeService';
import { customerService } from '@/services/customerService';
import { bgpService } from '@/services/bgpService';
import { cardService } from  '@/services/cardService';
import { selectionService } from '@/services/selectionService';
import { financeService } from '@/services/financeService';
import { financeServiceNew } from '@/services/financeServiceNew';
import { supplierService } from '@/services/supplierService';
import { forwardingService } from '@/services/forwardingService';
import { uploadingService } from '@/services/uploadingService';
import { containerService } from '@/services/containerService';
import { shippingService } from '@/services/shippingService';
import { shopperService } from '@/services/shopperService';
import { reportsService } from '@/services/reportsService';
import { sampleService } from '@/services/sampleService';
import { offerService } from '@/services/offerService';
import { usaService } from '@/services/usaService';
import { panelService } from '@/services/panelService';
import { costService } from '@/services/costService';
import { financeServiceTest } from '@/services/financeServiceTest';
import { productionsService } from '@/services/productions';
/*Stores */
import { useHomeStore } from '@/stores/home';
import { useLoadingStore } from '@/stores/loading';
import { useCustomerStore } from '@/stores/customers';
import { useBgpStore } from '@/stores/bgp';
import { useCardStore } from '@/stores/cards';
import { useSelectionStore } from '@/stores/selection';
import { useFinanceStore } from '@/stores/finance';
import { useFinanceStoreNew } from '@/stores/financenew';
import { useSupplierStore } from '@/stores/supplier';
import { useForwardingStore } from '@/stores/forwarding';
import { useUploadingStore } from '@/stores/uploading';
import { useContainerStore } from '@/stores/container';
import { useShippingStore } from '@/stores/shipping';
import { useShopperStore } from '@/stores/shopper';
import { useReportsStore } from '@/stores/reports';
import { useSampleStore } from '@/stores/sample';
import { useOfferStore } from '@/stores/offer';
import { useUsaStore } from '@/stores/usa';
import { usePanelStore } from '@/stores/panel';
import { todoService } from '@/services/todoService';
import { useTodoStore } from '@/stores/todo';
import { useCostStore } from '@/stores/cost';
import { useFinanceTestStore } from '@/stores/financetest';
import { useProductionsStore } from '@/stores/productions';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act()
        homeService.dashboard().then(data => {
          useHomeStore().dashboard_load_act(data)
          useLoadingStore().end_loading_act()
          next()


        })
      }
    },
    {
      path: '/login',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: (to, from, next) => {
        localStorage.removeItem('username')
        localStorage.removeItem('userId')
        next()
      }
    },
    {
      path: '/salesman',
      component: () => import('@/views/CustomerView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act()
        customerService.customerList(localStorage.getItem('userId')).then(data => {
          useCustomerStore().customer_list_load_act(data)
          useLoadingStore().end_loading_act()

          next()
        })
      }
    },
    {
      path: '/bgpnetwork',
      component: () => import('@/views/BgpView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act()
        bgpService.bgpList(localStorage.getItem('userId')).then(data => {
          useBgpStore().bgp_list_load_act(data.result)
          useBgpStore().bgp_country_list_load_act(data.ulkelerListDrop)
          useBgpStore().bgp_statistic_list_load_act(data.statistic)
          useBgpStore().country_list_load_act(data.ulkelerList)
          useBgpStore().bgp_project_representive_country_load_act(data.representiveCountry)
          useLoadingStore().end_loading_act()
          next()
        })
      }
    },
    {
      path: '/order/product',
      component: () => import('@/views/OrderView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        cardService.getCardList().then(data => {
          useCardStore().card_list_load_act(data);
          productionsService.getOrderList(2, 'Hepsi').then(data => {
            useProductionsStore().productions_list_load_act(data.products);
            useProductionsStore().productions_list_filter_load_act(data.products);
            useProductionsStore().productions_unit_list_load_act(data.productUnit);
            useProductionsStore().productions_supplier_list_load_act(data.supplier);
            useProductionsStore().productions_delivery_list_load_act(data.delivery);
            useProductionsStore().productions_payment_list_load_act(data.payment);
            useProductionsStore().productions_invoice_list_load_act(data.invoice);
            useProductionsStore().productions_country_list_load_act(data.country);
            useProductionsStore().productions_customers_list_load_act(data.customers);
            useProductionsStore().productions_users_list_load_act(data.users);
            useProductionsStore().productions_status_id_load_act(2);
            useProductionsStore().products_total_datatable_load_act(data.products);
            useLoadingStore().end_loading_act();
            next();

          });
        })
      }
    },
    {
      path: '/order/forwarding',
      component: () => import('@/views/ShipmentView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        cardService.getCardList().then(data => {
          useCardStore().card_list_load_act(data);
          productionsService.getOrderList(3, '2023').then(data => {
            useProductionsStore().productions_list_load_act(data.products);
            useProductionsStore().productions_list_filter_load_act(data.products);
            useProductionsStore().productions_unit_list_load_act(data.productUnit);
            useProductionsStore().productions_supplier_list_load_act(data.supplier);
            useProductionsStore().productions_delivery_list_load_act(data.delivery);
            useProductionsStore().productions_payment_list_load_act(data.payment);
            useProductionsStore().productions_invoice_list_load_act(data.invoice);
            useProductionsStore().productions_country_list_load_act(data.country);
            useProductionsStore().productions_customers_list_load_act(data.customers);
            useProductionsStore().productions_users_list_load_act(data.users);
            useProductionsStore().productions_status_id_load_act(3);
            useProductionsStore().products_total_datatable_load_act(data.products);
            useLoadingStore().end_loading_act();
            next();

          });
            
        })
      }
    },
    {
      path: '/order/waiting',
      component: () => import('@/views/WaitingView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        cardService.getCardList().then(data => {
          useCardStore().card_list_load_act(data);
          productionsService.getOrderList(1, 'Hepsi').then(data => {
            useProductionsStore().productions_list_load_act(data.products);
            useProductionsStore().productions_list_filter_load_act(data.products);
            useProductionsStore().productions_unit_list_load_act(data.productUnit);
            useProductionsStore().productions_supplier_list_load_act(data.supplier);
            useProductionsStore().productions_delivery_list_load_act(data.delivery);
            useProductionsStore().productions_payment_list_load_act(data.payment);
            useProductionsStore().productions_invoice_list_load_act(data.invoice);
            useProductionsStore().productions_country_list_load_act(data.country);
            useProductionsStore().productions_customers_list_load_act(data.customers);
            useProductionsStore().productions_users_list_load_act(data.users);
            useProductionsStore().productions_status_id_load_act(1);
            useProductionsStore().products_total_datatable_load_act(data.products);
            useLoadingStore().end_loading_act();
            next();

          });
        })
      }
    },
    {
      path: '/selection/entry',
      component: () => import('@/views/SelectionView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        selectionService.getSelectionList().then(data => {
          useSelectionStore().selection_list_load_act(data);
          cardService.getCardList().then(data => {
              useCardStore().card_list_load_act(data);
              useLoadingStore().end_loading_act();
              next();


          })

        })
      }
    },
    {
      path: '/finance/list',
      component: () => import('@/views/FinanceView.vue'),
      beforeEnter: (to, from, next) => {
        const date = new Date();
        const year = date.getFullYear();
        useLoadingStore().begin_loading_act();
        financeService.getFinanceList(year).then(data => {
          useFinanceStore().finance_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
          
        })
      }
    },
    {
      path: '/finance/list/new',
      component: () => import('@/views/FinanceViewNew.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        const date = new Date();
        const year = date.getFullYear();
        financeServiceNew.getFinanceList(year).then(data => {
          useFinanceStoreNew().finance_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
          
        })
      }
    },



    {
      path: '/operation/cards',
      component: () => import('@/views/ProductCardsView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        cardService.getCardList().then(data => {
          useCardStore().card_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/operation/supplier/list',
      component: () => import('@/views/SupplierView.vue'),
      beforeEnter: (to, from, next) => {
        supplierService.getSupplierList().then(data => {
          useSupplierStore().supplier_list_load_act(data);
          next();
        })
      }
    },
    {
      path: '/operation/forwarding',
      component: () => import('@/views/ForwardingView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        forwardingService.getForwardingModel().then(data => {
          useForwardingStore().forwarding_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        });
      }
    },
    {
      path: '/operation/uploading',
      component: () => import('@/views/UploadingView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        uploadingService.getUploadingProductList().then(data => {
          useUploadingStore().uploading_product_list_load_act(data.siparis_liste);
          useUploadingStore().uploading_folder_list_load_act(data.evrak_listesi);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/operation/invoice/container/follow/list',
      component: () => import('@/views/ContainerFollowList.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        containerService.getFollowList().then(data => {
          useContainerStore().follow_container_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/operation/invoice/container/unfollow/list',
      component: () => import('@/views/ContainerUnfollowList.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        containerService.getUnfollowList().then(data => {
          useContainerStore().unfollow_container_list_load_act(data);
          useLoadingStore().end_loading_act();
          next()
        })
      }
    },
    {
      path: '/operation/shipping/input',
      component: () => import('@/views/ShippingInput.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shippingService.getShippingList().then(data => {
          useShippingStore().shipping_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
        
      }
    },
    {
      path: '/operation/shipping/list',
      component: () => import('@/views/ShippingList.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shippingService.getShippingInvoiceList().then(data => {
          useShippingStore().shipping_invoice_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/operation/container/input',
      component: () => import('@/views/ContainerInputView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        containerService.getContainerInputList().then(data => {
          useContainerStore().container_input_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/operation/container/list',
      component: () => import('@/views/ContainerListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        containerService.getContainerList().then(data => {
          useContainerStore().container_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/shopper/list',
      component: () => import('@/views/ShopperListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shopperService.getShopperList().then(data => {
          useShopperStore().shopper_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
        
      }
    },
    {
      path: '/shopper/offer/list',
      component: () => import('@/views/ShopperOfferListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shopperService.getShopperOfferList().then(data => {
          useShopperStore().shopper_offer_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/shopper/bgp/list',
      component: () => import('@/views/ShopperBgpListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shopperService.getShopperBgpList().then(data => {
          useShopperStore().shopper_bgp_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/shopper/fair/list',
      component: () => import('@/views/ShopperFairListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shopperService.getShopperFairList().then(data => {
          useShopperStore().shopper_fair_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/shopper/selection/list',
      component: () => import('@/views/ShopperSelectionListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        shopperService.getShopperSelectionList(localStorage.getItem('userId')).then(data => {
          useShopperStore().shopper_selection_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        });
        
      }
    },
    {
      path: '/reports/mekmer/production',
      component: () => import('@/views/MekmerReportsProductionView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerProductionsListYear(new Date().getFullYear()).then(data => {
          useReportsStore().mekmer_production_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();

        });
      }
    },
    {
      path: '/reports/mekmer/stock',
      component: () => import('@/views/MekmerReportsStockView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerStockList().then(data => {
          useReportsStore().mekmer_stock_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/reports/mekmer/stock/prices',
      component: () => import('@/views/MekmerReportsStockPricesView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerStockPricesList().then(data => {
          useReportsStore().mekmer_production_prices_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/reports/mekmer/mine',
      component: () => import('@/views/MekmerReportsMineView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerMineList().then(data => {
          useReportsStore().mekmer_mine_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
        
      }
    },
    {
      path: '/reports/mekmer/tobeproduced',
      component: () => import('@/views/MekmerReportsToBeProducedView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerToBeProducedList().then(data => {
          useReportsStore().mekmer_to_be_produced_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/reports/mekmer/atlanta',
      component: () => import('@/views/MekmerReportsAtlantaStockView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmerAtlantaStockList().then(data => {
          useReportsStore().mekmer_atlanta_stock_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/reports/mekmar/ayo',
      component: () => import('@/views/MekmarReportsAyoView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarAyoYearList().then(year => {
          useReportsStore().mekmar_ayo_year_list_load_act(year);
          reportsService.getMekmarAyoMonthList(year[0].yil).then(month => {
            useReportsStore().mekmar_ayo_month_list_load_act(month);
            reportsService.getMekmarAyoList(year[0].yil, month[0].ay).then(data => {
              useReportsStore().mekmar_ayo_list_load_act(data);
              useLoadingStore().end_loading_act();
            })
          })
        })
        next();
      }
    },
    {
      path: '/reports/mekmar/loading',
      component: () => import('@/views/MekmarReportsLoadingView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarLoadingYearList().then(years => {
          useReportsStore().mekmar_loading_year_list_load_act(years);
          reportsService.getMekmarLoadingMonthList(years[0].yil).then(months => {
            useReportsStore().mekmar_loading_month_list_load_act(months);
            reportsService.getMekmarLoadingList(years[0].yil, months[0].ay).then(data => {
              useReportsStore().mekmar_loading_list_load_act(data);
              useLoadingStore().end_loading_act();
              next();
            });
          })

          
        });        
        
      }
    },
    {
      path: '/reports/mekmar/forwarding',
      component: () => import('@/views/MekmarReportsForwardingView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarForwardingList(new Date().getFullYear()).then(data => {
          useReportsStore().mekmar_forwarding_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
          
        });
      }
    },
    {
      path: '/reports/mekmar/order/summary',
      component: () => import('@/views/MekmarReportsOrderSummary.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarOrderSummaryList(localStorage.getItem('userId')).then(data => {
          useReportsStore().mekmar_order_summary_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/reports/mekmar/order/mk',
      component: () => import('@/views/MekmarReportsMkView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarMkYearList().then(years => {
          useReportsStore().mekmar_mk_years_list_load_act(years);
          reportsService.getMekmarMkList(years[0].yil).then(data => {
            useReportsStore().mekmar_mk_list_load_act(data);
            useLoadingStore().end_loading_act();
            next();

          });
          
        })
      }
    },
    {
      path: '/reports/mekmar/order/gu',
      component: () => import('@/views/MekmarReportsGuView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarGuYearList().then(years => {
          useReportsStore().mekmar_gu_year_list_load_act(years);
          reportsService.getMekmarGuList(years[0].yil).then(data => {
            useReportsStore().mekmar_gu_list_load_act(data);
            useLoadingStore().end_loading_act();
            next();

        })
        })
        
      }
    },
    {
      path: '/reports/mekmar/todo/list',
      component: () => import('@/views/MekmarReportsToDoView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        reportsService.getMekmarToDoList().then(data => {
          useReportsStore().mekmar_to_do_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        });
      }
    },
    {
      path: '/sample/list',
      component: () => import('@/views/SampleListView.vue'),
      beforeEnter: (to, from, next) => {
        useLoadingStore().begin_loading_act();
        sampleService.getSampleList(new Date().getFullYear()).then(data => {
          useSampleStore().sample_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        });
      }
    },
    {
      path: '/sample/finance',
      component: () => import('@/views/SampleFinanceListView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        sampleService.getSampleFinanceList(new Date().getFullYear()).then(data => {
          useSampleStore().sample_finance_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
          
        });
      }
    },
    {
      path: '/offer',
      component: () => import('@/views/OfferView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        offerService.getOfferMainPage(localStorage.getItem('userId')).then(data => {
          useOfferStore().offer_main_page_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        });
      }
    },
    {
      path: '/usa/products',
      component: () => import('@/views/UsaProductsList.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        usaService.getList().then(data => {
          useUsaStore().usa_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/usa/comments',
      component: () => import('@/views/UsaCommentList.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        usaService.getCommentList().then(data => {
          useUsaStore().usa_comment_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })

      }
    },
    {
      path: '/panel/products',
      component: () => import('@/views/PanelProductsListView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        panelService.getPanelCategoryList().then(category => {
          usePanelStore().panel_category_list_load_act(category);
          console.log(category);
          panelService.getPanelProductList(category.kategorilist[0].kategoriadi_en).then(data => {
            usePanelStore().panel_product_list_load_act(data);
            useLoadingStore().end_loading_act();
            next();
          })
          
        })
      }
    },
    {
      path: '/todo/all',
      component: () => import('@/views/TodoListAllView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        todoService.getAllList().then(data => {
          console.log("getAllList", data);
          useTodoStore().to_do_list_all_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/cost/mistake',
      component: () => import('@/views/CostMistakeView.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        costService.getList().then(data => {
          useCostStore().cost_error_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/order/representative',
      component: () => import('@/views/OrderRepresentativeInfo.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        reportsService.getOrderRepresentativeInfo().then(data => {
          useReportsStore().order_representative_info_list_load_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    },
    {
      path: '/finance/test',
      component: () => import('@/views/FinanceViewTest.vue'),
      beforeEnter(to, from, next) {
        useLoadingStore().begin_loading_act();
        financeServiceTest.getList().then((data: any) => {
          useFinanceTestStore().finance_test_list_loac_act(data);
          useLoadingStore().end_loading_act();
          next();
        })
      }
    }


  ]
})

export default router
