import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleList2Component } from './article-list2.component';

describe('ArticleList2Component', () => {
  let component: ArticleList2Component;
  let fixture: ComponentFixture<ArticleList2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleList2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
