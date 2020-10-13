import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ApiService } from '../../../services/api/api.service';
import { ProductI } from '../../../models/products.interface';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @Input() product: ProductI;

  editForm: FormGroup;

  constructor(
    private api: ApiService, 
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit(): void {
    this.getToken();
    //this.formControlValueChanged();
    /*console.log(this.editForm.untouched);*/
  }

  private getToken(){
    let token = localStorage.getItem('token');
    /*this.editForm.setValue({
      "id": this.product.id,
      "name": this.product.name,
      "price": this.product.price,
      "token": token
    })*/
    this.editForm = this.formBuilder.group({
      id: [this.product.id, Validators.required],
      name: [this.product.name, Validators.required],
      price: [this.product.price, Validators.required],
      token: [token, Validators.required],
    })
  }

  editProduct(){
    console.log(this.editForm.value.price);
    console.log(this.product.price);
    if(this.editForm.value.name == this.product.name && this.editForm.value.price == this.product.price){
      this.activeModal.close();
    }else{
      this.api.putProduct(this.editForm.value).subscribe( data =>{
        this.activeModal.close(data.result);
      })
    }
  }
}
