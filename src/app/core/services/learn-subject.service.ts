import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LearnSubject } from '../models/learn-subject';

@Injectable({
  providedIn: 'root'
})
export class LearnSubjectService {
  private url = `${environment.urlApi}/learnSubjects`;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  private static getHttpOptions(responseType: string = 'json'): unknown {
    return {
      responseType,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: localStorage.authorization,
      })
    };
  }

  create(id: number, learnSubjects: LearnSubject[]): Observable<LearnSubject[]> {
    return this.httpClient.post<LearnSubject[]>(`${this.url}/create/${id}`,
      learnSubjects, LearnSubjectService.getHttpOptions());
  }

  findTeachersBySubjectId(id: number): Observable<User[]> {
    return this.httpClient.get<User[]>(
      `${this.url}/subject/${id}`, LearnSubjectService.getHttpOptions());
  }
}