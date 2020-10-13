import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

import { ApiService } from '../../services/api/api.service';

import { LoginI } from '../../models/login.interface';
import { ResponseI } from '../../models/response.interface';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  errorStatus: boolean = false;
  msg: string = "";

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.checkToken();
  }

  checkToken(){
    let token = localStorage.getItem("token");
    if(token){
      console.log(token);
      this.router.navigate(['dashboard']);
    }else{
      console.log("no hay token");
    }    
  }

  onLogin(form:LoginI){
    this.api.loginByEmail(form).subscribe(data =>{
      let response: ResponseI = data;
      console.log(response.result);
      if(response.result.code == "200"){
        localStorage.setItem('token', response.result.msg);
        this.router.navigate(['dashboard']);
      }else{
        this.msg = response.result.msg
        this.errorStatus = true;
      }
    });
  }

}
