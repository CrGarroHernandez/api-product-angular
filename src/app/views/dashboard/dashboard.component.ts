import { Component, OnInit } from '@angular/core';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../services/api/api.service';
import { AlertsService } from '../../services/alerts/alerts.service';
import { ProductI } from '../../models/products.interface';

import { Router } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { PostComponent } from './post/post.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  closeResult = '';

  products:ProductI;
  modalStatus: string = "";
  
  constructor(
    private api: ApiService, 
    private router: Router, 
    private modalService: NgbModal,
    private alert: AlertsService
    ) { }

  ngOnInit(): void {
    this.checkToken();

    this.api.getAllProduct().subscribe(data => {
      this.products = data;
      console.log(this.products);
    })
  }

  checkToken(){
    let token = localStorage.getItem("token");
    if(!token){
      this.router.navigate(['login']);
    }  
  }

  /*editProduct(product: ProductI){
    this.api.putProduct(product).subscribe( data =>{
      if(data.result.code == "200"){
        this.ngOnInit();
      }else{
        console.log('no entre naaa');
        this.modalStatus = "modal";
      }
    })
  }*/

  confirmPost(){
    const modalRef = this.modalService.open(PostComponent);

    modalRef.result.then((result) => {
      if (result.status == "Ok") {
        this.alert.showSuccess(result.msg);
        this.ngOnInit();
      }else if(result.status == "Error"){
        this.alert.showError(result.msg);
      }
    });
  }

  confirmUpdate(product:ProductI) {
    const modalRef = this.modalService.open(EditComponent);
    modalRef.componentInstance.product = product;

    modalRef.result.then((result) => {
      if(result){
        if (result.status == "Ok") {
          this.alert.showSuccess(result.msg);
          this.ngOnInit();
        }else if(result.status == "Error"){
          this.alert.showError(result.msg);
        }
      }      
    });
  }

  confirmDelete(product:ProductI) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.product = product;

    modalRef.result.then((result) => {
      if (result.status == "Ok") {
        this.alert.showSuccess(result.msg);
        this.ngOnInit();
      }else if(result.status == "Error"){
        this.alert.showError(result.msg);
      }
    });
  }


}
