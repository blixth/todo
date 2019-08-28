import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TodoService } from 'src/app/services/todo.service';
import { ITodo } from 'src/app/interfaces/todo.interface';

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
    private router: Router,
    private todoService: TodoService
  ) {}

  invalidDescription() {
    return (
      this.submitted &&
      ((this.serviceErrors.length > 0 &&
        this.serviceErrors.find(e => e.field === "description")) ||
        this.todoForm.controls.description.errors !== null)
    );
  }

  invalidExpirationDate() {
    return (
      this.submitted &&
      ((this.serviceErrors.length > 0 &&
        this.serviceErrors.find(e => e.field === "expiration_date")) ||
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

      this.todoService.createTodo(data).subscribe(
        (_data: ITodo) => {
          this.router.navigate(["/"]);
        },
        error => {
          this.serviceErrors = error.error.error;
        }
      );
    }
  }
}
