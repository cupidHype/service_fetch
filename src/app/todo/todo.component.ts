import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { CustomDataSource } from "../shared/models/custom-datasource.model";
import { MatTableOptions } from "../shared/models/mat-table-options.model";
import { EmployeeHeader } from "../shared/table-headers/employee.header";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { EmployeeService } from '../../app/employee.service'
import { UtilService } from '../../app/util.service'
import { MatPaginator, MatSort } from "@angular/material";
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", visibility: "hidden" })
      ),
      state("expanded", style({ height: "*", visibility: "visible" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class TodoComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  ELEMENT_HEADER: EmployeeHeader = new EmployeeHeader();
  header = "Registration";
  title = "reactive-form";
  isEditing = false;
  selected = { id: 0, title: "", body: ""};
  openedParts: any;
  childDataSource: any;
  mainDataSource: any;
  dataSource:CustomDataSource = new CustomDataSource([]);
  matTableOptions: MatTableOptions = new MatTableOptions({});
  apiData;

  public loading = false;


  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService,
    private popups: UtilService
    ) {}

  ngOnInit() {
   this.getFromService()
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
  }

  getFromService(){
    this.loading = true;
    this.employeeService
    .getEmployees()
    .subscribe((data) => {
      
      this.apiData = new CustomDataSource(data)//[JSON.stringify(data)]
      setTimeout (() => {
        this.apiData.sort = this.sort;
        this.apiData.paginator = this.paginator;
      })
      this.loading = false;
      return data;
    })
  }

  saveFromService(req){
    this.employeeService
    .saveTodo(req)
    .subscribe((data) => {
      try{
        this.apiData.data = [...this.apiData.data, ...[data]];
        this.loading = false;
        return this.popups.savePop()
      }catch(error){
        this.loading = false;
        console.log('====errrooor on saving==',error)
        return this.popups.errorPop()
      }
    },
    (error: any) => {
      this.loading = false;
      console.log('====errrooor on saving==',error)
      return this.popups.errorPop()
    })
  }

  deleteFromService(id){

    this.loading = true;
    this.employeeService
    .deleteTodo(id)
    .subscribe((data) => {
      try{
        let filtered = this.apiData.data.filter(data => data.id !== id);
        this.apiData.data = [...filtered]
        this.loading = false;
      }catch(error){
        this.loading = false;
        console.log('====errrooor on saving==',error)
        return this.popups.errorPop()
      }
    },
    (error: any) => {
      this.loading = false;
      console.log('====errrooor on saving==',error)
      return this.popups.errorPop()
    })
  }

  setDatasource(datasource) {
    this.dataSource = new CustomDataSource(datasource);
  }

  onSubmit() {
    this.loading = true;
    let data = this.registrationForm.value;
    data.userId = 1
    this.registrationForm.reset();
    this.saveFromService(data)
    
  }

  editData(id) {
    this.loading = true;
    this.employeeService
    .pickTodo(id)
    .subscribe((datas) => {
      try{
        let filtered = this.apiData.data.filter(data => data.id === id);
        this.isEditing = true;
        this.header = "Edit";
        // this.apiData = [...filtered]
        this.selected.id = filtered[0].id;
        this.selected.title = filtered[0].title;
        this.selected.body = filtered[0].body;
  
        this.registrationForm.patchValue({
          title: this.selected.title,
          body: this.selected.body
        });
        this.loading = false;
      }catch(error){
        this.loading = false;
        console.log('====errrooor on saving==',error)
        return this.popups.errorPop()
      }
    },
    (error: any) => {
      this.loading = false;
      console.log('====errrooor on saving==',error)
      return this.popups.errorPop()
    })
  }

  openParts(evt, row) {
    let openedParts = this.openedParts === row ? null : row;

    if (openedParts) {
      let parts = JSON.parse(JSON.stringify(row.details));
      this.openedParts = openedParts;
      this.childDataSource = new CustomDataSource([parts]);
      setTimeout(() => {
        // this.childDataSource.sort = this.partsDataSourceSort;
      });
    } else {
      this.openedParts = null;
    }
  }

  saveEdit(id) {
    return this.popups.editPop().then((result) => {
      if (result.value) {
        
        let picked = this.apiData.data.find(data => data.id === id);
        picked.title = this.registrationForm.value.title;
        picked.body = this.registrationForm.value.body;
        let index = this.apiData.data.findIndex((data) => data.id === id)
        this.apiData.data[index].title = this.registrationForm.value.title;
        this.apiData.data[index].body = this.registrationForm.value.body;
        this.registrationForm.reset();
        this.header = "Registration";
        this.isEditing = false;
        this.openedParts = null;
      }
    })
  }

  cancel() {
    this.registrationForm.reset();
    this.header = "Registration";
    this.isEditing = false;
  }

  terminate(id) {
    return this.popups.deletePop().then((result) => {
      if (result.value) {
        this.deleteFromService(id)
      }
    })
    // this.deleteFromService(id)

  }
 

  registrationForm = this.fb.group({
    // userName: ['',[Validators.required, Validators.minLength(2), forbiddenNameValidator(/password/)]],
    // password: [''],
    // confirmPassword: ['']
    title: [""],
    body: [""],
    userId: ["1"]
  }); // ,{validator: PasswordValidator})

}
