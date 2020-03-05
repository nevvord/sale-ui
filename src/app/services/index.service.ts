import { IData } from './interfaces/IData';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private _URL: any = "http://localhost:3012/api/secret"

  constructor( private http: HttpClient ) { }

  getData(): Observable<IData>{
    return this.http.get<IData>(this._URL)
  }
}
