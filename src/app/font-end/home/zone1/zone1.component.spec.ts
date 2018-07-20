import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Zone1Component } from './zone1.component';

describe('Zone1Component', () => {
  let component: Zone1Component;
  let fixture: ComponentFixture<Zone1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Zone1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Zone1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
