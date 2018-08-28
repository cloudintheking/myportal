import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneManageComponent } from './zone-manage.component';

describe('ZoneManageComponent', () => {
  let component: ZoneManageComponent;
  let fixture: ComponentFixture<ZoneManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
