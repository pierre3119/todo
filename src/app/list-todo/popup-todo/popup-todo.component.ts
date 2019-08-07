import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { ActionTypes } from '../list-todo.actions'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

export interface PopupData {
    uid: string;
    text: string;
    title: string;
}

export interface TodoInterface {
    uid: string;
    title: string;
    text: string;
    bookmark: boolean;
    done: boolean;
}
export const todosOfList: TodoInterface[] = []

@Component({
    selector: 'app-popup-todo-dialog',
    templateUrl: './popup-todo.component-dialog.html',
    styleUrls: ['./popup-todo.component.css']
})
export class PopupTodoComponentDialog {
    todoForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<PopupTodoComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: PopupData,
        private fb: FormBuilder) { 
            this.todoForm = this.fb.group({
                title: ['', Validators.required ],
                text: ['',  ]
             });
        }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

@Component({
    selector: 'app-popup-todo',
    templateUrl: './popup-todo.component.html',
    styleUrls: ['./popup-todo.component.css']
})
export class PopupTodoComponent implements OnInit {
    data: PopupData

    constructor(
        private store: Store<{ todosOfList: TodoInterface[] }>,
        private route: ActivatedRoute,
        private location: Location,
        public dialog: MatDialog
    ) {
        this.data = {
            uid: null,
            text: null,
            title: null
        }
    }


    ngOnInit(): void {
        const uid = this.route.snapshot.paramMap.get('uid');

        if (uid) {
            this.getTodo(uid);
        }

        setTimeout(() => {
            let dialogRef = this.dialog.open(PopupTodoComponentDialog, {
                width: '600px',
                data: {
                    uid: this.data.uid,
                    title: this.data.title,
                    text: this.data.text
                }
            })

            dialogRef.afterClosed().subscribe(result => {
                if (result && !uid && result.title.length) {
                    this.store.dispatch({ type: ActionTypes.Create, text:result.text, title:result.title });
                } else if (result && uid && result.title.length) {
                    this.store.dispatch({ type: ActionTypes.Edit, uid:result.uid, text:result.text, title:result.title });
                }

                this.location.back()
            });
        })
    }

    getTodo(uid): void {
        if (uid) {
            this.store.select('todosOfList').pipe(
                map((todos) => todos.filter((todo) => { return String(todo.uid) === String(uid) }))
            ).subscribe(todo => { this.data = todo.length > 0 ? todo[0] : null });
        }
    }
}
