import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../../services/api/api.service';
import { ProductI } from '../../../models/products.interface';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postForm: FormGroup;

  constructor(
    private api: ApiService, 
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.getToken();
  }

  private getToken(){
    let token = localStorage.getItem('token');
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      token: [token, Validators.required],
     /* name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      token: new FormControl('', Validators.required)*/
    })
    /*this.postForm.setValue({
      "name": '',
      "price": '',
      "token": token
    })*/
  }

  postProduct(){
    if (this.postForm.invalid) {
      console.log('gg');
      return;
    }else{
      this.api.postProduct(this.postForm.value).subscribe( data =>{
        this.activeModal.close(data.result);
      })
    }
   }

}
