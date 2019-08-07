import { Injectable } from '@angular/core';
import j from './mock.json';

export interface TodoInterfaceMock {
  uid: string;
  title: string;
  text: string;
  bookmark: boolean;
  done: boolean;
}

export const todosOfListMock: TodoInterfaceMock[] = j

@Injectable({
  providedIn: 'root'
})
export class ListTodoService {
  constructor() { }

  getAll() {
    return todosOfListMock
  }
}