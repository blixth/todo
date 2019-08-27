import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.less']
})

export class TodoFormComponent implements OnInit {
  registered = false;
  submitted = false;
  todoForm:  FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

   invalidDescription() {
    return (this.submitted && this.todoForm.controls.description.errors !== null);
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
  		this.registered = true;
  	}
  }
}
