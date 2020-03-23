import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/posts'
  post: any;
  constructor(private http: HttpClient) {}
  private handleError;
  getEmployees():Observable<any>{
    return this.http.get<any>(this.ROOT_URL);
  }

  saveTodo():Observable<any> {
    return this.http.post<any>(this.ROOT_URL, JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    {
      headers: new HttpHeaders({
        "Content-type": "application/json; charset=UTF-8"
      })
    }).pipe(catchError(this.handleError))
  }

  deleteTodo():Observable<void>{
    console.log('here at deleteTodo')
    return this.http.delete<void>('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(catchError(this.handleError))
  }

}
