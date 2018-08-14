import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomeDialogComponent } from './add-home-dialog.component';

describe('AddHomeDialogComponent', () => {
  let component: AddHomeDialogComponent;
  let fixture: ComponentFixture<AddHomeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
