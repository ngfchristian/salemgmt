import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TosaveArticlelistComponent } from './tosave-articlelist.component';

describe('TosaveArticlelistComponent', () => {
  let component: TosaveArticlelistComponent;
  let fixture: ComponentFixture<TosaveArticlelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TosaveArticlelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TosaveArticlelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
