import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.less"]
})
export class TodoFormComponent implements OnInit {
  registered = false;
  submitted = false;
  todoForm: FormGroup;
  serviceErrors: any = {};

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  invalidDescription() {
    console.log(this.serviceErrors);
    return (
      this.submitted &&
      ((this.serviceErrors.length > 0 && this.serviceErrors.find(e => e.field === 'description')) ||
        this.todoForm.controls.description.errors !== null)
    );
  }

  invalidExpirationDate() {
    return (
      this.submitted &&
      ((this.serviceErrors.length > 0 && this.serviceErrors.find(e => e.field === 'expiration_date')) ||
        this.todoForm.controls.expiration_date.errors !== null)
    );
  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      description: ["", [Validators.required, Validators.maxLength(50)]],
      expiration_date: [Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.todoForm.invalid) {
      return;
    } else {
      let data: any = Object.assign(this.todoForm.value);

      this.http.post("/api/v1/todos", data).subscribe(
        (data: any) => {
          this.router.navigate(["/"]);
        },
        error => {
          console.log(error)
          this.serviceErrors = error.error.error;
        }
      );
    }
  }
}
