import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoMangeComponent } from './logo-mange.component';

describe('LogoMangeComponent', () => {
  let component: LogoMangeComponent;
  let fixture: ComponentFixture<LogoMangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoMangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoMangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
