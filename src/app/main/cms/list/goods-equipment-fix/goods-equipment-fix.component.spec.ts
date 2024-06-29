import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsEquipmentFixComponent } from './goods-equipment-fix.component';

describe('GoodsEquipmentFixComponent', () => {
  let component: GoodsEquipmentFixComponent;
  let fixture: ComponentFixture<GoodsEquipmentFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsEquipmentFixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoodsEquipmentFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
