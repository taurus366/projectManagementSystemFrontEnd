import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[emailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator{



  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return {InvalidEmail: true};
    }
    return /^[a-zA-Z0-9_\\.-]{3,}@[a-zA-Z0-9]{2,}\.[a-z]{2,}(\.[a-z]{2,})?$/.test(control.value) ? null : { invalidEmail : true};
  }

}
