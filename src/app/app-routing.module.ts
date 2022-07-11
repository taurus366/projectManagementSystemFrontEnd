import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ParamGuardProfileActive} from "./shared/guard/param-guard-profile.active";
import {ParamGuardLoginRegisterActive} from "./shared/guard/param-guard-login-register.active";
import {ProjectComponent} from "./project/project.component";
import {BoardComponent} from "./board/board.component";

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ParamGuardLoginRegisterActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/profile"
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ParamGuardLoginRegisterActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/profile"
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/"
    }
  },
  {
    path: ':type/project',
    component: ProjectComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/"
    }
  },
  {
    path: ':type/board',
    component: BoardComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/"
    }
  },
  {
    path: '**',
    component: LoginComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
