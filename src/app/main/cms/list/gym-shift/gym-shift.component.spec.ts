import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymShiftComponent } from './gym-shift.component';

describe('GymShiftComponent', () => {
  let component: GymShiftComponent;
  let fixture: ComponentFixture<GymShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymShiftComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
