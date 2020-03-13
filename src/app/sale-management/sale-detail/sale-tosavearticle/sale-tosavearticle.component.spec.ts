import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleTosavearticleComponent } from './sale-tosavearticle.component';

describe('SaleTosavearticleComponent', () => {
  let component: SaleTosavearticleComponent;
  let fixture: ComponentFixture<SaleTosavearticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTosavearticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleTosavearticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
