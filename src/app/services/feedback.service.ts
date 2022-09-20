import { Injectable } from "@angular/core";
import Swal, { SweetAlertResult } from "sweetalert2";


@Injectable({
    providedIn: "root"
})
export class FeedBackService {

    constructor() {}

    success(): Promise<SweetAlertResult<any>> {
        return Swal.fire({
            icon: 'success',
            title: "Registro guardado exitosamente",
            showConfirmButton: false,
        });
    }

    error(errorMessage: string | null): Promise<SweetAlertResult<any>> {
        const message = (errorMessage === null) 
            ? "Oops, ha ocurrido un error"
            : errorMessage;

        return Swal.fire({
            icon: 'warning',
            title: message,
            showConfirmButton: false,
        });
    }

}