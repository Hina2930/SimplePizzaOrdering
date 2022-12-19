import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListingComponent } from './order-listing/order-listing.component';
import { OrderComponent } from './order/order.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

const routes: Routes = [
  {path:'order', component:OrderComponent, children:[
    {path:"", component: OrderListingComponent},
    {path:"place", component: PlaceOrderComponent},
    {path:"place/:id", component: PlaceOrderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
