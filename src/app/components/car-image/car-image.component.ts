import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/car-image';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  carImages: CarImage[] = [];

  apiPath: string = 'https://localhost:44384/';

  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getImagesByCarId(params['carId']);
      }
    });
  }

  getImagesByCarId(carId: number) {
    this.carImageService.getImagesByCarId(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
