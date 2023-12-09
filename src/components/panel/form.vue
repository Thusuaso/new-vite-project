<template>
    <TabView>
        <TabPanel header="Ürün">
            <div class="row m-auto mt-3">
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_en">
                    </div>
                </div>
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Kod</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                    </div>
                </div>
                
                <div class="col">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="getProductModel.yayinla">
                        <label class="form-check-label" for="flexCheckDefault">
                            Yayınla
                        </label>
                    </div>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col-6">
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_en"></textarea>
                        <label for="floatingTextarea2">Açıklama</label>
                    </div>
                </div>
                <div class="col-6">
                    <span class="p-float-label">
                        <Chips id="aciklama" v-model="keyListEn" style="" />
                        <label for="aciklama">Anahtarlar</label>
                    </span>
                </div>
            </div>
            <div class="row m-auto mt-4">
                
                <!-- <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Sıra</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.sira">
                    </div> 
                </div> -->
                <div class="col">
                    <div class="input-group mb-3">
                        <span class="input-group-text" id="basic-addon1">Birim</span>
                        <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                    </div>
                </div>
  
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="category" v-model="selectedCategoryEn" :options="getProductCategoryList" optionLabel="kategoriadi_en" class="w-100" @change="categoryEnSelected($event)"/>
                        <label for="category">Kategori</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="color" v-model="selectedColorEn" :options="getProductColorEnList" optionLabel="name" class="w-100" @change="colorEnSelected($event)"/>
                        <label for="color">Renk</label>
                    </span>
                </div>
                <div class="col">
                    <span class="p-float-label">
                        <Dropdown id="stoneType" v-model="selectedStoneType" :options="stoneTypeList" optionLabel="kategoriadi_en" class="w-100" @change="stoneTypeSelected($event)"/>
                        <label for="stoneType">Taş Türü</label>
                    </span>
                </div>
            </div>
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success w-100" @click="process" :disabled="save_button_disabled">Kaydet</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger w-100" @click="deleteForm" :disabled="delete_button_disabled">Sil</button>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Ürün (Fr)">
                <div class="row m-auto mt-3">
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_fr">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Kod</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                        </div>
                    </div>
                </div>
                <div class="row m-auto mt-3">
                    <div class="col-6">
                        <div class="form-floating">
                            <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_fr"></textarea>
                            <label for="floatingTextarea2">Açıklama</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <span class="p-float-label">
                            <Chips id="aciklama" v-model="keyListFr" style="" />
                            <label for="aciklama">Anahtarlar</label>
                        </span>
                    </div>
                </div>
                <div class="row m-auto mt-4">
                
 
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Birim</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                        </div>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">Tedarikçi</span>
                            <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.tedarikciadi">
                        </div>
                    </div>
                    <div class="col">
                        <span class="p-float-label">
                            <Dropdown id="color" v-model="selectedColorFr" :options="getProductColorFrList" optionLabel="name" class="w-100" @change="colorFrSelected($event)"/>
                            <label for="color">Renk</label>
                        </span>
                    </div>
                </div>
                <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success w-100" @click="process" :disabled="save_button_disabled">Kaydet</button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger w-100" @click="deleteForm" :disabled="delete_button_disabled">Sil</button>
                </div>
            </div>
        </TabPanel>
        <TabPanel header="Ürün (Es)">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Ürün Adı</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunadi_es">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Kod</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.urunkod">
                            </div>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col-6">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height:100px;padding-top:35px;" v-model="getProductModel.aciklama_es"></textarea>
                                <label for="floatingTextarea2">Açıklama</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <span class="p-float-label">
                                <Chips id="aciklama" v-model="keyListEs" style="" />
                                <label for="aciklama">Anahtarlar</label>
                            </span>
                        </div>
                    </div>
                    <div class="row m-auto mt-4">
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Birim</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.birim">
                            </div>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Tedarikçi</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="getProductModel.tedarikciadi">
                            </div>
                        </div>
                        <div class="col">
                            <span class="p-float-label">
                                <Dropdown id="color" v-model="selectedColorEs" :options="getProductColorEsList" optionLabel="name" class="w-100" @change="colorEsSelected($event)"/>
                                <label for="color">Renk</label>
                            </span>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="process" :disabled="save_button_disabled">Kaydet</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="deleteForm" :disabled="delete_button_disabled">Sil</button>
                        </div>
                    </div>
        </TabPanel>
        <TabPanel header="Sizes">
            <div class="row m-auto mt-3">

                <div class="col">
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <span class="p-float-label">
                                <AutoComplete id="size" v-model="selectedSize" dropdown :suggestions="filteredProductSizeList" optionLabel="name" @complete="searchSize($event)" @input="inputSize($event)" />
                                <label for="size">Ebat</label>
                            </span>
                        </div>
                        <div class="col">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">Fiyat</span>
                                <input type="text" class="form-control" aria-describedby="basic-addon1" v-model="sizePrice" @input="sizePrice = $filters.formatPoint($event.target.value)">
                            </div>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="addSize" :disabled="edge_add_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="deleteSize" :disabled="edge_delete_disabled">Sil</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-warning w-100" @click="newSize" :disabled="edge_new_disabled">Yeni</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="sizeProductList"
                                v-model:selection="selectedSizeProduct"
                                selectionMode="single"
                                style="font-size:85%;"
                                @item-select="sizeProductSelected"
                            >
                                <Column field="ebat" header="Ebat"></Column>
                                <Column field="fiyat" header="Fiyat"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>

            </div>
            

        </TabPanel>
        <TabPanel header="Filters">
            <div class="row">
            <div class="col-12">

                <!--Finishes-->
                    <div v-if="getProductModel.kategori_id == 1 || getProductModel.kategori_id == 2 || getProductModel.kategori_id == 3 || getProductModel.kategori_id == 4 || getProductModel.kategori_id == 8" >
                        <h4 class="text-center">Finish</h4>
                        <div class="row m-auto mt-3">
                        <div class="col mb-3">
                            
                            <span class="p-float-label">
                                <AutoComplete v-model="selectedFinish" inputId="finish_en" optionLabel="name" :suggestions="filteredProductFinishList" @complete="searchFinish($event)" @item-select="finishSelected($event)"/>
                                <label for="finish_en">En Surface</label>
                            </span>
                        </div>
                        <div class="col mb-3">
                            
                            <span class="p-float-label">
                                <InputText id="frsurface" v-model="fr_surface" disabled/>
                                <label for="frsurface">Fr-Surface</label>
                            </span>
                        </div>
                        <div class="col mb-3">
                            
                            <span class="p-float-label">
                                <InputText id="essurface" v-model="es_surface" disabled/>
                                <label for="essurface">Es-Surface</label>
                            </span>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="addFinish">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="deleteFinish">Sil</button>
                        </div>
                    </div>
                        <div class="row m-auto mt-3">
                            <div class="col">
                                <DataTable 
                                    :value="finishProductList" 
                                    v-model:selection="selectedFinishProduct"
                                    selectionMode="single"
                                    style="font-size:85%;"
                                >
                                    <Column field="name" header="Yüzey"></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div>
                    <!-- <div v-if="getProductModel.kategori_id == 2 || getProductModel.kategori_id == 4">
                        <h3 class="text-center">Yüzey Filtresi</h3>
                        <div class="row m-auto mt-3">
                            <div class="col">
                                <Dropdown class="w-100" v-model="selectedSurface" :options="getProductSurfaceFilteredList" optionLabel="name_en" @change="surface_filtered_save_disabled = false"/>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-success w-100" @click="surfaceSave" :disabled="surface_filtered_save_disabled">Ekle</button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-danger w-100" @click="surfaceDelete" :disabled="surface_filtered_delete_disabled">Sil</button>
                            </div>
                        </div>
                        <div class="row m-auto mt-3">
                            <div class="col">
                                <DataTable :value="getProductSurfaceFilteredProductsList"
                                                v-model:selection="selectedSurfaceProducts"
                                                selectionMode="single"
                                                @row-select="surface_filtered_delete_disabled = false"
                                            >
                                            <Column field="name_en" header="Yuzey En"></Column>
                                            <Column field="name_fr" header="Yuzey Fr"></Column>
                                            <Column field="name_es" header="Yuzey Es"></Column>
                                </DataTable>
                            </div>
                        </div>
                    </div> -->


                    <!--Areas-->
                    <!-- <div>
                        <h3 class="text-center">Area</h3>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <span class="p-float-label">
                                <AutoComplete v-model="selectedArea" inputId="areas" :suggestions="filteredAreas" optionLabel="area" @complete="searchAreas($event)" @item-select="save_area_disabled_form = false"/>
                                <label for="areas">Alan</label>
                            </span>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="saveAreas" :disabled="save_area_disabled_form">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="deleteAreas" :disabled="delete_area_disabled_form">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable 
                                :value="getProductAreasProductsList" 
                                v-model:selection="selectedAreaProductList"
                                selectionMode="single"
                                style="font-size:85%;"
                                @row-click="areaProductListSelected($event)"
                            >
                                <Column field="area" header="Alan"></Column>
                            </DataTable>
                        </div>
                    </div>
                    </div> -->
                    
            </div>
            <div class="col-12">
                <div v-if="getProductModel.kategori_id == 4 || getProductModel.kategori_id == 5 || getProductModel.kategori_id == 7">
                    <h3 class="text-center">Material</h3>
                    <div class="row">
                        <div class="col">
                            <Dropdown class="w-100" v-model="selectedMaterial" :options="getProductMaterialFilteredList" optionLabel="name_en" @change="material_filtered_save_disabled = false"/>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="materialSave" :disabled="material_filtered_save_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="materialDelete" :disabled="material_filtered_delete_disabled">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="getProductMaterialFilteredProductsList"
                                    v-model:selection="selectedMaterialProducts"
                                    selectionMode="single"
                                    @row-select="material_filtered_delete_disabled = false"
                                >
                                        <Column field="name_en" header="Materyal En"></Column>
                                        <Column field="name_fr" header="Materyal Fr"></Column>
                                        <Column field="name_es" header="Materyal Es"></Column>
                            </DataTable>
                        </div>
                    </div>


                </div>

                <div v-if="getProductModel.kategori_id == 2">
                    <h3 class="text-center">Style</h3>
                    <div class="row">
                        <div class="col">
                            <Dropdown class="w-100" v-model="selectedStyle" :options="getProductStyleFilteredList" optionLabel="name_en" @change="style_filtered_save_disabled = false"/>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="styleSave" :disabled="style_filtered_save_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="styleDelete" :disabled="style_filtered_delete_disabled">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="getProductStyleFilteredProductsList"
                                    v-model:selection="selectedStyleProducts"
                                    selectionMode="single"
                                    @row-select="style_filtered_delete_disabled = false"
                                >
                                        <Column field="name_en" header="Stil En"></Column>
                                        <Column field="name_fr" header="Stil Fr"></Column>
                                        <Column field="name_es" header="Stil Es"></Column>
                            </DataTable>
                        </div>
                    </div>


                </div>

                <div v-if="getProductModel.kategori_id == 2">
                    <h3 class="text-center">Edge</h3>
                    <div class="row">
                        <div class="col">
                            <Dropdown class="w-100" v-model="selectedEdge" :options="getProductEdgeFilteredList" optionLabel="name_en" @change="edge_filtered_save_disabled = false"/>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="edgeSave" :disabled="edge_filtered_save_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="edgeDelete" :disabled="edge_filtered_delete_disabled">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="getProductEdgeFilteredProductsList"
                                    v-model:selection="selectedEdgeProducts"
                                    selectionMode="single"
                                    @row-select="edge_filtered_delete_disabled = false"
                                >
                                        <Column field="name_en" header="Kenar En"></Column>
                                        <Column field="name_fr" header="Kenar Fr"></Column>
                                        <Column field="name_es" header="Kenar Es"></Column>
                            </DataTable>
                        </div>
                    </div>


                </div>

                <div v-if="getProductModel.kategori_id == 6 || getProductModel.kategori_id == 9 || getProductModel.kategori_id == 11 || getProductModel.kategori_id == 18">
                    <h3 class="text-center">Type</h3>
                    <div class="row">
                        <div class="col">
                            <Dropdown class="w-100" v-model="selectedType" :options="getProductTypeFilteredList" optionLabel="name_en" @change="type_filtered_save_disabled = false"/>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-success w-100" @click="typeSave" :disabled="type_filtered_save_disabled">Ekle</button>
                        </div>
                        <div class="col">
                            <button type="button" class="btn btn-danger w-100" @click="typeDelete" :disabled="type_filtered_delete_disabled">Sil</button>
                        </div>
                    </div>
                    <div class="row m-auto mt-3">
                        <div class="col">
                            <DataTable :value="getProductTypeFilteredProductsList"
                                    v-model:selection="selectedTypeProducts"
                                    selectionMode="single"
                                    @row-select="type_filtered_delete_disabled = false"
                                >
                                        <Column field="name_en" header="Tür En"></Column>
                                        <Column field="name_fr" header="Tür Fr"></Column>
                                        <Column field="name_es" header="Tür Es"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </TabPanel>
        <TabPanel header="Suggested" v-if="!getPanelProductNewButton">
            <div class="row m-auto mt-3">
                <div class="col">
                    <button type="button" class="btn btn-success w-100" @click="saveSuggested" :disabled="saveSuggestedDisabled">Kaydet</button>
                </div>
            </div>
            <div class="row m-auto mt-3"  >
                <div class="col">
                    <PickList v-model="getProductSuggested" 
                    listStyle="height:342px" 
                    dataKey="urunid"
                    @move-to-target="moveToTargetSuggested($event)"
                    @move-to-source="moveToSourceSuggested($event)"
                    
                    
                    >
                        <template #sourceheader> Available </template>
                        <template #targetheader> Selected </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <img class="w-4rem shadow-2 flex-shrink-0 border-round" width="100" height="100" :src="slotProps.item.foto" :alt="slotProps.item.urunadi_en" />
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">{{ slotProps.item.urunadi_en }}</span>
                                </div>
                            </div>
                        </template>
                    </PickList>
                </div>

            </div>
        </TabPanel>
        <TabPanel header="Fotolar">
            <div class="row m-auto mt-3">
                <div class="col" >
                    <div class="containerRestriction" style="text-align:center;margin-left:80px;">
                        <Galleria :value="getProductPhotoList" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px"
                            :circular="true" :autoPlay="true" :transitionInterval="2000">
                            <template #item="slotProps">
                            <img :src="slotProps.item.nocdn" style="width: 100%;height:350px; display: block;" />
                            </template>
                            <template #thumbnail="slotProps">
                            <img :src="slotProps.item.nocdn" style="display: block;" width="50" height="50"/>
                            </template>
                        </Galleria>
                    </div>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-primary mb-4 w-100" @click="pick_list_photos_form=true">Fotoğraf Listesi</button>
                    <FileUpload class="w-100" mode="basic" @select="sendPhotos($event)" v-model="file" :maxFileSize="5000000" :multiple="true" chooseLabel="Fotoğraf Ekle" />
                    <Dialog v-model:visible="pick_list_photos_form" header="Fotoğraflar" modal :style="{'width':'80vw'}">

                        <button type="button" class="btn btn-danger w-100" @click="fotoSil">Sil</button>
                        <PickList v-model="pickProductPhotosList" 
                        @move-to-target="photoListPick($event)" 
                        @move-all-to-target="photoListPickAll($event)"
                        @reorder="photoListChangeQueue($event)"
                        dataKey="sira"
                        
                        >
                        <template #sourceheader> Available </template>
                        <template #targetheader> Selected </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <img class="w-4rem shadow-2 flex-shrink-0 border-round" :src="slotProps.item.nocdn" width="60" height="60"/>
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">({{slotProps.item.sira}}) {{ slotProps.item.name }}</span>
 
                                </div>
                            </div>
                        </template>
                    </PickList>
                    </Dialog>
                </div>

            </div>
        </TabPanel>
        <TabPanel header="Test Raporu">
            <div class="row m-auto mt-3">
                <div class="col">
                    <FileUpload mode="basic" :multiple="true" v-model="testfile" chooseLabel="Test Rapor Gönder" @select="sendTestReport" />
                </div>
                <div class="col">
                    <a ref="testRapor" style="display:none;" class="p-button-primary" :disabled="!getProductModel.testrapor" :href="this.getProductModel.testrapor"
                        target="_blank">Görüntüle</a>
                    <button type=button class="btn btn-primary" @click="this.$refs.testRapor.click()">Test Rapor Görüntüle</button>
                </div>
            </div>
        </TabPanel>
    </TabView>

</template>
<script>
import { usePanelStore } from '../../stores/panel';
import { useLoadingStore } from '../../stores/loading';
import { mapState } from 'pinia';

import { panelService } from '../../services/panelService';
import { spaceService } from '../../services/spaceService';
import { socket } from '../../services/customServices/realTimeService';
import digitalOceanService from '../../services/digitalOceanService';

export default {
    computed: {
        ...mapState(usePanelStore, [
            'getPanelProductNewButton',
            'getProductModel',
            'getProductCategoryList',
            'getProductFinishList',
            'getProductSizeList',
            'getProductSuggestedProductList',
            'getProductSuggestedProductsList',
            'getProductPhotoList',
            'getProductPhotoListPick',
            'getProductColorEnList',
            'getProductColorFrList',
            'getProductColorEsList',
            'getProductSuggested',
            'getProductAreasList',
            'getProductAreasProductsList',

            'getProductSurfaceFilteredList',
            'getProductEdgeFilteredList',
            'getProductMaterialFilteredList',
            'getProductTypeFilteredList',
            'getProductStyleFilteredList',

            'getProductSurfaceFilteredProductsList',
            'getProductEdgeFilteredProductsList',
            'getProductMaterialFilteredProductsList',
            'getProductTypeFilteredProductsList',
            'getProductStyleFilteredProductsList'

        ])
    },
    data() {
        return {
            selectedType:null,
            type_filtered_save_disabled:true,
            type_filtered_delete_disabled:true,
            productTypeFilteredList:[],
            selectedTypeProducts:null,

            selectedMaterial:null,
            material_filtered_save_disabled:true,
            material_filtered_delete_disabled:true,
            productMaterialFilteredList:[],
            selectedMaterialProducts:null,

            selectedEdge:null,
            edge_filtered_save_disabled:true,
            edge_filtered_delete_disabled:true,
            productEdgeFilteredList:[],
            selectedEdgeProducts:null,

            selectedStyleProducts:null,
            productStyleFilteredList:[],
            selectedStyle:null,
            style_filtered_save_disabled:true,
            style_filtered_delete_disabled:true,

            surface_filtered_delete_disabled:true,
            surface_filtered_save_disabled:true,
            productSurfaceFilteredList:null,
            selectedSurfaceProducts:null,

            stoneTypeList:[],
            selectedAreaProductList:null,
            areaProductList:[],
            delete_area_disabled_form:true,
            save_area_disabled_form:true,
            selectedArea:null,
            filteredAreas:null,
            en_surface:null,
            fr_surface:null,
            es_surface:null,
            deletedSuggested:[],
            addedSuggested:[],
            pickProductPhotosList:[],
            pick_list_photos_form:false,
            pickListPhotos:[],
            save_button_disabled: false,
            delete_button_disabled:false,
            responsiveOptions: [
                {
                    breakpoint: '1024px',
                    numVisible: 3,
                    numScroll: 3
                },
                {
                    breakpoint: '600px',
                    numVisible: 2,
                    numScroll: 2
                },
                {
                    breakpoint: '480px',
                    numVisible: 1,
                    numScroll: 1
                }
            ],
            keyListEn: [],
            keyListFr: [],
            keyListEs: [],
            selectedCategoryEn: {},
            selectedColorEn: {},
            selectedColorFr: {},
            selectedColorEs: {},
            selectedStoneType: {},
            selectedFinish: null,
            filteredProductFinishList: [],
            finishProductList: [],
            selectedFinishProduct: {},
            selectedSize: null,
            filteredProductSizeList: [],
            sizePrice: 0,
            edge_add_disabled: false,
            edge_delete_disabled: false,
            edge_new_disabled: false,
            sizeProductList: [],
            selectedSizeProduct: {},
            notSuggestedList: [],
            suggestedList: [],
            index:0,
            selectedSurface:null,
        }
    },
    created() {
        if (!this.getPanelProductNewButton) {
            this.panelCreatedProcess();
        };
        this.suggestedList = [...this.getProductSuggestedProductsList];
        this.notSuggestedList = [...this.getProductSuggestedProductList]
        this.pickProductPhotosList = [...this.getProductPhotoListPick];
        this.areaProductList = this.getProductAreasProductsList;
        this.stoneTypeList = this.getProductCategoryList.filter(x=>x.kategoriadi_en == 'Marble' || x.kategoriadi_en == 'Travertine' || x.kategoriadi_en == 'Plasterboard' || x.kategoriadi_en == 'Limestone' || x.kategoriadi_en == 'Quartz')
    },
    methods: {
        getUpdatedData(){
            useLoadingStore().begin_loading_act();
            panelService.getPanelDetail(this.getProductModel.urunid).then(data=>{
                usePanelStore().panel_product_model_list_load_act(data);
                usePanelStore().panel_product_new_button_load_act(false);
                useLoadingStore().end_loading_act();
            })  
        },

        typeDelete(){
            panelService.setFilterTypeDelete(this.selectedTypeProducts.id).then(response=>{
                if(response.status){
                    this.selectedTypeProducts = null;
                    this.type_filtered_delete_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Silindi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Silme İşlemi Başarısız',life:3000});
                }
            });
        },
        typeSave(){
            panelService.setFilterTypeSave({'urunid':this.getProductModel.urunid,'kategori':this.getProductModel.kategori_id,...this.selectedType})
            .then(response=>{
                if(response.status){
                    this.selectedType = null;
                    this.type_filtered_save_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Eklendi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Ekleme İşlemi Başarısız',life:3000});
                }
            });
        },

        materialDelete(){
            panelService.setFilterMaterialDelete(this.selectedMaterialProducts.id).then(response=>{
                if(response.status){
                    this.selectedMaterialProducts = null;
                    this.material_filtered_delete_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Silindi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Silme İşlemi Başarısız',life:3000});
                }
            });
        },
        materialSave(){
            panelService.setFilterMaterialSave({'urunid':this.getProductModel.urunid,'kategori':this.getProductModel.kategori_id,...this.selectedMaterial})
            .then(response=>{
                if(response.status){
                    this.selectedMaterial = null;
                    this.material_filtered_save_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Eklendi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Ekleme İşlemi Başarısız',life:3000});
                }
            });
        },

        edgeDelete(){
            panelService.setFilterEdgeDelete(this.selectedEdgeProducts.id).then(response=>{
                if(response.status){

                    this.selectedEdgeProducts = null;
                    this.edge_filtered_delete_disabled = true;
                    this.getUpdatedData();

                    this.$toast.add({'severity':'success','detail':'Başarıyla Silindi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Silme İşlemi Başarısız',life:3000});
                }
            });
        },
        edgeSave(){
            panelService.setFilterEdgeSave({'urunid':this.getProductModel.urunid,'kategori':this.getProductModel.kategori_id,...this.selectedEdge})
            .then(response=>{
                if(response.status){
                    this.selectedEdge = null;
                    this.edge_filtered_save_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Eklendi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Ekleme İşlemi Başarısız',life:3000});
                }
            });
        },


        styleDelete(){
            panelService.setFilterStyleDelete(this.selectedStyleProducts.id).then(response=>{
                if(response.status){
                    this.selectedStyleProducts = null;
                    this.style_filtered_delete_disabled = true;
                    this.getUpdatedData();

                    this.$toast.add({'severity':'success','detail':'Başarıyla Silindi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Silme İşlemi Başarısız',life:3000});
                }
            });
        },
        styleSave(){
            panelService.setFilterStyleSave({'urunid':this.getProductModel.urunid,'kategori':this.getProductModel.kategori_id,...this.selectedStyle})
            .then(response=>{
                if(response.status){
                    this.selectedStyle = null;
                    this.style_filtered_save_disabled = true;
                    this.getUpdatedData();
                    this.$toast.add({'severity':'success','detail':'Başarıyla Eklendi','life':3000});
                } else{
                    this.$toast.add({'severity':'error','detail':'Ekleme İşlemi Başarısız',life:3000});
                }
            });
        },

        surfaceDelete(){
            panelService.setFilterSurfaceDelete(this.selectedSurfaceProducts.id).then(response=>{
                if(response.status){
                    this.surface_filtered_delete_disabled = true;
                    this.getUpdatedData();

                    this.$toast.add({'severity':'success','detail':'Başarıyla Silindi',life:3000});
                }else{
                    this.$toast.add({'severity':'error','detail':'Silme İşlemi Başarısız','life':3000});
                }
            })

        },
        surfaceSave(){

          panelService.setFilterSurfaceSave({'urunid':this.getProductModel.urunid,'kategori':this.getProductModel.kategori_id,...this.selectedSurface})
          .then(response=>{
            if(response.status){
                this.selectedSurface = null;
                this.surface_filtered_save_disabled = true;
                this.getUpdatedData();

                this.$toast.add({'severity':'success','detail':'Başarıyla Eklendi.',life:3000});
            }else{
                this.$toast.add({'severity':'error','detail':'Ekleme İşlemi Başarısız',life:3000});
            }
          });
        },
        finishSelected(){
            this.fr_surface = this.selectedFinish.name_fr;
            this.es_surface = this.selectedFinish.name_es;
            
        },
        areaProductListSelected(event){
            this.delete_area_disabled_form = false;
            this.index = this.areaProductList.findIndex(x=>{
                return x.id == event.data.id;
            });
        },
        deleteAreas(){
         this.delete_area_disabled_form = true;  
         panelService.setAreasDelete(this.selectedAreaProductList.id).then(response=>{
            if(response.status){
                this.getUpdatedData();

                this.$toast.add({'severity':'success','detail':'Başarıyla Silindi',life:3000});
            }else{
                this.$toast.add({'severity':'danger','detail':'Silme Başarısız',life:3000});
                
            }
        })


        },
        saveAreas(){
            this.save_area_disabled_form = true;
            const areaid = this.selectedArea.id;
            const productid = this.getProductModel.urunid;
            const areaname = this.selectedArea.area;
            panelService.setAreasProducts(areaid,productid,areaname)
            .then(response=>{
               if(response.status){
                    this.selectedArea = null;
                    this.getUpdatedData();

                    this.$toast.add({'severity':'success','detail':'Başarıyla Kaydedildi.',life:3000});
                } 
            });
        },
        searchAreas(event){
            let results;
            if(event.query.lenght == 0){
                results = this.getProductAreasList;
            } else{
                results = this.getProductAreasList.filter(x=>{
                    return x.area.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredAreas = results;
        },
        saveSuggested(){
          const data = {
                'added':this.addedSuggested,
                'deleted':this.deletedSuggested,
                'id':this.getProductModel.urunid,
            }
          panelService.setSuggestedProducts(data)
          .then(response=>{
                if(response.status){
                    this.getUpdatedData();

                    this.$toast.add({severity:'success',detail:'Başarıyla Kaydedildi',life:3000});
                }else{
                    this.$toast.add({severity:'error',detail:'Kaydetme Başarısız',life:3000});
                    
                }
            })

        },
        moveToSourceSuggested(event){
            const index = this.getProductSuggested[1].findIndex(x=>x.urunid == event.items[0].urunid);
            this.getProductSuggested[1].splice(index,1);
            this.deletedSuggested.push(event.items[0]);
            this.getProductSuggested[0].push(event.items[0]);
            const index2 = this.addedSuggested.findIndex(x=>x.urunid == event.items[0].urunid);
            this.addedSuggested.splice(index2,1);
        },
        moveToTargetSuggested(event){
            if(this.getProductSuggested[1].length ==4){
                alert('Zaten 4 adet eklenmiş...');
                return;
            }else{
                const index = this.getProductSuggested[0].findIndex(x=>x.urunid == event.items[0].urunid);
                this.getProductSuggested[0].splice(index,1);
                this.getProductSuggested[1].push(event.items[0]);
                const index2 = this.deletedSuggested.findIndex(x=>x.urunid == event.items[0].urunid);
                this.deletedSuggested.splice(index2,1);
                this.addedSuggested.push(event.items[0]);
            }
        },
        inputSize(event){
            this.selectedSize = {
                name:'',
            }
            this.selectedSize.name = event.target._value;
        },
        photoListChangeQueue(event) {
            const changeQueueList = [];
            let queue = 1;
            for (const item of event.value[0]) {
                item.sira = queue;
                changeQueueList.push(item);
                queue++;
            };

            panelService.setPanelProductChangeQueue(changeQueueList).then(data => {
                    if (data.status) {
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Değiştirildi', life: 3000 });
                    } else {
                        this.$toast.add({ severity: 'error', detail: 'Değiştirme Başarısız', life: 3000 });

                    }
                });

        },

        photoListPickAll(event) {
            for (const item of event.items) {
                this.pickProductPhotosList[1].push(item);
            }
            this.pickProductPhotosList[0] = [];
        },
        photoListPick(event) {
            // const index = event.items[0].findIndex()

            // this.pickProductPhotosList[1].push(event.items[0]);
            // this.pickProductPhotosList[0].splice(this.findIndex(event.items[0].id, this.pickProductPhotosList[0]),1)
        },
        fotoSil() {
            useLoadingStore().begin_loading_act();
            const data = {
                'fotoSilList': this.pickProductPhotosList[1],
                'fotoSiraDegisim':[]
            }
            panelService.deletePanelPhotos(data).then(res => {
                if (res.status) {
                    socket.socketIO.emit('panel_product_update_emit', this.getProductModel.urunid);
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', summary: 'Fotoğraf Silme', detail: 'Fotoğraf Silme İşlemi Başarıyla Gerçekleşti', life: 3000 })
                }

            })
        },

        sendTestReport(){
            if (!this.testfile) {
                alert("Rapor seçmeniz gerekiyor.");
                return;
            };
            let formData = new FormData();
            formData.append("file", this.testfile);
            spaceService.sendTestReport(formData).then((res) => {
                if (res.status) {
                    const product = {
                        urunid: this.urunDetay.urunid,
                        testrapor:
                            "https://mekmar-image.fra1.digitaloceanspaces.com/test-reports/" +
                            this.testfile.name
                    };
                    mekmarService.testRaporDataGuncelle(product).then((data) => {
                        if (data.status) {
                            this.getProductModel.testrapor = product.testrapor;
                        };
                    });
                }
            });
        },
        sendPhotos(event) {
            useLoadingStore().begin_loading_act();

            let photos = [];
            for (let key in event.files) {
                photos.push(event.files[key].name);
            };
            panelService.setPhotosAdd(photos).then((res) => {
                if (res) {
                    for (let key in event.files) {
                        digitalOceanService.fotoGonder(event.files[key]);
                    };
                    socket.socketIO.emit('panel_product_update_emit', this.getProductModel.urunid);
                        useLoadingStore().end_loading_act();

                    this.$toast.add({ severity: 'success', detail: 'Fotoğraflar başarıyla kaydedildi.', life: 3000 })
                };
            });
        },
        findIndex(value, data) {
            let index = 0;
            for (const item of data) {
                if (item.id == value) {
                    return index;
                } else {
                    index += 1;
                };
            };
        },
        deleteSize() {
            const sizeData = {
                urunid: this.getProductModel.urunid,
                id: this.selectedSizeProduct.id,
            };
            panelService.setSizeDelete(sizeData).then(data => {
                if (data.status) {
                    this.sizeProductList = data.ebatlist;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 3000 });
                }
            })
        },
        newSize() {
            this.edge_add_disabled = false;
            this.edge_new_disabled = true;
        },
        addSize() {
            const sizeData = {
                urunid: this.getProductModel.urunid,
                ebat: this.selectedSize.name,
                fiyat: this.sizePrice,
                birim: this.getProductModel.birim,
            };
            panelService.setSizeAdd(sizeData).then(data => {
                if (data.status) {
                    this.edge_add_disabled = true;
                    this.edge_new_disabled = false;
                    this.sizePrice = 0;
                    this.selectedSize = null;
                    this.sizeProductList = data.ebatlist;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.$toast.add({ severity: 'danger', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            });
            
        },
        searchSize(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getProductSizeList;
            } else {
                result = this.getProductSizeList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.length);
                });
            };
            this.filteredProductSizeList = result;
        },
        deleteFinish() {
            const finishData = {
                'id': this.selectedSurfaceProduct.id,
                'urunid': this.getProductModel.urunid,
            };
            panelService.setFinishDelete(finishData).then(data => {
                if (data.status) {
                    this.finishProductList = data.finishlist;
                    this.selectedFinish = null;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 300 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Silme Başarısız', life: 300 });
                };
            });
        },
        addFinish() {
            const finishData = {
                'islemadien':this.selectedFinish.name,
                'islemadifr':this.selectedFinish.name_fr,
                'islemadies':this.selectedFinish.name_es,

                'dil': "en",

                'kategori_id': this.getProductModel.kategori_id,
                'urunid': this.getProductModel.urunid,
            };
            useLoadingStore().begin_loading_act();
            panelService.setFinishAdd(finishData).then(data => {
                if (data.status) {
                    this.finishProductList = data.finishlist;
                    this.selectedFinish = null;
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 300 });
                } else {
                    useLoadingStore().end_loading_act();
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 300 });
                }
                
            })
        },
        searchFinish(event) {
            let result;
            if (event.query.length == 0) {
                result = this.getProductFinishList;
            } else {
                result = this.getProductFinishList.filter(x => {
                    return x.name.toLowerCase().startsWith(event.query.toLowerCase());
                });
            };
            this.filteredProductFinishList = result;
        },
        stoneTypeSelected(event) {
            this.getProductModel.stonetype = event.value.kategori_id;
        },
        colorEsSelected(event) {
            this.getProductModel.renk_es = event.value.name;
        },
        colorFrSelected(event) {
            this.getProductModel.renk_fr = event.value.name;
        },
        colorEnSelected(event) {
            this.getProductModel.renk_en = event.value.name;
        },
        categoryEnSelected(event) {
            panelService.getNewQueue(event.value.kategori_id)
            .then(response=>{
                this.getProductModel.sira = response.queue;
            });



            this.getProductModel.kategori_id = event.value.kategori_id;
            this.getProductModel.kategoriadi = event.value.kategoriadi_en;

        },
        panelCreatedProcess() {
            this.keyListEn = this.__noneControl(this.getProductModel.anahtarlar_en);   
            this.keyListFr = this.__noneControl(this.getProductModel.anahtarlar_fr);
            this.keyListEs = this.__noneControl(this.getProductModel.anahtarlar_es);
            if(this.getProductModel.kategori_id){
                this.selectedCategoryEn = this.getProductCategoryList.find(x => x.kategori_id == this.getProductModel.kategori_id);
                
            }
            this.selectedColorEn = this.getProductColorEnList.find(x => x.name == this.getProductModel.renk_en);
            this.selectedColorFr = this.getProductColorFrList.find(x => x.name == this.getProductModel.renk_fr);
            this.selectedColorEs = this.getProductColorEsList.find(x => x.name == this.getProductModel.renk_es);

            this.selectedStoneType = this.getProductCategoryList.find(x => x.kategori_id == this.getProductModel.stonetype);
            this.finishProductList = this.getProductModel.kenarIslemList;
            this.sizeProductList = this.getProductModel.ebatlar;
            this.productSurfaceFilteredList = this.getProductSurfaceFilteredProductsList;
            this.productStyleFilteredList = this.getProductStyleFilteredProductsList;
            this.productEdgeFilteredList = this.getProductEdgeFilteredProductsList;
            this.productMaterialFilteredList = this.getProductMaterialFilteredProductsList;


        },
        __noneControl(value){
            if (value == null || value == '' || value == ' ') {
                console.log('1');
            } else {
                return value.split(',');
            }
        },
        deleteForm() {
            this.delete_button_disabled = true;
            if (confirm('Silmek istediğinize emin misiniz?')) {
                panelService.setPanelDelete(this.getProductModel.urunid).then(data => {
                    if (data.status) {
                        this.delete_button_disabled = false;
                        this.$toast.add({ severity: 'success', detail: 'Başarıyla Silindi', life: 3000 });
                    } else {
                        this.delete_button_disabled = false;
                        this.$toast.add({ severity: 'error', detail: 'Silme İşlemi Başarısız', life: 3000 });

                    };
                });
            }else{
                this.delete_button_disabled = false;

            }
            
        },
        update() {
            this.save_button_disabled = true;
            if (this.keyListEn.length > 0) {
                this.getProductModel.anahtarlar_en = this.keyListEn.join();

            }
            if (this.keyListFr.length > 0) {
                this.getProductModel.anahtarlar_fr = this.keyListFr.join();
            

            }
            if (this.keyListEs.length > 0) {
                this.getProductModel.anahtarlar_es = this.keyListEs.join();
            }
            panelService.setPanelUpdate(this.getProductModel).then(data => {
                if (data.status) {
                    this.save_button_disabled = false;
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Güncellendi', life: 3000 });
                } else {
                    this.save_button_disabled = false;
                    this.$toast.add({ severity: 'error', detail: 'Güncelleme Başarısız', life: 3000 });
                }
            })
        },
        save() {
            this.save_button_disabled = true;
            this.getProductModel.anahtarlar_en = this.keyListEn.join();
            this.getProductModel.anahtarlar_fr = this.keyListFr.join();
            this.getProductModel.anahtarlar_es = this.keyListEs.join();
            panelService.setPanelSave(this.getProductModel).then(data => {
                if (data.status) {
                    this.save_button_disabled = false;
                    console.log(data.urunid);
                    this.$emit('product_id_emit',data.urunid)
                    this.$toast.add({ severity: 'success', detail: 'Başarıyla Kaydedildi', life: 3000 });
                } else {
                    this.save_button_disabled = false;
                    this.$toast.add({ severity: 'error', detail: 'Kaydetme Başarısız', life: 3000 });
                }
            })
        },
        process() {
            if (this.getPanelProductNewButton) {
                this.save();
            } else {
                this.update();
            }
        }
    },
    mounted(){
        this.emitter.on('fotografListUpdate',()=>{
            this.pickProductPhotosList = [...this.getProductPhotoListPick];

        })
    }
}
</script>
<style scoped>

</style>