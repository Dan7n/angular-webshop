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
      name: ['', [Validators.required, Validators.minLength(5)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('[- +()0-9]+')],
      ],
      adress: ['', [Validators.required, Validators.minLength(7)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get name() {
    return this.userInfoForm.get('name');
  }

  get phoneNumber() {
    return this.userInfoForm.get('phoneNumber');
  }

  get adress() {
    return this.userInfoForm.get('address');
  }

  get email() {
    return this.userInfoForm.get('email');
  }

  handleFormSubmit() {
    this.userForm.emit(this.userInfoForm.value);
  }
}
