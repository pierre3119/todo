import { Action } from '@ngrx/store';

export enum ActionTypes {
    Load = '[ListTodo Component] Load todos',
    Create = '[ListTodo Component] Create a todo',
    Edit = '[ListTodo Component] Edit a todo',
    Delete = '[ListTodo Component] Delete a todo',
    SetDone = '[ListTodo Component] Set done',
    SetBookmark = '[ListTodo Component] Set bookmarked'
}

export class Load implements Action {
    readonly type = ActionTypes.Load;
}
export class Create implements Action {
    readonly type = ActionTypes.Create;
    constructor(public text: string, public title: string, public uid?: string) { }
}
export class Edit implements Action {
    readonly type = ActionTypes.Edit;
    constructor(public uid: string, public text: string, public title: string) { }
}
export class Delete implements Action {
    readonly type = ActionTypes.Delete;
    constructor(public uid: string) { }
}
export class SetDone implements Action {
    readonly type = ActionTypes.SetDone;
    constructor(public uid: string) { }
}
export class SetBookmark implements Action {
    readonly type = ActionTypes.SetBookmark;
    constructor(public uid: string) { }
}
export type Actions = Load | Create | Edit | Delete | SetDone | SetBookmark;