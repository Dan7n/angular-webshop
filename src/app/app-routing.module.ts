import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { CartComponent } from './components/cart/cart.component';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { animation: 'isLeft' } },
  {
    path: 'products',
    component: ProductsComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { animation: 'isRight' },
  },
  {
    path: 'admin',
    component: ProfileComponent,
    data: { animation: 'isRight' },
  },
  //! Leave this last
  {
    path: '**',
    component: NoPageFoundComponent,
    data: { animation: 'isRight' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
