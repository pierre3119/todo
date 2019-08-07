import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ListTodoService } from './list-todo.service';
import { Observable } from 'rxjs';
import { ActionTypes, Create, Load, Delete, Edit, SetBookmark, SetDone } from '../list-todo.actions';
import { switchMap, map } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class ListTodoEffect {
  constructor(
    private actions$: Actions,
    private listTodoService: ListTodoService) { }

  @Effect()
  Load: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.Load),
    switchMap(() => {
      return this.listTodoService.getAll()
        .map((item) => {
          return new Create(item.text, item.title, item.uid)
        })

    })
  )

  @Effect({dispatch:false})
  SetBookmark: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.SetBookmark),
    map((payload: any) => {
      return new SetBookmark(payload.uid)
    })
  )
  
  @Effect({dispatch:false})
  SetDone: Observable<any> = this.actions$.pipe(
    ofType(ActionTypes.SetDone),
    map((payload: any) => {
      return new SetDone(payload.uid)
    })
  )
}