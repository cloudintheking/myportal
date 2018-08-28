import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Zone3Component } from './zone3.component';

describe('Zone3Component', () => {
  let component: Zone3Component;
  let fixture: ComponentFixture<Zone3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Zone3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Zone3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
