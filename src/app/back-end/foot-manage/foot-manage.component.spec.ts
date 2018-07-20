import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootManageComponent } from './foot-manage.component';

describe('FootManageComponent', () => {
  let component: FootManageComponent;
  let fixture: ComponentFixture<FootManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
