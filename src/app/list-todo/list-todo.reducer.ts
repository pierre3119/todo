import { Action } from '@ngrx/store';
import { ActionTypes } from './list-todo.actions';
import { TodoInterface, todosOfList } from './list-todo/list-todo.component';

export function listTodosReducer(state = todosOfList, action: Action) {
    switch (action.type) {
        case ActionTypes.Create:
            const newTodo: TodoInterface = {
                uid: action['uid'] ? action['uid'] : new Date().getTime(),
                text: action['text'],
                title: action['title'],
                bookmark: false,
                done: false
            };

            if (!state[newTodo.uid]) {
                state[newTodo.uid] = newTodo;
            }
            return state;

        case ActionTypes.Edit:
            state[action['uid']].text = action['text'];
            state[action['uid']].title = action['title'];
            return state;

        case ActionTypes.Delete:
            delete state[action['uid']];
            return state;

        case ActionTypes.SetDone:
            state[action['uid']].done = !state[action['uid']].done;
            return state;

        case ActionTypes.SetBookmark:
            state[action['uid']].bookmark = !state[action['uid']].bookmark;
            return state;

        case ActionTypes.Load:
            return state;
        default:
            return state;
    }
}
