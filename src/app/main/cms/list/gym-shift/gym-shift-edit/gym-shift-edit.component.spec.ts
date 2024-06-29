import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymShiftEditComponent } from './gym-shift-edit.component';

describe('GymShiftEditComponent', () => {
  let component: GymShiftEditComponent;
  let fixture: ComponentFixture<GymShiftEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GymShiftEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymShiftEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
