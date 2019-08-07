import { Action } from '@ngrx/store';
import { ActionTypes } from './list-todo.actions';
import { TodoInterface, todosOfList } from './list-todo/list-todo.component'
import * as uuid from 'uuid';

export function listTodosReducer(state = todosOfList, action: Action) {
    switch (action.type) {
        case ActionTypes.Create:
            const newTodo: TodoInterface = {
                uid: action['uid']?action['uid']:new Date().getTime(),
                text: action['text'],
                title: action['title'],
                bookmark: false,
                done: false
            }
            
            state.unshift(newTodo)
            return state;

        case ActionTypes.Edit:
            state.forEach(item => {
                if (item['uid'] == action['uid']) {
                    item['text'] = action['text']
                    item['title'] = action['title']
                }
            })
            return state;

        case ActionTypes.Delete:
            return state.filter(item => item['uid'] !== action['uid'])

        case ActionTypes.SetDone:
            state.forEach(item => {
                if (item['uid'] == action['uid']) {
                    item['done'] = !item['done']
                }
            })
            return state;

        case ActionTypes.SetBookmark:
            state.forEach(item => {
                if (item['uid'] == action['uid']) {
                    item['bookmark'] = !item['bookmark']
                }
            })
            return state;

        case ActionTypes.Load:
            return state;
        default:
            return state;
    }
}