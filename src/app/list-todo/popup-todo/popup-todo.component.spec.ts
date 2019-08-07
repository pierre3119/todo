import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTodoComponent } from './popup-todo.component';

describe('PopupTodoComponent', () => {
  let component: PopupTodoComponent;
  let fixture: ComponentFixture<PopupTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupTodoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
