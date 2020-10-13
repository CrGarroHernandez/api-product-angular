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
      name: [this.product.name, Validators.compose([Validators.required, this.customValidationName()])],
      price: [this.product.price,Validators.compose([Validators.required, this.customValidationName()])],
      token: [token, Validators.required],
    })
  }

  editProduct(){
    console.log(this.editForm.value.name);
    console.log(this.product.name);
    /*if(){
      this.editForm.valid;
    }else{

      this.api.putProduct(this.editForm.value).subscribe( data =>{
        this.activeModal.close(data.result);
      })
    }*/
  }

  customValidationName(){
    return (control: AbstractControl):{[key: string]: boolean} | null => {
      console.log(control.parent);

      const formGroup = control.parent;
      if(formGroup.controls != null){
        console.log(formGroup.controls);
      }


        if(this.product.name == control.value){
          return {'customValidationName': true, 'customValidationPrice': true}
        }
      return null;
    };
  }

  customValidationPrice(){
    return (control: AbstractControl):{[key: string]: boolean} | null => {
        if(this.product.price == control.value){
          return {'customValidationPrice': true, 'customValidationName': true}
        }
      return null;
    };
  }
}
