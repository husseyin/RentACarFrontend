import { Car } from './car';
import { CarImage } from './car-image';

export interface CarDetail {
  carId: number;
  carName: string;
  brandId: number;
  brandName: string;
  colorId: number;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  carImage: CarImage[];
}
