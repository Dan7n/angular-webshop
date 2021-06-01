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
      paymentMethod: ['', [Validators.required]],
      cardNumber: [
        '4024007103939509', //fake credit card number to make your life easier
        [
          Validators.required,
          Validators.pattern(
            /(^4[0-9]{12}(?:[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$)|(3[47][0-9]{13})|(^3(?:0[0-5]|[68][0-9])[0-9]{11}$)|(^6(?:011|5[0-9]{2})[0-9]{12}$)|(^(?:2131|1800|35\d{3})\d{11}$)/
          ),
        ],
      ],
      expirationDate: [
        '',
        [
          Validators.maxLength(4),
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/),
        ],
      ],
      ccv: [
        '',
        [Validators.maxLength(3), Validators.minLength(3), Validators.required],
      ],
    });

    this.paymentForm.valueChanges.subscribe((data) => {
      console.log(this.isFormInvalid());
    });

    console.log(this.paymentMethod);
  }

  log() {
    console.log(this.isFormInvalid());
  }

  //to make HTML syntax a tiny bit cleaner
  get paymentMethod() {
    return this.paymentForm.get('paymentMethod');
  }

  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }

  get expirationDate() {
    return this.paymentForm.get('expirationDate');
  }

  get ccv() {
    return this.paymentForm.get('ccv');
  }

  isFormInvalid() {
    if (this.paymentMethod.value === 'payLater-0') {
      return true;
    } else if (this.paymentMethod.value === 'creditCard-1') {
      if (
        this.cardNumber.valid &&
        this.expirationDate.valid &&
        this.ccv.valid
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  handleFormSubmit() {
    this.paymentInformation.emit(this.paymentForm.value);
  }
}
