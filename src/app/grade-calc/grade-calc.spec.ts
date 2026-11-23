import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeCalc } from './grade-calc';

describe('GradeCalc', () => {
  let component: GradeCalc;
  let fixture: ComponentFixture<GradeCalc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradeCalc],
    }).compileComponents();

    fixture = TestBed.createComponent(GradeCalc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
