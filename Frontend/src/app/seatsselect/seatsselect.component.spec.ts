import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsselectComponent } from './seatsselect.component';

describe('SeatsselectComponent', () => {
  let component: SeatsselectComponent;
  let fixture: ComponentFixture<SeatsselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatsselectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
