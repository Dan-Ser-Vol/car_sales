import { Component } from '@angular/core';
import {ICar, IUser} from "../../../../interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  car: ICar
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({carData}) => this.car = carData)
  }
}
