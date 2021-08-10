import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/car-detail';
import { CustomerDetail } from 'src/app/models/customer-detail';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  @Input() rentCar: CarDetail;

  customerDetails: CustomerDetail[];

  rentForm: FormGroup;

  visibility: boolean = false;

  numberOfDays: number;
  totalPrice: number;
  rentDate: any;
  returnDate: any;
  dailyPrice: number;
  customerId: any;

  constructor(
    private rentalService: RentalService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRentForm();
    this.getCustomerDetails();
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      customer: ['', Validators.required],
      rentdate: ['', Validators.required],
      returndate: ['', Validators.required],
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomerDetails().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }

  getRentDate() {
    var today = new Date();
    today.setDate(today.getDate());
    return today.toISOString().slice(0, 10);
  }

  getReturnDate() {
    var today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().slice(0, 10);
  }

  checkRent() {
    if (this.rentForm.valid) {
      let rentModel = Object.assign({}, this.rentForm.value);
      this.customerId = Object.values(rentModel)[0];
      this.rentDate = Object.values(rentModel)[1];
      this.returnDate = Object.values(rentModel)[2];
      
      this.dailyPrice = this.rentCar.dailyPrice;

      this.rentalService
        .getRentalByCarId(this.rentCar.carId)
        .subscribe((response) => {
          if (response.data.length != 0) {
            if (response.data[0].returnDate >= this.rentDate) {
              this.visibility = false;
              this.toastrService.info('Araç kiralanamaz!', 'TARIH UYARISI');
            } else {
              this.numberOfDays = this.rentalService.priceCalculate(
                this.rentDate,
                this.returnDate,
                this.dailyPrice
              ).numberOfDays;
              this.totalPrice = this.rentalService.priceCalculate(
                this.rentDate,
                this.returnDate,
                this.dailyPrice
              ).totalPrice;

              this.visibility = true;
              this.toastrService.success('Araç kiralanabilir.', 'ONAY');
            }
          } else {
            this.numberOfDays = this.rentalService.priceCalculate(
              this.rentDate,
              this.returnDate,
              this.dailyPrice
            ).numberOfDays;
            this.totalPrice = this.rentalService.priceCalculate(
              this.rentDate,
              this.returnDate,
              this.dailyPrice
            ).totalPrice;

            this.visibility = true;
            this.toastrService.success('Araç kiralanabilir.', 'ONAY');
          }
        });
    } else {
      this.toastrService.error('Bilgileri eksiksiz doldurunuz!', 'HATA');
    }
  }

  modalClose() {
    this.visibility = false;
  }

  routerPayment() {
    this.router
      .navigate(['payment/' + this.rentCar.carId], {
        queryParams: {
          numberOfDays: this.numberOfDays,
          totalPrice: this.totalPrice,
          customerId: this.customerId,
        },
      })
      .then(() => {
        window.location.reload();
      });
  }
}
