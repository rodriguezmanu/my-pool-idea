import { ToastsService } from './../../services/toastr.service';
import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { EMAIL_VALIDATOR_REGEX, PASSWORD_VALIDATION_REGEX } from './../../app.constant';
import { UsersService } from './../../services/users.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastsService: ToastsService
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

    this.usersService
      .login(user)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        () => {
          this.router.navigate(['/ideas']);
        },
        () => {
          this.toastsService.error('ALERTS.ERROR', 'ALERTS.BADLOGIN');
        }
      );
  }

  /**
   * Destroy method
   *
   * @memberof LoginComponent
   */
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
