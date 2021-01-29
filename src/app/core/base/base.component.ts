import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[] = [];

  protected constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
  ) {
    this.logger.debug(BaseComponent.name, 'constructor()', 'start');
    this.logger.debug(BaseComponent.name, 'constructor()', 'end');
  }

  ngOnInit(): void {
    this.logger.debug(this.constructor.name, 'ngOnInit()', 'start');
    this.subscriptions = [];
    this.logger.debug(this.constructor.name, 'ngOnInit()', 'end');
  }

  ngOnDestroy(): void {
    this.logger.debug(this.constructor.name, 'ngOnDestroy()', 'start');
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.logger.debug(this.constructor.name, 'ngOnDestroy()', 'end');
  }

  showAlert(title: string, text: string, icon: SweetAlertIcon, action?: () => void): void {
    this.showAlertBack(title, text, icon, undefined, action);
  }

  showAlertBack(title: string, text: string, icon: SweetAlertIcon, errorBack: string, action?: () => void): void {
    this.subscriptions.push(
      this.translateService.get([title, text].concat(errorBack)).subscribe(
        res => {
          Swal.fire({
            icon,
            title: (res[title]),
            html: errorBack ? `<div>${res[text]}<br/>${res[errorBack]}</div>` : `<div>${res[text]}</div>`
          }).then(
            () => {
              if (action) {
                action();
              }
            }
          );
        }
      )
    );
  }
}
