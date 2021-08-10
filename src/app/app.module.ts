import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterCarPipe } from './pipes/filterCar.pipe';
import { FilterBrandPipe } from './pipes/filterBrand.pipe';
import { FilterColorPipe } from './pipes/filterColor.pipe';
import { PaymentComponent } from './components/payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    CarComponent,
    CarDetailComponent,
    RentalComponent,
    VatAddedPipe,
    FilterCarPipe,
    FilterBrandPipe,
    FilterColorPipe,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
