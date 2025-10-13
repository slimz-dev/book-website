import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string) {
    console.log(this.toastr.success);
    this.toastr.success(message);
  }

  showError(message: string, title?: string) {
    this.toastr.error(message, title, {
      timeOut: 4000,
      positionClass: 'toast-top-center',
      progressBar: true,
      progressAnimation: 'increasing',
      extendedTimeOut: 2000,
    });
  }

  showInfo(message: string) {
    this.toastr.info(message);
  }

  showWarning(message: string) {
    this.toastr.warning(message);
  }
}
