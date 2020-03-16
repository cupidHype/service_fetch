// material
import { MatTableDataSource } from '@angular/material/table';

export class CustomDataSource extends MatTableDataSource<any> {
  data = [
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', },
    { id: '1', fn: '1', ln: '1',pos: 'Developer', }
  ]

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