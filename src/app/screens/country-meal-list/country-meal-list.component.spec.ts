import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryMealListComponent } from './country-meal-list.component';

describe('CountryMealListComponent', () => {
  let component: CountryMealListComponent;
  let fixture: ComponentFixture<CountryMealListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryMealListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryMealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
