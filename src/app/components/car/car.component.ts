import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/car-detail';
import { CarImage } from 'src/app/models/car-image';
import { Color } from 'src/app/models/color';
import { Rental } from 'src/app/models/rental';
import { BrandService } from 'src/app/services/brand.service';

import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  carDetails: CarDetail[];
  brands: Brand[];
  colors: Color[];
  carImages: CarImage[];
  rentals: Rental[];

  filterText = '';
  filterColorId = 0;
  filterBrandId = 0;

  currentCarDetail: CarDetail;

  imagePath = environment.staticPath;

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
      } else if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      } else if ((params['brandId'], params['color'])) {
        this.getCarDetailsByBrandAndColorId(params['brandId'], params['color']);
      } else {
        this.getCarDetails();
        this.getBrands();
        this.getColors();
      }
    });
  }

  getCarDetails() {
    this.carService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getCarDetailsByBrandAndColorId(brandId: number, colorId: number) {
    this.carService
      .getCarDetailsByBrandAndColorId(brandId, colorId)
      .subscribe((response) => {
        this.carDetails = response.data;
      });
  }

  filterClean() {
    this.filterColorId = 0;
    this.filterBrandId = 0;
    this.filterText = '';
    this.getCarDetails();
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarDetailsByBrandId(brandId: number) {
    this.carService.getCarDetailsByBrandId(brandId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  getCarDetailsByColorId(colorId: number) {
    this.carService.getCarDetailsByColorId(colorId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  setCurrentCarDetail(carDetail: CarDetail) {
    this.currentCarDetail = carDetail;
  }
}
