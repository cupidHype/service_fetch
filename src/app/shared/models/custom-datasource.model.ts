// material
import { MatTableDataSource } from '@angular/material/table';

export class CustomDataSource extends MatTableDataSource<any> {
  // data = [
  //   { id: '1', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '2', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '3', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '4', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '5', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '6', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '7', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} },
  //   { id: '8', fn: '1', ln: '1',pos: 'Developer',details: {age: 11, sex: 'Male'} }
  // ]

    updateData(data) {
        this.data = [...data];
    }

    addSpecific(newData){
      let index = this.data.findIndex((data) => data.id === newData._id)
      let updatedData = this.data[index]
      updatedData = newData.updateData
    }

    addData(data) {
      this.data = [...this.data, ...[data]];
    }
  
}