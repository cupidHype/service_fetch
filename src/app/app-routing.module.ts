import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table/data-table.component'
import { EmployeeComponent } from './employee/employee.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'employee',
    component: EmployeeComponent
  },
  { path: 'todo',
    component: TodoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [EmployeeComponent, TodoComponent]
