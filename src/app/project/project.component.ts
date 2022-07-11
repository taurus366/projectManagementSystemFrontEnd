import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserService} from "../authentication/user.service";
import {BooleansAndMethodsService} from "../shared/booleansAndMethods.service";


const navigateAfterCreateProject: string = "/profile";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private userService:UserService,private sharedService: BooleansAndMethodsService) {
  }

  isEditProject: boolean = false;
  isTitleIncorrect: boolean = false;
  isKeyIncorrect: boolean = false;

  errorText: string = "";

  ngOnInit(): void {
    this.chooseEditOrCreate();
  }

  chooseEditOrCreate(): void {
    this.activeRoute.params.subscribe(({type}) => {
      switch (type) {
        case "edit":
          this.isEditProject = true;
          break;
        case "create":
          this.isEditProject = false;
          break;
      }
    })
  }


  createProject(form: NgForm) {

    this.restartAllFields();

    if (form.invalid) {
      let formControl = form.controls;

      switch (formControl['title'].status) {
        case "INVALID":
          this.isTitleIncorrect = true;
          break;
        case "VALID":
          this.isTitleIncorrect = false;
          break;
      }

      switch (formControl['key'].status) {
        case "INVALID":
          this.isKeyIncorrect = true;
          this.errorText = "Please check key";
          break;
        case "VALID":
          this.isKeyIncorrect = false;
          break;
      }
      return;
    }
    this.userService
      .createNewProject(form.value)
      .subscribe({
        next:value => {},
        error:err => {
          let text: string = "";
          Array.from(err.error)
            .forEach(value => {
              // @ts-ignore
              let defaultMessage = value.defaultMessage.toString();

              // @ts-ignore
              let field = value.field.toString().toLowerCase();

              switch (field) {
                case "title":
                  this.isTitleIncorrect = true;
                  break;
                case "key":
                  this.isKeyIncorrect = true;
                  break;
              }

              text += `/${defaultMessage}/`;
            });
          this.errorText = text.slice(1,text.length-1);

        },
        complete:() => {
          this.sharedService
            .navigate(navigateAfterCreateProject);
        }
      })



  }

  private restartAllFields() {
    this.isKeyIncorrect = false;
    this.isTitleIncorrect = false;
    this.errorText = "";
  }
}
