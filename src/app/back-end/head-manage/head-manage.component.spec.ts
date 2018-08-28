import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadManageComponent } from './head-manage.component';

describe('HeadManageComponent', () => {
  let component: HeadManageComponent;
  let fixture: ComponentFixture<HeadManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
