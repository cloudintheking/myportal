import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherManageComponent } from './other-manage.component';

describe('OtherManageComponent', () => {
  let component: OtherManageComponent;
  let fixture: ComponentFixture<OtherManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
