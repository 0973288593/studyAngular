import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeOrder } from './coffee-order';

describe('CoffeeOrder', () => {
  let component: CoffeeOrder;
  let fixture: ComponentFixture<CoffeeOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeeOrder],
    }).compileComponents();

    fixture = TestBed.createComponent(CoffeeOrder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
