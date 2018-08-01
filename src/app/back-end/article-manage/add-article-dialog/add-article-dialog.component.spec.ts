import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleDialogComponent } from './add-article-dialog.component';

describe('AddArticleDialogComponent', () => {
  let component: AddArticleDialogComponent;
  let fixture: ComponentFixture<AddArticleDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
