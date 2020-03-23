export class EmployeeHeader {

  private _todo:Array<{key, display}> = [
      {key:"id", display:"ID."},
      {key:"title", display:"Title"}
  ]

  private _main:Array<{key, display}> = [
    {key:"id", display:"ID."},
    {key:"fn", display:"First name"},
    {key:"ln", display:"Last name"},
    {key:"pos", display:"Position"}
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

  private _firstTodo:{todo} = {
    todo: ["handler"]
  }

  private _lastTodo:{todo} = {
    todo: ["act"]
  }


  public main:any;
  public mainHeaderRow:any;

  public todo:any;
  public todoHeaderRow:any;

  public child:any;
  public childHeaderRow:any;

  constructor() {
      this.main = Object.assign([], this._main);
      this.child = Object.assign([],this._child);
      this.todo = Object.assign([], this._todo);

      let mainHeaderRows:string[] = [];
      this._main.forEach(obj => {
          mainHeaderRows.push(obj.key)
      })

      let childHeaderRows:string[] = [];
      this._child.forEach(obj => {
        childHeaderRows.push(obj.key)
      })

      let todoHeaderRows:string[] = [];
      this._todo.forEach(obj => {
          todoHeaderRows.push(obj.key)
      })

      this.mainHeaderRow = [...this._first.main,...mainHeaderRows,...this._last.main];
      this.childHeaderRow = [...childHeaderRows];
      this.todoHeaderRow = [...this._firstTodo.todo,...todoHeaderRows,...this._lastTodo.todo];
  }
}