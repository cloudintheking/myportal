import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Zone2Component } from './zone2.component';

describe('Zone2Component', () => {
  let component: Zone2Component;
  let fixture: ComponentFixture<Zone2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Zone2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Zone2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
