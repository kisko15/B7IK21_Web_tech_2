import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Products } from '../model/Products';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public setLoggedIn(setLogIn: boolean) {
    this.loggedIn.next(setLogIn);
  }

  // Node/Express API
  REST_API: string = 'http://localhost:8080/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Add
  addProducts(data: Products): Observable<any> {
    let API_URL = `${this.REST_API}/add-products`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Get all objects
  getProducts() {
    let API_URL = `${this.REST_API}/read-products`;
    return this.httpClient.get(API_URL);
  }
 
  // Get single object
  getProduct(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-products/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
 
  // Update
  updateProduct(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-products/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Delete
  deleteProducts(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-products/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders})
      .pipe(
        catchError(this.handleError)
      )
  }

  // Create User
  createNewUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Login User
  userLogin(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get data
  getProtectedData(): Observable<any> {
    let API_URL = `${this.REST_API}/data`;
    return this.httpClient.get(API_URL);
  } 
 
  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
