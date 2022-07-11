import {Component} from '@angular/core';
import {BooleansAndMethodsService} from "./shared/booleansAndMethods.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projectManagementSystemFrontEnd';

  constructor(private sharedService: BooleansAndMethodsService) {
  }

  ngOnInit(): void {
    this.sharedService
      .checkUserInfoExistsThenUpdate();

  }

}

