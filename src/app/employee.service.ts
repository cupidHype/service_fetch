import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly ROOT_URL = '/posts'
  post: any;

  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
        'Authorization': '*'
    })
  };

  constructor(private http: HttpClient) {}
  private handleError;
  getEmployees():Observable<any>{
    return this.http.get<any>(this.ROOT_URL);
  }

  saveTodo(req):Observable<any> {
    return this.http.post<any>(this.ROOT_URL,req,this.httpOptions).pipe(catchError(this.handleError))
  }

  deleteTodo(id):Observable<void>{
    return this.http.delete<void>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError(this.handleError))
  }

  pickTodo(id):Observable<void>{
    return this.http.get<void>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError(this.handleError))
  }

}
