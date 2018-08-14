import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinkDialogComponent } from './add-link-dialog.component';

describe('AddLinkDialogComponent', () => {
  let component: AddLinkDialogComponent;
  let fixture: ComponentFixture<AddLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
