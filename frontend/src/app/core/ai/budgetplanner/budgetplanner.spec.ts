import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Budgetplanner } from './budgetplanner';

describe('Budgetplanner', () => {
  let component: Budgetplanner;
  let fixture: ComponentFixture<Budgetplanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Budgetplanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Budgetplanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
