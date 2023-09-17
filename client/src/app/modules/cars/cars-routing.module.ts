import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarsPageComponent} from "./pages/cars-page/cars-page.component";
import {CarsDetailPageComponent} from "./pages/cars-detail-page/cars-detail-page.component";
import {carDetailsResolver} from "../../services";

const routes: Routes = [{
  path: "", component: CarsPageComponent, children: [{
    path: ":id", resolve: {carData: carDetailsResolver}, component: CarsDetailPageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule {
}
