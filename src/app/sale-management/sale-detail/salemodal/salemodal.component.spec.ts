import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalemodalComponent } from './salemodal.component';

describe('SalemodalComponent', () => {
  let component: SalemodalComponent;
  let fixture: ComponentFixture<SalemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
