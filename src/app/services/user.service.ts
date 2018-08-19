import { Injectable } from '@angular/core';

import { User } from '../lib/user';
//import { url } from 'inspector';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  private userUrl = 'http://localhost:3000/user';  // URL to web api

 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };


getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.userUrl);
}

getUser(email, password):Observable<any>{
console.log(email,password);
console.log(email,password);

  return this.http.get(this.userUrl+"/"+email+"/"+password)
    .pipe(
      catchError(this.handleError)
    );
}

login(email: string, password: string) :Observable<any>  {
  return this.http.get(this.userUrl+"/"+email+"/"+password)
      .pipe( 

        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              sessionStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
      }),
      catchError(this.handleError)
    
    );
}


postUser(user: User): Observable<any> {
  return this.http.post(this.userUrl, user)
    .pipe(
      catchError(this.handleError)
    );
}

updateUser(user :User): Observable<any> {
  return this.http.put(this.userUrl+"/"+user._id,user)
    .pipe(
      catchError(this.handleError)
    );
}
}