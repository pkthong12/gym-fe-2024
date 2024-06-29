import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEquipmentComponent } from './goods-equipment.component';

describe('GoodsEquipmentComponent', () => {
  let component: GoodsEquipmentComponent;
  let fixture: ComponentFixture<GoodsEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
