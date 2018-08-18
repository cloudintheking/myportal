import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLinkDialogComponent } from './delete-link-dialog.component';

describe('DeleteLinkDialogComponent', () => {
  let component: DeleteLinkDialogComponent;
  let fixture: ComponentFixture<DeleteLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
