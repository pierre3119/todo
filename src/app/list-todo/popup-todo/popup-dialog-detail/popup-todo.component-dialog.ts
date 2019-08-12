import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface PopupData {
    uid: string;
    text: string;
    title: string;
}

@Component({
    selector: 'app-popup-todo-dialog',
    templateUrl: './popup-todo.component-dialog.html',
    styleUrls: ['./popup-todo.component-dialog.css']
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
