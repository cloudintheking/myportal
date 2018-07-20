import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleManageComponent } from './title-manage.component';

describe('TitleManageComponent', () => {
  let component: TitleManageComponent;
  let fixture: ComponentFixture<TitleManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
