import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Travelplanner } from './travelplanner';

describe('Travelplanner', () => {
  let component: Travelplanner;
  let fixture: ComponentFixture<Travelplanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Travelplanner]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Travelplanner);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
