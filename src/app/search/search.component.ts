import {Component, OnInit} from '@angular/core';
import {UserService} from "../authentication/user.service";
import {ITASKINFO} from "../shared/interfaces/ITASKINFO";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tasks: ITASKINFO[] | undefined;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  searchForTask(title: string, type: string, assignedTo: string): void {
    this.userService
      .searchForTask({title,type,assignedTo})
      .subscribe({
        next:value => {
          if (value.body != null){
            this.tasks = value.body;
          }
        }
      })
  }

}
