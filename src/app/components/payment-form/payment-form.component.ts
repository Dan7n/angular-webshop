import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss'],
})
export class PaymentFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  paymentForm: FormGroup;
  @Output() paymentInformation = new EventEmitter();

  paymentMethods = [
    { value: 'payLater-0', viewValue: 'Stream instantly, pay in 30 days' },
    { value: 'creditCard-1', viewValue: 'Credit Card' },
  ];

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      paymentMethod: '',
      cardNumber: '',
      expirationDate: '',
      ccv: '',
    });

    this.paymentForm.valueChanges.subscribe((data) => {
      console.log(data.paymentMethod);
      if (data.expirationDate.length === 2) {
        console.log(data.expirationDate);
      }
    });
  }

  handleFormSubmit() {
    this.paymentInformation.emit(this.paymentForm.value);
  }
}
