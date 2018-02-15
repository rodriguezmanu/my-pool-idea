import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { EMAIL_VALIDATOR_REGEX, PASSWORD_VALIDATION_REGEX } from './../../app.constant';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
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
          Validators.required,
          Validators.pattern(PASSWORD_VALIDATION_REGEX)
        ])
      ]
    });
  }

  ngOnInit() {}

  /**
   * Login from service
   *
   * @memberof LoginComponent
   */
  login(): void {
    const user = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };

    this.usersService.login(user)
      .subscribe(data => {
        this.router.navigate(['/ideas']);
      }, error => {
        console.log('Failed to login');
      }, () => {
        console.log('finally');
      });
  }
}
