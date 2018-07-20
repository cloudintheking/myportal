import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontEndComponent } from './font-end.component';

describe('FontEndComponent', () => {
  let component: FontEndComponent;
  let fixture: ComponentFixture<FontEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
