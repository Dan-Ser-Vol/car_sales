import {Component, Input} from '@angular/core';
import {ICar} from "../../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent {

  @Input()
  car: ICar
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  toDetail(): void {
    this.router.navigate([this.car.id], {relativeTo: this.activatedRoute})
  }
}
