import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { LoginService } from '../../core/services/login.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../core/services/user.service';
import { BaseComponent } from '../../core/base/base.component';
import { NGXLogger } from 'ngx-logger';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
/**
 * Component to display the navbar
 */
export class NavbarComponent extends BaseComponent {
  @Output() changeSidenavEmitter = new EventEmitter<boolean>();
  @Output() closeEmitter = new EventEmitter<boolean>();
  localStorage = localStorage;
  language = 'es';

  constructor(
    protected logger: NGXLogger,
    protected translateService: TranslateService,
    public loginService: LoginService,
    public userService: UserService
  ) {
    super(logger, translateService);
  }

  /**
   * Get class to show flag of selected language
   */
  get selectedLanguage(): string {
    return 'flag-icon flag-icon-' + this.language;
  }

  /**
   * Change the language to display the application
   *
   * @param language Selected language
   */
  useLanguage(language: string): void {
    this.logger.debug(UserService.name, `useLanguage(language: ${language})`, 'start');
    this.language = language;
    this.translateService.use(language);
    if (localStorage.authorization) {
      this.subscriptions.push(
        this.userService.changeLanguage(language).subscribe(
          () => {
            this.logger.debug(UserService.name, `useLanguage(language: ${language})`, 'end');
          },
          (error) => {
            this.logger.error(UserService.name, `useLanguage(language: ${language})`, error);
          }
        )
      );
    }
  }

  openSidenav(): void {
    this.changeSidenavEmitter.emit(true);
  }

  logout(): void {
    this.loginService.logout();
    this.closeEmitter.emit(true);
  }
}
