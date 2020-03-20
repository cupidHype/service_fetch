import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/posts/1'
  post: any;
  constructor(private http: HttpClient) {}

  getEmployees():Observable<any>{
    return this.http.get<any>(this.ROOT_URL);
  }

}
