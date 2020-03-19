import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { forbiddenNameValidator } from "./shared/user-name.validator";
import { PasswordValidator } from "./shared/password.validator";
import { CustomDataSource } from "./shared/models/custom-datasource.model";
import { MatTableOptions } from "./shared/models/mat-table-options.model";
import { EmployeeHeader } from "./shared/table-headers/employee.header";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
// import { MatSort } from '@angular/material/sort';
// import {MatPaginator} from '@angular/material/paginator';
import { MatPaginator, MatSort } from "@angular/material";
export interface PeriodicElement {
  id: string;
  fn: string;
  ln: string;
  pos: string;
}
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
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
export class AppComponent implements OnInit {
  // @ViewChild('partsDataSourceSort', {static: false}) partsDataSourceSort: MatSort;
  // @ViewChild('mainDataSourceSort', {static: false}) mainDataSourceSort: MatSort;
  // @ViewChild('StationCapSimMetricPaginator', {static: true}) StationCapSimMetricPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ELEMENT_HEADER: EmployeeHeader = new EmployeeHeader();
  header = "Registration";
  title = "reactive-form";
  isEditing = false;
  displayedColumns: string[] = ["id", "fn", "ln", "pos", "act"];
  position = ["Developer", "HR", "Graphic Artist", "Front End Dev"];
  sex = ["Female", "Male"];
  selected = { id: "", fn: "", ln: "", pos: "", age: 0, sex: "" };
  openedParts: any;
  childDataSource: any;
  mainDataSource: any;
  dataSource: CustomDataSource = new CustomDataSource([]);
  matTableOptions: MatTableOptions = new MatTableOptions({});
  // get userName(){
  //   return this.registrationForm.get('userName');
  // }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.mainDataSourceSort;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.dataSource.paginator = this.StationCapSimMetricPaginator;
    this.setTableDataSource([]);
  }

  setTableDataSource(datasource): void {
    datasource = JSON.parse(JSON.stringify(datasource));
    let data = [];
    setTimeout(() => {
      datasource.map(element => {
        let length = element;

        while (length != 0) {
          data.push(element);
          length--;
        }
        this.setDatasource(data);
      });
    });
  }

  setDatasource(datasource) {
    this.dataSource = new CustomDataSource(datasource);
    // setTimeout(() => {
    // this.dataSource.sort = this.mainDataSourceSort;
    // this.dataSource.paginator = this.StationCapSimMetricPaginator;
    // })
  }

  idGenerate() {
    let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    let arrCount = Math.floor(Math.random() * 10) + 8;
    let i;
    let id = "";
    for (i = 0; i <= arrCount; i++) {
      if (Math.floor(Math.random() * 2) === 0) {
        id += number[Math.floor(Math.random() * 10)];
      } else {
        id += alpha[Math.floor(Math.random() * 10)];
      }
    }
    return id;
  }

  onSubmit() {
    let data = this.registrationForm.value;
    const id = this.idGenerate();
    data.id = id;
    this.registrationForm.reset();
    this.dataSource.addData(data);
  }

  editData(_id) {
    let filtered = this.dataSource.data.filter(data => data.id === _id);
    this.isEditing = true;
    this.selected.id = filtered[0].id;
    this.selected.fn = filtered[0].fn;
    this.selected.ln = filtered[0].ln;
    this.selected.pos = filtered[0].pos;
    this.selected.sex = filtered[0].details.sex;
    this.selected.age = filtered[0].details.age;
    this.header = "Edit";
    this.registrationForm.patchValue({
      fn: this.selected.fn,
      ln: this.selected.ln,
      pos: this.selected.pos,
      details: {
        sex: this.selected.sex,
        age: this.selected.age
      }
    });
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
    let index = this.dataSource.data.find(data => data.id === id);
    index.fn = this.registrationForm.value.fn;
    index.ln = this.registrationForm.value.ln;
    index.pos = this.registrationForm.value.pos;
    index.details = this.registrationForm.value.details;
    this.dataSource.addSpecific({ _id: id, updatedData: index });
    this.registrationForm.reset();
    this.header = "Registration";
    this.isEditing = false;
    this.openedParts = null;
  }

  cancel() {
    this.registrationForm.reset();
    this.header = "Registration";
    this.isEditing = false;
  }

  terminate(id) {
    let filtered = this.dataSource.data.filter(data => data.id !== id);
    this.dataSource.updateData(filtered);
  }
  constructor(private fb: FormBuilder) {}

  registrationForm = this.fb.group({
    // userName: ['',[Validators.required, Validators.minLength(2), forbiddenNameValidator(/password/)]],
    // password: [''],
    // confirmPassword: ['']
    fn: [""],
    ln: [""],
    pos: [""],
    details: this.fb.group({
      age: [""],
      sex: [""]
    })
  }); // ,{validator: PasswordValidator})

  loadApiData() {
    this.registrationForm.patchValue({
      userName: "",
      password: "",
      confirmPassword: ""
    });
  }
}
