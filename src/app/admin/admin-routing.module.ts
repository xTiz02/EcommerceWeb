import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/category/post-category/post-category.component';
import { PostProductComponent } from './components/product/post-product/post-product.component';
import { ViewCategoriesComponent } from './components/category/view-categories/view-categories.component';
import { ViewProductsComponent } from './components/product/view-products/view-products.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { PostProductUnitComponent } from './components/product/post-product-unit/post-product-unit.component';
import { ViewUnitsComponent } from './components/product/view-units/view-units.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { UpdateUnitComponent } from './components/product/update-unit/update-unit.component';
import { PostPromotionComponent } from './components/promotion/post-promotion/post-promotion.component';
import { ViewPromotionsComponent } from './components/promotion/view-promotions/view-promotions.component';
import { UpdatePromotionComponent } from './components/promotion/update-promotion/update-promotion.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path:'category',component:PostCategoryComponent},
      {path:'product',component:PostProductComponent},
      {path:'products',component:ViewProductsComponent},
      {path: 'category/:categoryId', component: UpdateCategoryComponent},
      {path:'categories',component:ViewCategoriesComponent},
      {path:'product/:productId/unit',component:PostProductUnitComponent},
      {path:'product/:productId/units',component:ViewUnitsComponent},
      {path:'product/:productId',component:UpdateProductComponent},
      {path:'product/:productId/unit/:unitId',component:UpdateUnitComponent},
      {path:'product/:productId/promotion',component:PostPromotionComponent},
      {path:'product/:productId/promotions',component:ViewPromotionsComponent},
      {path:'product/:productId/promotion/:promotionId',component:UpdatePromotionComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
