import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component'

const routes: Routes = [
//   {
//   path: "",
//   redirectTo: "employee",
//   pathMatch: "full"
// },
// {
//   path: "employee",
//   children: [
//     {
//       path: "",
//       component: DataTableComponent
//     }
//     // ,{
//     //   path: "add",
//     //   component: AddEmployeeComponent
//     // }
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
