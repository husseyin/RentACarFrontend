import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/car-image';
import { CustomerDetail } from 'src/app/models/customer-detail';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  months: Array<number> = [];
  years: Array<number> = [];

  carDetails: CarDetail[];
  carImage: CarImage;
  imagePath = environment.staticPath;

  rentals: Rental;
  customerDetail: CustomerDetail;

  numberOfDays: any;
  totalPrice: any;
  customerId: any;

  payForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDates();
    this.createPayForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
      }

      this.numberOfDays =
        this.activatedRoute.snapshot.queryParamMap.get('numberOfDays');

      this.totalPrice =
        this.activatedRoute.snapshot.queryParamMap.get('totalPrice');

      this.customerId =
        this.activatedRoute.snapshot.queryParamMap.get('customerId');

      this.getCustomerDetailByCustomerId(this.customerId);
    });
  }

  createPayForm() {
    this.payForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cardnumber: ['', Validators.required],
      cardmonth: ['', Validators.required],
      cardyear: ['', Validators.required],
      cardcvv: ['', Validators.required],
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((carDetail) => {
      this.carDetails = carDetail.data;
      this.carImage = this.carDetails[0].carImage[0];
    });
  }

  getCustomerDetailByCustomerId(customerId: number) {
    this.customerService
      .getCustomerDetailByCustomerId(customerId)
      .subscribe((response) => {
        this.customerDetail = response.data[0];
      });
  }

  getDates() {
    for (let index = 1; index <= 12; index++) {
      this.months.push(index);
    }
    for (let index = 2021; index <= 2030; index++) {
      this.years.push(index);
    }
  }

  checkPayment() {
    if (this.payForm.valid) {
      let payModel = Object.assign({}, this.payForm.value);
      
      console.log(payModel);
    } else {
      this.toastrService.error('Bilgileri eksiksiz doldurunuz!', 'HATA');
    }
  }
}
