import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartViewComponent } from './components/cart-view/cart-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: CustomerComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path:'view-products',component:ViewProductsComponent},
      {path: 'product/:id/:name', component: ProductDetailsComponent},
      {path: 'cart', component: CartViewComponent}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
