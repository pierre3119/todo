import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { ActionTypes, Load, Create, Edit, Delete, SetDone, SetBookmark } from '../list-todo.actions';
import { MatDialog } from "@angular/material";
import { PopupTodoComponent } from "../popup-todo/popup-todo.component";
import { ListTodoService } from "./list-todo.service"

export interface TodoInterface {
  uid: string;
  title: string;
  text: string;
  bookmark: boolean;
  done: boolean;
}
export const todosOfList: TodoInterface[] = []

@Component({
  selector: 'app-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.css']
})

export class ListTodoComponent {
  todosOfList$: Observable<TodoInterface[]>;
  titlelist = 'My List';

  constructor(private store: Store<{ todosOfList: TodoInterface[] }>, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.todosOfList$ = this.store.pipe(select('todosOfList'));
    this.store.dispatch({ type: ActionTypes.Load });
  }

  onDelete(uid) {
    this.store.dispatch({ type: ActionTypes.Delete, uid });
  }

  onDone(uid) {
    this.store.dispatch({ type: ActionTypes.SetDone, uid });
  }

  onBookmark(uid) {
    this.store.dispatch({ type: ActionTypes.SetBookmark, uid });
  }
}
