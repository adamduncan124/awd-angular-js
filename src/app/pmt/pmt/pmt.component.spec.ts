import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PmtComponent } from './pmt.component';

describe('PmtComponent', () => {
  let component: PmtComponent;
  let fixture: ComponentFixture<PmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
