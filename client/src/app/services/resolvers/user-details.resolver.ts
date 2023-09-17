import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";

export const userDetailsResolver: ResolveFn<IUser> = (route, state) => {
  const {id} = route.params
  const userService = inject(UserService)
  return  userService.getById(id)
};
