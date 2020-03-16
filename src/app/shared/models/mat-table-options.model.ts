
export class MatTableOptions {
  pageSize:number = 2;
  pageSizeOptions:Array<number> = [2,5,20,100];
  showFirstLastButtons:boolean = true;

  constructor({pageSize=null, pageSizeOptions=null, showFirstLastButtons=null}) {
      if(pageSizeOptions != null) this.pageSizeOptions = pageSizeOptions;
      
      if(pageSize != null && this.pageSizeOptions.indexOf(pageSize) != -1) this.pageSize = pageSize;

      if(showFirstLastButtons != null) this.showFirstLastButtons = showFirstLastButtons;
  }

}