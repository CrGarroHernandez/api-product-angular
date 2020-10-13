import { Component, OnInit, Input } from '@angular/core';

import { ApiService } from '../../../services/api/api.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() product;

  constructor(
    private api: ApiService, 
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  checkToken(){
    let token = localStorage.getItem("token");
  }

  deleteProduct(){
    console.log(this.product);
    this.api.deleteProduct(this.product).subscribe(data => {
        this.activeModal.close(data.result);
    })
  }
}
