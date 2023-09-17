import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {ICar, IUser} from "../../interfaces";
import {CarService} from "../car.service";

export const carDetailsResolver: ResolveFn<ICar> = (route, state) => {
  const {id} = route.params
  const carService = inject(CarService)
  return carService.getById(id)
};
