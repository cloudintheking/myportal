import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleList1Component } from './article-list1.component';

describe('ArticleList1Component', () => {
  let component: ArticleList1Component;
  let fixture: ComponentFixture<ArticleList1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleList1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleList1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
