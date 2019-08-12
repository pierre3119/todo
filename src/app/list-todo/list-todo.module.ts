import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material-module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ListTodoComponent } from './list-todo/list-todo.component';
import { ListTodoEffect } from './list-todo/list-todo.effect';
import { PopupTodoComponent } from './popup-todo/popup-todo.component';
import { PopupTodoComponentDialog } from './popup-todo/popup-dialog-detail/popup-todo.component-dialog';

import { listTodosReducer } from './list-todo.reducer';
import { AppRoutingModule } from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    AppRoutingModule,
    StoreModule.forRoot({ todosOfList: listTodosReducer }),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([ListTodoEffect])
  ],
  declarations: [
    ListTodoComponent,
    PopupTodoComponent,
    PopupTodoComponentDialog
  ],
  exports: [
    FormsModule,
    ListTodoComponent
  ],
  entryComponents: [
    PopupTodoComponentDialog
  ]
})

export class ListTodoModule { }
