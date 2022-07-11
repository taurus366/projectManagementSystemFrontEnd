import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {BooleansAndMethodsService} from "../booleansAndMethods.service";
import {Observable} from "rxjs";

@Injectable()
export class ParamGuardProfileActive implements CanActivate {

  constructor(private router: Router, private booleanService: BooleansAndMethodsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const {authenticationRequired, authenticationFailureRedirectUrl} = route.data;

    if (!authenticationRequired) {
      return true;
    }

    if (authenticationRequired && authenticationFailureRedirectUrl && this.booleanService.user?.email != undefined) {
      return true;
    } else {
      return this.router.parseUrl(authenticationFailureRedirectUrl || '/login');
    }
  }

}
