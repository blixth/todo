import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less']
})

export class TodoFormComponent implements OnInit {
  registered = false;
  submitted = false;
  todoForm:  FormGroup;
  guid: string;
  serviceErrors:any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.http.get('api/v1/generate_uid').subscribe((data: any) => {
      this.guid = data.guid;
    }, error => {
      console.log("Could not get uid from server");
    })
  }

  invalidDescription() {
    return (this.submitted && (this.serviceErrors.description !== null || this.todoForm.controls.description.errors !== null));
  }

  ngOnInit() {
    this.todoForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.maxLength(50)]],
      expiration_date: []
    });
  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.todoForm.invalid)
  	{
  		return;
  	}
  	else
  	{
      let data: any = Object.assign({guid: this.guid}, this.todoForm.value);
      
      this.http.post('/api/v1/todo', data).subscribe((data: any) => {
        this.router.navigate(['/']);
      }, error => {
        this.serviceErrors = error.error.error;
      });
  	}
  }
}
