import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private carpcurrentUserSubject: BehaviorSubject<UserModel>;
  public carpcurrentUser: Observable<UserModel>;
  // public TOKEN_NUMBER;

  constructor(private http: HttpClient) {
    this.carpcurrentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('carpcurrentUser')));
    this.carpcurrentUser = this.carpcurrentUserSubject.asObservable();
  }

  /** getter to get the current user information easily */
  public get carpcurrentUserValue(): UserModel {
    return this.carpcurrentUserSubject.value;
  }

     /** Method to get the localstorage item token into a local variable in order to be able to use it in the html */
  public get tokenUser() {
    return (localStorage.getItem('TOKEN_NUMBER')) ? localStorage.getItem('TOKEN_NUMBER') : null;
  }

/** This method presents the code to login or connect into the platform and have access to the full plateform courses
 * @param url: the url of api that implement the backend
 * @param dataL the user data credentials to be used in the process of the login.
 * @returns retun the user information to be set in the local storage
*/
  login(url: string, data): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiEndpoint}/${url}`, data);
  }

  /** With the token, I can get the user info and user role
    * to get these infos, I need the @url, and the @header containing (x-access-token:token)
    * @param url: the url of the api so the full route
    * @param token: the token from the user sent from the db in order to add it in the hader and get the verification done
  */
  getcurrentUserInfo(url: string, token): Observable<any[]> {
    // save the token number in the local storage for further use. You can get it everwhere in the app
    localStorage.setItem('TOKEN_NUMBER', token);
    /* let headers = {headers: {'x-access-token':token}}; <-- this is how you should set the header  along with the token given*/
    return this.http.get<any[]>(`${environment.apiEndpoint}/${url}`, {headers: {'x-access-token': token}});
  }

/**
 * This function provides the code to logout from the application.
 * It removes the user info [] from the local storage
 */
  logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('carpcurrentUser');
        localStorage.removeItem('TOKEN_NUMBER');
        this.carpcurrentUserSubject.next(null);
        console.log(`logoout of the app>>>`);
    }
}
