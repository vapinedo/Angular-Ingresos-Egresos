import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";
import { ActiveToast, ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: "root"
})
export class FeedBackService {

    constructor(private toastr: ToastrService) { }

    success(message?: string): ActiveToast<any> {
        const msg = message ? message : 'Registro creado exitosamente!';
        return this.toastr.success(msg);
    }

    error(message: string): ActiveToast<any> {
        return this.toastr.error(message);
    }    

    confirmSwal() {
        return Swal.fire({
          title: '¿Está seguro?',
          text: "Estás a punto de eliminar un registro",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirmar'
        }); 
    } 

}