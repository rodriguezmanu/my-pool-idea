import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { EMAIL_VALIDATOR_REGEX } from './../../app.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
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
      ]
    });
}

  ngOnInit() {}

  login() {
    console.log('login');
  }
}
