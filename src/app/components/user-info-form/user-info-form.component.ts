import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.scss'],
})
export class UserInfoFormComponent implements OnInit {
  userInfoForm: FormGroup;
  @Output() userForm = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userInfoForm = this.formBuilder.group({
      name: '',
      phoneNumber: '',
      adress: '',
      email: '',
    });
  }
  handleFormSubmit() {
    this.userForm.emit(this.userInfoForm.value);
  }
}
