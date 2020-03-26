import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor() {}

  public deletePop(): any {
    return Swal.fire({
      title: "WARNING",
      text: "Are you sure you want to remove this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    });
  }

  public editPop(): any {
    return Swal.fire({
      title: "CONFIRM",
      text: "Are you sure you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    });
  }

  public savePop(): any {
    return Swal.fire({
      title: "SUCCESS",
      text: "Successfully added.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Okay"
    });
  }
}
