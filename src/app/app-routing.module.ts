import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },

  { path: 'cars', component: CarComponent },
  { path: 'cars/getcarsbybrandid/:brandId', component: CarComponent },
  { path: 'cars/getcarsbycolorid/:colorId', component: CarComponent },

  { path: 'cars/getcardetails', component: CarDetailComponent },
  { path: 'cars/getcardetailsbycarid/:carId', component: CarDetailComponent },

  { path: 'payment/:carId', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
