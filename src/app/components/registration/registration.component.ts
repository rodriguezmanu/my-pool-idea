import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import {
  EMAIL_VALIDATOR_REGEX,
  PASSWORD_VALIDATION_REGEX
} from './../../app.constant';
import { ToastsService } from '../../services/toastr.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup;
  protected ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastsService: ToastsService
  ) {
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
          Validators.required,
          Validators.pattern(PASSWORD_VALIDATION_REGEX)
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

  /**
   * Register user
   *
   * @memberof RegistrationComponent
   */
  register(): void {
    const user = {
      name: this.registrationForm.get('name').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value
    };

    this.usersService
      .registration(user)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(
        data => {
          this.toastsService.success('ALERTS.SUCCESS', 'ALERTS.SIGNUP');
          this.router.navigate(['/ideas']);
        },
        error => {
          this.toastsService.error('ALERTS.ERROR', 'ALERTS.ERRORMESSAGE');
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
