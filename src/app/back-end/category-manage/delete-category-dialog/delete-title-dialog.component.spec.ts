import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTitleDialogComponent } from './delete-title-dialog.component';

describe('DeleteTitleDialogComponent', () => {
  let component: DeleteTitleDialogComponent;
  let fixture: ComponentFixture<DeleteTitleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTitleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTitleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
