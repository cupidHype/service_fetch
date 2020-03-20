export class EmployeeHeader {

  private _main:Array<{key, display}> = [
      {key:"id", display:"ID."},
      {key:"title", display:"Title"}
  ]

  private _child:Array<{key, display}> = [
    {key:"age", display:"Age"},
    {key:"sex", display:"Sex"}
]


  private _first:{main} = {
    main: ["handler"]
  }

  private _last:{main} = {
    main: ["act"]
  }


  public main:any;
  public mainHeaderRow:any;

  public child:any;
  public childHeaderRow:any;

  constructor() {
      this.main = Object.assign([], this._main);
      this.child = Object.assign([],this._child);

      let mainHeaderRows:string[] = [];
      this._main.forEach(obj => {
          mainHeaderRows.push(obj.key)
      })

      let childHeaderRows:string[] = [];
      this._child.forEach(obj => {
        childHeaderRows.push(obj.key)
      })

      this.mainHeaderRow = [...this._first.main,...mainHeaderRows,...this._last.main];
      this.childHeaderRow = [...childHeaderRows];
  }
}