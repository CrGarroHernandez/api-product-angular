import { Injectable } from '@angular/core';

import { LoginI } from '../../models/login.interface';
import { ProductI } from '../../models/products.interface';
import { ResponseI } from '../../models/response.interface';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost/api-test/";

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let address = this.url + "auth";
    return this.http.post<ResponseI>(address, form);
  }

  getAllProduct():Observable<ProductI>{
    let address = this.url + "product";
    return this.http.get<ProductI>(address);
  }

  getProduct(id):Observable<ProductI>{
    let address = this.url + "product?id=" + id;
    return this.http.get<ProductI>(address);
  }

  postProduct(form:ProductI):Observable<ResponseI>{
    let address = this.url + "product";
    return this.http.post<ResponseI>(address, form);
  }

  putProduct(form:ProductI):Observable<ResponseI>{
    let address = this.url + "product";
    return this.http.put<ResponseI>(address, form);
  }

  deleteProduct(form:ProductI):Observable<ResponseI>{
    let address = this.url + "product";
    let option = {
      headers: new HttpHeaders({
        "Content-Type": "applicacion/json",
        "Access-Control-Allow-Methods": "DELETE"
      }),
      body: form
    }
    return this.http.delete<ResponseI>(address, option);
  }
}
