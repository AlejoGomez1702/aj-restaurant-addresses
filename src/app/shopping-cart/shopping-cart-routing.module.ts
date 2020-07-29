import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCartPage } from './shopping-cart.page';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPage
  },
  {
    path: 'payment',
    component: PaymentMethodComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartPageRoutingModule {}
