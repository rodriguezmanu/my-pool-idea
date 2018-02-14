import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { EMAIL_VALIDATOR_REGEX } from './../../app.constant';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(EMAIL_VALIDATOR_REGEX)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required
        ])
      ],
      name: [
        '',
        Validators.compose([
          Validators.required
        ])
      ]
    });
  }

  ngOnInit() {}

  register() {
    console.log('registration');
  }
}
