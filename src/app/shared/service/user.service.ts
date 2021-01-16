
import { User } from './../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://locahlost:3000/users';
  constructor(private http: HttpClient) { }


  private log(log: string){
    console.info(log);
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError<T>(operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed : ${error.message}`);

      return of(result as T);
    };
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl)
    .pipe(
      tap(
        _ => this.log('fetch users')
      ),
      catchError(this.handleError(`get Users`, []))
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, this.httpOptions).pipe(
      tap((newUser: User) => this.log(`added user w/ id=${newUser.id}`)),
      catchError(this.handleError<User>('addUser'))
    )
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.baseUrl, user, this.httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.baseUrl}/${id}`;

    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('delete User'))
    );
  }






}
