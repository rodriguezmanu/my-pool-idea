import { Component, ViewContainerRef } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    // config translate module
    translate.setDefaultLang('en');

    // config toasts notification module
    this.toastr.setRootViewContainerRef(vcr);
  }
}
