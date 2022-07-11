import { Component, OnInit } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {BooleansAndMethodsService} from "../../shared/booleansAndMethods.service";
import {UserService} from "../../authentication/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isShowMenuBar: boolean = false;

  constructor(public sharedService:BooleansAndMethodsService, private userService:UserService) { }

  ngOnInit(): void {
  }

  preventDefault($event: MouseEvent):void {
  this.sharedService.preventDefault($event);
  }

  hideMenuBar():void {
    this.isShowMenuBar = false;
  }

  logout():void {
    this.userService
      .logout()
      .subscribe({
        next:value => {
          this.sharedService
            .user = undefined;
        },
       complete:() => {
         this.sharedService
           .navigate("/login");
       }
      })
  }

}
