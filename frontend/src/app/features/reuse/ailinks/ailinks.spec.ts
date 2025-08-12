import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ailinks } from './ailinks';

describe('Ailinks', () => {
  let component: Ailinks;
  let fixture: ComponentFixture<Ailinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ailinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ailinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
