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
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
    
    this.employeeService
    .getEmployees()
    .subscribe((data) => {
      
      this.apiData = data//[JSON.stringify(data)]
      setTimeout (() => {
        this.apiData.sort = this.sort;
        this.apiData.paginator = this.paginator;
      })
      return data;
    })
  }

  saveFromService(req){
    this.employeeService
    .saveTodo(req)
    .subscribe((data) => {
      this.apiData = [...this.apiData, ...[data]];

    },
    (error: any) => {
      console.log('====errrooor on saving==',error)
    })
  }

  deleteFromService(id){
    this.employeeService
    .deleteTodo(id)
    .subscribe((data) => {
      let filtered = this.apiData.filter(data => data.id !== id);
      this.apiData = [...filtered]

    },
    (error: any) => {
      console.log("error on deleting -",error)
      return error;
    })
  }

  setDatasource(datasource) {
    this.dataSource = new CustomDataSource(datasource);
  }

  onSubmit() {
    let data = this.registrationForm.value;
    data.userId = 1
    this.registrationForm.reset();
    this.saveFromService(data)
    return this.popups.savePop()
  }

  editData(id) {
    
    this.employeeService
    .pickTodo(id)
    .subscribe((datas) => {
      let filtered = this.apiData.filter(data => data.id === id);
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
    },
    (error: any) => {
      console.log("error on deleting -",error)
      return error;
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
        
        let picked = this.apiData.find(data => data.id === id);
        picked.title = this.registrationForm.value.title;
        picked.body = this.registrationForm.value.body;
        let index = this.apiData.findIndex((data) => data.id === id)
        let updatedData = this.apiData[index]
        this.apiData[index].title = this.registrationForm.value.title;
        this.apiData[index].body = this.registrationForm.value.body;
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
