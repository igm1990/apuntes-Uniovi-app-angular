import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Page } from '../models/server/page';
import { User } from '../models/user';
import { OptionsPage } from '../models/server/options-page';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        LoggerTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        UserService
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('check findAll', () => {
    service.findAll(new OptionsPage()).subscribe(
      (res) => {
        expect(res.content).toEqual([]);
      }
    );
    const page = {content: []} as Page<User>;
    const req = httpMock.expectOne(`${environment.urlApi}/users?size=5`);
    expect(req.request.method).toBe('POST');
    req.flush(page);
  });

  it('check findById with existed user', () => {
    const id = 1;
    const user = new User();
    service.findById(id).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(user);
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('check save', () => {
    const user = new User();
    service.create(user).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(user);
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/create`);
    expect(req.request.method).toBe('POST');
    req.flush(user);
  });

  it('check update', () => {
    const user = new User();
    user.id = 1;
    service.update(user).subscribe(
      (res) => {
        expect(res).toBeTruthy();
        expect(res).toBe(user);
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/update/${user.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(user);
  });

  it('check changeLanguage', () => {
    const lang = 'es';
    service.changeLanguage(lang).subscribe(
      (res) => {
        expect(res).toBeTrue();
      }
    );
    const req = httpMock.expectOne(`${environment.urlApi}/users/lang/${lang}`);
    expect(req.request.method).toBe('HEAD');
    req.flush(true);
  });

});
