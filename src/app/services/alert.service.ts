import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(message: string): void {

    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
      confirmButtonText: 'OK'
    });

  }

  error(message: string): void {

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });

  }

  warning(message: string): void {

    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message
    });

  }

  info(message: string): void {

    Swal.fire({
      icon: 'info',
      title: 'Information',
      text: message
    });

  }

  async confirm(message: string): Promise<boolean> {

    const result =
      await Swal.fire({

        title: 'Confirmation',

        text: message,

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Yes',

        cancelButtonText: 'No'

      });

    return result.isConfirmed;

  }

}