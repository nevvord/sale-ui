import { SignInResultat } from './interfaces/SignInResultat';
import { SignUpResultat } from './interfaces/SignUpResultat';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _SignUpURL: any = "http://localhost:3012/auth/registration"
  private _SignInURL: any = "http://localhost:3012/auth/login"
  constructor(private http: HttpClient, private _router: Router) { }

  signUp(user): Observable<SignUpResultat> {
    return this.http.post<SignUpResultat>(this._SignUpURL, user)
  }
  signIn(formData): Observable<SignInResultat> {
    return this.http.post<SignInResultat>(this._SignInURL, formData)
  }
  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }
}