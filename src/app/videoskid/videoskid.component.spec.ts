import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoskidComponent } from './videoskid.component';

describe('VideoskidComponent', () => {
  let component: VideoskidComponent;
  let fixture: ComponentFixture<VideoskidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoskidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoskidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
