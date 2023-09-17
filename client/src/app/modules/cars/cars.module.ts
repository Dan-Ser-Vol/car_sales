import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import {CarsPageComponent} from "./pages/cars-page/cars-page.component";
import {CarsDetailPageComponent} from "./pages/cars-detail-page/cars-detail-page.component";
import { CarsComponent } from './components/cars/cars.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';


@NgModule({
  declarations: [CarsPageComponent, CarsDetailPageComponent, CarsComponent, CarComponent, CarDetailsComponent],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})
export class CarsModule { }
