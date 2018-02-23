import { Injectable, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToastsService {
  constructor(
  private toastr: ToastsManager,
  private toastOpts: ToastOptions,
  private translate: TranslateService
  ) {
    this.toastOpts.positionClass = 'toast-top-center';
  }

  /**
   * Success Message toastr
   *
   * @param {string} message
   * @param {string} title
   * @memberof ToastsService
   */
  success(message: string, title: string): void {
    this.translate.get([message, title]).subscribe((res) => {
      this.toastr.success(res[title], res[message]);
    });
  }

  /**
   * Error Message toastr
   *
   * @param {string} message
   * @param {string} title
   * @memberof ToastsService
   */
  error(message: string, title: string): void {
    this.translate.get([message, title]).subscribe(res => {
      this.toastr.error(res[title], res[message]);
    });
  }
}
