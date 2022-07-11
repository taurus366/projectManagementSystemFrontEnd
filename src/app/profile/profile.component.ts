import { Component, OnInit } from '@angular/core';
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private sharedService: BooleansAndMethodsService) { }

  ngOnInit(): void {
  }

  preventDefault($event: MouseEvent): void {
    this.sharedService.preventDefault($event);
  }

}
