import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTitleDialogComponent } from './add-title-dialog.component';

describe('AddTitleDialogComponent', () => {
  let component: AddTitleDialogComponent;
  let fixture: ComponentFixture<AddTitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
