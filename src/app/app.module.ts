import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthenticationModule} from "./authentication/authentication.module";
import {ProfileModule} from "./profile/profile.module";
import {ProjectComponent} from "./project/project.component";
import {FormsModule} from "@angular/forms";
import { BoardComponent } from './board/board.component';
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
  AuthenticationModule,
    ProfileModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
