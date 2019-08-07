import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PopupTodoComponent } from './list-todo/popup-todo/popup-todo.component';

const routes: Routes = [
  { path: 'todo/new', component: PopupTodoComponent,  },
  { path: 'todo/:uid', component: PopupTodoComponent,  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }