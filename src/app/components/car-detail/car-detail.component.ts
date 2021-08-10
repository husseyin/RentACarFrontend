import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/car-detail';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { environment } from 'src/environments/environment';
import { CarImage } from 'src/app/models/car-image';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[];
  carImages: CarImage[];

  imagePath = environment.staticPath;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarDetailsByCarId(params['carId']);
      }
    });
  }

  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
      this.carImages = response.data[0].carImage;
    });
  }

  getButtonClass(carImage: CarImage) {
    if (carImage != this.carImages[0]) {
      return '';
    } else {
      return 'active';
    }
  }

  getCurrentImageClass(carImage: CarImage) {
    if (carImage != this.carImages[0]) {
      return 'carousel-item';
    } else {
      return 'carousel-item active';
    }
  }

  getCurrentSlideClass(carImage: CarImage) {
    if (carImage === this.carImages[0]) {
      return 'carousel-item active';
    }
    return 'carousel-item';
  }
}
