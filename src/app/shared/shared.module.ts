import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BooleansAndMethodsService} from "./booleansAndMethods.service";
import { EmailValidatorDirective } from './email-validator.directive';
import {ParamGuardProfileActive} from "./guard/param-guard-profile.active";
import {ParamGuardLoginRegisterActive} from "./guard/param-guard-login-register.active";
import {StringDivider} from "./filter/stringDivider";



@NgModule({
  declarations: [
    EmailValidatorDirective,
    StringDivider
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ParamGuardProfileActive,
    ParamGuardLoginRegisterActive
  ],
  exports: [
    EmailValidatorDirective,
    StringDivider

  ]
})
export class SharedModule { }
