import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StorageService } from '../storage/storage.service';


const BASIC_URL = 'http://localhost:8085/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  constructor(private http :HttpClient) { }

  registerUser(signuprequest: any): Observable<any> {
    //delete signuprequest.checkPassword; // delete checkPassword from the request
    return this.http.post<[]>(BASIC_URL + 'api/auth/signup', signuprequest);
  }

  login(username: string, password: string) {
    const headers = { 'content-type': 'application/json'}
    const loginRequest = { username, password };
    return this.http.post<[]>(BASIC_URL + 'api/auth/login', loginRequest,{headers:headers,observe:'response'}).pipe(map((res:any) => {
      console.log("Login server response: \n");
      console.log(res);
      const token = res.headers.get('Authorization').split(' ')[1];
      
      const bodyRes = res.body;
      const data = bodyRes.corps.data;
      const arrayAuthorities = [];
      
      if(token && data.username){
        for (let i = 0; i < data.authorities.length; i++) {
          let authority = data.authorities[i].authority;
          arrayAuthorities.push(authority);
        }
        const user = {
          username: data.username,
          role: arrayAuthorities
        };
        StorageService.saveToken(token);
        StorageService.saveUser(user);
        return true;
      }
      return false;
      
    }));
  }
}
