import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material-module'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ListTodoComponent } from './list-todo/list-todo.component';
import { ListTodoEffect } from './list-todo/list-todo.effect';

import { listTodosReducer } from './list-todo.reducer';
import { AppRoutingModule } from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ todosOfList: listTodosReducer }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ListTodoEffect])
  ],
  declarations: [
    ListTodoComponent
  ],
  exports: [
    FormsModule,
    ListTodoComponent
  ]
})

export class ListTodoModule { }