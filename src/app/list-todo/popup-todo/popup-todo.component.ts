import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionTypes } from '../list-todo.actions';
import { PopupData, PopupTodoComponentDialog } from './popup-dialog-detail/popup-todo.component-dialog';

export interface TodoInterface {
    uid: string;
    title: string;
    text: string;
    bookmark: boolean;
    done: boolean;
}
export const todosOfList: TodoInterface[] = [];

@Component({
    selector: 'app-popup-todo',
    templateUrl: './popup-todo.component.html',
    styleUrls: []
})
export class PopupTodoComponent implements OnInit {
    data: PopupData;
    todosOfList$: Observable<{}>;

    constructor(
        private store: Store<{ todosOfList: {} }>,
        private route: ActivatedRoute,
        private location: Location,
        public dialog: MatDialog
    ) {
        this.data = {
            uid: null,
            text: null,
            title: null
        };
    }

    ngOnInit(): void {
        this.todosOfList$ = this.store.pipe(select('todosOfList'));
        this.store.dispatch({ type: ActionTypes.Load });

        const uid = this.route.snapshot.paramMap.get('uid');

        if (uid) {
            this.getTodo(uid);
        }

        // see documentation github : https://github.com/angular/components/issues/5268
        setTimeout(() => {
            const dialogRef = this.dialog.open(PopupTodoComponentDialog, {
                width: '600px',
                data: {
                    uid: this.data.uid,
                    title: this.data.title,
                    text: this.data.text
                }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && !uid && result.title.length) {
                    this.store.dispatch({ type: ActionTypes.Create, text: result.text, title: result.title });
                } else if (result && uid && result.title.length) {
                    this.store.dispatch({ type: ActionTypes.Edit, uid: result.uid, text: result.text, title: result.title });
                }

                this.location.back();
            });
        });
    }

    getTodo(uid): void {
        if (uid) {
            this.store.select('todosOfList').pipe(
                map((todos) => todos[uid])
            ).subscribe(todo => { this.data = todo ? todo : null; });
        }
    }
}
