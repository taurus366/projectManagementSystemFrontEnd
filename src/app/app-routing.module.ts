import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";
import {ProfileComponent} from "./profile/profile.component";
import {ParamGuardProfileActive} from "./shared/guard/param-guard-profile.active";
import {ParamGuardLoginRegisterActive} from "./shared/guard/param-guard-login-register.active";
import {ProjectComponent} from "./project/project.component";
import {BoardComponent} from "./board/board.component";
import {TaskComponent} from "./task/task.component";
import {TablesComponent} from "./tables/tables.component";
import {SearchComponent} from "./search/search.component";

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
    path: ':type/board/:id',
    component: BoardComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/"
    }
  },
  {
    path: ':type/task',
    component: TaskComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/"
    }
  },
  // TABLES START
  {
    path: 'table/:type/:which/:id/:who',
    component: TablesComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/profile"
    }
  },
  {
    path: 'table/:type/:which',
    component: TablesComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/profile"
    }
  },
  // TABLES END
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [ParamGuardProfileActive],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: "/profile"
    }
  },
  {
    path: '**',
    component: LoginComponent
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules});
