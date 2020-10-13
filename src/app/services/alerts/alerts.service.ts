import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private toastr: ToastrService) { }

  showSuccess(title: string) {
      this.toastr.success("", title, {
        closeButton: true,
        positionClass: 'toast-top-center',
        timeOut: 3000,
        progressBar: true,
        progressAnimation: 'decreasing'
      });
    }

  showError(title: string) {
    this.toastr.error("", title, {
      closeButton: true,
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }
}
